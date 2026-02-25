import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchUserById, fetchRatingsByReceiver, getCurrentUser } from '@/lib/store';
import { ROLE_LABELS, User, Rating } from '@/lib/types';
import StarRating from '@/components/StarRating';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { MapPin, Clock, Phone, Check, X, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();
  const [user, setUser] = useState<User | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([fetchUserById(id), fetchRatingsByReceiver(id)]).then(([u, r]) => {
      setUser(u);
      setRatings(r);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">लोड हो रहा है...</div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
          <p className="text-lg">प्रोफ़ाइल नहीं मिली</p>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    if (!currentUser) {
      toast.error('कृपया पहले लॉगिन करें');
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    toast.success(`${user.name} का नंबर: ${user.mobile}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-2xl">
        <BackButton />
        {/* Profile Header */}
        <div className="bg-card rounded-2xl p-5 md:p-6 shadow-elevated border border-border mb-6">
          <div className="flex items-center gap-3 md:gap-4 mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-xl md:text-2xl shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">{user.name}</h1>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mt-1">
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><MapPin size={14} /> {user.area}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Clock size={14} /> {user.experience}</div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={14} />
              <button onClick={handleContact} className="text-primary hover:underline">नंबर देखें</button>
            </div>
            <div className="flex items-center gap-2">
              {user.availability ? <><Check size={14} className="text-primary" /> <span className="text-primary font-medium">उपलब्ध</span></> : <><X size={14} className="text-destructive" /> <span className="text-muted-foreground">अनुपलब्ध</span></>}
            </div>
          </div>

          {user.rate && <p className="mt-3 text-accent font-semibold">{user.rate}</p>}

          <div className="mt-4 flex items-center gap-2">
            <StarRating value={Math.round(user.averageRating)} readOnly size={18} />
            <span className="text-sm text-muted-foreground">{user.averageRating.toFixed(1)} ({user.totalRatings} रेटिंग)</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {currentUser && currentUser.id !== user.id && (
              <Link to={`/rate/${user.id}`} className="inline-flex items-center px-4 md:px-5 py-2 gradient-hero text-primary-foreground text-sm font-semibold rounded-xl shadow-warm hover:scale-105 transition-transform">
                रेटिंग दें
              </Link>
            )}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${user.lat},${user.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 md:px-5 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-xl hover:bg-primary/20 transition-colors"
            >
              <Navigation size={14} /> रास्ता देखें
            </a>
          </div>
        </div>

        {/* Reviews */}
        <h2 className="text-lg font-bold text-foreground mb-3">रिव्यू ({ratings.length})</h2>
        <div className="space-y-3">
          {ratings.map((r) => (
            <div key={r.id} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{r.raterName}</span>
                <StarRating value={r.ratingValue} readOnly size={14} />
              </div>
              <p className="text-sm text-muted-foreground">{r.reviewText}</p>
              <span className="text-xs text-muted-foreground/60 mt-1 block">{new Date(r.createdAt).toLocaleDateString('hi-IN')}</span>
            </div>
          ))}
          {ratings.length === 0 && <p className="text-sm text-muted-foreground">अभी कोई रिव्यू नहीं है</p>}
        </div>
      </div>
    </div>
  );
}
