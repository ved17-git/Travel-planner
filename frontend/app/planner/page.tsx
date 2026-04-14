"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const INTERESTS = ["Food", "Culture", "Adventure", "Shopping", "Nature", "Nightlife", "History", "Art"] as const;

const BUDGET_OPTIONS = [
  { value: "Low", label: "Budget", desc: "Hostels, street food, free attractions", active: "border-green-500/30 bg-green-500/5 text-green-400" },
  { value: "Medium", label: "Comfort", desc: "3-star hotels, restaurants, paid sites", active: "border-amber-500/30 bg-amber-500/5 text-amber-400" },
  { value: "High", label: "Luxury", desc: "5-star hotels, fine dining, premium tours", active: "border-purple-500/30 bg-purple-500/5 text-purple-400" },
] as const;

export default function Planner() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState<"Low" | "Medium" | "High">("Medium");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = (i: string) =>
    setInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/trips/1");
  };

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
              <Link href="/dashboard" className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Dashboard</Link>
              <Link href="/trips" className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">My Trips</Link>
            </nav>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">JD</div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">✦</div>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">AI Planner</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Plan your trip</h1>
          <p className="text-muted-foreground">Tell us where youre headed and well generate a complete, personalized itinerary.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <span className="text-primary">📍</span> Where are you going?
            </label>
            <input
              placeholder="e.g. Tokyo, Japan"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <span className="text-primary">📅</span> How many days?
            </label>
            <input
              type="number"
              min={1}
              max={30}
              placeholder="e.g. 7"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground">Between 1 and 30 days</p>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <span className="text-primary">$</span> Budget level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {BUDGET_OPTIONS.map(({ value, label, desc, active }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBudget(value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    budget === value ? active : "border-border/60 bg-card hover:border-border"
                  }`}
                >
                  <p className="font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-xs text-muted-foreground leading-tight hidden sm:block">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <label className="text-sm font-medium">What are your interests?</label>
            <p className="text-xs text-muted-foreground -mt-1">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggle(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    interests.includes(interest)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Generating your itinerary...
                </>
              ) : (
                "✦ Generate Itinerary"
              )}
            </button>
            {loading && (
              <p className="text-center text-xs text-muted-foreground mt-3">
                Our AI is crafting your personalized day-by-day plan
              </p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}