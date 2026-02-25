import { useState, useEffect } from 'react';
import { fetchJobs, getCurrentUser } from '@/lib/store';
import { ROLE_LABELS, URGENCY_LABELS, RATE_RANGES, Job } from '@/lib/types';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { MapPin, Clock } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchJobs().then((all) => {
      setJobs(all.filter((j) => j.status === 'open'));
      setLoading(false);
    });
  }, []);

  const handleApply = (jobId: string, roleRequired: string) => {
    if (!currentUser) {
      toast.error('कृपया पहले लॉगिन करें');
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (currentUser.role === 'girasta') {
      toast.error('गिरस्ता काम के लिए आवेदन नहीं कर सकते। आप केवल काम पोस्ट कर सकते हैं।');
      return;
    }
    if (currentUser.role !== roleRequired) {
      toast.error(`इस काम के लिए "${ROLE_LABELS[roleRequired as keyof typeof ROLE_LABELS]}" की भूमिका चाहिए। कृपया सही भूमिका से लॉगिन करें।`);
      return;
    }
    toast.success('आपने सफलतापूर्वक आवेदन किया!');
  };

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">लोड हो रहा है...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4 md:py-6">
        <BackButton />
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gradient-hero">💼 काम ढूंढें</h1>
          {currentUser?.role === 'girasta' && (
            <Link to="/post-job" className="px-3 md:px-4 py-2 gradient-hero text-primary-foreground text-xs md:text-sm font-semibold rounded-xl shadow-warm hover:scale-105 transition-transform">
              + काम दें
            </Link>
          )}
        </div>

        <div className="space-y-3 md:space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-card rounded-xl p-4 md:p-5 shadow-card border border-border hover:shadow-elevated transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {ROLE_LABELS[job.roleRequired]} चाहिए
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      job.urgency === 'high' ? 'bg-destructive/10 text-destructive' : job.urgency === 'medium' ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'
                    }`}>{URGENCY_LABELS[job.urgency]}</span>
                    {job.rateType && job.rateAmount && (
                      <span className="text-xs font-medium text-accent">
                        {RATE_RANGES[job.rateType]?.label}: ₹{job.rateAmount}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground text-sm md:text-base">{job.description}</p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-muted-foreground mt-3">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.area}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(job.createdAt).toLocaleDateString('hi-IN')}</span>
                    <Link to={`/profile/${job.postedBy}`} className="text-primary hover:underline">
                      {job.postedByName}
                    </Link>
                  </div>
                </div>
              {(!currentUser || currentUser.role !== 'girasta') && (
                <button
                  onClick={() => handleApply(job.id, job.roleRequired)}
                  className="shrink-0 px-3 py-1.5 gradient-hero text-primary-foreground text-xs font-semibold rounded-lg shadow-warm hover:scale-105 transition-transform"
                >
                  आवेदन
                </button>
              )}
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
