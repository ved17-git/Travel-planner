import { OpenRouter } from "@openrouter/sdk";
import 'dotenv/config'

const destination="Agra"
const numberOfDays=7
const budget="low"
const interests=[]

const prompt = `
You are a professional travel itinerary planner API.

Your task is to generate a structured travel plan in STRICT JSON format.

⚠️ CRITICAL RULES:
- Return ONLY valid JSON. No markdown, no explanation, no extra text.
- Do NOT wrap in backticks.
- Ensure JSON is parseable using JSON.parse().
- All fields must be present exactly as defined.
- Do NOT hallucinate coordinates — use real, accurate latitude and longitude.

Trip details:
- Destination: ${destination}
- Number of Days: ${numberOfDays}
- Budget: ${budget}
- Interests: ${interests?.join(", ") || "General"}

---

🎯 ITINERARY RULES:
- Provide exactly ${numberOfDays} days.
- Each day must have 3 to 5 activities.
- Activities must be realistic and geographically sensible (no jumping cities randomly).
- Titles should be meaningful (e.g., "Exploring Central Paris").

---

💰 BUDGET RULES:
- Currency: USD
- Must reflect ${budget} level:
  - Low → hostels, street food, public transport
  - Medium → 3-star hotels, casual dining, mix of transport
  - High → luxury hotels, fine dining, private transport
- Flights must NOT be 0
- total = flights + accommodation + food + activities (must match exactly)

---

🏨 HOTEL RULES:
- Suggest 3 hotels
- Match budget category
- Must be real hotels in ${destination}

---

📍 COORDINATES:
- Every activity and hotel MUST include real coordinates
- Format:
  { "lat": number, "lng": number }
- No placeholders like 0 or null

---

Return EXACTLY this JSON structure:

{
  "itinerary": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        {
          "name": "string",
          "location": { "lat": 0.0, "lng": 0.0 }
        }
      ]
    }
  ],
  "budgetEstimate": {
    "flights": number,
    "accommodation": number,
    "food": number,
    "activities": number,
    "total": number
  },
  "hotelSuggestions": [
    {
      "name": "string",
      "type": "Budget | Mid-Range | Luxury",
      "location": { "lat": 0.0, "lng": 0.0 }
    }
  ]
}
`;


const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

const res = await openrouter.chat.send({
  chatRequest: {
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt + "\n\nReturn ONLY JSON. No explanation."
      }
    ]
  }
})

// ✅ extract response
const content = res.choices[0].message.content

// ✅ parse JSON
const data = JSON.parse(content)

// ✅ use it
console.log("Itinerary:", data.itinerary)
console.log("Budget:", data.budgetEstimate)
console.log("Hotels:", data.hotelSuggestions)

