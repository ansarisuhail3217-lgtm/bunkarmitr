import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, getJobs, saveJobs } from '@/lib/store';
import { ROLE_LABELS, UserRole, Job, RATE_RANGES } from '@/lib/types';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';

const roles = Object.entries(ROLE_LABELS) as [UserRole, string][];
const rateTypes = Object.entries(RATE_RANGES) as [string, { label: string; min: number; max: number }][];

export default function PostJob() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    roleRequired: '' as UserRole,
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    rateType: 'saree' as string,
    rateAmount: '' as string,
  });

  if (!user) {
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    return null;
  }

  if (user.role !== 'girasta') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-destructive font-semibold">⚠️ केवल गिरस्ता ही काम पोस्ट कर सकते हैं</p>
          <p className="text-sm text-muted-foreground mt-2">काम पोस्ट करने के लिए गिरस्ता के रूप में पंजीकरण करें</p>
        </div>
      </div>
    );
  }

  const selectedRate = RATE_RANGES[form.rateType];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(form.rateAmount);
    if (selectedRate && (amount < selectedRate.min || amount > selectedRate.max)) {
      toast.error(`${selectedRate.label} का रेट ₹${selectedRate.min}-₹${selectedRate.max} के बीच होना चाहिए`);
      return;
    }
    const jobs = getJobs();
    const newJob: Job = {
      id: `job_${Date.now()}`,
      postedBy: user.id,
      postedByName: user.name,
      roleRequired: form.roleRequired,
      description: form.description,
      urgency: form.urgency,
      area: user.area,
      status: 'open',
      rateType: form.rateType as any,
      rateAmount: amount || undefined,
      createdAt: new Date().toISOString(),
    };
    saveJobs([...jobs, newJob]);
    toast.success('काम सफलतापूर्वक पोस्ट किया गया!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-8 flex justify-center">
        <div className="w-full max-w-lg">
          <BackButton />
          <div className="bg-card rounded-2xl shadow-elevated border border-border p-5 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-center text-gradient-hero mb-6">काम दें</h1>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">किस भूमिका की जरूरत है? *</label>
              <select value={form.roleRequired} onChange={(e) => setForm((p) => ({ ...p, roleRequired: e.target.value as UserRole }))} required
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none">
                <option value="">भूमिका चुनें</option>
                {roles.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">काम का विवरण *</label>
              <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required rows={4} placeholder="काम के बारे में बताएं..."
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">रेट प्रकार</label>
              <div className="flex gap-2">
                {rateTypes.map(([key, { label, min, max }]) => (
                  <button key={key} type="button" onClick={() => setForm((p) => ({ ...p, rateType: key, rateAmount: '' }))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      form.rateType === key ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground hover:bg-muted'
                    }`}>
                    {label} (₹{min}-{max})
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">रेट (₹) *</label>
              <input type="number" value={form.rateAmount} onChange={(e) => setForm((p) => ({ ...p, rateAmount: e.target.value }))}
                placeholder={selectedRate ? `₹${selectedRate.min} - ₹${selectedRate.max}` : ''}
                min={selectedRate?.min} max={selectedRate?.max} required
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">तात्कालिकता</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((u) => (
                  <button key={u} type="button" onClick={() => setForm((p) => ({ ...p, urgency: u }))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      form.urgency === u
                        ? u === 'high' ? 'bg-destructive/15 text-destructive border border-destructive/30' : u === 'medium' ? 'bg-accent/20 text-accent-foreground border border-accent/30' : 'bg-muted text-foreground border border-border'
                        : 'bg-background text-muted-foreground border border-border hover:bg-muted'
                    }`}>
                    {u === 'low' ? 'सामान्य' : u === 'medium' ? 'जरूरी' : 'बहुत जरूरी'}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full py-3 gradient-hero text-primary-foreground font-semibold rounded-xl shadow-warm hover:scale-[1.02] transition-transform">
              काम पोस्ट करें
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
