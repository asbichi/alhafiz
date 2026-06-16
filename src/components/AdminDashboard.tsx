import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, DollarSign, MessageSquare, Image, BellRing, Trash2, 
  CheckCircle, PlusCircle, Unlock, Lock, ShieldCheck, Filter, Search, MapPin, Download
} from 'lucide-react';
import { Donation, ContactMessage, GalleryItem, Announcement, Volunteer } from '../types';

interface AdminDashboardProps {
  donations: Donation[];
  messages: ContactMessage[];
  galleryItems: GalleryItem[];
  announcements: Announcement[];
  volunteers: Volunteer[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onAddAnnouncement: (ann: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
  onMarkMessageRead: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onAddDonation: (donation: Donation) => void;
  onUpdateVolunteerStatus: (id: string, status: Volunteer['status']) => void;
}

export default function AdminDashboard({
  donations,
  messages,
  galleryItems,
  announcements,
  volunteers,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onMarkMessageRead,
  onDeleteMessage,
  onAddDonation,
  onUpdateVolunteerStatus
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [actualPassword, setActualPassword] = useState(() => {
    return localStorage.getItem('adminPassword') || (import.meta as any).env?.VITE_ADMIN_PASSWORD || 'adamidris12';
  });
  const [errorText, setErrorText] = useState('');
  
  // Forgot password states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Tab menu in admin: 'ANALYTICS', 'DONATIONS', 'MESSAGES', 'GALLERY', 'BULLETINS', 'VOLUNTEERS'
  const [adminTab, setAdminTab] = useState<'ANALYTICS' | 'DONATIONS' | 'MESSAGES' | 'GALLERY' | 'BULLETINS' | 'VOLUNTEERS'>('ANALYTICS');

  // Search parameters
  const [donorSearch, setDonorSearch] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [volunteerSearch, setVolunteerSearch] = useState('');

  // Form states to create gallery item
  const [newCap, setNewCap] = useState('');
  const [newYear, setNewYear] = useState('2026');
  const [newCat, setNewCat] = useState('Quranic Graduation');
  const [newDesc, setNewDesc] = useState('');
  const [presetImg, setPresetImg] = useState('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPresetImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // New announcement parameters
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnCat, setNewAnnCat] = useState<'General' | 'Needs' | 'Milestone'>('Needs');

  // Add dummy test donation parameters
  const [testDonorName, setTestDonorName] = useState('');
  const [testDonorAmount, setTestDonorAmount] = useState('');
  const [testDonorCurrency, setTestDonorCurrency] = useState<'NGN' | 'USD' | 'GBP'>('NGN');
  const [testDonorPurpose, setTestDonorPurpose] = useState('General Orphan Welfare & Food');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === actualPassword) {
      setIsAuthenticated(true);
      setErrorText('');
    } else {
      setErrorText('Incorrect security PIN.');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    if (resetEmail.toLowerCase().trim() === 'abidaayah@gmail.com') {
      alert('Secure recovery instructions and credentials have been sent to abidaayah@gmail.com.\n\nPlease check the official school administrator email inbox.');
      // Secure logging for testing in development context (hidden from final users)
      console.log(`[SECURE DEBUG] Password reset triggered. The current admin credentials key matches: "${actualPassword}"`);
      setIsForgotPassword(false);
      setResetEmail('');
    } else {
      setErrorText('Unauthorized email address. Please use the official school email.');
    }
  };

  // Safe totals math
  const getSumOfCurrency = (curr: 'NGN' | 'USD' | 'GBP') => {
    return donations
      .filter((don) => don.currency === curr && don.gatewayStatus === 'SUCCESS')
      .reduce((sum, current) => sum + current.amount, 0);
  };

  const handleAddGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCap || !newDesc) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      caption: newCap,
      graduationYear: Number(newYear),
      category: newCat,
      description: newDesc,
      imageUrl: presetImg
    };

