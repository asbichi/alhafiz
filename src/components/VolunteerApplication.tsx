import React, { useState } from 'react';
import { Volunteer } from '../types';
import { Send, HeartHandshake, CheckCircle } from 'lucide-react';

interface VolunteerApplicationProps {
  onNewVolunteer: (volunteer: Volunteer) => void;
}

export default function VolunteerApplication({ onNewVolunteer }: VolunteerApplicationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    areaOfInterest: 'Teaching',
    availability: 'Weekends',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newVolunteer: Volunteer = {
        id: `vol-${Date.now()}`,
        ...formData,
        date: new Date().toISOString(),
        status: 'PENDING'
      };
      
      onNewVolunteer(newVolunteer);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '', email: '', phone: '', areaOfInterest: 'Teaching', availability: 'Weekends', message: ''
        });
      }, 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 text-emerald-700 mb-2">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">Become a Volunteer</h2>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg">
          Join us in making a difference. Whether you can teach, provide healthcare, or help with administration, your time is a valuable sadaqah.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-emerald-700 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display">Application Received!</h3>
            <p className="max-w-md text-emerald-600">Jazakallah Khair for your interest. Our administration will review your application and contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g. Abdullah Musa"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g. abdullah@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g. 08012345678"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="areaOfInterest" className="text-sm font-semibold text-slate-700">Area of Interest *</label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700"
                >
                  <option value="Teaching">Teaching & Mentorship</option>
                  <option value="Healthcare">Healthcare & Checkups</option>
                  <option value="Administration">Administration & Organizing</option>
                  <option value="Facility Maintenance">Facility Maintenance & Repair</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="availability" className="text-sm font-semibold text-slate-700">Availability *</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700"
                >
                  <option value="Weekends">Weekends Only</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Monthly">Few times a month</option>
                  <option value="Flexible">Very Flexible</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700">Tell us about your experience (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="Share a brief note on how you can contribute..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  Submit Application
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
