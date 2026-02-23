import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLE_LABELS, VARANASI_AREAS, UserRole, User } from '@/lib/types';
import { getUsers, saveUsers, setCurrentUser } from '@/lib/store';
import Navbar from '@/components/Navbar';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const roles = Object.entries(ROLE_LABELS) as [UserRole, string][];
const STEPS = ['भूमिका', 'व्यक्तिगत', 'काम विवरण', 'लोकेशन'];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', mobile: '', role: '' as UserRole, area: '', experience: '', serviceType: '', availability: true, rate: '',
  });

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  const update = (key: string, value: any) => setForm((p) => ({ ...p, [key]: value }));

  const getLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocating(false); },
      () => { setLocation({ lat: 25.3176, lng: 83.0068 }); setLocating(false); }
    );
  };

  const canNext = () => {
    if (step === 0) return !!form.role;
    if (step === 1) return form.name.length >= 2 && form.mobile.length >= 10;
    if (step === 2) return !!form.area;
    return true;
  };

  const submit = () => {
    const users = getUsers();
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: form.name,
      mobile: form.mobile,
      role: form.role,
      area: form.area,
      experience: form.experience || 'नया',
      serviceType: form.serviceType || 'साड़ी बुनाई',
      availability: form.availability,
      rate: form.rate || '',
      profileImage: '',
      lat: location?.lat || 25.3176,
      lng: location?.lng || 83.0068,
      averageRating: 0,
      totalRatings: 0,
      isApproved: true,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-lg bg-card rounded-2xl shadow-elevated border border-border p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center text-gradient-hero mb-2">नया पंजीकरण</h1>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i <= step ? 'gradient-hero text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>{i + 1}</div>
                {i < STEPS.length - 1 && <div className={`w-6 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mb-6">{STEPS[step]}</p>

          {/* Step 0: Role */}
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {roles.map(([key, label]) => (
                <button key={key} onClick={() => update('role', key)}
                  className={`p-4 rounded-xl text-sm font-medium border transition-all ${
                    form.role === key ? 'border-primary bg-primary/10 text-primary shadow-warm' : 'border-border bg-background text-foreground hover:border-primary/50'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Step 1: Personal */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">नाम *</label>
                <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="आपका पूरा नाम"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">मोबाइल नंबर *</label>
                <input type="tel" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} placeholder="10 अंक का मोबाइल नंबर"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
              </div>
            </div>
          )}

          {/* Step 2: Work */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">क्षेत्र (इलाका) *</label>
                <select value={form.area} onChange={(e) => update('area', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none">
                  <option value="">इलाका चुनें</option>
                  {VARANASI_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">अनुभव</label>
                <input value={form.experience} onChange={(e) => update('experience', e.target.value)} placeholder="जैसे: 5 साल"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">दर (रेट)</label>
                <input value={form.rate} onChange={(e) => update('rate', e.target.value)} placeholder="जैसे: ₹500/दिन"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">उपलब्धता:</label>
                <button onClick={() => update('availability', !form.availability)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    form.availability ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                  {form.availability ? 'उपलब्ध' : 'अनुपलब्ध'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">अपनी लोकेशन शेयर करें ताकि पास के लोग आपको ढूंढ सकें</p>
              <button onClick={getLocation} disabled={locating}
                className="inline-flex items-center gap-2 px-6 py-3 gradient-hero text-primary-foreground font-semibold rounded-xl shadow-warm hover:scale-105 transition-transform disabled:opacity-50">
                <MapPin size={18} /> {locating ? 'खोज रहे हैं...' : 'लोकेशन लें'}
              </button>
              {location && (
                <p className="text-sm text-primary font-medium">✓ लोकेशन मिल गई</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button onClick={() => setStep((p) => p - 1)} disabled={step === 0}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft size={16} /> पीछे
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((p) => p + 1)} disabled={!canNext()}
                className="flex items-center gap-1 px-6 py-2 gradient-hero text-primary-foreground text-sm font-semibold rounded-xl shadow-warm disabled:opacity-50 hover:scale-105 transition-transform">
                आगे <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={submit}
                className="px-6 py-2 gradient-hero text-primary-foreground text-sm font-semibold rounded-xl shadow-warm hover:scale-105 transition-transform">
                पंजीकरण करें
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
