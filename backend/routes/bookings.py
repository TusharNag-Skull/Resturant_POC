from fastapi import APIRouter, HTTPException, Body, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import random
import string
from bson import ObjectId

from models.booking import Booking
from database import get_db
from services.whatsapp_service import send_reservation_confirmation

router = APIRouter()

def generate_reference() -> str:
    chars = string.ascii_uppercase + string.digits
    return "LUM-" + "".join(random.choices(chars, k=6))

@router.post("/", response_model=Booking)
async def create_booking(booking: Booking, db=Depends(get_db)):
    booking.booking_reference = generate_reference()
    
    # insert into db
    booking_dict = booking.model_dump(by_alias=True, exclude=["id"])
    result = await db.bookings.insert_one(booking_dict)
    booking.id = result.inserted_id
    
    # trigger whatsapp service
    whatsapp_response = send_reservation_confirmation(booking_dict)
    
    # update whatsapp status based on response
    if whatsapp_response.get("status"):
        booking.whatsapp_status = whatsapp_response.get("status")
        await db.bookings.update_one(
            {"_id": result.inserted_id},
            {"$set": {"whatsapp_status": booking.whatsapp_status}}
        )
        
    return booking

@router.get("/", response_model=List[Booking])
async def list_bookings(db=Depends(get_db)):
@router.get("/analytics/summary")
async def get_analytics_summary(db=Depends(get_db)):
    import traceback
    try:
        from datetime import datetime
        
        pipeline = [{"$group": {"_id": None, "total": {"$sum": 1}, "guests": {"$sum": "$guests"}}}]
        total_stats = await db.bookings.aggregate(pipeline).to_list(1)
        
        today = datetime.utcnow().strftime("%Y-%m-%d")
        today_pipeline = [
            {"$match": {"date": today}},
            {"$group": {"_id": None, "today_guests": {"$sum": "$guests"}}}
        ]
        today_stats = await db.bookings.aggregate(today_pipeline).to_list(1)
        
        confirmed_count = await db.bookings.count_documents({"status": "Confirmed"})
        cancelled_count = await db.bookings.count_documents({"status": "Cancelled"})
        
        sent_count = await db.bookings.count_documents({"whatsapp_status": {"$in": ["Sent", "Simulated"]}})
        total_bookings = confirmed_count + cancelled_count
        rate = (sent_count / total_bookings * 100) if total_bookings > 0 else 0
        
        total = total_stats[0]["total"] if total_stats else 0
        today_guests = today_stats[0]["today_guests"] if today_stats else 0
        
        return {
            "total": total,
            "today_guests": today_guests,
            "whatsapp_delivery_rate": round(rate, 2),
            "confirmed_count": confirmed_count,
            "cancelled_count": cancelled_count
        }
    except Exception as e:
        return {"error": str(e), "traceback": traceback.format_exc()}

@router.get("/{id}", response_model=Booking)
async def get_booking(id: str, db=Depends(get_db)):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    booking = await db.bookings.find_one({"_id": ObjectId(id)})
    if booking:
        return booking
    raise HTTPException(status_code=404, detail="Booking not found")

@router.patch("/{id}/cancel")
async def cancel_booking(id: str, db=Depends(get_db)):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    result = await db.bookings.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": "Cancelled"}}
    )
    if result.modified_count == 1:
        return {"message": "Booking cancelled"}
    raise HTTPException(status_code=404, detail="Booking not found or already cancelled")

@router.post("/{id}/resend-whatsapp")
async def resend_whatsapp(id: str, db=Depends(get_db)):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    booking = await db.bookings.find_one({"_id": ObjectId(id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    response = send_reservation_confirmation(booking)
    status = response.get("status", "Failed")
    
    await db.bookings.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"whatsapp_status": status}}
    )
    return {"status": status}
