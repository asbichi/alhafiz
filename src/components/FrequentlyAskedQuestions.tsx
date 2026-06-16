import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQ_DATA = [
  {
    category: "Admission & Care",
    questions: [
      {
        q: "How are children admitted to the foundation?",
        a: "Children are typically referred to us by community leaders, local authorities, or relatives who are unable to provide adequate care after the loss of parents. We conduct a thorough assessment to ensure the child meets our admission criteria for orphan care."
      },
      {
        q: "What age range of children do you accept?",
        a: "We generally admit children between the ages of 4 and 10 years to ensure they can fully integrate into our primary education and foundational Islamic (Hifz) programs. They remain under our care until they complete their secondary education."
      }
    ]
  },
  {
    category: "Visitation & Policies",
    questions: [
      {
        q: "Can I visit the orphanage and interact with the children?",
        a: "Yes, visitors are welcome! However, to protect the privacy and routine of the children, we ask that all visits be scheduled in advance through our admin office. Visiting hours are restricted to weekends and specific times."
      },
      {
        q: "Are there specific rules for interacting with the orphans?",
        a: "For the psychological safety of the children, we request that visitors avoid asking sensitive questions about their past. Photography of the children is strictly prohibited without prior written consent from the foundation's administration to protect their dignity."
      }
    ]
  },
  {
    category: "Donations & Sponsorship",
    questions: [
      {
        q: "How can I make a financial donation?",
        a: "You can donate directly through our website using the 'Donate' button, or via direct bank transfer to our official foundation accounts. We use secure payments to process all contributions."
      },
      {
        q: "Can I sponsor a specific child's education and upkeep?",
        a: "Yes, our 'Sponsor an Orphan' program allows you to cover the complete educational, medical, and welfare needs of a specific child. You will receive periodic updates on their academic and personal growth."
      },
      {
        q: "Do you accept non-monetary donations like food or clothes?",
        a: "Absolutely. We appreciate donations in kind, including non-perishable food items, educational materials, clean clothing, and medical supplies. Please contact our core administrative team before dropping off large items so we can arrange reception."
      }
    ]
  }
];

export const FrequentlyAskedQuestions: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-6 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs w-full max-w-full">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-mono text-[10px] text-emerald-800 font-extrabold uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">
          FAQ
        </span>
        <h4 className="font-display font-bold text-xl text-slate-800 uppercase tracking-tight">Frequently Asked Questions</h4>
        <p className="text-xs text-slate-500">Common queries about admission, orphanage policies, and donation processes.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 mt-8">
        {FAQ_DATA.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h5 className="font-display font-bold text-sm text-slate-700 uppercase tracking-wider pl-3 border-l-2 border-emerald-600/50">
              {section.category}
            </h5>
            <div className="space-y-2">
              {section.questions.map((faq, qIdx) => {
                const id = `${sIdx}-${qIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={qIdx} className="border border-slate-100 hover:border-emerald-200 transition-colors rounded-xl overflow-hidden bg-white shadow-xs">
                    <button
                      onClick={() => toggleAccordion(id)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:bg-slate-50 cursor-pointer"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-slate-800 pr-4">{faq.q}</span>
                      <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-emerald-100' : 'bg-slate-50'}`}>
                        <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="max-w-3xl mx-auto mt-8 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <div className="w-10 h-10 rounded-full bg-emerald-100/80 flex items-center justify-center shrink-0">
          <MessageCircleQuestion className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <h6 className="font-bold text-sm text-slate-800">Still have questions?</h6>
          <p className="text-xs text-slate-600 mt-1">Reach out to our administration team via the Contact page or our official phone lines for more specific inquiries.</p>
        </div>
      </div>
    </section>
  );
};
