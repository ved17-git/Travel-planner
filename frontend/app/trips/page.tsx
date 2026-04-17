"use server"
import Link from "next/link";
import TripsList from "@/components/trip-list-client";
import { BASEURL } from "../config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async  function Trips() {

  const cookieStore=await cookies()
  const token=cookieStore.get('token')?.value
    if (!token) {
    redirect("/login")
  }
   const res=await fetch(`${BASEURL}/getTrips`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
   })
   
   const data=await res.json()
   if(!res.ok){
    return "Data could not fetch"
   }

   console.log(data);
   


  return (
    <TripsList data={data.allTripes}/>
  );
}