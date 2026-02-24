import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, MapPin, Search, Star, Users, Briefcase } from 'lucide-react';
import { ROLE_LABELS, UserRole } from '@/lib/types';
import heroBanner from '@/assets/hero-banner.jpg';
import Navbar from '@/components/Navbar';
import SareemitraLogo from '@/components/SareemitraLogo';

const features = [
  { icon: Mic, title: 'हिंदी वॉइस सर्च', desc: 'हिंदी में बोलकर काम और सेवा खोजें' },
  { icon: MapPin, title: 'पास के लोग', desc: 'GPS से अपने पास के कारीगर और सेवा प्रदाता खोजें' },
  { icon: Briefcase, title: 'काम पोस्ट करें', desc: 'अपनी ज़रूरत पोस्ट करें और सही लोगों को ढूंढें' },
  { icon: Star, title: 'रेटिंग और रिव्यू', desc: 'काम पूरा होने के बाद रेटिंग और रिव्यू दें' },
];

const roles = Object.entries(ROLE_LABELS) as [UserRole, string][];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="बनारसी साड़ी" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-2xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
              <span className="text-accent">Sareemitra</span>
              <br />
              <span className="text-xl md:text-3xl font-semibold opacity-90">वॉइस-फर्स्ट साड़ी इंडस्ट्री नेटवर्क</span>
            </h1>
            <p className="mt-4 text-primary-foreground/80 text-sm md:text-lg max-w-lg">
              वाराणसी की बनारसी साड़ी इंडस्ट्री के लिए एक डिजिटल प्लेटफ़ॉर्म। हिंदी में बोलकर काम खोजें, पास के कारीगरों से जुड़ें।
            </p>
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 gradient-hero text-primary-foreground font-semibold rounded-xl shadow-warm hover:scale-105 transition-transform text-sm md:text-base">
                नया पंजीकरण
              </Link>
              <Link to="/search" className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-primary-foreground/10 backdrop-blur text-primary-foreground font-semibold rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors text-sm md:text-base">
                <Search size={18} /> काम ढूंढें
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-10">
          <span className="text-gradient-hero">हमारी सुविधाएँ</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card p-4 md:p-6 rounded-xl shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg gradient-hero flex items-center justify-center mb-2 md:mb-3">
                <f.icon size={18} className="text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">{f.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="bg-card border-y border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
            <span className="text-gradient-hero">सभी भूमिकाएँ</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {roles.map(([key, label]) => (
              <Link
                key={key}
                to={`/search?role=${key}`}
                className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-primary/10 text-primary font-medium text-xs md:text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-3">अभी जुड़ें Sareemitra से</h2>
        <p className="text-muted-foreground mb-6 text-sm md:text-base">वाराणसी की साड़ी इंडस्ट्री को डिजिटल बनाएँ</p>
        <Link to="/register" className="inline-flex px-8 py-3 gradient-hero text-primary-foreground font-semibold rounded-xl shadow-warm hover:scale-105 transition-transform">
          नया पंजीकरण करें
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center text-sm space-y-2">
          <SareemitraLogo size={24} />
          <p>वाराणसी – 221001, भारत</p>
          <p className="text-secondary-foreground/70">© 2026 Sareemitra. सर्वाधिकार सुरक्षित।</p>
          <Link to="/about" className="text-accent hover:underline">हमारे बारे में</Link>
        </div>
      </footer>
    </div>
  );
}
