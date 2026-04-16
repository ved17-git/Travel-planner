"use client";
import { useState } from "react";

const INTERESTS = ["Food", "Culture", "Adventure", "Shopping", "Nature", "Nightlife", "History", "Art"] as const;
const BUDGET_OPTIONS = [
  { value: "Low", label: "Budget", active: "border-green-500/30 bg-green-500/5 text-green-400" },
  { value: "Medium", label: "Comfort", active: "border-amber-500/30 bg-amber-500/5 text-amber-400" },
  { value: "High", label: "Luxury", active: "border-purple-500/30 bg-purple-500/5 text-purple-400" },
] as const;

interface Trip {
  id: string;
  destination: string;
  numberOfDays: number;
  budget: "Low" | "Medium" | "High";
  interests: string[];
}

interface Props {
  trip: Trip;
  onClose: () => void;
  onSave: (updated: Trip) => void;
}

export default function EditTripModal({ trip, onClose, onSave }: Props) {
  const [destination, setDestination] = useState(trip.destination);
  const [days, setDays] = useState(String(trip.numberOfDays));
  const [budget, setBudget] = useState<"Low" | "Medium" | "High">(trip.budget);
  const [interests, setInterests] = useState<string[]>(trip.interests);
  const [saving, setSaving] = useState(false);

  const toggle = (i: string) =>
    setInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const handleSave = async () => {
    setSaving(true);
    // TODO: replace with real API call
    // await fetch(`/api/trips/${trip.id}`, { method: "PATCH", body: JSON.stringify({...}) })
    await new Promise((r) => setTimeout(r, 600));
    onSave({ ...trip, destination, numberOfDays: Number(days), budget, interests });
    setSaving(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <h2 className="font-bold text-lg">Edit Trip</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors text-lg">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Destination</label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Tokyo, Japan"
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Days */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Number of days</label>
            <input
              type="number"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget level</label>
            <div className="grid grid-cols-3 gap-2">
              {BUDGET_OPTIONS.map(({ value, label, active }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBudget(value)}
                  className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    budget === value ? active : "border-border/60 bg-background hover:border-border"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggle(interest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    interests.includes(interest)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 bg-background text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-border/40">
          <button
            onClick={onClose}
            className="flex-1 h-10 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {saving ? "Regenerating..." : "✦ Regenerate"}
          </button>
        </div>
      </div>
    </div>
  );
}
