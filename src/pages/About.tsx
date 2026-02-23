import Navbar from '@/components/Navbar';
import { Mail, MapPin, GraduationCap, Code, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Project */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated border border-border mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gradient-hero mb-4">🪡 SareeSetu के बारे में</h1>
          <p className="text-foreground leading-relaxed mb-4">
            SareeSetu एक <strong>Voice-First AI Job & Service Matching Web Application</strong> है जो वाराणसी की बनारसी साड़ी इंडस्ट्री के लिए डिज़ाइन की गई है।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {['GPS Matching – पास के कारीगर खोजें', 'Hindi Voice AI – हिंदी में बोलकर खोजें', 'Real-time Work Matching – तुरंत काम ढूंढें', 'Rating System – रेटिंग और रिव्यू दें'].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground bg-muted rounded-lg p-3">
                <span className="text-primary">✓</span> {f}
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-foreground mt-6 mb-2">समस्या</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            वाराणसी की साड़ी इंडस्ट्री में अलग-अलग roles के लोग एक दूसरे को आसानी से नहीं ढूंढ पाते। Real-time digital matching system नहीं है। Low-literacy workers complex apps use नहीं कर पाते।
          </p>

          <h2 className="text-lg font-bold text-foreground mt-6 mb-2">समाधान</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            एक simple voice-enabled platform जहाँ लोग हिंदी में बोलकर काम और सेवा search कर सकते हैं और अपनी income improve कर सकते हैं।
          </p>
        </div>

        {/* Founder */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated border border-border">
          <h2 className="text-xl font-bold text-gradient-hero mb-4">संस्थापक</h2>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
              म
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Mohammad Suhail</h3>
              <p className="text-sm text-primary font-medium flex items-center gap-1"><Code size={14} /> Web Developer</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin size={14} /> वाराणसी – 221001, भारत</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5"><Mail size={14} /> ansarisuhail3217@gmail.com</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <div className="flex items-start gap-2">
              <Heart size={14} className="text-primary mt-1 shrink-0" />
              <p><strong className="text-foreground">परिवार:</strong> पिता – Abdul Hakeem, माता – Amina</p>
            </div>
            <p>
              Main ek simple aur humble background se aata hoon aur mera strong belief hai ki education aur technology life ko change kar sakti hai.
            </p>
            <p>
              Main ek passionate Web Developer hoon jo practical aur meaningful web applications banana pasand karta hoon. Mera focus responsive aur user-friendly digital experiences create karne par hai jo real-world problems solve karein.
            </p>
            <p>
              Mujhe nayi technologies seekhna, apni skills improve karna aur aise projects par kaam karna pasand hai jo social aur economic impact create karein. Mera goal sirf development karna nahi, balki technology ke through positive change lana hai.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-muted">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2"><GraduationCap size={16} /> शिक्षा</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• High School & Intermediate – A.O. Muslim Inter College (2023)</li>
              <li>• Diploma in Computer Science – Government Polytechnic Unnao (Pursuing)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
