from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routes import health, reservations, whatsapp
from database import connect_to_mongo, close_mongo_connection

app = FastAPI(title="Lumière Dining API", version="1.0.0")

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(reservations.router, prefix="/api/reservations", tags=["reservations"])
app.include_router(whatsapp.router, prefix="/api/whatsapp-logs", tags=["whatsapp-logs"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
