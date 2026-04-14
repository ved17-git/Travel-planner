"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Activity {
  name: string;
  latitude: number;
  longitude: number;
}

interface Props {
  activities: Activity[];
  destination: string;
}

function FitBounds({ activities }: { activities: Activity[] }) {
  const map = useMap();
  useEffect(() => {
    if (activities.length === 0) return;
    const bounds = L.latLngBounds(activities.map((a) => [a.latitude, a.longitude]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [activities, map]);
  return null;
}

export default function TripMap({ activities, destination }: Props) {
  if (activities.length === 0) {
    return (
      <div className="h-64 rounded-xl border border-border/60 bg-card flex items-center justify-center text-muted-foreground text-sm">
        No map data available
      </div>
    );
  }

  const center: [number, number] = [activities[0].latitude, activities[0].longitude];

  return (
    <div className="h-72 rounded-xl overflow-hidden border border-border/60">
      <MapContainer center={center} zoom={13} className="h-full w-full" zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds activities={activities} />
        {activities.map((activity, idx) => (
          <Marker key={idx} position={[activity.latitude, activity.longitude]}>
            <Popup>
              <div className="text-sm font-medium">{activity.name}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}