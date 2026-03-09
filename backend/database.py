import os
from bson import ObjectId
from datetime import datetime
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "lumiere_dining")
USE_MOCK_DB = os.getenv("USE_MOCK_DB", "false").lower() == "true"

class MockCollection:
    def __init__(self):
        self.data = []

    async def insert_one(self, document):
        doc_id = str(ObjectId())
        document["_id"] = doc_id
        if "created_at" not in document:
            document["created_at"] = datetime.utcnow()
        self.data.append(document)
        class InsertResult:
            inserted_id = doc_id
        return InsertResult()

    def find(self, query=None):
        class Cursor:
            def __init__(self, data):
                self._data = data
            def sort(self, field, direction):
                self._data.sort(key=lambda x: x.get(field, ''), reverse=(direction == -1))
                return self
            async def to_list(self, length):
                return self._data[:length]
        
        filtered = [d for d in self.data if all(d.get(k) == v for k, v in (query or {}).items())]
        return Cursor(filtered)

    async def aggregate(self, pipeline):
        class AggCursor:
            def __init__(self, data, pipeline):
                self._data = data
                self._pipeline = pipeline
            async def to_list(self, length):
                if not self._data:
                    return []
                # Emulate basic aggregations
                if "$match" in self._pipeline[0]:
                    date_match = self._pipeline[0]["$match"].get("date")
                    guests = sum(d.get("guests", 0) for d in self._data if d.get("date") == date_match)
                    return [{"_id": None, "today_guests": guests}]
                else:
                    total = len(self._data)
                    guests = sum(d.get("guests", 0) for d in self._data)
                    return [{"_id": None, "total": total, "guests": guests}]
        return AggCursor(self.data, pipeline)

    async def count_documents(self, query):
        if not query:
            return len(self.data)
        
        # specific "$in" query fallback
        field, condition = list(query.items())[0] if query else (None, None)
        if condition and isinstance(condition, dict) and "$in" in condition:
            allowed = condition["$in"]
            return sum(1 for d in self.data if d.get(field) in allowed)
            
        return sum(1 for d in self.data if all(d.get(k) == v for k,v in query.items()))

    async def find_one(self, query):
        for d in self.data:
            if all(d.get(k) == v or str(d.get(k)) == str(v) for k,v in query.items()):
                return d
        return None

    async def update_one(self, query, update):
        op = update.get("$set", {})
        count = 0
        for d in self.data:
            if all(d.get(k) == v or str(d.get(k)) == str(v) for k,v in query.items()):
                d.update(op)
                count = 1
                break
        class UpdateResult:
            modified_count = count
        return UpdateResult()

class MockDB:
    def __init__(self):
        self.reservations = MockCollection()
        self.whatsapp_logs = MockCollection()

class MockClient:
    def __init__(self):
        self._db = MockDB()
    def __getitem__(self, name):
        return self._db
    def close(self):
        pass

class Database:
    client = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    if USE_MOCK_DB:
        print("Connecting to MOCK Database...")
        db_instance.client = MockClient()
        db_instance.db = db_instance.client[DATABASE_NAME]
    else:
        try:
            print(f"Connecting to MongoDB at {MONGODB_URI}...")
            db_instance.client = AsyncIOMotorClient(MONGODB_URI)
            db_instance.db = db_instance.client[DATABASE_NAME]
            # Verify connection
            await db_instance.client.admin.command('ping')
            print("Successfully connected to MongoDB!")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            print("Falling back to MOCK Database...")
            db_instance.client = MockClient()
            db_instance.db = db_instance.client[DATABASE_NAME]

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()

def get_db():
    return db_instance.db
