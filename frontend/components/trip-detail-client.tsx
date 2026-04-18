"use client";
import { useState } from "react";
import Link from "next/link";
import EditTripModal from "@/components/edit-trip-modal";
import dynamic from "next/dynamic";

const TripMap = dynamic(() => import("@/components/trip-map"), { ssr: false });

type Activity = {
  _id?: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

type DayItinerary = {
  _id?: string;
  day: number;
  title: string;
  activities: Activity[];
};

type Hotel = {
  _id?: string;
  name: string;
  type: string;
  location: {
    lat: number;
    lng: number;
  };
};

type BudgetEstimate = {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  total: number;
};

export type Trip = {
  _id: string;
  destination: string;
  numberOfDays: number;
  budget: "Low" | "Medium" | "High";
  interests: string[];
  budgetEstimate: BudgetEstimate;
  hotelSuggestions: Hotel[];
  itinerary: DayItinerary[];
  createdAt?: string;
  updatedAt?: string;
};

const budgetColors: Record<string, string> = {
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  High: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};


export default function TripDetail({data}:{data:Trip}) {
     
  const [trip, setTrip] = useState<Trip>(data); // TODO: fetch by params.id
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const { budgetEstimate: budget, hotelSuggestions: hotels, itinerary } = trip;



  // Gather all activities with coordinates for the map
const mapActivities = itinerary
  .flatMap((day) =>
    day.activities.map((a) => ({
      name: a.name,
      latitude: a.location.lat,
      longitude: a.location.lng,
    }))
  )
  .filter((a) => a.latitude && a.longitude);

  // Active day activities for map (show only active day, else all)
const visibleMapActivities =
  activeDay !== null
    ? itinerary
        .find((d) => d.day === activeDay)
        ?.activities.map((a) => ({
          name: a.name,
          latitude: a.location.lat,
          longitude: a.location.lng,
        }))
        .filter((a) => a.latitude && a.longitude) ?? []
    : mapActivities;

  return (
    <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          href="/trips"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to Trips
        </Link>

        {/* Hero card */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary text-sm">📍</span>
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Destination</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-3">{trip.destination}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  📅 {trip.numberOfDays} {trip.numberOfDays === 1 ? "day" : "days"}
                </span>
                <span className={`text-xs border px-2 py-0.5 rounded ${budgetColors[trip.budget]}`}>
                  {trip.budget} budget
                </span>
                {trip.interests.map((interest) => (
                  <span key={interest} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                ✎ Edit
              </button>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Itinerary + Map */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-base font-semibold mb-4">Day-by-Day Itinerary</h2>

            {itinerary.map((day) => (
              <div
                key={day.day}
                className={`rounded-xl border transition-all cursor-pointer ${
                  activeDay === day.day
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-card hover:border-border"
                }`}
                onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">Day {day.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{day.title}</p>
                    <p className="text-xs text-muted-foreground">{day.activities.length} activities</p>
                  </div>
                  <span className="text-muted-foreground text-xs pr-1">
                    {activeDay === day.day ? "▲" : "▼"}
                  </span>
                </div>

                {activeDay === day.day && (
                  <div className="px-4 pb-4 space-y-2 border-t border-border/40 pt-3">
                    {day.activities.map((act, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        <p className="text-sm">{act.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Map */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold">Activity Map</h2>
                {activeDay !== null && (
                  <button
                    onClick={() => setActiveDay(null)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Show all days
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {activeDay !== null
                  ? `Showing Day ${activeDay} — click another day or "Show all days" to reset`
                  : "Click a day above to filter the map"}
              </p>
                <TripMap
                  activities={visibleMapActivities}
                  destination={trip.destination}
                />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Budget Estimate */}
            <div className="rounded-xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary font-bold">$</span>
                <h3 className="font-semibold text-sm">Budget Estimate</h3>
              </div>
              <div className="space-y-3 mb-4">
                {(["flights", "accommodation", "food", "activities"] as const).map((key) => {
                  const val = budget[key];
                  const pct = Math.round((val / budget.total) * 100);
                  return (
                    <div key={key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-semibold">${val.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border/40 pt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Total</span>
                <span className="text-xl font-bold text-primary">${budget.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Hotel Suggestions */}
            <div className="rounded-xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary">⌂</span>
                <h3 className="font-semibold text-sm">Hotel Suggestions</h3>
              </div>
              <div className="space-y-3">
                {hotels.map((hotel, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-border/40 bg-background/50">
                    <p className="font-medium text-sm">{hotel.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{hotel.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit modal — rendered at root level, outside the layout grid */}
      {editOpen && (
        <EditTripModal
          trip={trip}
          onClose={() => setEditOpen(false)}
          onSave={(updated) => {
            setTrip((prev) => ({ ...prev, ...updated }));
            setEditOpen(false);
          }}
        />
      )}
    </div>
  );
}