"use server"

import { cookies } from "next/headers";
import { BASEURL } from "../../config";

export async function UpdateTrip(previousState:unknown, formData:FormData) {

    const tripId = formData.get("tripId") as string;
    const destination = formData.get("destination") as string;
    const numberOfDays = formData.get("numberOfDays") as string;
    const budget = formData.get("budget") as string;
    const interests = formData.getAll("interests") as string[];
    const prompt = formData.get("prompt") as string;

    const UpdatedTrip={
        destination,
        numberOfDays,
        budget,
        interests,
        prompt
    }
    console.log(UpdatedTrip);

    const cookieStore=await cookies()
    const token=cookieStore.get('token')?.value

    const res=await fetch(`${BASEURL}/${tripId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(UpdatedTrip)
    })
    if (res.status === 429) {
            return {
                status: "error",
                msg: "You are making too many requests. Please wait a moment and try again."
            };
    }
    const data=await res.json()

    if(!res.ok){
        return {
            status:"error",
            msg:data.msg
        }
    }

    return {
            status:"success",
            msg:data.msg
        }
}


export async function deleteTrip(previousState:unknown, formData:FormData) {

    const tripId = formData.get("tripId") as string;


    const cookieStore=await cookies()
    const token=cookieStore.get('token')?.value

    const res=await fetch(`${BASEURL}/${tripId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
    })
    const data=await res.json()

    if(!res.ok){
        return {
            status:"error",
            msg:data.msg
        }
    }

    return {
            status:"success",
            msg:data.msg
        }
}