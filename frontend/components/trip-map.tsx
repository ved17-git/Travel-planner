"use client";
import dynamic from "next/dynamic";

// Dynamic import to prevent SSR issues with Leaflet
const LeafletMap = dynamic(() => import("./map-view"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted animate-pulse flex items-center justify-center text-xs text-muted-foreground">
      Loading Map...
    </div>
  )
});

interface Activity {
  name: string;
  latitude: number;
  longitude: number;
}

// Update this interface to match your TripDetail call
interface Props {
  activities: Activity[];
  destination?: string; // Adding destination here fixes the TS error
}

export default function TripMap({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="h-64 rounded-xl border border-border/60 bg-card flex items-center justify-center text-muted-foreground text-sm">
        No map data available
      </div>
    );
  }

  return (
    <div className="h-72 rounded-xl overflow-hidden border border-border/60 relative z-0">
      <LeafletMap activities={activities} />
    </div>
  );
}