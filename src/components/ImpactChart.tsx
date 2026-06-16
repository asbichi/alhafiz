import React, { useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { YEARLY_IMPACT_DATA } from '../data';
import { TrendingUp, Users, Download, FileImage, FileText, Loader2, ChevronDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ImpactChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDownloadImage = async () => {
    if (!chartRef.current) return;
    setIsExporting(true);
    setShowDropdown(false);
    
    try {
      const canvas = await html2canvas(chartRef.current, { scale: 2 });
      const link = document.createElement('a');
      link.download = 'Al-Hafiz-Yearly-Impact.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!chartRef.current) return;
    setIsExporting(true);
    setShowDropdown(false);

    try {
      const canvas = await html2canvas(chartRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('Al-Hafiz-Yearly-Impact.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Yearly <span className="text-emerald-700 dark:text-emerald-400">Impact Overview</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-6">
            Visualizing the steady growth in our student enrollment and dedicated orphan support program over the years, made possible by your continuous generosity.
          </p>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? 'Exporting...' : 'Download Report'}
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showDropdown && (
              <div className="absolute top-12 left-0 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden py-1 z-20">
                <button 
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Save as PDF
                </button>
                <button 
                  onClick={handleDownloadImage}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <FileImage className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Save as Image
                </button>
              </div>
            )}
          </div>
        </div>

        <div ref={chartRef} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative z-0">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Growth Trajectory
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Enrolled vs Orphans Supported Fully</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Students Enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-200 dark:bg-emerald-800"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Orphans Supported</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full bg-white dark:bg-slate-800 rounded-xl" style={{ backgroundColor: 'inherit' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={YEARLY_IMPACT_DATA}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOrphans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="year" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dx={-10}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.2} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 500 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  name="Total Students"
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorStudents)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="orphansSupported" 
                  name="Orphans Supported"
                  stroke="#34d399" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorOrphans)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
