"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {Logout} from '../app/(auth)/actions'
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/trips", label: "My Trips" },
];

export default function Nav() {
  const router=useRouter()
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [data, action, loading]=useActionState(Logout, null)

  useEffect(()=>{
   if(!data) return
   if(data.status==="error"){
    toast.error(data.msg)
   }else{
    toast.success(data.msg)
    router.push('/login')
   }

  },[data, router])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-5 h-0.5 bg-foreground rounded" />
              <span className="w-5 h-0.5 bg-foreground rounded" />
              <span className="w-5 h-0.5 bg-foreground rounded" />
            </button>

            <Link href="/dashboard" className="text-xl font-bold">
              Trao<span className="text-primary">.</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    pathname === href
                      ? "text-foreground font-medium bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <form action={action}>
<button
  type="submit"
  disabled={loading}
  className="inline-flex items-center gap-2 text-sm cursor-pointer font-medium border border-border px-3 py-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-60"
>
  {loading ? (
    <>
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin cursor-pointer" />
      Logging out...
    </>
  ) : (
    "Logout"
  )}
</button>
            </form>
            <Link href="/settings">
          <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 bg-background border-r border-border/40 p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold">
                Trao<span className="text-primary">.</span>
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  className={`px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    pathname === href
                      ? "text-foreground font-medium bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/planner"
                onClick={() => setDrawerOpen(false)}
                className="px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                + Plan a Trip
              </Link>
            </nav>

            {/* Bottom profile */}
            <div className="mt-auto border-t border-border/40 pt-6">
              <Link
                href="/settings"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}