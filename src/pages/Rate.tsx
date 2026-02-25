import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, fetchUserById, fetchRatingsByReceiver, createRating, updateUser } from '@/lib/store';
import StarRating from '@/components/StarRating';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { User } from '@/lib/types';

export default function RatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();

  const [receiver, setReceiver] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchUserById(id).then((u) => { setReceiver(u); setLoading(false); });
  }, [id]);

  if (!currentUser) {
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    return null;
  }

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">लोड हो रहा है...</div>
    </div>
  );

  if (!receiver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
          <p>उपयोगकर्ता नहीं मिला</p>
        </div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { toast.error('कृपया रेटिंग चुनें'); return; }
    setSubmitting(true);

    const newRating = await createRating({
      raterId: currentUser.id,
      raterName: currentUser.name,
      receiverId: receiver.id,
      jobId: '',
      ratingValue: rating,
      reviewText: review,
    });

    if (newRating) {
      // Recalculate average
      const allRatings = await fetchRatingsByReceiver(receiver.id);
      const avg = allRatings.reduce((s, r) => s + r.ratingValue, 0) / allRatings.length;
      await updateUser(receiver.id, {
        average_rating: Math.round(avg * 10) / 10,
        total_ratings: allRatings.length,
      });
      toast.success('रेटिंग सफलतापूर्वक सबमिट हो गई!');
      navigate(`/profile/${receiver.id}`);
    } else {
      toast.error('रेटिंग सबमिट करने में त्रुटि हुई');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-8 flex justify-center">
        <div className="w-full max-w-md">
          <BackButton />
          <div className="bg-card rounded-2xl shadow-elevated border border-border p-5 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-center text-gradient-hero mb-2">रेटिंग दें</h1>
          <p className="text-center text-sm text-muted-foreground mb-6">{receiver.name} को रेटिंग दें</p>
          <form onSubmit={submit} className="space-y-5">
            <div className="flex justify-center">
              <StarRating value={rating} onChange={setRating} size={32} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">रिव्यू (हिंदी में)</label>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} rows={4} placeholder="काम के बारे में अपना अनुभव बताएं..."
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none resize-none" />
            </div>
            <button type="submit" disabled={rating === 0 || submitting}
              className="w-full py-3 gradient-hero text-primary-foreground font-semibold rounded-xl shadow-warm hover:scale-[1.02] transition-transform disabled:opacity-50">
              {submitting ? 'सबमिट हो रहा...' : 'रेटिंग सबमिट करें'}
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
