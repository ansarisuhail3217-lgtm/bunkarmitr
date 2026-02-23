import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { User, ROLE_LABELS } from '@/lib/types';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const myIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], 13); }, [lat, lng, map]);
  return null;
}

interface NearbyMapProps {
  users: User[];
  userLat: number;
  userLng: number;
  distances: { user: User; distance: number }[];
}

export default function NearbyMap({ users, userLat, userLng, distances }: NearbyMapProps) {
  const distMap = new Map(distances.map((d) => [d.user.id, d.distance]));

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-card" style={{ height: '400px' }}>
      <MapContainer center={[userLat, userLng]} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap lat={userLat} lng={userLng} />
        
        {/* User's location */}
        <Marker position={[userLat, userLng]} icon={myIcon}>
          <Popup>📍 आपकी लोकेशन</Popup>
        </Marker>

        {/* Workers */}
        {users.map((u) => (
          <Marker key={u.id} position={[u.lat, u.lng]} icon={userIcon}>
            <Popup>
              <div className="text-sm min-w-[160px]">
                <p className="font-bold">{u.name}</p>
                <p className="text-xs">{ROLE_LABELS[u.role]} • {u.area}</p>
                <p className="text-xs">{distMap.get(u.id)?.toFixed(1)} km दूर</p>
                <div className="flex gap-2 mt-2">
                  <Link to={`/profile/${u.id}`} className="text-xs px-2 py-1 bg-blue-500 text-white rounded">प्रोफ़ाइल</Link>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${u.lat},${u.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 bg-green-600 text-white rounded"
                  >
                    रास्ता
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
