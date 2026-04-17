 "use server"
 import TripDetail from "@/components/trip-detail-client";
 import { BASEURL } from "@/app/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TripData({ params }: { params: { id: string } }) {
   
  const {id}=await params
  console.log(id);
  
  const cookieStore=await cookies()
  const token=cookieStore.get('token')?.value

    if (!token) {
    redirect("/login")
  }

  const res=await fetch(`${BASEURL}/${id}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
  })

  const data=await res.json()
  if(!res.ok){
    return "something went wrong"
  }
  
  

 
  return (
       <TripDetail data={data.trip}/>
  );
}