import { useState } from 'react';
import { getUsers, saveUsers, getJobs } from '@/lib/store';
import { ROLE_LABELS } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { Users, Briefcase, ShieldCheck, XCircle, CheckCircle } from 'lucide-react';

export default function AdminPanel() {
  const [tab, setTab] = useState<'users' | 'jobs'>('users');
  const [users, setUsers] = useState(getUsers());
  const jobs = getJobs();

  const toggleApproval = (id: string) => {
    const updated = users.map((u) => u.id === id ? { ...u, isApproved: !u.isApproved } : u);
    setUsers(updated);
    saveUsers(updated);
  };

  const deleteUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    saveUsers(updated);
  };

  const stats = {
    total: users.length,
    approved: users.filter((u) => u.isApproved).length,
    pending: users.filter((u) => !u.isApproved).length,
    openJobs: jobs.filter((j) => j.status === 'open').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gradient-hero mb-6">🛡️ एडमिन पैनल</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'कुल उपयोगकर्ता', value: stats.total, icon: Users },
            { label: 'स्वीकृत', value: stats.approved, icon: CheckCircle },
            { label: 'लंबित', value: stats.pending, icon: ShieldCheck },
            { label: 'खुले काम', value: stats.openJobs, icon: Briefcase },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-xl p-4 shadow-card border border-border text-center">
              <s.icon size={20} className="mx-auto mb-1 text-primary" />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('users')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'users' ? 'gradient-hero text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            उपयोगकर्ता
          </button>
          <button onClick={() => setTab('jobs')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'jobs' ? 'gradient-hero text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            काम
          </button>
        </div>

        {tab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold text-foreground">नाम</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">भूमिका</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">क्षेत्र</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">रेटिंग</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">स्थिति</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-2 text-foreground">{u.name}</td>
                    <td className="py-3 px-2"><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{ROLE_LABELS[u.role]}</span></td>
                    <td className="py-3 px-2 text-muted-foreground">{u.area}</td>
                    <td className="py-3 px-2 text-muted-foreground">{u.averageRating.toFixed(1)}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs font-medium ${u.isApproved ? 'text-primary' : 'text-destructive'}`}>
                        {u.isApproved ? '✅ स्वीकृत' : '⏳ लंबित'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <button onClick={() => toggleApproval(u.id)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title={u.isApproved ? 'रोकें' : 'स्वीकार करें'}>
                          {u.isApproved ? <XCircle size={16} className="text-destructive" /> : <CheckCircle size={16} className="text-primary" />}
                        </button>
                        <button onClick={() => deleteUser(u.id)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-destructive" title="हटाएं">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'jobs' && (
          <div className="space-y-3">
            {jobs.map((j) => (
              <div key={j.id} className="bg-card rounded-xl p-4 shadow-card border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{ROLE_LABELS[j.roleRequired]}</span>
                    <p className="text-sm text-foreground mt-1">{j.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{j.postedByName} • {j.area}</p>
                  </div>
                  <span className={`text-xs font-medium ${j.status === 'open' ? 'text-primary' : 'text-muted-foreground'}`}>
                    {j.status === 'open' ? '🟢 खुला' : '✅ पूरा'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
