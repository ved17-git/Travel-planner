"use client";
import { useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "../actions";
import { useEffect } from "react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router=useRouter()
  const [data, action, loading]=useActionState(registerUser, null)

  useEffect(()=>{
    if(!data) return
    if(data?.status==="error"){
       toast.error(data.msg)
    }
    else{
      toast.success(data?.msg)
      router.push('/login')
    }
  },[data, router])

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-card/50 border-r border-border/40 flex-col justify-between p-12">
        <Link href="/" className="text-xl font-bold">Trao<span className="text-primary">.</span></Link>
        <div className="space-y-6">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <h2 className="text-3xl font-bold leading-tight">Start planning<br />your dream trips.</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xs">
            Create your free account and let AI generate your perfect travel itinerary in seconds.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Free to use. No credit card required.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden text-xl font-bold">Trao<span className="text-primary">.</span></Link>
          <h1 className="text-2xl font-bold mt-6 mb-1">Create an account</h1>
          <p className="text-sm text-muted-foreground mb-8">Start planning in under a minute</p>

          <form action={action} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">First name</label>
                <input placeholder="John" type="text" name="firstName" required
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Last name</label>
                <input placeholder="Doe" type="text" name="lastName"  required
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="space-y-1.5">
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            placeholder="johndoe123"
            required
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <input type="email" placeholder="you@example.com" name="email"
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" name="password" required
                  className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 mt-2">
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground hover:text-primary transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}