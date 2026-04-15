"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useEffect } from "react";
import { loginUser } from "../actions";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [data, action, loading]=useActionState(loginUser, null)
  
  useEffect(()=>{
     if(!data) return
     if(data.status==="error"){
        toast.error(data.msg)
     }else{
      toast.success(data.msg)
      router.push('/dashboard')
     }
  },[data, router])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-card/50 border-r border-border/40 flex-col justify-between p-12">
        <Link href="/" className="text-xl font-bold">Trao<span className="text-primary">.</span></Link>
        <div className="space-y-6">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <h2 className="text-3xl font-bold leading-tight">Your trips,<br />beautifully planned.</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xs">
            Sign in to access your personalized travel itineraries and start planning your next adventure.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            {["A", "B", "C"].map((l) => (
              <div key={l} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary">{l}</div>
            ))}
          </div>
          <span>Join thousands of travelers</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden text-xl font-bold">Trao<span className="text-primary">.</span></Link>
          <h1 className="text-2xl font-bold mt-6 mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your account</p>

          <form action={action} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Dont have an account?{" "}
            <Link href="/register" className="font-medium text-foreground hover:text-primary transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}