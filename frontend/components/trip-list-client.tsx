"use client";
import { startTransition, useState } from "react";
import Link from "next/link";
import Nav from "./nav";
import { deleteTrip } from "@/app/trips/action";
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type Trip = {
  _id: string;
  destination: string;
  numberOfDays: number;
  budget: "Low" | "Medium" | "High";
  interests: string[];
};

const budgetColors: Record<string, string> = {
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  High: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function TripsList({data}:{data:Trip[]}) {

  const trips = data;
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = trips.filter((t) =>
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  const router=useRouter()

  const [deleteState, deleteAction, deleting] = useActionState(deleteTrip, null);
  useEffect(() => {
  if (!deleteState) return;

  if (deleteState.status === "error") {
    toast.error(deleteState.msg);
  } else {
    toast.success(deleteState.msg);
    //beacause state updates, and immediate router refresh(cause re render), all inside same use effect
    startTransition(()=>{
     setConfirmDelete(null);
    })
    router.refresh()
  }
}, [deleteState, router]);

  return (
    <div className="min-h-screen bg-background">
      <Nav/>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Trips</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {trips.length} {trips.length === 1 ? "trip" : "trips"} planned
            </p>
          </div>
          <Link href="/planner" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            + Plan a Trip
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
          <input
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 p-16 text-center">
            <p className="text-4xl mb-4">🗺</p>
            <h3 className="font-semibold text-base mb-2">No trips found</h3>
            <p className="text-sm text-muted-foreground mb-6">Try a different search or plan something new.</p>
            <Link href="/planner" className="inline-flex bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
              Plan a Trip
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((trip) => (
              <div
                key={trip._id}
                className="group flex items-center justify-between p-5 rounded-xl border border-border/60 bg-card hover:border-primary/20 transition-all"
              >
                <Link href={`/trips/${trip._id}`} className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                    📍
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-base truncate">{trip.destination}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">📅 {trip.numberOfDays} days</span>
                      <span className="text-xs text-muted-foreground hidden sm:block">
                    {trip.interests.length > 0 && (
                    <span className="text-xs text-muted-foreground hidden sm:block">
                        · {trip.interests.join(", ")}
                    </span>
                            )}
                    </span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <span className={`text-xs border px-2 py-0.5 rounded hidden sm:inline-flex ${budgetColors[trip.budget]}`}>
                    {trip.budget}
                  </span>
                  <button
                    onClick={() => setConfirmDelete(trip._id)}
                    className="h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all rounded"
                  >
                    🗑
                  </button>
                  <Link href={`/trips/${trip._id}`} className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                    →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-base mb-2">Delete this trip?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your {trips.find((t) => t._id === confirmDelete)?.destination} itinerary will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button" onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
        <form action={deleteAction}>
          <input type="hidden" name="tripId" value={confirmDelete} />

          <button
            type="submit"
            disabled={deleting}
            className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {deleting ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}