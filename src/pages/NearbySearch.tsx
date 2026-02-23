import { useState, useMemo } from 'react';
import { getUsers, getCurrentUser, getDistance } from '@/lib/store';
import { ROLE_LABELS, UserRole } from '@/lib/types';
import UserCard from '@/components/UserCard';
import VoiceButton from '@/components/VoiceButton';
import Navbar from '@/components/Navbar';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const roles = Object.entries(ROLE_LABELS) as [UserRole, string][];
const distances = [2, 5, 10, 50];

export default function NearbySearch() {
  const [params] = useSearchParams();
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>(params.get('role') as UserRole || '');
  const [distFilter, setDistFilter] = useState(10);
  const [textSearch, setTextSearch] = useState('');
  const currentUser = getCurrentUser();
  const userLat = currentUser?.lat || 25.3176;
  const userLng = currentUser?.lng || 83.0068;

  const users = getUsers();

  const filtered = useMemo(() => {
    return users
      .filter((u) => u.isApproved)
      .filter((u) => !roleFilter || u.role === roleFilter)
      .filter((u) => !textSearch || u.name.includes(textSearch) || ROLE_LABELS[u.role].includes(textSearch) || u.area.includes(textSearch))
      .map((u) => ({ user: u, distance: getDistance(userLat, userLng, u.lat, u.lng) }))
      .filter((d) => d.distance <= distFilter)
      .sort((a, b) => a.distance - b.distance);
  }, [users, roleFilter, distFilter, textSearch, userLat, userLng]);

  const handleVoice = (text: string) => {
    setTextSearch(text);
    // auto-detect role from voice
    for (const [key, label] of roles) {
      if (text.includes(label) || text.toLowerCase().includes(key)) {
        setRoleFilter(key);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gradient-hero mb-6">🔍 पास के लोग</h1>

        {/* Search bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              placeholder="नाम, भूमिका या इलाका खोजें..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none text-sm"
            />
          </div>
          <VoiceButton onResult={handleVoice} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none">
            <option value="">सभी भूमिकाएँ</option>
            {roles.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <div className="flex gap-1">
            {distances.map((d) => (
              <button key={d} onClick={() => setDistFilter(d)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  distFilter === d ? 'gradient-hero text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}>
                {d} km
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} लोग मिले</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(({ user, distance }) => (
            <UserCard key={user.id} user={user} distance={distance} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">कोई व्यक्ति नहीं मिला</p>
            <p className="text-sm mt-1">दूरी बढ़ाएँ या फ़िल्टर बदलें</p>
          </div>
        )}
      </div>
    </div>
  );
}
