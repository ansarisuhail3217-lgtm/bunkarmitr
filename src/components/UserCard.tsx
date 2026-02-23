import { User, ROLE_LABELS } from '@/lib/types';
import StarRating from './StarRating';
import { MapPin, Clock, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserCard({ user, distance }: { user: User; distance?: number }) {
  return (
    <Link to={`/profile/${user.id}`} className="block bg-card rounded-xl p-4 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 border border-border">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary mt-0.5">
            {ROLE_LABELS[user.role]}
          </span>
          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><MapPin size={12} /> {user.area}{distance != null && ` • ${distance.toFixed(1)} km`}</div>
            <div className="flex items-center gap-1"><Clock size={12} /> {user.experience}</div>
            <div className="flex items-center gap-1">
              {user.availability ? <><Check size={12} className="text-green-600" /> उपलब्ध</> : <><X size={12} className="text-destructive" /> अनुपलब्ध</>}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={Math.round(user.averageRating)} readOnly size={14} />
            <span className="text-xs text-muted-foreground">({user.totalRatings})</span>
          </div>
        </div>
        {user.rate && (
          <span className="text-xs font-semibold text-accent whitespace-nowrap">{user.rate}</span>
        )}
      </div>
    </Link>
  );
}
