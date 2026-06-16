import React, { useState } from 'react';
import { Mail, CheckCircle, Send } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 p-3 bg-emerald-900/30 border border-emerald-800 rounded-xl">
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-xs text-emerald-100 leading-tight">
          Jazakallah Khair! You've been subscribed to our newsletter.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-4 w-4 text-slate-500" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="block w-full pl-10 pr-12 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute inset-y-0 right-0 pr-2 pl-2 flex items-center justify-center text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
          aria-label="Subscribe"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
      <p className="text-[10px] text-slate-500 leading-tight">
        Stay updated with our latest news, projects, and ways to support the orphans.
      </p>
    </form>
  );
};
