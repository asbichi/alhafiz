import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShieldCheck, CreditCard, Sparkles, Landmark, BadgeCheck, Loader2, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Donation } from '../types';
import { FUNDING_TARGET } from '../data';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewDonation: (donation: Donation) => void;
}

export default function DonationModal({ isOpen, onClose, onNewDonation }: DonationModalProps) {
  // Step 1: Selection, Step 2: Payment Gateway, Step 3: Receipt Certificate
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP'>('NGN');
  const [amount, setAmount] = useState<string>('25000');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('General Orphan Welfare & Food');
  const [message, setMessage] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const presetAmounts = {
    NGN: ['5000', '15000', '25000', '50000', '100000'],
    USD: ['25', '50', '100', '250', '500'],
    GBP: ['20', '40', '80', '200', '400']
  };

  const currentCurrencySymbol = {
    NGN: '₦',
    USD: '$',
    GBP: '£'
  }[currency];

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      errors.amount = 'Please enter a valid amount';
    }
    if (!donorName.trim()) {
      errors.donorName = 'Please enter your name (or write Anonymous)';
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate high-security bank resolution cycles
    setTimeout(() => {
      setIsProcessing(false);
      const ref = `ALH-${Math.floor(100000 + Math.random() * 900000)}-${currency}`;
      setGeneratedRef(ref);

      const resolvedDonation: Donation = {
        id: `don-${Date.now()}`,
        donorName: donorName,
        email: email,
        amount: Number(amount),
        currency,
        date: new Date().toISOString(),
        purpose,
        message: message.trim() ? message : undefined,
        gatewayStatus: 'SUCCESS',
        reference: ref
      };

      onNewDonation(resolvedDonation);
      setStep(3);
      
      // Trigger celebratory confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#ffffff'] // using some emerald, amber, blue, white colors
      });
      
    }, 2200);
  };

  const handleReset = () => {
    setStep(1);
    setAmount('25000');
    setDonorName('');
    setEmail('');
    setPurpose('General Orphan Welfare & Food');
    setMessage('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setFormErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          id="donation-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl z-10"
          id="donation-modal-container"
        >
          {/* Header */}
          <div className="bg-emerald-900 px-6 py-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" />
              <div>
                <h3 className="font-display font-semibold text-lg">Secure Donation Portal</h3>
                <p className="text-xs text-emerald-100">Al-Hafiz Islamic Foundation</p>
              </div>
            </div>
            <button 
              onClick={handleReset} 
              className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              id="donation-modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="bg-emerald-50 h-1.5 flex">
            <div className={`h-full bg-emerald-600 transition-all duration-300 ${
              step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'
            }`} />
          </div>

          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4" id="donation-form-step1">
                {/* Active Campaign Box */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 space-y-3 mb-2">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Target className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase tracking-wider">Target Campaign: {FUNDING_TARGET.title}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-end text-xs">
                      <div className="font-mono font-bold text-emerald-700">
                        {FUNDING_TARGET.currency === 'NGN' ? '₦' : FUNDING_TARGET.currency === 'USD' ? '$' : '£'}
                        {FUNDING_TARGET.currentAmount.toLocaleString()} <span className="text-emerald-600/70 font-semibold text-[10px]">Raised</span>
                      </div>
                      <div className="font-mono font-medium text-emerald-600/70">
                        Target: {FUNDING_TARGET.currency === 'NGN' ? '₦' : FUNDING_TARGET.currency === 'USD' ? '$' : '£'}
                        {FUNDING_TARGET.targetAmount.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="w-full h-2 bg-emerald-200/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.round((FUNDING_TARGET.currentAmount / FUNDING_TARGET.targetAmount) * 100))}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    1. Select Currency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['NGN', 'USD', 'GBP'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => {
                          setCurrency(curr);
                          // Default sensible preset amount
                          setAmount(curr === 'NGN' ? '25000' : curr === 'USD' ? '100' : '80');
                        }}
                        className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          currency === curr 
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-2 ring-emerald-600/15'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        id={`btn-curr-${curr}`}
                      >
                        {curr === 'NGN' && <span>🇳🇬 NGN (₦)</span>}
                        {curr === 'USD' && <span>🇺🇸 USD ($)</span>}
                        {curr === 'GBP' && <span>🇬🇧 GBP (£)</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    2. Select or Enter Amount
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 mb-2.5">
                    {presetAmounts[currency].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`py-2 rounded-md font-mono text-xs font-medium transition-colors ${
                          amount === preset
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        id={`curr-preset-${preset}`}
                      >
                        {currentCurrencySymbol}{Number(preset).toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">
                      {currentCurrencySymbol}
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Other Amount"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-mono text-lg font-semibold"
                      id="input-donation-custom-amount"
                    />
                  </div>
                  {formErrors.amount && (
                    <p className="text-rose-500 text-xs mt-1">{formErrors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    3. Purpose of Giving
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm font-medium"
                    id="input-donation-purpose"
                  >
                    <option value="General Orphan Welfare & Food">General Orphan Welfare & Food Supplies</option>
                    <option value="Academic & Hifz Education Sponsorship">Academic & Quranic (Hifz) Sponsorship</option>
                    <option value="Kawo Kaduna Campus Solar Power System">Kawo Kaduna Campus Solar Project</option>
                    <option value="Uniforms & Classroom Materials">Uniforms & Classroom Supplies</option>
                    <option value="Ramadan & Eid Welfare Packages">Ramadan & Eid Welfare Feedings</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Alhaji Aliyu Kaduna"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 placeholder:text-slate-400 text-sm"
                      id="input-donation-donorname"
                    />
                    {formErrors.donorName && (
                      <p className="text-rose-500 text-xs mt-1">{formErrors.donorName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. donor@gmail.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 placeholder:text-slate-400 text-sm"
                      id="input-donation-email"
                    />
                    {formErrors.email && (
                      <p className="text-rose-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Dedication Note (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a prayer, message, or dedicate this giving..."
                    rows={2}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 placeholder:text-slate-400 text-sm"
                    id="input-donation-message"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-donation-submit-step1"
                  >
                    <span>Proceed to Secure Gateway</span>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure 256-Bit SSL Encrypted Banking Layer
                  </p>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePayment} className="space-y-5" id="donation-form-step2">
                <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Contribution</h5>
                    <p className="text-xl font-mono font-bold text-slate-800">
                      {currentCurrencySymbol}{Number(amount).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                      {purpose.split('&')[0].trim()}
                    </span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-emerald-700" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Secure Checkout Gate</span>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      SANDBOX MODE
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold uppercase mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                          placeholder="4000 1234 5678 9010"
                          maxLength={19}
                          className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-mono text-sm"
                          id="input-donation-cardnumber"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-500 font-semibold uppercase mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-center font-mono text-sm"
                          id="input-donation-expiry"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 font-semibold uppercase mb-1">
                          CVV Code
                        </label>
                        <input
                          type="password"
                          required
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="• • •"
                          maxLength={3}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-center font-mono text-sm"
                          id="input-donation-cvv"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isProcessing}
                    className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold cursor-pointer disabled:opacity-50"
                    id="btn-donation-back"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-[2] bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl transition-all shadow-md font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:bg-emerald-900/60"
                    id="btn-confirm-payment"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying with Central Bank...</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize Payment</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center space-y-5 py-3" id="donation-receipt-success">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                  <BadgeCheck className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-bold text-xl text-slate-800 pb-0.5">Alhamdulillah!</h4>
                  <p className="text-xs text-emerald-700 font-semibold px-4 py-1.5 bg-emerald-50 rounded-full inline-block">
                    Invaluable Charity Received
                  </p>
                  <p className="text-xs text-slate-500 pt-1 text-center max-w-sm mx-auto">
                    Your donation has been verified. A continuous charity certificate is prepared below and sent to <span className="font-medium text-slate-700">{email}</span>.
                  </p>
                </div>

                {/* Certificate of Charity Visual Card */}
                <div className="relative border-2 border-dashed border-amber-400 bg-amber-50/40 rounded-xl p-5 text-left shadow-sm overflow-hidden">
                  <div className="absolute right-[-10px] top-[-10px] opacity-10">
                    <Heart className="w-24 h-24 text-amber-500" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
                      Donor's Certificate of Honor
                    </span>
                    <span className="text-[10px] font-mono font-medium text-slate-500">
                      Ref: {generatedRef}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-slate-800 text-sm">
                    {donorName || "Benevolent Companion"}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 lines-clamp-3">
                    For donating <strong className="text-emerald-900 font-mono text-xs">{currentCurrencySymbol}{Number(amount).toLocaleString()}</strong> in aid of <strong>{purpose}</strong> under <em>Al-Hafiz Islamic Foundation Kaduna</em>.
                  </p>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-amber-200 text-[10px] text-slate-400">
                    <span>Date: {new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                    <span className="italic text-emerald-800 font-semibold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Continuous Charity (Sadaqah Jariyah)
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                    id="btn-close-receipt"
                  >
                    Return to Foundation Portal
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
