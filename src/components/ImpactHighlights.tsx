import React, { useEffect, useState, useRef } from 'react';
import { Utensils, GraduationCap, HeartHandshake } from 'lucide-react';

const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easeProgress * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { count, elementRef };
};

const StatCard = ({ icon: Icon, value, label, suffix = '' }: { icon: any, value: number, label: string, suffix?: string }) => {
  const { count, elementRef } = useCounter(value, 2500);

  return (
    <div ref={elementRef} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300">
      <div className="mx-auto w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-2">
        {count.toLocaleString()}{suffix}
      </h4>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export const ImpactHighlights: React.FC = () => {
  return (
    <section className="py-20 bg-emerald-600 dark:bg-emerald-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-white blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Our Impact in <span className="text-emerald-200">Numbers</span>
          </h2>
          <p className="text-emerald-50 text-lg max-w-2xl mx-auto">
            Through the grace of Allah and your continued support, we've been able to touch thousands of lives across Kaduna and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            icon={HeartHandshake} 
            value={385} 
            label="Orphans Supported Fully" 
            suffix="+"
          />
          <StatCard 
            icon={Utensils} 
            value={50000} 
            label="Total Meals Provided" 
            suffix="+"
          />
          <StatCard 
            icon={GraduationCap} 
            value={1200} 
            label="Graduated Students" 
            suffix="+"
          />
        </div>
      </div>
    </section>
  );
};
