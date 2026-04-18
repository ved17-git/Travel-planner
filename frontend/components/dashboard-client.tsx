"use client";
import Link from "next/link";
import Nav from "@/components/nav";


const budgetColors: Record<string, string> = {
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  High: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

interface Trip {
  _id: string;
  destination: string;
  numberOfDays: number;
  budget: "Low" | "Medium" | "High";
  interests: string[];
  createdAt: string;
  count?:number
}

interface User{
    id: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string
}


export default function DashboardPage({data, user}:{data:Trip[], user:User}) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const totalDaysPlanned = data.reduce((sum, trip) => sum + trip.numberOfDays, 0);
  const budgetBreakdown = { Low: 0, Medium: 0, High: 0 };
  data.forEach((trip) => {
    if (trip.budget) budgetBreakdown[trip.budget]++;
  });

  return (
    <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{greeting}</p>
            <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
          </div>
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            + Plan a Trip
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Trips</p>
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">✈</div>
            </div>
            <p className="text-2xl font-bold">{data.length}</p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Days Planned</p>
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">📅</div>
            </div>
            <p className="text-2xl font-bold">{totalDaysPlanned}</p>
          </div>

          <div className="col-span-2 lg:col-span-1 rounded-xl border border-border/60 bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Budget Spread</p>
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">↗</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["Low", "Medium", "High"] as const).map((level) => (
                <span
                  key={level}
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border ${budgetColors[level]}`}
                >
                  {level} <span className="font-bold">{budgetBreakdown[level]}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold">Recent Trips</h2>
            <Link href="/trips" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>

          <div className="space-y-3">
{data.length === 0 ? (
  <div className="p-6 rounded-xl border border-dashed border-border text-center">
    <p className="text-sm text-muted-foreground">
      No trips yet.
    </p>
    <Link
      href="/planner"
      className="inline-block mt-3 text-sm text-primary hover:underline"
    >
      Plan your first trip →
    </Link>
  </div>
) : (
  data.slice(0, 3).map((trip) => (
    <Link key={trip._id} href={`/trips/${trip._id}`}>
      <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-all cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            📍
          </div>
          <div>
            <p className="font-semibold text-sm">{trip.destination}</p>
            <p className="text-xs text-muted-foreground">
              {trip.numberOfDays} days · {trip.interests.join(", ")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs border px-2 py-0.5 rounded hidden sm:inline-flex ${budgetColors[trip.budget]}`}>
            {trip.budget}
          </span>
          <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">→</span>
        </div>
      </div>
    </Link>
  ))
)}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="mt-10">
          <h2 className="text-base font-semibold mb-5">Your Destinations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
{data.length === 0 ? (
  <div className="col-span-full p-6 rounded-xl border border-dashed border-border text-center">
    <p className="text-sm text-muted-foreground">
      No destinations yet.
    </p>
  </div>
) : (
  data.slice(0, 10).map(({ destination, count }) => (
    <div
      key={destination}
      className="rounded-xl border border-border/60 bg-card p-4 text-center"
    >
      <div className="text-2xl mb-2">📍</div>
      <p className="font-semibold text-sm truncate">{destination}</p>
      <p className="text-xs text-muted-foreground">
        {count} {count === 1 ? "trip" : "trips"}
      </p>
    </div>
  ))
)}
          </div>
        </div>
      </main>
    </div>
  );
}