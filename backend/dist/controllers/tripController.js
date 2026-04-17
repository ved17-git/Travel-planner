import { OpenRouter } from "@openrouter/sdk";
import 'dotenv/config';
import { isValidPrompt } from "../utils.js";
import { tripModel } from "../db/tripSchema.js";
import { userModel } from "../db/userSchema.js";
const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
});
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
        const response = await openrouter.chat.send({
            chatRequest: {
                model: process.env.OPENROUTER_MODEL,
                responseFormat: { type: "json_object" },
                messages: [
                    {
                        role: "user",
                        content: prompt + "\n\nReturn ONLY JSON. No explanation."
                    }
                ]
            }
        });
        // Extract text from response
        const rawText = response.choices[0]?.message?.content ?? "";
        // Strip accidental markdown fences
        const cleaned = rawText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        // Save to DB
        const trip = await tripModel.create({
            userId: req.user.userId,
            destination,
            numberOfDays,
            budget,
            interests: interests ?? [],
            itinerary: parsed.itinerary,
            budgetEstimate: parsed.budgetEstimate,
            hotelSuggestions: parsed.hotelSuggestions,
        });
        return res.status(201).json({ success: true, trip });
    }
    catch (error) {
        console.log("Create trip api error");
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};
export const getAllTrips = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({
                msg: "User not found"
            });
        }
        const allTripes = await tripModel.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });
        res.status(200).json({
            msg: "all trips",
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            allTripes
        });
    }
    catch (error) {
        console.log("getAllTrips api error");
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};
export const getTrip = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        const tripId = req.params.tripId;
        const trip = await tripModel.findById(tripId);
        if (trip) {
            return res.status(200).json({
                msg: "Trip found successfully",
                trip
            });
        }
        else {
            return res.status(401).json({
                msg: "Trip not found"
            });
        }
    }
    catch (error) {
        console.log("get trip api error");
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};
export const deleteTrip = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        const tripId = req.params.tripId;
        const trip = await tripModel.findByIdAndDelete(tripId);
        if (trip) {
            return res.status(200).json({
                msg: "Trip deleted successfully",
            });
        }
        else {
            return res.status(401).json({
                msg: "Trip not found"
            });
        }
    }
    catch (error) {
        console.log("delete trip api error");
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};
export const updateTrip = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        const tripId = req.params.tripId;
        const { destination, numberOfDays, budget, interests, prompt } = req.body || {};
        const existingTrip = await tripModel.findById(tripId);
        if (!existingTrip) {
            return res.status(404).json({ msg: "Trip not found" });
        }
        // Resolve final values
        const finalDestination = destination ?? existingTrip.destination;
        const finalDays = numberOfDays ?? existingTrip.numberOfDays;
        const finalBudget = budget ?? existingTrip.budget;
        const finalInterests = interests ?? existingTrip.interests;
        // Detect actual field-level changes
        const destinationChanged = destination !== undefined && destination !== existingTrip.destination;
        const daysChanged = numberOfDays !== undefined && numberOfDays !== existingTrip.numberOfDays;
        const budgetChanged = budget !== undefined && budget !== existingTrip.budget;
        const interestsChanged = interests !== undefined &&
            JSON.stringify(interests) !== JSON.stringify(existingTrip.interests);
        const hasPrompt = typeof prompt === "string" && prompt.trim().length > 0;
        if (hasPrompt && !isValidPrompt(prompt)) {
            return res.status(400).json({
                msg: "Invalid prompt. Please enter a meaningful travel-related request."
            });
        }
        const nothingChanged = !destinationChanged &&
            !daysChanged &&
            !budgetChanged &&
            !interestsChanged &&
            !hasPrompt;
        // Early exit — no credit burned, no DB write
        if (nothingChanged) {
            return res.status(200).json({
                msg: "No changes detected",
                trip: existingTrip,
            });
        }
        const aiPrompt = `
You are a travel itinerary planner. Respond with ONLY valid JSON, no markdown, no extra text.

Trip details:
- Destination: ${finalDestination}
- Number of Days: ${finalDays}
- Budget: ${finalBudget}
- Interests: ${finalInterests?.join(", ") || "General"}
${hasPrompt ? `\nAdditional user instruction: ${prompt}` : ""}

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
- Use real, accurate coordinates for every activity and hotel in ${finalDestination}.
- For budgetEstimate, estimate realistic costs in USD for a solo traveler for ${finalDays} days.
- For flights, assume an average international flight cost to ${finalDestination} if international, or domestic if within the same country. Never return 0 for flights.
- budgetEstimate.total must equal the sum of flights + accommodation + food + activities.
- Do not use placeholder 0.0 values for coordinates.

Return ONLY JSON. No explanation.
`;
        const response = await openrouter.chat.send({
            chatRequest: {
                model: process.env.OPENROUTER_MODEL,
                responseFormat: { type: "json_object" },
                messages: [{ role: "user", content: aiPrompt }],
            },
        });
        const rawText = response.choices[0]?.message?.content ?? "";
        const cleaned = rawText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        const updatedTrip = await tripModel.findByIdAndUpdate(tripId, {
            destination: finalDestination,
            numberOfDays: finalDays,
            budget: finalBudget,
            interests: finalInterests,
            itinerary: parsed.itinerary,
            budgetEstimate: parsed.budgetEstimate,
            hotelSuggestions: parsed.hotelSuggestions,
        }, { returnDocument: 'after' });
        return res.status(200).json({
            msg: "Trip updated successfully",
            trip: updatedTrip,
        });
    }
    catch (error) {
        console.log("update api error");
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};
//# sourceMappingURL=tripController.js.map