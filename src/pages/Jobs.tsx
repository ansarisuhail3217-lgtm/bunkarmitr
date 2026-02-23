import { getJobs } from '@/lib/store';
import { ROLE_LABELS, URGENCY_LABELS } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JobsPage() {
  const jobs = getJobs().filter((j) => j.status === 'open');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gradient-hero">💼 काम ढूंढें</h1>
          <Link to="/post-job" className="px-4 py-2 gradient-hero text-primary-foreground text-sm font-semibold rounded-xl shadow-warm hover:scale-105 transition-transform">
            + काम दें
          </Link>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {ROLE_LABELS[job.roleRequired]} चाहिए
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      job.urgency === 'high' ? 'bg-destructive/10 text-destructive' : job.urgency === 'medium' ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'
                    }`}>{URGENCY_LABELS[job.urgency]}</span>
                  </div>
                  <p className="text-foreground">{job.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.area}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(job.createdAt).toLocaleDateString('hi-IN')}</span>
                    <Link to={`/profile/${job.postedBy}`} className="text-primary hover:underline">
                      {job.postedByName}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">कोई काम उपलब्ध नहीं है</p>
          </div>
        )}
      </div>
    </div>
  );
}
