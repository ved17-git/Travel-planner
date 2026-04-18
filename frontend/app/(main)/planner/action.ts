"use server"
import { BASEURL } from "../../config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
export async function generateTrip(previousState:unknown, formData:FormData) {
    
    const destination=formData.get("destination")
    const numberOfDays=formData.get("numberOfDays")
    const budget=formData.get("budget")
  const interest = formData.getAll("interests") as string[];

const interestsArray = interest
  .flatMap((i) => i.split(","))
  .map((i) => i.trim())
  .filter((i) => i.length > 0); 
  



    
    const trip={
        destination,
        numberOfDays,
        budget,
        interests:interestsArray
    };
    


if (!destination || !numberOfDays || !budget || interestsArray.length === 0) {
  return {
    status: "error",
    msg: "Enter all details"
  };
}
    
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


    if(!res.ok){
        return {
            status:"error",
            msg:data.msg
        }
    }
  
    redirect(`/trips/${data.trip._id}`)

}