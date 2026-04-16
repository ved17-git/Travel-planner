import mongoose from "mongoose";
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});
export const userModel = model("User", userSchema);
export const tripSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true,
    },
    budget: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
        required: true,
    },
    interests: [
        {
            type: String,
            enum: ["Food", "Culture", "Adventure", "Shopping", "Nature", "Nightlife", "History", "Art"]
        }
    ],
    //output
    itinerary: [{
            day: Number,
            title: String,
            activities: [{
                    name: String,
                    location: {
                        lat: Number,
                        lng: Number,
                    },
                }],
        }],
    budgetEstimate: {
        flights: Number,
        accommodation: Number,
        food: Number,
        activities: Number,
        total: Number
    },
    hotelSuggestions: [{
            name: String,
            type: { type: String },
            location: {
                lat: Number,
                lng: Number,
            },
        }],
}, { timestamps: true });
export const tripModel = model('Trip', tripSchema);
//# sourceMappingURL=db.js.map