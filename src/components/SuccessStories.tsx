import React from 'react';
import { Quote } from 'lucide-react';
import { SUCCESS_STORIES } from '../data';

export const SuccessStories: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-4">
            Voices of <span className="text-emerald-700">Impact</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Witness the transformative power of your support through the success stories of our beneficiaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div key={story.id} className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-emerald-100 rotate-180" />
              <div className="relative z-10">
                <p className="text-slate-700 italic leading-relaxed mb-6 pt-2">
                  "{story.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg font-display">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{story.name}</h4>
                    <p className="text-xs text-emerald-700 font-medium">{story.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
