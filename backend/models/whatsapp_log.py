from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        from pydantic_core import core_schema
        return core_schema.str_schema()

class WhatsAppLog(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    reservation_id: str
    phone: str
    message: str
    status: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
