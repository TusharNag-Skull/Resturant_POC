from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Literal
from datetime import date, datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        from pydantic_core import core_schema
        return core_schema.str_schema()

class Booking(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    customer_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r'^\+[1-9]\d{1,14}$')  # E.164
    date: date
    time: str  # "19:30" format
    guests: int = Field(..., ge=1, le=20)
    status: Literal["Confirmed", "Cancelled"] = "Confirmed"
    whatsapp_status: Literal["Sent", "Failed", "Pending", "Simulated"] = "Pending"
    special_requests: Optional[str] = Field(None, max_length=500)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    booking_reference: Optional[str] = None  # Auto-generated: "LUM-XXXXXX"
