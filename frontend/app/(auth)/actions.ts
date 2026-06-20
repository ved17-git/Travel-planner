"use server"
import { BASEURL } from "../config"
import { cookies } from "next/headers"

export async function registerUser(previousState: unknown, formData: FormData){
 
    const firstName=formData.get("firstName")
    const lastName=formData.get("lastName")
    const username=formData.get("username")
    const email=formData.get("email")
    const password=formData.get("password") as string
    
    if(username===email){
       return {
            status:"error",
            msg:"Username and email cannot be same"
        }
    }

    if(password.length<=4){
       return {
            status:"error",
            msg:"Password should be greater than 4 characters"
        }
    }

    const user={
        firstName,
        lastName,
        email,
        password,
        username
    }

    const res=await fetch(`${BASEURL}/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
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


export async function loginUser(previousState: unknown, formData:FormData){
  
    const email=formData.get("email")
    const password=formData.get("password")
    
    const user={
        email,
        password
    }

    const res=await fetch(`${BASEURL}/signin`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    const data=await res.json()

    if(!res.ok){
        return {
            status:"error",
            msg:data.msg
        }
    }

    const cookieStore=await cookies()
    cookieStore.set('token', data.token,{
        httpOnly:true,
        maxAge: 60*60 * 6  //60*60=> 1hr 
    })
  
    return {
        status:"success",
        msg:data.msg
    }

}

export async function Logout(prevState: { status: string; msg: string } | null) {

    const cookieStore=await cookies()
    const token=cookieStore.get('token')?.value
    
    const res=await fetch(`${BASEURL}/logout`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })

    const data=await res.json()
    if(!res.ok){
        return {
            status:"error",
            msg:data.msg
        }
    }
    cookieStore.delete("token")

    return {
        status:"success",
        msg:data.msg
    }

}