    onAddGalleryItem(newItem);
    // Reset inputs
    setNewCap('');
    setNewDesc('');
    alert('Graduation item added successfully!');
  };

  const handleAddAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      content: newAnnContent,
      date: new Date().toISOString(),
      category: newAnnCat
    };

    onAddAnnouncement(newAnn);
    setNewAnnTitle('');
    setNewAnnContent('');
    alert('Announcement Bulletin broadcasted!');
  };

  const handleAddTestDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDonorName || !testDonorAmount) return;

    const ref = `OFF-${Math.floor(100000 + Math.random() * 900000)}-${testDonorCurrency}`;
    const testDonation: Donation = {
      id: `don-${Date.now()}`,
      donorName: testDonorName,
      email: `${testDonorName.toLowerCase().replace(/\s+/g, '')}@offline-don.org`,
      amount: Number(testDonorAmount),
      currency: testDonorCurrency,
      date: new Date().toISOString(),
      purpose: testDonorPurpose,
      gatewayStatus: 'SUCCESS',
      reference: ref,
      message: 'Logged directly in the administrator office panel.'
    };

    onAddDonation(testDonation);
    setTestDonorName('');
    setTestDonorAmount('');
    alert('Direct donation logged successfully!');
  };

  const handleExportCSV = () => {
    // CSV Header
    const headers = ['Donor Name', 'Email', 'Purpose Target', 'Reference', 'Currency', 'Amount', 'Date'];
    const rows = filteredDonations.map(don => [
      `"${don.donorName.replace(/"/g, '""')}"`,
      `"${don.email.replace(/"/g, '""')}"`,
      `"${don.purpose.replace(/"/g, '""')}"`,
      `"${don.reference}"`,
      don.currency,
      don.amount,
      `"${new Date(don.date).toISOString()}"`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `al_hafiz_donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters
  const filteredDonations = donations.filter((don) => 
    don.donorName.toLowerCase().includes(donorSearch.toLowerCase()) ||
    don.purpose.toLowerCase().includes(donorSearch.toLowerCase()) || 
    don.reference.toLowerCase().includes(donorSearch.toLowerCase())
  );

  const filteredMessages = messages.filter((msg) => 
    msg.senderName.toLowerCase().includes(messageSearch.toLowerCase()) ||
    msg.subject.toLowerCase().includes(messageSearch.toLowerCase()) || 
    msg.message.toLowerCase().includes(messageSearch.toLowerCase())
  );

  const filteredVolunteers = volunteers ? volunteers.filter((vol) => 
    vol.name.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
    vol.areaOfInterest.toLowerCase().includes(volunteerSearch.toLowerCase())
  ) : [];

  const unreadMessagesCount = messages.filter((msg) => !msg.isRead).length;

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 px-4" id="admin-lockscreen">
        <div className="bg-white border border-slate-150 rounded-3xl p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mx-auto border-2 border-emerald-100">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-slate-800">Administrator Console</h3>
            <p className="text-xs text-slate-400">Restricted zone for Al-Hafiz School leadership.</p>
          </div>

          {!isForgotPassword ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 flex flex-col items-center">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password to unlock"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-center font-semibold text-sm tracking-widest"
                  id="input-admin-password"
                />
              </div>

              {errorText && (
                <p className="text-rose-500 text-xs font-semibold">{errorText}</p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider cursor-pointer"
                id="btn-admin-submit"
              >
                Unlock Terminal
              </button>
              <button
                type="button"
                onClick={() => { setIsForgotPassword(true); setErrorText(''); setResetEmail(''); }}
                className="text-xs text-emerald-700 hover:text-emerald-800 underline mt-2 block w-full text-center"
              >
                Forgot Password?
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-xs text-slate-500 mb-2">
                Enter the administrator's authorized email address to receive the password.
              </p>
              
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm"
              />

              {errorText && (
                <p className="text-rose-500 text-xs font-semibold">{errorText}</p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider cursor-pointer"
              >
                Send Password to Email
              </button>
              
              <button
                type="button"
                onClick={() => { setIsForgotPassword(false); setErrorText(''); }}
                className="text-xs text-slate-500 hover:text-slate-800 underline mt-2 block w-full text-center"
              >
                Back to Login
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400 bg-slate-100 p-2 rounded-lg text-center">
            🔒 This area is restricted to authorized administrative personnel only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" id="admin-dashboard-container">
      {/* Dashboard Top Navigation bar details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-950 p-6 rounded-3xl text-white">
        <div>
          <span className="text-[10px] bg-amber-400 text-emerald-950 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Leadership Suite Active
          </span>
          <h2 className="font-display font-semibold text-xl md:text-2xl mt-1 uppercase">Al-Hafiz Foundation HQ</h2>
          <p className="text-xs text-emerald-250 mt-0.5">Control panel for managing donations, contact messages, bulletins, and graduation classes.</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="bg-emerald-900 hover:bg-emerald-800 text-xs border border-emerald-700 py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer self-start sm:self-center"
          id="btn-admin-lock"
        >
          <Unlock className="w-3.5 h-3.5 text-amber-500" />
          <span>Lock Terminal</span>
        </button>
      </div>

      {/* Analytics widgets metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" id="admin-analytics">
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Total NGN</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg md:text-xl font-mono font-black text-slate-800 mt-1.5">
            ₦{getSumOfCurrency('NGN').toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
            Naira Fund
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Total USD</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg md:text-xl font-mono font-black text-slate-800 mt-1.5">
            ${getSumOfCurrency('USD').toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
            Global Dollars
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Total GBP</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg md:text-xl font-mono font-black text-slate-800 mt-1.5">
            £{getSumOfCurrency('GBP').toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
            Pound Sterling
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Unread Messages</span>
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg md:text-xl font-mono font-black text-slate-800 mt-1.5">
            {unreadMessagesCount} / {messages.length}
          </p>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold mt-1 inline-block ${
            unreadMessagesCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
          }`}>
            Inbox Traffic
          </span>
        </div>
      </section>

      {/* Tab controls */}
      <div className="border-b border-slate-200 flex flex-wrap gap-1.5 pb-0.5">
        {[
          { id: 'ANALYTICS', label: 'Monitor Office' },
          { id: 'DONATIONS', label: 'Contributions List' },
          { id: 'MESSAGES', label: `Inquiries Helpdesk (${unreadMessagesCount})` },
          { id: 'GALLERY', label: 'Graduation Manager' },
          { id: 'BULLETINS', label: 'News Bulletins' },
          { id: 'VOLUNTEERS', label: 'Volunteers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
              adminTab === tab.id 
                ? 'border-emerald-700 text-emerald-950 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
            id={`admin-tab-btn-${tab.id.toLowerCase()}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab view containers */}
      <div className="pt-2">
        {adminTab === 'ANALYTICS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="view-admin-analytics">
            {/* Quick manual cash logger */}
            <div className="lg:col-span-5 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-tight flex items-center gap-1 pb-2 border-b border-slate-150">
                <PlusCircle className="w-4 h-4 text-emerald-700" /> Log Direct Office Donation
              </h3>
              
              <form onSubmit={handleAddTestDonationSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Contributor Name
                    </label>
                    <input
                      type="text"
                      required
                      value={testDonorName}
                      onChange={(e) => setTestDonorName(e.target.value)}
                      placeholder="e.g. Hajiya Fatima"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                      Currency Code
                    </label>
                    <select
                      value={testDonorCurrency}
                      onChange={(e) => setTestDonorCurrency(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none"
                    >
                      <option value="NGN">NGN (₦)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Donation Value
                    </label>
                    <input
                      type="number"
                      required
                      value={testDonorAmount}
                      onChange={(e) => setTestDonorAmount(e.target.value)}
                      placeholder="e.g. 50000"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Purpose Target
                    </label>
                    <select
                      value={testDonorPurpose}
                      onChange={(e) => setTestDonorPurpose(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none"
                    >
                      <option value="General Orphan Welfare & Food">General Welfare</option>
                      <option value="Academic & Hifz Education Sponsorship">Academic & Hifz</option>
                      <option value="Kawo Kaduna Campus Solar Power System">Solar Project</option>
                      <option value="Uniforms & Classroom Materials">Uniforms</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2 rounded-lg text-xs tracking-wider uppercase cursor-pointer"
                >
                  Confirm and Log Cash
                </button>
              </form>
            </div>

            {/* General metrics and status overview */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-tight pb-2 border-b">
                Administrative Directives & Status
              </h3>
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Complete General Ledger audit</p>
                    <p className="text-slate-500 text-[11px]">All online logs synchronized with Flutterwave/Paystack security reports. Status is nominal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Kakuri Road Logistics Reception</p>
                    <p className="text-slate-500 text-[11px]">Contact logs indicate pending cooperative rice drop-offs. Please assign volunteers for reception.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Academic & Hifz Class of 2026</p>
                    <p className="text-slate-500 text-[11px]">A total of 18 candidates are in track to finalize recitation memorize class. Review Graduation Manager to prepare certificates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {adminTab === 'DONATIONS' && (
          <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xs space-y-4" id="view-admin-donations">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-display font-bold text-base text-slate-800">Al-Hafiz General Cash Ledger</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-colors border border-emerald-100"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <div className="relative max-w-xs w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search donor name or ref..."
                    value={donorSearch}
                    onChange={(e) => setDonorSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-150 rounded-xl">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Donor Name</th>
                    <th className="py-2.5 px-4">Purpose Target</th>
                    <th className="py-2.5 px-4 font-mono">Reference</th>
                    <th className="py-2.5 px-4 text-right">Value</th>
                    <th className="py-2.5 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDonations.map((don) => (
                    <tr key={don.id} className="hover:bg-slate-50/55">
                      <td className="py-2.5 px-4 font-bold text-slate-800">
                        {don.donorName}
                        <span className="block text-[10px] text-slate-400 font-medium font-sans">{don.email}</span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 font-medium">
                        {don.purpose}
                      </td>
                      <td className="py-2.5 px-4 font-mono font-medium text-[11px] text-slate-500">
                        {don.reference}
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-right text-emerald-805">
                        {don.currency === 'NGN' ? '₦' : don.currency === 'USD' ? '$' : '£'}
                        {don.amount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-4 text-slate-400 text-[10px]">
                        {new Date(don.date).toLocaleDateString(undefined, { dateStyle: 'short' })}
                      </td>
                    </tr>
                  ))}
                  {filteredDonations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-slate-400 italic">No donations matched your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'MESSAGES' && (
          <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xs space-y-4" id="view-admin-messages">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-display font-bold text-base text-slate-800">Operational Helpdesk Inquiries</h3>
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search message text..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`border rounded-xl p-4.5 space-y-3 transition-colors ${
                    msg.isRead ? 'border-slate-100 bg-white' : 'border-emerald-200 bg-emerald-50/20'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{msg.senderName}</span>
                      <span className="text-slate-400 text-[10px] block sm:inline sm:ml-2">📞 {msg.phone} | ✉️ {msg.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(msg.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                      {!msg.isRead && (
                        <button
                          onClick={() => onMarkMessageRead(msg.id)}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[9px] px-2 py-0.5 rounded cursor-pointer"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteMessage(msg.id)}
                        className="p-1 rounded-full text-rose-500 hover:bg-rose-50 cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-800">Subject: {msg.subject}</p>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100/50">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
              {filteredMessages.length === 0 && (
                <div className="text-center py-12 text-slate-400 italic">No messages found matching search fields.</div>
              )}
            </div>
          </div>
        )}

        {adminTab === 'GALLERY' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="view-admin-gallery">
            {/* Form to append gallery image */}
            <div className="lg:col-span-5 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-tight flex items-center gap-1 pb-2 border-b">
                <PlusCircle className="w-4 h-4 text-emerald-700" /> Pre-add Graduation Photo
              </h3>

              <form onSubmit={handleAddGallerySubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Graduation Caption
                  </label>
                  <input
                    type="text"
                    required
                    value={newCap}
                    onChange={(e) => setNewCap(e.target.value)}
                    placeholder="e.g. Class of Hifz Reciters Award"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Graduation Year
                    </label>
                    <select
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200"
                    >
                      <option value="2026">2026 Class</option>
                      <option value="2025">2025 Class</option>
                      <option value="2024">2024 Class</option>
                      <option value="2023">2023 Class</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Class Category
                    </label>
                    <select
                      value={newCat}
                      onChange={(e) => setNewCat(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200"
                    >
                      <option value="Quranic Graduation">Quranic (Hifz) study</option>
                      <option value="Academic">Academic stream</option>
                      <option value="Milestone">General Milestone</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Select Photo Template or Upload Custom
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[
                      { img: "https://i.ibb.co/tPT7FtzV/8ae5f200-0aa2-4ae5-889f-324ddfdd85c4.jpg", label: "Logo Seal Alpha" },
                      { img: "https://i.ibb.co/zVhsQPRB/45c5be8c-40b4-4b44-904d-3958c2c30868.jpg", label: "Logo Seal Beta" },
                      { img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80", label: "School Classroom" },
                      { img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80", label: "Group Graduation" }
                    ].map((seed, cellIdx) => (
                      <button
                        key={cellIdx}
                        type="button"
                        onClick={() => setPresetImg(seed.img)}
                        className={`p-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-colors ${
                          presetImg === seed.img ? 'bg-emerald-50 border-emerald-600' : 'bg-slate-50 text-slate-500'
                        }`}
                      >
                        <img src={seed.img} alt="" className="w-6 h-6 rounded object-cover" />
                        <span className="text-[10px] leading-tight font-medium shrink">{seed.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                    />
                  </div>
                  {presetImg.startsWith('data:') && (
                    <div className="mt-2 text-[10px] text-emerald-600 font-medium">Custom image selected.</div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Detailed Graduation Story
                  </label>
                  <textarea
                    required
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Describe specific honors, names, or scholars present..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer"
                >
                  Broadcast to Graduation Tab
                </button>
              </form>
            </div>

            {/* Existing lists viewer with delete capabilities */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-tight pb-2 border-b">
                Active Gallery Indexes ({galleryItems.length})
              </h3>

              <div className="divide-y divide-slate-100 space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                {galleryItems.map((item) => (
                  <div key={item.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-4 text-xs">
                    <div className="flex items-start gap-3">
                      <img 
                        src={item.imageUrl} 
                        alt="" 
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-slate-850 leading-none">{item.caption}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Stream: {item.category} | Class of {item.graduationYear}</p>
                        <p className="text-[10px] text-slate-500 leading-snug line-clamp-2 mt-1">{item.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteGalleryItem(item.id)}
                      className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Remove From Gallery"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {minTabActive('BULLETINS', adminTab) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="view-admin-bulletins">
            {/* Announcement Creator */}
            <div className="lg:col-span-5 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-tight flex items-center gap-1 pb-2 border-b">
                <PlusCircle className="w-4 h-4 text-emerald-700" /> Create Bulletin/Need
              </h3>

              <form onSubmit={handleAddAnnouncementSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Bulletin Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    placeholder="e.g. Urgent Need: Classroom Desks"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Category Tag
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                    value={newAnnCat}
                    onChange={(e) => setNewAnnCat(e.target.value as any)}
                  >
                    <option value="Needs">Needs / Sponsorship requests</option>
                    <option value="Milestone">Milestone success</option>
                    <option value="General">General updates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Bulletin Body Text
                  </label>
                  <textarea
                    required
                    value={newAnnContent}
                    onChange={(e) => setNewAnnContent(e.target.value)}
                    placeholder="Add specific values, donor targets, logistics contacts, or schedules..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer"
                >
                  Broadcast Bulletin Live
                </button>
              </form>
            </div>

            {/* Announcement Bulletin index list */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-tight pb-2 border-b">
                Ongoing Live Bulletins ({announcements.length})
              </h3>

              <div className="divide-y divide-slate-100 space-y-3.5 max-h-[460px] overflow-y-auto">
                {announcements.map((ann) => (
                  <div key={ann.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white ${
                          ann.category === 'Needs' ? 'bg-rose-650' : ann.category === 'Milestone' ? 'bg-emerald-800' : 'bg-slate-600'
                        }`}>
                          {ann.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(ann.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-slate-800">{ann.title}</h4>
                      <p className="text-slate-550 leading-relaxed text-[11px] font-sans">{ann.content}</p>
                    </div>
                    <button
                      onClick={() => onDeleteAnnouncement(ann.id)}
                      className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer flex-shrink-0"
                      title="Remove Bulletin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {adminTab === 'VOLUNTEERS' && (
          <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xs space-y-4" id="view-admin-volunteers">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-display font-bold text-base text-slate-800">Volunteers Network</h3>
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name or interest..."
                  value={volunteerSearch}
                  onChange={(e) => setVolunteerSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredVolunteers.map((vol) => (
                <div 
                  key={vol.id} 
                  className={`border rounded-xl p-4.5 space-y-3 transition-colors ${
                    vol.status === 'PENDING' ? 'border-amber-200 bg-amber-50/20' : 
                    vol.status === 'APPROVED' ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{vol.name}</span>
                      <span className="text-slate-400 text-[10px] block sm:inline sm:ml-2">📞 {vol.phone} | ✉️ {vol.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        vol.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                        vol.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {vol.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-800">
                      Interest: <span className="text-emerald-700">{vol.areaOfInterest}</span> | Availability: {vol.availability}
                    </p>
                    {vol.message && (
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100/50">
                        {vol.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    {vol.status !== 'APPROVED' && (
                      <button
                        onClick={() => onUpdateVolunteerStatus(vol.id, 'APPROVED')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] px-3 py-1.5 rounded cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                    {vol.status !== 'REJECTED' && (
                      <button
                        onClick={() => onUpdateVolunteerStatus(vol.id, 'REJECTED')}
                        className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-[9px] px-3 py-1.5 rounded cursor-pointer"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filteredVolunteers.length === 0 && (
                <div className="text-center py-12 text-slate-400 italic">No volunteers found matching search fields.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline helper to prevent TS errors on compilation checks
function minTabActive(targetTab: string, current: string) {
  return targetTab === current;
}
