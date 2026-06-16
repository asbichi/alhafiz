import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Image as ImageIcon, Bell, Layout, ArrowRight } from 'lucide-react';
import { Announcement, GalleryItem } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
  galleryItems: GalleryItem[];
  onNavigate: (tab: 'HOME' | 'ABOUT' | 'GALLERY' | 'NEEDS' | 'CONTACT' | 'VOLUNTEER') => void;
}

export function GlobalSearchModal({ isOpen, onClose, announcements, galleryItems, onNavigate }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase();

  const matchedNews = q ? announcements.filter(a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)) : [];
  const matchedGallery = q ? galleryItems.filter(g => g.caption.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)) : [];
  
  const pages = [
    { id: 'ABOUT', label: 'About Us', icon: Layout },
    { id: 'GALLERY', label: 'Graduation Gallery', icon: Layout },
    { id: 'NEEDS', label: 'School Needs', icon: Layout },
    { id: 'VOLUNTEER', label: 'Volunteer', icon: Layout },
    { id: 'CONTACT', label: 'Contact Support', icon: Layout },
  ] as const;

  const matchedPages = q ? pages.filter(p => p.label.toLowerCase().includes(q)) : [];

  const hasResults = matchedNews.length > 0 || matchedGallery.length > 0 || matchedPages.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-32">
      {/* Overlay */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all">
        <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-0 focus:ring-0 px-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none text-lg"
            placeholder="Search news, gallery, and pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {!hasResults && (
              <div className="text-center py-12 text-slate-500">
                No results found for "{query}".
              </div>
            )}

            {matchedPages.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Pages & Resources</h3>
                <div className="space-y-1">
                  {matchedPages.map(page => (
                    <button
                      key={page.id}
                      onClick={() => onNavigate(page.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                          <page.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{page.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchedNews.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">News & Updates</h3>
                <div className="space-y-1">
                  {matchedNews.map(news => (
                    <button
                      key={news.id}
                      onClick={() => onNavigate('HOME')}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{news.title}</div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{news.content}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchedGallery.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Graduation Gallery</h3>
                <div className="space-y-1">
                  {matchedGallery.map(img => (
                    <button
                      key={img.id}
                      onClick={() => onNavigate('GALLERY')}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img src={img.imageUrl} alt={img.caption} className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{img.caption}</div>
                          <div className="text-[10px] text-slate-400 capitalize mt-0.5" >{img.category.toLowerCase().replace('_', ' ')}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {!query && (
          <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-sm">Start typing to search anywhere in the foundation...</p>
          </div>
        )}
      </div>
    </div>
  );
}
