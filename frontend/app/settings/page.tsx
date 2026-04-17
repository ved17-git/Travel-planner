import Nav from "@/components/nav";
import { cookies } from "next/headers";
import { BASEURL } from "../config";
import { redirect } from "next/navigation";

export default async function Settings() {

  const cookieStore=await cookies()
  const token=cookieStore.get('token')?.value
    if (!token) {
    redirect("/login")
  }

  const res=await fetch(`${BASEURL}/me`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
  })
  const data=await res.json()

  
    // if (!res.ok) {
    //   return (
    //     <div className="min-h-screen flex items-center justify-center">
    //       <p className="text-sm text-red-500">Something went wrong</p>
    //     </div>
    //   );
    // }
  const profile=data.userProfile
  
 

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile section */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40">
              <h2 className="font-semibold text-sm">Profile Information</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update your name and email address</p>
            </div>

      <div className="p-6 space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
            {profile.firstName[0].toUpperCase()}{profile.lastName[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">First name</p>
            <div className="h-10 px-3 flex items-center rounded-lg border border-border bg-background text-sm">
              {profile.firstName}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Last name</p>
            <div className="h-10 px-3 flex items-center rounded-lg border border-border bg-background text-sm">
              {profile.lastName}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Email address</p>
          <div className="h-10 px-3 flex items-center rounded-lg border border-border bg-background text-sm">
            {profile.email}
          </div>
        </div>
      </div>
          </div>
    
        </div>
      </main>           
    </div>
  );
}