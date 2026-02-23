import { getCurrentUser, getJobs, getUsers } from '@/lib/store';
import { ROLE_LABELS, URGENCY_LABELS } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Users, Star, Plus, MapPin, Clock } from 'lucide-react';

export default function Dashboard() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const allJobs = getJobs();
  const openJobs = allJobs.filter((j) => j.status === 'open' && j.roleRequired === user.role);
  const myJobs = allJobs.filter((j) => j.postedBy === user.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-2xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">नमस्ते, {user.name}!</h1>
              <p className="text-sm text-muted-foreground">
                <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{ROLE_LABELS[user.role]}</span>
                <span className="ml-2">{user.area}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { to: '/search', icon: Users, label: 'पास के लोग', color: 'gradient-hero' },
            { to: '/jobs', icon: Briefcase, label: 'काम ढूंढें', color: 'gradient-gold' },
            { to: '/post-job', icon: Plus, label: 'काम दें', color: 'gradient-hero' },
            { to: `/profile/${user.id}`, icon: Star, label: 'प्रोफ़ाइल', color: 'gradient-gold' },
          ].map((a) => (
            <Link key={a.to} to={a.to} className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-elevated hover:-translate-y-0.5 transition-all text-center">
              <div className={`w-10 h-10 rounded-lg ${a.color} flex items-center justify-center mx-auto mb-2`}>
                <a.icon size={20} className="text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{a.label}</span>
            </Link>
          ))}
        </div>

        {/* Relevant Jobs */}
        <h2 className="text-lg font-bold text-foreground mb-3">
          आपके लिए काम ({openJobs.length})
        </h2>
        <div className="space-y-3 mb-8">
          {openJobs.slice(0, 5).map((job) => (
            <div key={job.id} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    job.urgency === 'high' ? 'bg-destructive/10 text-destructive' : job.urgency === 'medium' ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'
                  }`}>{URGENCY_LABELS[job.urgency]}</span>
                  <p className="text-sm text-foreground mt-2">{job.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.area}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(job.createdAt).toLocaleDateString('hi-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {openJobs.length === 0 && <p className="text-sm text-muted-foreground">अभी आपकी भूमिका के लिए कोई काम उपलब्ध नहीं है</p>}
        </div>

        {/* My posted jobs */}
        {myJobs.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-foreground mb-3">मेरे पोस्ट किए काम ({myJobs.length})</h2>
            <div className="space-y-3">
              {myJobs.map((job) => (
                <div key={job.id} className="bg-card rounded-xl p-4 shadow-card border border-border flex justify-between items-center">
                  <div>
                    <p className="text-sm text-foreground">{job.description}</p>
                    <span className={`text-xs font-medium ${job.status === 'open' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {job.status === 'open' ? '🟢 खुला' : '✅ पूरा'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
