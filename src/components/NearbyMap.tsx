import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { User, ROLE_LABELS } from '@/lib/types';
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
  popupAnchor: [1, -34],
});

const myIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface NearbyMapProps {
  users: User[];
  userLat: number;
  userLng: number;
  distances: { user: User; distance: number }[];
}

export default function NearbyMap({ users, userLat, userLng, distances }: NearbyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const distMap = new Map(distances.map((d) => [d.user.id, d.distance]));

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([userLat, userLng], 13);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // User location marker
    L.marker([userLat, userLng], { icon: myIcon })
      .addTo(map)
      .bindPopup('📍 आपकी लोकेशन');

    // Worker markers
    users.forEach((u) => {
      const dist = distMap.get(u.id)?.toFixed(1) ?? '?';
      const popup = `
        <div style="min-width:160px;font-size:13px;">
          <p style="font-weight:bold;margin:0 0 4px">${u.name}</p>
          <p style="margin:0;font-size:11px">${ROLE_LABELS[u.role]} • ${u.area}</p>
          <p style="margin:0;font-size:11px">${dist} km दूर</p>
          <div style="margin-top:8px;display:flex;gap:6px">
            <a href="/profile/${u.id}" style="font-size:11px;padding:3px 8px;background:#3b82f6;color:white;border-radius:4px;text-decoration:none">प्रोफ़ाइल</a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${u.lat},${u.lng}" target="_blank" rel="noopener noreferrer" style="font-size:11px;padding:3px 8px;background:#16a34a;color:white;border-radius:4px;text-decoration:none">रास्ता</a>
          </div>
        </div>
      `;
      L.marker([u.lat, u.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup(popup);
    });

    // Fix tile loading after container resize
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [users, userLat, userLng]);

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-card" style={{ height: '400px' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
