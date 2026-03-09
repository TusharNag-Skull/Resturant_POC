from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Literal
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        from pydantic_core import core_schema
        return core_schema.str_schema()

class ReservationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r'^\+[1-9]\d{1,14}$')  # E.164
    guests: int = Field(..., ge=1, le=20)
    date_time: str # Combined date and time or ISO string. We'll map the frontend date/time to this
    special_request: Optional[str] = Field(None, max_length=500)

class Reservation(ReservationCreate):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    reference_id: Optional[str] = None
    status: Literal["Confirmed", "Cancelled"] = "Confirmed"
    created_at: datetime = Field(default_factory=datetime.utcnow)
