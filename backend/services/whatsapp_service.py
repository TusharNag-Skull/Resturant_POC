import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

WHATSAPP_PHONE_NUMBER = os.getenv("WHATSAPP_PHONE_NUMBER", "+1234567890")

async def send_whatsapp_confirmation(reservation_id: str, phone: str, name: str, date_time: str, reference_id: str, db):
    message = f"Hello {name}, your reservation at Lumière is confirmed for {date_time}. Your reference ID is {reference_id}. We look forward to serving you."
    
    status = "Sent"
    
    try:
        from twilio.rest import Client
        sid = os.getenv("TWILIO_ACCOUNT_SID")
        token = os.getenv("TWILIO_AUTH_TOKEN")
        if sid and token:
            print("Sending real WhatsApp message via Twilio...")
            client = Client(sid, token)
            msg = client.messages.create(
                body=message,
                from_=f"whatsapp:{WHATSAPP_PHONE_NUMBER}",
                to=f"whatsapp:{phone}"
            )
            status = "Sent"
        else:
            print("Twilio credentials missing. Simulating WhatsApp message:")
            print(f"To: {phone}")
            print(f"Message: {message}")
            status = "Simulated"
    except Exception as e:
        print(f"WhatsApp Error: {e}")
        status = f"Failed"
        
    # Log to whatsapp_logs
    log_entry = {
        "reservation_id": reservation_id,
        "phone": phone,
        "message": message,
        "status": status,
        "created_at": datetime.utcnow()
    }
    
    await db.whatsapp_logs.insert_one(log_entry)
    
    return status
