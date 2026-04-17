# PlanPilot: AI Travel Planner

**Live Demo:** https://travel-frontend-gules.vercel.app/

---

## Overview

PlanPilot is a multi-user AI-powered travel planning application that generates structured, day-by-day itineraries based on user preferences.

Users can input a destination, duration, budget, and interests, and the system generates a personalized itinerary along with a cost breakdown. The itinerary is editable and can be dynamically refined using the AI agent.

The application demonstrates full-stack engineering fundamentals including authentication, system design, LLM integration, and production-level trade-offs.

---

## Features

### Core Functionality

- User authentication (signup/login)  
- Personalized dashboard with trip insights  
- AI-generated itineraries  
- Budget estimation (flights, accommodation, food, activities)  
- Editable itineraries (regenerate specific days)  
- Multi-user data isolation  

---

### Dashboard

- Total trips  
- Total days planned  
- Budget distribution (Low / Medium / High)  
- Recent trips overview  

---

### Trip Planning

Users provide:

- Destination  
- Number of days (1–10)  
- Budget level (Low / Medium / High)  
- Interests (Food, Culture, Adventure, etc.)  

---

### AI Itinerary Generation

- Generates structured day-by-day plans  
- Includes activities aligned with user preferences  
- Provides cost estimation  

---

### Editable Trips

- Modify itinerary dynamically  
- Regenerate specific days using AI  

---

## Creative Feature

### Interactive Map Integration

Each itinerary is visualized on a map with activity markers.

This solves a key UX gap in most AI planners — understanding spatial distribution of activities.

Users can:
- See distances between locations  
- Understand whether a day is geographically optimized  

This improves usability and real-world practicality.

---

## Tech Stack

### Frontend

- Next.js (App Router)  
- Tailwind CSS  
- Server Components + Server Actions  

### Backend

- Node.js  
- Express.js  

### Database

- MongoDB  

### AI Layer

- OpenRouter API  
- Model: `openai/gpt-4o-mini`  

---

## Architecture Overview

### Frontend

- Server Components for data fetching  
- Server Actions for mutations  
- Minimal client-side state  

### Backend

- REST API with modular routes  
- Middleware-based auth and authorization  
- Centralized error handling  

### Data Flow

1. User submits trip details  
2. Frontend triggers server action  
3. Backend calls OpenRouter API  
4. AI response is stored in MongoDB  
5. Frontend renders itinerary + map  

---

## Authentication & Authorization

- JWT-based authentication  
- Token sent with each request  
- Middleware ensures:
  - Only authenticated users access protected routes  
  - Users access only their own data  

Strict data isolation is enforced at query level.

---

## AI Agent Design

The AI agent handles:

- Itinerary generation  
- Budget estimation  
- Partial updates (day regeneration)  

### Prompt Strategy

- Structured prompts for consistent output  
- Context-aware updates  

### Model Choice

`gpt-4o-mini` selected for:
- Lower cost  
- Fast responses  
- Sufficient structured output quality  

---

## Engineering Decisions

### Rate Limiting (OpenRouter Protection)

Rate limiting is applied on AI-heavy routes (`/generate`, `/update/:trip`).

#### Why

- Prevents API abuse  
- Controls OpenRouter cost  
- Ensures fair usage  

#### Implementation

- Limits requests per IP within a time window  
- Returns controlled error when exceeded  

#### Trade-off

Prioritizes cost control and system stability over unlimited usage.

---

### Server Actions (Frontend)

- Handles mutations directly  
- Reduces API complexity  
- Keeps logic close to UI  

---

### MongoDB

- Flexible schema for AI-generated data  
- Faster development iteration  

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/ved17-git/Travel-planner
cd Travel-planner
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Deployment

- Frontend: Deployed on Vercel  
- Backend: Node.js server deployed on Vercel  

Note: Environment variables are managed securely via platform dashboards.

---

## Design Trade-offs

- Used `gpt-4o-mini` for cost vs performance balance  
- Added rate limiting to control API usage cost  
- Avoided microservices to keep system simple  
- Accepted slight AI variability for faster response  

---

## Known Limitations

- AI output may not always be perfectly structured  
- Budget estimation is approximate  
- No real-time collaboration  
- Map accuracy depends on extracted locations  

---

## Future Improvements

- Shareable itineraries  
- Real-time collaboration  
- Improved geocoding  
- Integration with real travel APIs (flights/hotels)  

---

## Final Notes

This project focuses on:

- System design clarity  
- Practical LLM integration  
- Engineering trade-offs  
- Maintainable architecture  

The goal is to demonstrate strong engineering judgment rather than build a perfect product.