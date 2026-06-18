import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import GraduationGallery from './components/GraduationGallery';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import DonationModal from './components/DonationModal';
import { SchoolNeeds } from './components/SchoolNeeds';
import { SocialMediaPanel } from './components/SocialMediaPanel';
import { SuccessStories } from './components/SuccessStories';

import VolunteerApplication from './components/VolunteerApplication';

import { ImpactChart } from './components/ImpactChart';
import { ImpactHighlights } from './components/ImpactHighlights';
import { NewsletterForm } from './components/NewsletterForm';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { 
  initialGalleryItems, initialDonations, initialMessages, 
  initialAnnouncements, FOUNDATION_INFO, initialVolunteers
} from './data';

import { GalleryItem, Donation, ContactMessage, Announcement, Volunteer } from './types';
import { Heart, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'HOME' | 'ABOUT' | 'GALLERY' | 'NEEDS' | 'CONTACT' | 'VOLUNTEER' | 'ADMIN'>('HOME');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ha'>('en');

  // Apply dark class to HTML root
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const toggleLanguage = () => setLanguage(lang => lang === 'en' ? 'ha' : 'en');

  // Core synchronized states
  const [donations, setDonations] = useState<Donation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  // 1. Initial State Resolution from LocalStorage or seeded defaults
  useEffect(() => {
    // Helper to safely load and parse states
    const safeLoad = <T,>(key: string, defaultValue: T): T => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored) as T;
        }
      } catch (err) {
        console.error(`[LOCAL STORAGE] Recovery triggered for key: "${key}":`, err);
      }
      // If error or not stored, fallback to default value
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    };

    // Load Donations
    setDonations(safeLoad<Donation[]>('alhafiz_donations', initialDonations));

    // Load Messages
    setMessages(safeLoad<ContactMessage[]>('alhafiz_messages', initialMessages));

    // Load Gallery Items safely with deep list merger
    try {
      const storedGal = localStorage.getItem('alhafiz_galleryItems');
      if (storedGal) {
        const parsed = JSON.parse(storedGal) as GalleryItem[];
        const missing = initialGalleryItems.filter((item: any) => !parsed.some((p: any) => p.id === item.id));
        const merged = [...missing, ...parsed];
        setGalleryItems(merged);
        localStorage.setItem('alhafiz_galleryItems', JSON.stringify(merged));
      } else {
        setGalleryItems(initialGalleryItems);
        localStorage.setItem('alhafiz_galleryItems', JSON.stringify(initialGalleryItems));
      }
    } catch (err) {
      console.error('[LOCAL STORAGE] Gallery items recovery triggered:', err);
      setGalleryItems(initialGalleryItems);
      localStorage.setItem('alhafiz_galleryItems', JSON.stringify(initialGalleryItems));
    }

    // Load Announcements
    setAnnouncements(safeLoad<Announcement[]>('alhafiz_announcements', initialAnnouncements));

    // Load Volunteers
    setVolunteers(safeLoad<Volunteer[]>('alhafiz_volunteers', initialVolunteers));
  }, []);

  // 2. Helper methods to append or delete states asynchronously
  const handleAddNewDonation = (newDon: Donation) => {
    const updated = [newDon, ...donations];
    setDonations(updated);
    localStorage.setItem('alhafiz_donations', JSON.stringify(updated));
  };

  const handleAddNewMessage = (newMsg: ContactMessage) => {
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('alhafiz_messages', JSON.stringify(updated));
  };

  const handleMarkMessageRead = (id: string) => {
    const updated = messages.map(msg => msg.id === id ? { ...msg, isRead: true } : msg);
    setMessages(updated);
    localStorage.setItem('alhafiz_messages', JSON.stringify(updated));
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('alhafiz_messages', JSON.stringify(updated));
  };

  const handleAddNewGalleryItem = (newItem: GalleryItem) => {
    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);
    localStorage.setItem('alhafiz_galleryItems', JSON.stringify(updated));
  };

  const handleDeleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter(item => item.id !== id);
    setGalleryItems(updated);
    localStorage.setItem('alhafiz_galleryItems', JSON.stringify(updated));
  };

  const handleAddNewAnnouncement = (newAnn: Announcement) => {
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('alhafiz_announcements', JSON.stringify(updated));
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter(ann => ann.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('alhafiz_announcements', JSON.stringify(updated));
  };

  const handleAddNewVolunteer = (newVol: Volunteer) => {
    const updated = [newVol, ...volunteers];
    setVolunteers(updated);
    localStorage.setItem('alhafiz_volunteers', JSON.stringify(updated));
  };

  const handleUpdateVolunteerStatus = (id: string, status: Volunteer['status']) => {
    const updated = volunteers.map(vol => vol.id === id ? { ...vol, status } : vol);
    setVolunteers(updated);
    localStorage.setItem('alhafiz_volunteers', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcf9] dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-emerald-100 selection:text-emerald-950 font-sans antialiased transition-colors duration-300" id="viewport-root">
      {/* Dynamic Master Header with logos Left/Right and specific Address details */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onDonateClick={() => setIsDonationModalOpen(true)}
        isAdminLoggedIn={false}
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Primary Tab-based Screens router */}
      <main className="flex-grow pt-4 sm:pt-6">
        {activeTab === 'HOME' && (
          <>
            <Hero 
              announcements={announcements} 
              donations={donations} 
              onDonateClick={() => setIsDonationModalOpen(true)}
              setActiveTab={setActiveTab}
            />
            <ImpactHighlights />
            <ImpactChart />
            <SuccessStories />
          </>
        )}

        {activeTab === 'ABOUT' && (
          <About />
        )}

        {activeTab === 'NEEDS' && (
          <SchoolNeeds onDonateClick={() => setIsDonationModalOpen(true)} />
        )}

        {activeTab === 'GALLERY' && (
          <GraduationGallery 
            galleryItems={galleryItems} 
          />
        )}

        {activeTab === 'CONTACT' && (
          <Contact 
            onNewMessage={handleAddNewMessage} 
          />
        )}

        {activeTab === 'VOLUNTEER' && (
          <VolunteerApplication 
            onNewVolunteer={handleAddNewVolunteer} 
          />
        )}

        {activeTab === 'ADMIN' && (
          <AdminDashboard 
            donations={donations}
            messages={messages}
            galleryItems={galleryItems}
            announcements={announcements}
            volunteers={volunteers}
            onAddGalleryItem={handleAddNewGalleryItem}
            onDeleteGalleryItem={handleDeleteGalleryItem}
            onAddAnnouncement={handleAddNewAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onMarkMessageRead={handleMarkMessageRead}
            onDeleteMessage={handleDeleteMessage}
            onAddDonation={handleAddNewDonation}
            onUpdateVolunteerStatus={handleUpdateVolunteerStatus}
          />
        )}
      </main>

      {/* Master Core Footer with address alignment */}
      <footer className="bg-slate-900 text-slate-350 text-xs py-10 border-t-2 border-amber-600/10" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo brand and capsule mission */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-tight">
              AL - HAFIZ ISLAMIC FOUNDATION
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              Our mission is to promote education and community welfare by providing comprehensive Quranic expertise alongside top-standard Western basic guidelines.
            </p>
            <div className="flex gap-2">
              <span className="flex items-center gap-0.5 bg-slate-800 text-[10px] text-amber-400 font-bold px-3 py-1.5 rounded-full border border-slate-700 select-none">
                <Sparkles className="w-3.5 h-3.5" /> Sadaqah Jariyah
              </span>
            </div>
            
            <SocialMediaPanel 
              className="pt-3"
              iconClassName="text-slate-400 hover:text-emerald-400 transition-colors"
            />
          </div>

          {/* Core Kaduna physical landmarks pointers */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Kampala Kawo Centers</h4>
            <div className="space-y-2 text-[11px] text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>{FOUNDATION_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{FOUNDATION_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{FOUNDATION_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Quick tab helpers */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Direct Pathways</h4>
            <div className="flex flex-col space-y-1.5 text-[11px]">
              <button 
                onClick={() => { setActiveTab('HOME'); window.scrollTo(0,0); }} 
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Return to Home
              </button>
              <button 
                onClick={() => { setActiveTab('ABOUT'); window.scrollTo(0,0); }} 
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                About Our Calling
              </button>
              <button 
                onClick={() => { setActiveTab('GALLERY'); window.scrollTo(0,0); }} 
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Graduation Records
              </button>
              <button 
                onClick={() => { setActiveTab('CONTACT'); window.scrollTo(0,0); }} 
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Send Admission Query
              </button>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Newsletter</h4>
            <NewsletterForm />
          </div>
        </div>

        {/* Closing corporate details */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} {FOUNDATION_INFO.name}. All Rights Reservable.</p>
          <p className="flex items-center justify-center gap-1.5">
            <span>Sealed with</span> 
            <Heart 
              className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse cursor-pointer hover:scale-125 transition-transform" 
              onClick={() => {
                setActiveTab('ADMIN');
                window.scrollTo(0, 0);
              }}
              title="Secure Staff Portal"
            /> 
            <span>for Kaduna's Orphan Children</span>
          </p>
        </div>
      </footer>

      {/* Dynamic Sandbox Donation Gateway Popup */}
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)}
        onNewDonation={handleAddNewDonation}
      />

      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        announcements={announcements}
        galleryItems={galleryItems}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsSearchOpen(false);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}
