"use server"
import { log } from "console"
import { BASEURL } from "../config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
export async function generateTrip(previousState:unknown, formData:FormData) {
    
    const destination=formData.get("destination")
    const numberOfDays=formData.get("numberOfDays")
    const budget=formData.get("budget")
  const interest = formData.getAll("interests") as string[];

const interestsArray = interest.flatMap((interest) => 
  interest.split(',').map((item) => item.trim())
);

    
    const trip={
        destination,
        numberOfDays,
        budget,
        interests:interestsArray
    };
   
    console.log(trip);
    
    const cookieStore=await cookies()
    const token=cookieStore.get('token')?.value

    const res=await fetch(`${BASEURL}/createTrips`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(trip)
    })

    // only for rate limitter
    if (res.status === 429) {
            return {
                status: "error",
                msg: "You are making too many requests. Please wait a moment and try again."
            };
    }
    const data=await res.json()
    console.log(res);
    console.log(data);

    if(!res.ok){
        return {
            status:"error",
            msg:data.msg
        }
    }
  
    redirect(`/trips/${data.trip._id}`)

}