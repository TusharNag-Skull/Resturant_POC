from fastapi import APIRouter, Depends
from typing import List
from models.whatsapp_log import WhatsAppLog
from database import get_db

router = APIRouter()

@router.get("/", response_model=List[WhatsAppLog])
async def list_whatsapp_logs(db=Depends(get_db)):
    try:
        cursor = db.whatsapp_logs.find({})
        cursor = cursor.sort("created_at", -1)
        raw_logs = await cursor.to_list(100)
    except Exception as e:
        raw_logs = []
        
    return [WhatsAppLog(**r) for r in raw_logs]
