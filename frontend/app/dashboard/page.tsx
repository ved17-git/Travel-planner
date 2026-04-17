import DashboardPage from "@/components/dashboard-client";
import { cookies } from "next/headers";
import { BASEURL } from "../config";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  
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
     const trips=data.allTripes
    const user=data.user
    

  return (
     <DashboardPage data={trips} user={user}/>
  );
}