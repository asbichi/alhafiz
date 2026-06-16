import { BookOpen, Award, CheckCircle, Flame, Gift, Heart, Shield, Sparkles } from 'lucide-react';
import { FOUNDATION_INFO } from '../data';
import { FrequentlyAskedQuestions } from './FrequentlyAskedQuestions';

export default function About() {
  const foundationMilestones = [
    {
      year: "2010",
      title: "Inaugural Foundation Spark",
      desc: "Adam Idris Usman Mallawan Falakin Zazzau coordinated the acquisition of the main facility in Kawo Kaduna to house our initial intake of 12 orphans."
    },
    {
      year: "2015",
      title: "Establishing the Islamic Academy",
      desc: "Fully registered our academy school allowing combined Arabic theology, basic Quranic Memorization, and traditional western primary education."
    },
    {
      year: "2020",
      title: "First Fully Certified Hifz Graduates",
      desc: "Eight outstanding young boys and girls completed the precise memorization of the entire Quran under Kaduna's leading teachers."
    },
    {
      year: "2025",
      title: "Solar Campus Power Upgrade",
      desc: "Successfully installed high-quality off-grid solar generators to ensure uninterrupted lighting and revision modules."
    }
  ];

  const corePillars = [
    {
      title: "Aesthetic Quranic Excellence (Hifz)",
      desc: "We prioritize complete memorization with standard tajweed guidance so our students possess spiritual foundation.",
      icon: <BookOpen className="w-5 h-5 text-emerald-800" />
    },
    {
      title: "Western & Science Integration",
      desc: "Our kids excel in mathematics, literacy, English, and civic knowledge, certified by state educational boards.",
      icon: <Award className="w-5 h-5 text-emerald-800" />
    },
    {
      title: "Absolute Orphan Welfare",
      desc: "Free standard medical checkups, balanced nutrition, shelter dormitory supervision, and psychological mentorship.",
      icon: <Heart className="w-5 h-5 text-emerald-800" />
    },
    {
      title: "Continuous Community Outreach",
      desc: "Arranging food distributions and public lectures on civic integration to neighboring zones around Kawo.",
      icon: <Gift className="w-5 h-5 text-emerald-850" />
    }
  ];

  const aimsAndObjectives = [
    "To campaign and promote monotheism and for Allah's sake",
    "To educate the general ummah and make provision on establishing schools and Mosques",
    "To serve as caring foster parents to orphans and the less privileged for the betterment of the children and society",
    "To help the less privileged and vulnerable groups within our communities",
    "Develop endowment (Waqf) and support services to strengthen family and community structures",
    "Provide educational and training programs to enhance knowledge, expertise, character, and citizenship skills",
    "To adopt positions in support of justice and human rights wherever in the world these may be threatened or violated",
    "To purchase, take on lease, sell, receive by way of donations, gifts or covenants, property (movable and immovable), land, or cash from members, groups, or individuals acceptable to the executive",
    "To perform any other halal (lawful) functions necessary to achieve the aims and objectives of the Foundation",
    "To present authentic Islamic teachings, teachings of peace, and sound guidance to the wider public"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-fade-in" id="about-view">
      {/* 1. Header Hero Panel */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-amber-700 font-extrabold uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          WHO WE ARE
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-emerald-950 uppercase tracking-tight">
          Dedicated to Faith, Education & Humanity
        </h2>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
          {FOUNDATION_INFO.mission}
        </p>
      </section>

      {/* 2. Overlap Vision and Mission Boards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden border border-emerald-900 shadow-md">
          <div className="absolute right-[-10px] top-[-10px] opacity-[0.03]">
            <BookOpen className="w-40 h-40 text-emerald-100" />
          </div>
          <div className="inline-flex p-3 bg-emerald-900 rounded-xl">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white">Our Master Vision</h3>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed font-sans">
            {FOUNDATION_INFO.vision}
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute right-[-10px] top-[-10px] opacity-[0.02]">
            <Heart className="w-40 h-40 text-slate-900" />
          </div>
          <div className="inline-flex p-3 bg-emerald-50 rounded-xl">
            <Shield className="w-6 h-6 text-emerald-800" />
          </div>
          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-emerald-950">Core Commitment Values</h3>
          <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-sans">
            To hold the orphans' wellbeing as our utmost priority. To build transparent donation reports, ensure qualified care, treat every child with equal respect, and foster sustainable academic growth.
          </p>
        </div>
      </section>

      {/* 3. Operational Pillars Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h4 className="font-display font-bold text-xl text-slate-800 uppercase tracking-tight">Our Core Operational Pillars</h4>
          <p className="text-xs text-slate-400">Integrated methodologies guiding our classrooms and orphan shelter daily.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {corePillars.map((pillar, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs space-y-3">
              <div className="p-2.5 bg-emerald-50 rounded-lg inline-block">
                {pillar.icon}
              </div>
              <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">{pillar.title}</h5>
              <p className="text-[11px] sm:text-xs text-slate-550 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Aims and Objectives Section */}
      <section className="space-y-6 bg-emerald-50/30 border border-emerald-100/80 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-[10px] text-emerald-800 font-extrabold uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">
            OUR CHARTER
          </span>
          <h4 className="font-display font-bold text-xl text-slate-800 uppercase tracking-tight">Aims & Objectives</h4>
          <p className="text-xs text-slate-500">The ten foundational pillars that define what we do and how we serve humanity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aimsAndObjectives.map((aim, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-4 rounded-xl flex gap-3 h-full items-start hover:shadow-xs hover:border-emerald-250 transition-all">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-850 font-mono text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed font-sans">{aim}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Historic Foundation Milestones Timeline */}
      <section className="space-y-6 bg-slate-50 border border-slate-150 rounded-3xl p-6 md:p-8">
        <div className="max-w-xl mx-auto text-center space-y-1.5 pb-2">
          <h4 className="font-display font-bold text-xl text-slate-800 uppercase tracking-tight">Chronicles of Charity</h4>
          <p className="text-xs text-slate-450">A decade of resilience and community trust in Kaduna.</p>
        </div>

        <div className="relative border-l-2 border-emerald-800/15 ml-4 md:ml-12 space-y-8 py-4">
          {foundationMilestones.map((milestone, index) => (
            <div key={index} className="relative pl-6 md:pl-8 group">
              {/* Dot indicator */}
              <span className="absolute left-[-6px] top-1.5 w-3.5 h-3.5 bg-emerald-700 rounded-full border-2 border-white shadow-sm ring-4 ring-emerald-500/10 group-hover:bg-amber-500 transition-colors" />
              
              <div className="space-y-1">
                <span className="font-mono font-extrabold text-xs text-amber-700 bg-amber-50 border border-amber-200 py-0.5 px-2 rounded-full mb-1 inline-block">
                  {milestone.year}
                </span>
                <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">
                  {milestone.title}
                </h5>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-3xl">
                  {milestone.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Challenges Facing Al-Hafiz Foundation */}
      <section className="space-y-6 border border-rose-100 bg-rose-50/30 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-[10px] text-rose-800 font-extrabold uppercase tracking-widest bg-rose-100/60 px-3 py-1 rounded-full">
            OUR CURRENT NEEDS
          </span>
          <h4 className="font-display font-bold text-xl text-slate-800 uppercase tracking-tight">Challenges Facing Al-Hafiz Foundation</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Despite its remarkable achievements and unwavering commitment to humanitarian service, education, orphan support, and community development, Al-Hafiz Foundation continues to encounter several challenges that hinder the full realization of its mission and objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs space-y-3">
            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">1. Lack of a Permanent Educational Facility</h5>
            <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed">The Foundation currently lacks a permanent school complex to accommodate and sustain its educational and moral development programmes. A dedicated facility is essential for providing uninterrupted learning opportunities, character development, and Islamic education for orphans, vulnerable children, and other disadvantaged members of society.</p>
          </div>
          
          <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs space-y-3">
            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">2. Inadequate Transportation for Da‘wah and Community Outreach</h5>
            <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed">The absence of a dedicated vehicle for Da‘wah and humanitarian outreach significantly limits the Foundation’s ability to reach remote and underserved communities. Reliable transportation is essential for conducting educational campaigns, religious outreach programmes, and charitable interventions in rural areas.</p>
          </div>
          
          <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs space-y-3">
            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">3. Insufficient Resources for Comprehensive Orphan Care</h5>
            <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed">The Foundation faces considerable challenges in providing comprehensive support for orphans, including access to quality education, vocational training, healthcare services, and essential welfare provisions. Increased support is needed to ensure that orphaned children receive the care and opportunities necessary for their holistic development.</p>
          </div>
          
          <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs space-y-3">
            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">4. Limited Support for Vocational Training and Economic Empowerment</h5>
            <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed">While the Foundation provides skills acquisition and vocational training programmes, many beneficiaries lack access to the startup capital, equipment, and resources required to establish sustainable businesses and achieve financial independence. Additional funding is needed to empower trainees to become self-reliant and productive members of society.</p>
          </div>
          
          <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs space-y-3">
            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">5. Absence of a Permanent Administrative Secretariat</h5>
            <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed">The Foundation currently operates without a permanent administrative headquarters. Establishing a dedicated secretariat would enhance organisational efficiency, strengthen programme coordination, improve record management, and facilitate greater engagement with partners, donors, and stakeholders.</p>
          </div>
          
          <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs space-y-3">
            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">6. Inadequate Financial Resources</h5>
            <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed">Limited and inconsistent funding remains one of the Foundation’s most significant challenges. The shortage of financial resources affects the implementation, expansion, and sustainability of various educational, humanitarian, and community development initiatives.</p>
          </div>
          
          <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs space-y-3 lg:col-span-3">
            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">7. Limited Capacity to Provide Healthcare Support for Orphans</h5>
            <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed">The Foundation presently lacks sufficient resources to adequately address the healthcare needs of orphaned and vulnerable children. Greater financial and institutional support is required to provide access to medical treatment, preventive healthcare services, and other essential health interventions.</p>
          </div>
        </div>
        
        <div className="mt-8 bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl">
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Conclusion:</strong> To strengthen its impact and expand its reach, Al-Hafiz Foundation seeks strategic partnerships, donor support, corporate sponsorships, and collaborative engagement with individuals and organizations committed to humanitarian service and community development. Addressing these challenges will enable the Foundation to enhance its programmes, improve the lives of vulnerable populations, and contribute more effectively to the social, educational, and economic development of society.
          </p>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <FrequentlyAskedQuestions />
    </div>
  );
}
