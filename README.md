# Lumière Dining - Full-Stack Luxury Restaurant Reservation Web Application

Lumière Dining is a premium restaurant booking experience emphasizing high-end design, fluid animations, and a bespoke digital presence.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, Python, Motor (Async MongoDB)
- **Database:** MongoDB
- **Styling:** Custom Vanilla CSS variables over Tailwind classes for glassmorphism and luxury theme aesthetics.
- **Tools:** HTML Canvas API for 100% dependency-free programmatic image generation.

---

## 🚀 Setup Instructions

### 1. Database Setup (MongoDB)
Ensure you have MongoDB running locally on port 27017, or configure an Atlas URI.
1. Create a database named `lumiere_dining`.

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows use: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   # OR
   pip install fastapi uvicorn motor pydantic email-validator python-dotenv
   ```
4. Configure Environment Variables:
   - Copy `.env.template` to `.env`.
   - Update `MONGODB_URI` if necessary.
   - For WhatsApp Simulation, leave `TWILIO_ACCOUNT_SID` blank. Terminal simulation will activate automatically.
5. Run the FastAPI Server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be available at `http://localhost:8000`.*

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file referencing the backend URL (e.g., `VITE_API_BASE_URL=http://localhost:8000`).
4. Run the Vite Development Server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`.*

---

## WhatsApp Simulation Mode

To avoid requiring Twilio credentials during testing/development, the backend includes a *Terminal Simulation Mode*.
When a reservation is confirmed (or resent via the Admin Dashboard):
1. The backend checks for `TWILIO_ACCOUNT_SID`.
2. If absent, it logs a beautifully formatted ASCII WhatsApp confirmation directly to the terminal running `uvicorn`.
3. The booking status in MongoDB will reflect `Simulated` (colored Amber in the Admin Dashboard).

---

## Screenshot Placeholders

*Add your application screenshots here*
- **Hero Section:** (Vignette, Canvas Particle Float, Gold Accents)
- **Experience Carousel:** (3D Perspective Framer Motion Carousel)
- **Booking Wizard:** (Multi-step Glassmorphism Modal with Validation)
- **Admin Dashboard:** (Concierge view with stats and WhatsApp logging)

---

Developed for the Lumière Dining digital experience PoC. 
