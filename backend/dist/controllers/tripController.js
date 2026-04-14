import { tripModel } from "../db.js";
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const createTrip = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        const { destination, numberOfDays, budget, interests } = req.body;
        if (!destination || !numberOfDays || !budget) {
            res.status(400).json({
                msg: 'Enter all details trips'
            });
            return;
        }
        const prompt = `
You are a travel itinerary planner. Respond with ONLY valid JSON, no markdown, no extra text.

Trip details:
- Destination: ${destination}
- Number of Days: ${numberOfDays}
- Budget: ${budget}
- Interests: ${interests?.join(", ") || "General"}

Budget guide:
- Low: budget hostels, street food, public transport
- Medium: 3-star hotels, mid-range restaurants, some taxis
- High: 4-5 star hotels, fine dining, private transport

Return exactly this structure:
{
  "itinerary": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        { "name": "string", "location": { "lat": 0.0, "lng": 0.0 } }
      ]
    }
  ],
  "budgetEstimate": {
    "flights": 0,
    "accommodation": 0,
    "food": 0,
    "activities": 0,
    "total": 0
  },
  "hotelSuggestions": [
    { "name": "string", "type": "Budget | Mid-Range | Luxury", "location": { "lat": 0.0, "lng": 0.0 } }
  ]
}

IMPORTANT:
- Use real, accurate coordinates for every activity and hotel.
- For budgetEstimate, estimate realistic costs in USD for a solo traveler for ${numberOfDays} days.
- For flights, assume an average international flight cost to ${destination} if it is an international destination, or domestic flight cost if within the same country. Use a reasonable estimate, never return 0.
- budgetEstimate.total must equal the sum of flights + accommodation + food + activities.
- Do not use placeholder 0.0 values for coordinates.
`;
        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: prompt
        });
        const rawText = response.text?.trim() ?? "";
        const cleaned = rawText.replace(/^```json\n?|```$/g, "").trim();
        const parsed = JSON.parse(cleaned);
        const newTrip = await tripModel.create({
            userId: req.user.userId,
            destination,
            numberOfDays,
            budget,
            interests: interests ?? [],
            itinerary: parsed.itinerary,
            budgetEstimate: parsed.budgetEstimate,
            hotelSuggestions: parsed.hotelSuggestions,
        });
        res.status(201).json({ msg: 'Trip created', trip: newTrip });
    }
    catch (error) {
        console.log("Createtrip api error");
        console.log(error);
    }
};
export const getAllTrips = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        const allTripes = await tripModel.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });
        res.status(200).json({
            msg: "all trips",
            allTripes
        });
    }
    catch (error) {
        console.log("getAllTrips api error");
        console.log(error);
    }
};
//# sourceMappingURL=tripController.js.map