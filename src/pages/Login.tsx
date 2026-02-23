import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { getUsers, setCurrentUser } from '@/lib/store';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find((u) => u.mobile === mobile);
    if (user) {
      setCurrentUser(user);
      toast.success('सफलतापूर्वक लॉगिन हो गया!');
      navigate(redirect || '/dashboard');
    } else {
      setError('यह मोबाइल नंबर पंजीकृत नहीं है');
      toast.error('कृपया सही मोबाइल नंबर डालें');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-elevated border border-border p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center text-gradient-hero mb-6">लॉगिन करें</h1>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">मोबाइल नंबर</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => { setMobile(e.target.value); setError(''); }}
                placeholder="जैसे: 9876543210"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" className="w-full py-3 gradient-hero text-primary-foreground font-semibold rounded-xl shadow-warm hover:scale-[1.02] transition-transform">
              लॉगिन करें
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            अकाउंट नहीं है?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">नया पंजीकरण करें</Link>
          </p>
          <div className="mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <p className="font-medium mb-1">डेमो लॉगिन:</p>
            <p>मोबाइल: 9876543210 (बानी)</p>
            <p>मोबाइल: 9876543212 (गिरस्ता)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
