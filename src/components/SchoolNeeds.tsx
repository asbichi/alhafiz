import React from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Shirt, Stethoscope, Sun, Users, ArrowRight } from 'lucide-react';
import { SCHOOL_NEEDS } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-8 h-8 text-rose-500" />,
  BookOpen: <BookOpen className="w-8 h-8 text-emerald-600" />,
  Shirt: <Shirt className="w-8 h-8 text-indigo-500" />,
  Stethoscope: <Stethoscope className="w-8 h-8 text-cyan-500" />,
  Sun: <Sun className="w-8 h-8 text-amber-500" />,
  Users: <Users className="w-8 h-8 text-violet-500" />,
};

interface SchoolNeedsProps {
  onDonateClick: () => void;
}

export const SchoolNeeds: React.FC<SchoolNeedsProps> = ({ onDonateClick }) => {
  return (
    <section id="needs" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4"
          >
            How You Can <span className="text-emerald-700">Help</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Al-Hafiz Islamic Foundation depends on the generosity of our community. 
            Here is a regular list of our ongoing infrastructural, educational, and welfare needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SCHOOL_NEEDS.map((need, index) => (
            <motion.div
              key={need.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                {iconMap[need.icon]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{need.title}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed min-h-[4rem]">
                {need.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-slate-900">
                  {need.costEstimate}
                </span>
                <button 
                  onClick={onDonateClick}
                  className="text-emerald-700 hover:text-emerald-800 text-sm font-medium flex items-center gap-1 group"
                >
                  Contribute <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={onDonateClick}
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-full font-medium transition-colors shadow-sm shadow-emerald-900/20"
          >
            Sponsor an Orphan Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};
