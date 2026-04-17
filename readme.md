#  PlanPilot: AI Travel Planner

**Live Demo:** [https://travel-frontend-gules.vercel.app/](https://travel-frontend-gules.vercel.app/)

##  Overview

PlanPilot is a multi-user AI-powered travel planning application that generates structured, day-by-day itineraries based on user preferences. 

Users can input a destination, duration, budget, and interests, and the system generates a personalized itinerary along with a cost breakdown. The itinerary is editable and can be dynamically refined using the AI agent. The application is designed to demonstrate full-stack engineering fundamentals, including authentication, system design, LLM integration, and production-level trade-offs.

---

##  Features

### Core Functionality
* **User Authentication:** Secure signup and login functionality.
* **Personalized Dashboard:** Trip insights and historical data.
* **AI-Generated Itineraries:** Context-aware travel plans.
* **Budget Estimation:** Breakdown of flights, accommodation, food, and activities.
* **Multi-User Data Isolation:** Strict privacy and data separation between accounts.

### Dashboard
* Total trips & total days planned.
* Budget distribution (Low / Medium / High).
* Recent trips overview.

### Trip Planning
Users provide:
* **Destination**
* **Number of days** (1–10)
* **Budget level** (Low / Medium / High)
* **Interests** (Food, Culture, Adventure, etc.)

### AI Itinerary Generation & Editing
* Generates structured day-by-day plans with activities aligned to user preferences.
* Provides comprehensive cost estimation.
* **Editable Trips:** Modify the itinerary dynamically or regenerate specific days using the AI agent.

### 🗺️ Creative Feature: Interactive Map Integration
Each itinerary is visualized on a map with activity markers. This solves a key UX gap in most AI planners—understanding the spatial distribution of activities. Instead of just reading a list, users can see:
* How far places are from each other.
* Whether a day’s plan is geographically optimized.
* *Benefit:* Improves usability and the real-world practicality of the generated plans.

---

##  Tech Stack

* **Frontend:** Next.js (App Router), Tailwind CSS, Server Components + Server Actions
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI Layer:** OpenRouter API (Model: `openai/gpt-4o-mini`)

---

##  Architecture Overview

The system follows a clear separation of concerns:

### Frontend
* **Server Components:** Used for efficient data fetching.
* **Server Actions:** Used for mutations (trip creation, updates).
* **State Management:** Minimal client-side state to reduce complexity.

### Backend
* REST API with a modular route structure.
* Middleware-based authentication and authorization.
* Centralized error handling.

### Data Flow
1. User submits trip details.
2. Frontend triggers a server action.
3. Backend calls the OpenRouter API.
4. AI response is structured and stored in MongoDB.
5. Frontend renders the itinerary and interactive map.

### Authentication & Authorization
* **JWT-based authentication** (Token sent with each request).
* **Middleware Enforcements:** Only authenticated users can access protected routes. Users can only access their own data.
* **Database Level:** Strict data isolation is enforced at the query level.

### AI Agent Design
The AI agent generates itineraries, estimates budgets, and updates specific days of a trip. 
* **Prompt Strategy:** Structured prompts enforce predictable outputs and context-aware updates for partial regeneration.
* **Model Choice:** `gpt-4o-mini` was selected for lower cost, fast response times, and sufficient quality for structured planning.

---

##  Engineering Decisions

### Rate Limiting (OpenRouter Protection)
Rate limiting is implemented at the backend specifically for routes that trigger AI generation (`/generate`, `/update/:trip`).
* **Why:** Prevents uncontrolled API usage, protects against accidental/malicious abuse, ensures OpenRouter credits are not exhausted, and maintains fair usage.
* **Implementation:** Limits the number of requests per IP within a fixed time window and returns a controlled error response when the limit is exceeded.
* **Trade-off:** Prioritizes cost control and system stability over unrestricted usage.

### Server Actions (Frontend)
* Used for handling mutations, reducing the need for an additional API abstraction layer and keeping logic closer to the UI.

### Database (MongoDB)
* Chosen for its flexible schema (ideal for unpredictable AI-generated data) and faster iteration during development.

---

##  Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/ved17-git/Travel-planner
cd <repo-name>

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/ved17-git/Travel-planner
### 2. Backend Setup
cd backend
npm install
npm run dev
### 3. Frontend Setup
cd frontend
npm install
npm run dev
### 4. Environment Variables

##Create a .env file in both the backend and frontend directories with the following variables:
### backend/.env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini

## Deployment

- Frontend: Deployed on Vercel  
- Backend: Node.js server deployed on Vercel  

---

## Design Trade-offs

- Used a lightweight model (`gpt-4o-mini`) instead of larger models to balance cost vs performance  
- Added rate limiting to control operational costs instead of allowing unrestricted AI usage  
- Avoided over-engineering (no microservices) to maintain system simplicity  
- Accepted slight variability in AI output in exchange for faster response times  

---

## Known Limitations

- AI output may not always be perfectly structured  
- Budget estimation is approximate  
- No real-time collaboration between users  
- Map accuracy depends on extracted location data  

---

## Future Improvements

- Save and share itineraries via public links  
- Real-time collaboration for group trips  
- Improved geocoding for enhanced map accuracy  
- Integration with real travel APIs for live pricing (flights and hotels)  