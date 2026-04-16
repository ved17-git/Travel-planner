import type { Request, Response } from "express"
import { tripModel } from "../db.js"
import { OpenRouter } from "@openrouter/sdk";
import 'dotenv/config'

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});


export const createTrip= async (req:Request,res:Response)=>{

    try {

        if (!req.user) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
        }
        const {destination, numberOfDays, budget, interests }=req.body

        if(!destination || !numberOfDays || !budget){
            res.status(400).json({
                msg:'Enter all details trips'
            })
            return
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
`


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
    })
 
    // Extract text from response
    const rawText = response.choices[0]?.message?.content ?? ""
 
    // Strip accidental markdown fences
    const cleaned = rawText.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)
 
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
    })
 
    return res.status(201).json({ success: true, trip })

        
    } catch (error) {
        console.log("Createtrip api error");
        console.log(error);
        return res.status(500).json({ 
            msg: "Internal Server Error" 
        });
    }

}


export const getAllTrips=async (req:Request,res:Response)=>{

    try {

        if (!req.user) {
    return res.status(401).json({
        msg: "Unauthorized"
    })
}

    const allTripes=await tripModel.find({
        userId:req.user.userId
    }).sort({createdAt:-1})

    res.status(200).json({
        msg:"all trips",
        allTripes
    })

    } catch (error) {
        console.log("getAllTrips api error");
        console.log(error);

        return res.status(500).json({ 
            msg: "Internal Server Error" 
        });
    }
}



export const getTrip=async (req:Request,res:Response)=>{

    try {

        if (!req.user) {
    return res.status(401).json({
        msg: "Unauthorized"
    })
}

    const tripId=req.params.tripId
    
    const trip=await tripModel.findById(tripId)

    if(trip){
      return res.status(200).json({
          msg: "Trip found successfully",
          trip
      })
    }
 else{
    return res.status(401).json({
        msg: "Trip not found"
    })
 }


    } catch (error) {
        console.log("getAllTrips api error");
        console.log(error);

        return res.status(500).json({ 
            msg: "Internal Server Error" 
        });
    }
}


export const deleteTrip=async (req:Request,res:Response)=>{

    try {

        if (!req.user) {
    return res.status(401).json({
        msg: "Unauthorized"
    })
}

    const tripId=req.params.tripId
    
    const trip=await tripModel.findByIdAndDelete(tripId)

    if(trip){
      return res.status(200).json({
          msg: "Trip deleted successfully",
      })
    }
 else{
    return res.status(401).json({
        msg: "Trip not found"
    })
 }


    } catch (error) {
        console.log("getAllTrips api error");
        console.log(error);

        return res.status(500).json({ 
            msg: "Internal Server Error" 
        });
    }
}