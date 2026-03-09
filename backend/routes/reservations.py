from fastapi import APIRouter, HTTPException, Depends
from typing import List
import random
import string
from bson import ObjectId

from models.reservation import Reservation, ReservationCreate
from database import get_db
from services.whatsapp_service import send_whatsapp_confirmation
from datetime import datetime

router = APIRouter()

def generate_reference() -> str:
    chars = string.ascii_uppercase + string.digits
    return "LUM-" + "".join(random.choices(chars, k=6))

@router.post("/", response_model=Reservation)
async def create_reservation(reservation_data: ReservationCreate, db=Depends(get_db)):
    reservation = Reservation(**reservation_data.model_dump())
    reservation.reference_id = generate_reference()
    
    # insert into db
    res_dict = reservation.model_dump(by_alias=True, exclude=["id"])
    result = await db.reservations.insert_one(res_dict)
    reservation.id = result.inserted_id
    
    # trigger whatsapp service
    await send_whatsapp_confirmation(str(reservation.id), reservation.phone, reservation.name, reservation.date_time, reservation.reference_id, db)
    
    return reservation

@router.get("/", response_model=List[Reservation])
async def list_reservations(db=Depends(get_db)):
    try:
        cursor = db.reservations.find({})
        cursor = cursor.sort("created_at", -1)
        raw_reservations = await cursor.to_list(100)
    except Exception as e:
        raw_reservations = []
        
    return [Reservation(**r) for r in raw_reservations]

@router.get("/{id}", response_model=Reservation)
async def get_reservation(id: str, db=Depends(get_db)):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    # Allow string ID matching for mock DB
    obj_id = ObjectId(id) if len(str(id)) == 24 else id
    reservation = await db.reservations.find_one({"_id": obj_id})
    if reservation:
        return Reservation(**reservation)
    raise HTTPException(status_code=404, detail="Reservation not found")

@router.patch("/{id}/cancel")
async def cancel_reservation(id: str, db=Depends(get_db)):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    obj_id = ObjectId(id) if len(str(id)) == 24 else id
    result = await db.reservations.update_one(
        {"_id": obj_id},
        {"$set": {"status": "Cancelled"}}
    )
    if result.modified_count == 1:
        return {"message": "Reservation cancelled"}
    raise HTTPException(status_code=404, detail="Reservation not found")

@router.get("/analytics/summary")
async def get_analytics_summary(db=Depends(get_db)):
    # Re-implement simplified stats for Admin Dashboard
    try:
        total_p = [{"$group": {"_id": None, "total": {"$sum": 1}, "guests": {"$sum": "$guests"}}}]
        total_stats = await db.reservations.aggregate(total_p).to_list(1)
        total = total_stats[0]["total"] if total_stats else 0
        
        today = datetime.utcnow().strftime("%Y-%m-%d")
        # Crude extraction from date_time (e.g., "YYYY-MM-DD HH:MM")
        # In mock it just takes total.
        today_p = [{"$match": {"date_time": {"$regex": f"^{today}"}}}, {"$group": {"_id": None, "guests": {"$sum": "$guests"}}}]
        try:
            today_stats = await db.reservations.aggregate(today_p).to_list(1)
            today_guests = today_stats[0]["guests"] if today_stats else 0
        except:
            today_guests = 0
            
        return {
            "total": total,
            "today_guests": today_guests,
            "whatsapp_delivery_rate": 100.0, # Placeholder
            "confirmed_count": total,
            "cancelled_count": 0
        }
    except Exception as e:
        return {
            "total": 0, "today_guests": 0, "whatsapp_delivery_rate": 0
        }

@router.post("/{id}/resend-whatsapp")
async def resend_whatsapp(id: str, db=Depends(get_db)):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    obj_id = ObjectId(id) if len(str(id)) == 24 else id
    reservation = await db.reservations.find_one({"_id": obj_id})
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
        
    res_obj = Reservation(**reservation)
    status = await send_whatsapp_confirmation(str(res_obj.id), res_obj.phone, res_obj.name, res_obj.date_time, res_obj.reference_id, db)
    
    return {"status": status}
