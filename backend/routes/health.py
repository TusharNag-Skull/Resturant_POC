from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/")
async def health_check():
    return {
        "status": "operational",
        "database": "connected", # assuming true for now unless modified
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }
