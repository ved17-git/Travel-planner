"use client";
import { useState } from "react";
import Link from "next/link";
import EditTripModal from "@/components/edit-trip-modal";
import dynamic from "next/dynamic";

const TripMap = dynamic(() => import("@/components/trip-map"), { ssr: false });

const mockTrip = {
  id: "1",
  destination: "Tokyo, Japan",
  numberOfDays: 7,
  budget: "Medium",
  interests: ["Food", "Culture"],
  budgetEstimate: {
    flights: 900,
    accommodation: 700,
    food: 400,
    activities: 300,
    total: 2300,
  },
  hotelSuggestions: [
    { name: "Shinjuku Granbell Hotel", type: "Boutique · 4-star" },
    { name: "Citadines Central Shinjuku", type: "Serviced Apartment · 3-star" },
    { name: "The Millennials Shibuya", type: "Pod Hotel · Budget" },
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival & Shinjuku Exploration",
      activities: [
        { name: "Check in to hotel", latitude: 35.6938, longitude: 139.7034 },
        { name: "Explore Shinjuku Gyoen", latitude: 35.6852, longitude: 139.7100 },
        { name: "Dinner at Omoide Yokocho", latitude: 35.6934, longitude: 139.7003 },
      ],
    },
    {
      day: 2,
      title: "Historic Tokyo",
      activities: [
        { name: "Senso-ji Temple in Asakusa", latitude: 35.7148, longitude: 139.7967 },
        { name: "Tokyo Skytree observation deck", latitude: 35.7101, longitude: 139.8107 },
        { name: "Akihabara electronics & anime district", latitude: 35.7023, longitude: 139.7745 },
      ],
    },
    {
      day: 3,
      title: "Modern Culture Day",
      activities: [
        { name: "Teamlab Borderless", latitude: 35.6197, longitude: 139.7754 },
        { name: "Harajuku & Takeshita Street", latitude: 35.6702, longitude: 139.7027 },
        { name: "Shibuya Crossing at night", latitude: 35.6595, longitude: 139.7005 },
      ],
    },
    {
      day: 4,
      title: "Day Trip to Nikko",
      activities: [
        { name: "Tosho-gu Shrine complex", latitude: 36.7584, longitude: 139.5993 },
        { name: "Kegon Falls", latitude: 36.7576, longitude: 139.5011 },
        { name: "Nikko National Park hike", latitude: 36.7500, longitude: 139.5000 },
      ],
    },
    {
      day: 5,
      title: "Food & Markets",
      activities: [
        { name: "Tsukiji Outer Market breakfast", latitude: 35.6654, longitude: 139.7707 },
        { name: "Sushi making class", latitude: 35.6694, longitude: 139.7651 },
        { name: "Depachika underground food halls", latitude: 35.6812, longitude: 139.7671 },
      ],
    },
    {
      day: 6,
      title: "Ginza & Roppongi",
      activities: [
        { name: "Ginza luxury shopping district", latitude: 35.6717, longitude: 139.7650 },
        { name: "Mori Art Museum", latitude: 35.6604, longitude: 139.7292 },
        { name: "Tokyo Tower night views", latitude: 35.6586, longitude: 139.7454 },
      ],
    },
    {
      day: 7,
      title: "Departure Day",
      activities: [
        { name: "Last ramen breakfast in Shinjuku", latitude: 35.6896, longitude: 139.7006 },
        { name: "Souvenir shopping", latitude: 35.6897, longitude: 139.7000 },
        { name: "Depart from Narita Airport", latitude: 35.7720, longitude: 140.3929 },
      ],
    },
  ],
};

const budgetColors: Record<string, string> = {
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  High: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

type Trip = typeof mockTrip;

export default function TripDetail({ params }: { params: { id: string } }) {
  const [trip, setTrip] = useState<Trip>(mockTrip); // TODO: fetch by params.id
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { budgetEstimate: budget, hotelSuggestions: hotels, itinerary } = trip;

  const handleRegenerate = async () => {
    setRegenerating(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setRegenerating(false);
  };

  // Gather all activities with coordinates for the map
  const mapActivities = itinerary
    .flatMap((day) => day.activities)
    .filter((a) => a.latitude && a.longitude) as {
      name: string;
      latitude: number;
      longitude: number;
    }[];

  // Active day activities for map (show only active day, else all)
  const visibleMapActivities =
    activeDay !== null
      ? (itinerary
          .find((d) => d.day === activeDay)
          ?.activities.filter((a) => a.latitude && a.longitude) ?? []) as {
          name: string;
          latitude: number;
          longitude: number;
        }[]
      : mapActivities;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-xl font-bold">
              Trao<span className="text-primary">.</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/dashboard" className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                Dashboard
              </Link>
              <Link href="/trips" className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                My Trips
              </Link>
            </nav>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            JD
          </div>
        </div>
      </header>

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
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                ✎ Edit
              </button>
              <button
                onClick={handleRegenerate}
                disabled={regenerating}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors disabled:opacity-60"
              >
                {regenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  "✦ Regenerate"
                )}
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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">D{day.day}</span>
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
                        <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
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