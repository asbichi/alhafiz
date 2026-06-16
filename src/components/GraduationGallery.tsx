import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Calendar, Award, ZoomIn, Eye, X, BookOpen, Clock } from 'lucide-react';
import { GalleryItem } from '../types';

interface GraduationGalleryProps {
  galleryItems: GalleryItem[];
}

export default function GraduationGallery({ galleryItems }: GraduationGalleryProps) {
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Derive years and categories statically
  const years = ['ALL', ...Array.from(new Set(galleryItems.map(item => item.graduationYear)))].sort((a, b) => {
    if (a === 'ALL') return -1;
    if (b === 'ALL') return 1;
    return (b as number) - (a as number);
  });

  const categories = ['ALL', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  // Filtering criteria
  const filteredItems = galleryItems.filter(item => {
    const matchYear = selectedYear === 'ALL' || item.graduationYear === selectedYear;
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchYear && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in" id="gallery-view">
      {/* 1. Header Typography */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs text-emerald-800 font-extrabold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
          Al-Hafiz Milestones
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-emerald-950 uppercase tracking-tight">
          Graduation Gallery
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Celebrating our students' success as they complete their Quranic memorization benchmarks (Hifz) and State Academic primary leaving curricula in Kaduna.
        </p>
      </section>

      {/* 2. Controls and Filters Panel */}
      <section className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Years filters */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Filter by Graduation Year
          </label>
          <div className="flex flex-wrap gap-1.5">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedYear === year 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                id={`filter-year-${year.toString().toLowerCase()}`}
              >
                {year === 'ALL' ? 'Show All' : `${year} Class`}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Filter by Stream
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat === 'ALL' ? 'All Classes' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Items Grid with staggered entrance */}
      <motion.section 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        id="gallery-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all-custom flex flex-col group cursor-pointer"
              onClick={() => setActiveItem(item)}
              id={`gallery-card-${item.id}`}
            >
              {/* Image Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-800" /> View Story
                  </span>
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white font-mono text-[10px] font-bold py-1 px-2.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
                  <Calendar className="w-3 h-3 text-amber-500" />
                  <span>Class of {item.graduationYear}</span>
                </div>
              </div>

              {/* Story Details Container */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 tracking-tight leading-snug">
                    {item.caption}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="italic flex items-center gap-0.5 text-emerald-800 font-semibold">
                    <Award className="w-3 text-amber-500 h-3" /> Certified Scholar
                  </span>
                  <span>Kawo, Kaduna</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {/* 4. Empty Fallback Container */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-500 text-sm font-semibold">No pictures matching filter Criteria</p>
          <p className="text-slate-400 text-xs mt-1">Try switching years or streams</p>
        </div>
      )}

      {/* 5. Immersive Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              id="lightbox-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl z-10 flex flex-col md:flex-row"
              id="lightbox-container"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                id="btn-close-lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Panel */}
              <div className="md:w-1/2 bg-black flex items-center">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.caption}
                  className="w-full h-auto object-contain aspect-square max-h-[400px] md:max-h-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dialogue story panel */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {activeItem.category}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      Year {activeItem.graduationYear}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-slate-800 leading-tight">
                    {activeItem.caption}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {activeItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-805">
                    <Award className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-600 leading-none">Al-Hafiz Islamic Academy</h5>
                    <p className="text-[9px] text-slate-500 mt-0.5">Verified Merit Record - Kaduna State Nigeria</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
