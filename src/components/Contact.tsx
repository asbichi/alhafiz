import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, Check, Loader2, Sparkles, Building } from 'lucide-react';
import { FOUNDATION_INFO } from '../data';
import { ContactMessage } from '../types';
import { SocialMediaPanel } from './SocialMediaPanel';
import { OutreachMap } from './OutreachMap';
import { ErrorBoundary } from './ErrorBoundary';

interface ContactProps {
  onNewMessage: (msg: ContactMessage) => void;
}

export default function Contact({ onNewMessage }: ContactProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Admission Query');
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate database write
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);

      const resolvedMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        senderName: fullName,
        email: email,
        phone: phone || "Not Provided",
        subject: subject,
        message: messageText,
        date: new Date().toISOString(),
        isRead: false
      };

      onNewMessage(resolvedMessage);

      // Clean form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setMessageText('');

      // Auto-hide success checkmark after 4 seconds
      setTimeout(() => setIsSuccess(false), 4400);
    }, 1100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in" id="contact-view">
      {/* 1. Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs text-amber-700 font-extrabold uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
          REACH OUT TODAY
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-emerald-950 uppercase tracking-tight">
          Help & Admissions Portal
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Have queries about admitting an orphan, volunteering as an academic mentor, or dropping off food items at our Kakuri Road campus? Leave a message here.
        </p>
      </section>

      {/* 2. Primary Information Block & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact details */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-emerald-950 text-white rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-md">
            <div className="absolute right-[-20px] top-[-20px] opacity-[0.03]">
              <Building className="w-56 h-56 text-white" />
            </div>

            <div className="space-y-1.5 pb-2 border-b border-white/10">
              <h3 className="font-display font-bold text-lg text-white">Kaduna HQ Campus</h3>
              <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Al-Hafiz Islamic Foundation</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-100">Physical Address</p>
                  <p className="text-emerald-100/80 leading-relaxed mt-0.5">
                    {FOUNDATION_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Phone className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-100">Official Mobile Lines</p>
                  <p className="text-emerald-100/80 mt-0.5">{FOUNDATION_INFO.phone}</p>
                  {FOUNDATION_INFO.altPhone && <p className="text-emerald-100/60 text-xs">{FOUNDATION_INFO.altPhone}</p>}
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-100">Send Emails</p>
                  <p className="text-emerald-100/80 mt-0.5 break-all">{FOUNDATION_INFO.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="font-display font-semibold text-sm text-white">Direct Social Channels</h4>
              <SocialMediaPanel className="flex-wrap gap-3" />
            </div>

            <div className="pt-2 border-t border-white/10">
              <p className="text-[10px] text-center text-emerald-300">
                ⭐ Submitting queries is monitored 9:00 AM to 5:00 PM (GMT+1)
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Message Submission Form */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
              <Mail className="w-5 h-5 text-emerald-700" />
              <div>
                <h3 className="font-display font-bold text-base text-slate-800">Support & Admission Inquiries</h3>
                <p className="text-[11px] text-slate-400">Response turnaround typically within 24 operational hours.</p>
              </div>
            </div>

            {isSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 animate-pulse">
                <div className="p-1 bg-emerald-100 text-emerald-800 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Message Received with success!</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Your inquiry was queued securely. The administrative desk at Kakuri Road has received it, and it's visible in our Live portal monitor. Thank you!
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" id="support-contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alhaji Sani Bello"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm"
                    id="input-contact-fullname"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sani@bello.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm"
                    id="input-contact-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Mobile Phone (WhatsApp Preferred)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm"
                    id="input-contact-phone"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm font-medium"
                    id="input-contact-subject"
                  >
                    <option value="Admission Query">Admission / Enrollment Scholarship</option>
                    <option value="Volunteering/Teaching Inquiry">Volunteering & Teaching Positions</option>
                    <option value="Logistics/Food Droppings">Food items Delivery & Logistics</option>
                    <option value="General Sponsorship Inquiry">Orphan Financial Sponsorship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Detailed Message Text
                </label>
                <textarea
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="State your requests clearly. Include names, drop-off dates, or child histories where applicable..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm"
                  id="input-contact-message"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-emerald-900/60"
                  id="btn-submit-support"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message Safely</span>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Interactive Outreach Map */}
      <ErrorBoundary componentName="OutreachMap">
        <OutreachMap />
      </ErrorBoundary>
    </div>
  );
}
