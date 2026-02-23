import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '@/lib/store';
import { useState } from 'react';
import { Menu, X, LogOut, User, Home } from 'lucide-react';
import { toast } from 'sonner';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const logout = () => {
    setCurrentUser(null);
    toast.success('सफलतापूर्वक लॉगआउट हो गया');
    navigate('/');
    setOpen(false);
  };

  const links = [
    { to: '/', label: 'होम', icon: Home },
    { to: '/search', label: 'पास के लोग' },
    { to: '/jobs', label: 'काम ढूंढें' },
    ...(user ? [
      { to: '/post-job', label: 'काम दें' },
      { to: '/dashboard', label: 'डैशबोर्ड' },
      { to: `/profile/${user.id}`, label: 'प्रोफ़ाइल', icon: User },
    ] : []),
    { to: '/about', label: 'हमारे बारे में' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-gradient-hero text-xl">🪡</span>
          <span className="text-gradient-hero font-extrabold">SareeSetu</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={logout} className="ml-2 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors flex items-center gap-1">
              <LogOut size={14} /> लॉगआउट
            </button>
          ) : (
            <Link to="/login" className="ml-2 px-4 py-1.5 text-sm font-semibold gradient-hero text-primary-foreground rounded-lg shadow-warm transition-transform hover:scale-105">
              लॉगिन करें
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 space-y-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={logout} className="w-full text-left px-3 py-2 text-sm font-medium text-destructive">
              लॉगआउट
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-primary">
              लॉगिन करें
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
