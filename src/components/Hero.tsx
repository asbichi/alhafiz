import { motion } from 'motion/react';
import { Heart, GraduationCap, Flame, Sparkles, BookOpen, BellRing, Quote, Target } from 'lucide-react';
import { FOUNDATION_INFO, ORIGINATOR_INFO, FUNDING_TARGET } from '../data';
import { Announcement, Donation } from '../types';
import { SocialMediaPanel } from './SocialMediaPanel';

interface HeroProps {
  announcements: Announcement[];
  donations: Donation[];
  onDonateClick: () => void;
  setActiveTab: (tab: 'HOME' | 'ABOUT' | 'GALLERY' | 'CONTACT' | 'ADMIN') => void;
}

export default function Hero({ announcements, donations, onDonateClick, setActiveTab }: HeroProps) {
  // Aggregate stats
  const totalOrphansSupported = 142;
  const hifzGraduatesCount = 58;
  const academicSuccessPercent = 96;

  return (
    <div className="space-y-12 pb-16" id="home-view">
      {/* 1. Jumbotron/Banner with Caption of the School */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 my-6 p-6 md:p-12" id="hero-jumbotron">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950 via-slate-900 to-black opacity-95" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider"
          >
            <Heart className="w-3.5 h-3.5" />
            Empowering Orphans Through Sound Knowledge & Care
          </motion.div>

          <header className="space-y-3">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl leading-tight tracking-tight text-white uppercase drop-shadow-sm">
              AL-HAFIZ ISLAMIC FOUNDATION
            </h1>
            <p className="text-amber-400 font-semibold font-display text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              {FOUNDATION_INFO.caption}
            </p>
          </header>

          <p className="text-slate-350 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Registered Orphanage and Educational Academy in Kawo Kaduna, creating a beautiful blend of sound academic training, character development, and comprehensive Quranic memorization.
          </p>

          <div className="pt-4 flex flex-col items-center justify-center gap-5">
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <button
                onClick={onDonateClick}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-103 text-sm uppercase tracking-wider cursor-pointer"
                id="hero-btn-donate"
              >
                Secure Donation Gate
              </button>
              <button
                onClick={() => setActiveTab('ABOUT')}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-semibold px-6 py-3 rounded-xl transition-all text-sm cursor-pointer"
                id="hero-btn-about"
              >
                Explore Our Mission
              </button>
            </div>
            
            <SocialMediaPanel 
              className="mt-2"
              iconClassName="flex items-center justify-center p-2.5 rounded-full bg-emerald-950 border border-emerald-800 hover:bg-emerald-800 hover:border-emerald-600 transition-all duration-300 text-emerald-400 hover:text-white"
            />
          </div>
        </div>
      </section>

      {/* 2. Overlap Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4" id="hero-stats">
        {[
          {
            icon: <Heart className="w-6 h-6 text-emerald-700" />,
            val: totalOrphansSupported,
            suffix: "+",
            title: "Total Supported Orphans",
            desc: "Under our shelter with complete meals, medical care & textbooks."
          },
          {
            icon: <BookOpen className="w-6 h-6 text-emerald-700" />,
            val: hifzGraduatesCount,
            suffix: " Students",
            title: "Full Arabic & Quranic Graduates",
            desc: "Nurtured in beautiful Arabic recitation & foundational memorization."
          },
          {
            icon: <GraduationCap className="w-6 h-6 text-emerald-700" />,
            val: academicSuccessPercent,
            suffix: "% Pass Rate",
            title: "WAEC & Primary Certificate Success",
            desc: "Excellent track records in state-wide general education exams."
          }
        ].map((stat, i) => (
          <div 
            key={i} 
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:translate-y-[-2px] transition-transform flex items-start gap-4"
          >
            <div className="p-3 bg-emerald-50 rounded-xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-mono font-extrabold text-emerald-950 tracking-tight">
                {stat.val}{stat.suffix}
              </p>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">{stat.title}</h5>
              <p className="text-[11px] text-slate-400 leading-snug mt-1">{stat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Target Campaign Funding Progress Bar */}
      <section className="max-w-4xl mx-auto px-4 mt-8 mb-6" id="hero-campaign-progress">
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-sm text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-100">
            <Target className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">Active Campaign</span>
          </div>
          
          <div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">{FUNDING_TARGET.title}</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">{FUNDING_TARGET.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end text-sm">
              <div className="font-mono font-bold text-emerald-700">
                {FUNDING_TARGET.currency === 'NGN' ? '₦' : FUNDING_TARGET.currency === 'USD' ? '$' : '£'}
                {FUNDING_TARGET.currentAmount.toLocaleString()} <span className="text-slate-400 font-semibold text-xs">Raised</span>
              </div>
              <div className="font-mono font-medium text-slate-500">
                Target: {FUNDING_TARGET.currency === 'NGN' ? '₦' : FUNDING_TARGET.currency === 'USD' ? '$' : '£'}
                {FUNDING_TARGET.targetAmount.toLocaleString()}
              </div>
            </div>
            
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.round((FUNDING_TARGET.currentAmount / FUNDING_TARGET.targetAmount) * 100))}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)] bg-emerald-500 rounded-full"
              />
            </div>
            <div className="text-xs text-slate-400 text-right font-medium">
              {Math.round((FUNDING_TARGET.currentAmount / FUNDING_TARGET.targetAmount) * 100)}% Funded
            </div>
          </div>
          
          <button
            onClick={onDonateClick}
            className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all font-display uppercase tracking-wider text-sm cursor-pointer shadow-md"
          >
            Contribute to Fund
          </button>
        </div>
      </section>

      {/* 3. Originator Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 py-4" id="originator-showcase">
        <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-3xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Originator Image with framing */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              {/* Decorative Backing Frame */}
              <div className="absolute -inset-3 rounded-2xl bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/20 via-emerald-800/10 to-transparent blur-md" />
              <div className="relative border-4 border-amber-600 rounded-2xl overflow-hidden shadow-xl max-w-sm">
                <img 
                  src={ORIGINATOR_INFO.imageUrl} 
                  alt={ORIGINATOR_INFO.name} 
                  className="w-full h-auto aspect-square object-cover"
                  referrerPolicy="no-referrer"
                  id="originator-portrait-img"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent p-4 text-white">
                  <p className="text-xs font-bold font-display uppercase tracking-widest text-amber-400 font-sans">FOUNDING ORIGINATOR</p>
                  <p className="text-base font-bold font-sans">{ORIGINATOR_INFO.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio text & quotation */}
          <div className="md:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-1 bg-amber-600 rounded" />
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest">{ORIGINATOR_INFO.title}</span>
            </div>

            <h3 className="font-display font-bold text-2xl md:text-3xl text-emerald-950 tracking-tight leading-tight uppercase">
              Honoring Our Foundational Core & School Vision
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {ORIGINATOR_INFO.bio}
            </p>

            {/* Quote block */}
            <div className="relative bg-white border-l-4 border-amber-500 rounded-r-xl p-4 shadow-sm italic text-xs sm:text-sm text-emerald-900/95 font-medium leading-relaxed font-sans">
              <Quote className="absolute right-4 top-2 w-8 h-8 text-amber-150 -z-0" />
              <p className="relative z-10 font-sans">
                {ORIGINATOR_INFO.quote}
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={() => setActiveTab('ABOUT')} 
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                id="originator-details-btn"
              >
                Learn More About Our Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Need Announcements Grid & Bulletins */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8" id="bulletins-and-donors">
        {/* Active Needs / Announcements */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <BellRing className="w-5 h-5 text-amber-600 animate-bounce" />
              <h3 className="font-display font-bold text-lg text-slate-800 uppercase tracking-tight">Active Foundation Bulletins</h3>
            </div>
            <button 
              onClick={() => setActiveTab('CONTACT')}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Inquire
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div 
                key={ann.id} 
                className="bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-4.5 shadow-xs transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                    ann.category === 'Needs' 
                      ? 'bg-rose-150 text-rose-800 border border-rose-200' 
                      : ann.category === 'Milestone' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(ann.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-xs sm:text-sm text-slate-800 leading-snug">
                  {ann.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live / Real-time Benevolence Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-display font-bold text-lg text-slate-800 uppercase tracking-tight">Charity Activity Log</h3>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4 max-h-[380px] overflow-y-auto">
            <div className="flex justify-between items-center bg-amber-50 text-amber-900 text-xs py-2 px-3 rounded-lg font-semibold">
              <span className="flex items-center gap-1">🤝 Live Contributors</span>
              <span>Refreshed Live</span>
            </div>

            <div className="divide-y divide-slate-100 space-y-3.5">
              {donations.map((don) => (
                <div key={don.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-800 flex items-center gap-1">
                      {don.donorName === "Benevolent Companion" || don.donorName.toLowerCase().includes('anonymous') ? (
                        <span className="text-emerald-700">Anonymously Blessed Donor</span>
                      ) : (
                        don.donorName
                      )}
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 inline fill-amber-500" />
                    </p>
                    <p className="text-[10px] text-slate-400">{don.purpose}</p>
                    <p className="text-[10px] italic text-slate-400">"{don.message || "Sending continuous prayers for the orphans."}"</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-emerald-800 text-xs">
                      {don.currency === 'NGN' ? '₦' : don.currency === 'USD' ? '$' : '£'}
                      {don.amount.toLocaleString()}
                    </p>
                    <span className="text-[9px] text-slate-400 block">
                      {new Date(don.date).toLocaleDateString(undefined, { dateStyle: 'short' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
