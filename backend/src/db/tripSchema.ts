import mongoose  from "mongoose";
import { Schema, model } from "mongoose";


export const tripSchema=new Schema({
        
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },

        destination:{
            type:String,
            required:true
        },
        numberOfDays:{
            type:Number,
            required:true,
        },

        budget:{
            type:String,
            enum:["Low", "Medium", "High"],
            default:"Low",
            required:true,
        },
        interests:[
        {
            type:String,
            enum:["Food", "Culture", "Adventure", "Shopping", "Nature", "Nightlife", "History", "Art"]
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

    budgetEstimate:{
        flights:Number,
        accommodation:Number,
        food:Number,
        activities:Number,
        total:Number
    },

hotelSuggestions: [{
    name: String,
    type: { type: String },
    location: {
        lat: Number,
        lng: Number,
    },
}],


    }, {timestamps:true})

    export const tripModel=model('Trip', tripSchema)