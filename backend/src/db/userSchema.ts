import mongoose  from "mongoose";
import { Schema, model } from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

export const userModel=model("User", userSchema)