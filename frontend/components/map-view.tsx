"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- FIX FOR TILES & ICONS ---
// This fixes the issue where marker icons don't show up in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Activity {
  name: string;
  latitude: number;
  longitude: number;
}

// Helper component to update map center when activities change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapView({ activities }: { activities: Activity[] }) {
  // Default to first activity or a fallback (0,0)
  const firstCoords: [number, number] = activities.length > 0 
    ? [activities[0].latitude, activities[0].longitude] 
    : [0, 0];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={firstCoords}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {activities.map((activity, idx) => (
          <Marker 
            key={`${activity.name}-${idx}`} 
            position={[activity.latitude, activity.longitude]}
            icon={icon}
          >
            <Popup className="font-sans">
              <span className="font-semibold">{activity.name}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeView center={firstCoords} />
      </MapContainer>
    </div>
  );
}