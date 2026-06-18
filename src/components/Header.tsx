import { useState } from 'react';
import { Menu, X, Landmark, ShieldAlert, BadgeCheck, LayoutDashboard, Moon, Sun, Globe, Search } from 'lucide-react';
import { FOUNDATION_INFO } from '../data';
import { TRANSLATIONS } from '../translations';

interface HeaderProps {
  activeTab: 'HOME' | 'ABOUT' | 'GALLERY' | 'NEEDS' | 'CONTACT' | 'VOLUNTEER' | 'ADMIN';
  setActiveTab: (tab: 'HOME' | 'ABOUT' | 'GALLERY' | 'NEEDS' | 'CONTACT' | 'VOLUNTEER' | 'ADMIN') => void;
  onDonateClick: () => void;
  isAdminLoggedIn: boolean;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  language: 'en' | 'ha';
  toggleLanguage: () => void;
  onOpenSearch: () => void;
}

export default function Header({ activeTab, setActiveTab, onDonateClick, isAdminLoggedIn, isDarkTheme, toggleTheme, language, toggleLanguage, onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[language];

  const navigationItems = [
    { id: 'HOME', label: t.nav.home },
    { id: 'ABOUT', label: t.nav.about },
    { id: 'GALLERY', label: t.nav.gallery },
    { id: 'NEEDS', label: t.nav.needs },
    { id: 'CONTACT', label: t.nav.contact },
    { id: 'VOLUNTEER', label: t.nav.volunteer }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm" id="main-header">
      {/* Top Banner with Kaduna Address & Direct Indicators */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-mono text-emerald-300">
            📍 Address: {FOUNDATION_INFO.address}
          </span>
          <div className="flex gap-4">
            <span>📞 Info Line: +234 803 123 4567</span>
            <span>✉️ admin@alhafizfoundation.org</span>
          </div>
        </div>
      </div>

      {/* Core Foundation Header with Left and Right Logo constraints */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
        {/* Left Emblem */}
        <div className="flex-shrink-0 relative group">
          <a href="https://ibb.co/1JtDj5MF" target="_blank" rel="noreferrer" referrerPolicy="no-referrer">
            <img 
              src={FOUNDATION_INFO.leftLogoUrl} 
              alt="Al-Hafiz Left Seal" 
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-2 border-emerald-700/20 shadow-md transform hover:scale-105 transition-all duration-300"
              referrerPolicy="no-referrer"
              id="header-left-emblem"
            />
          </a>
        </div>

        {/* Center Typography Block */}
        <div className="flex-1 text-center select-none">
          <h1 className="font-display font-extrabold text-xs sm:text-sm md:text-lg lg:text-[19px] tracking-tight leading-tight text-emerald-950 uppercase">
            {FOUNDATION_INFO.name}
          </h1>
          
          <h2 className="text-amber-700 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase mt-0.5">
            Al-Hafiz Islamic Orphanage & Academy School
          </h2>
          
          <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 font-medium max-w-2xl mx-auto mt-0.5 sm:mt-1 hidden xs:block">
            {FOUNDATION_INFO.address}
          </p>
        </div>

        {/* Right Emblem */}
        <div className="flex-shrink-0 relative group">
          <a href="https://ibb.co/k2gK5q8w" target="_blank" rel="noreferrer" referrerPolicy="no-referrer">
            <img 
              src={FOUNDATION_INFO.rightLogoUrl} 
              alt="Al-Hafiz Right Seal" 
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-2 border-emerald-700/20 shadow-md transform hover:scale-105 transition-all duration-300"
              referrerPolicy="no-referrer"
              id="header-right-emblem"
            />
          </a>
        </div>
      </div>

      {/* Navigation and Actions */}
      <div className="bg-emerald-900 text-white px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
          {/* Main List items */}
          <nav className="hidden md:flex space-x-1 items-center h-full">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-amber-600 text-white shadow-sm font-bold' 
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800'
                }`}
                id={`nav-tab-${item.id.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Quick dashboard shortcut if logged in */}
          </nav>

          {/* Core Donation Button and Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors bg-emerald-950/40"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 flex items-center gap-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors bg-emerald-950/40"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">{language === 'en' ? 'EN' : 'HA'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onDonateClick}
              className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              id="btn-donate-header"
            >
              <span>{t.actions.donate}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-900 animate-pulse" />
            </button>
          </div>

          {/* Mobile hamburger navigation control */}
          <div className="flex items-center justify-between w-full md:hidden py-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded text-emerald-100 hover:text-white hover:bg-emerald-800"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSearch}
                className="p-1.5 flex items-center gap-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors bg-emerald-950/40"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleLanguage}
                className="p-1.5 flex items-center gap-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors bg-emerald-950/40"
                aria-label="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase">{language === 'en' ? 'EN' : 'HA'}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors"
              >
                {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={onDonateClick}
                className="bg-amber-500 text-emerald-950 font-extrabold text-[11px] py-1.5 px-3 rounded-md uppercase cursor-pointer"
                id="btn-donate-mobile"
              >
                {t.actions.donate}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-emerald-950 text-white border-t border-emerald-900 px-4 py-3 divide-y divide-emerald-900" id="mobile-menu-drawer">
          <div className="flex flex-col space-y-1 pb-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-left text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === item.id ? 'bg-amber-600 text-white' : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
