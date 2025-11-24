import React from 'react';
import { CULTURE_CONTENT } from '../constants';
import { BookOpen, Calendar, Coffee } from 'lucide-react';

const CultureSection: React.FC = () => {
  return (
    <section className="relative w-full border-t border-white/10 bg-gradient-to-b from-transparent to-slate-950/80 mt-24">
      <div className="container mx-auto px-6 py-24">
         <div className="flex flex-col md:flex-row gap-16 items-center">
            
            {/* Left Graphics */}
            <div className="flex-1 relative">
                <div className="absolute inset-0 bg-cosmos-accent/10 blur-[100px] rounded-full"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-6 rounded-lg border border-white/5 backdrop-blur-sm">
                        <Calendar className="text-cosmos-accent mb-4" size={32} />
                        <div className="text-2xl font-bold text-white mb-1">5th</div>
                        <div className="text-xs text-gray-500 font-mono uppercase">Great Invention of China</div>
                    </div>
                     <div className="bg-slate-900/50 p-6 rounded-lg border border-white/5 backdrop-blur-sm mt-8">
                        <BookOpen className="text-cosmos-green mb-4" size={32} />
                        <div className="text-2xl font-bold text-white mb-1">2016</div>
                        <div className="text-xs text-gray-500 font-mono uppercase">UNESCO Heritage List</div>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{CULTURE_CONTENT.title}</h2>
                <div className="h-1 w-20 bg-cosmos-accent mb-6"></div>
                <p className="text-cosmos-accent font-mono text-xs tracking-widest uppercase mb-8">
                    {CULTURE_CONTENT.subtitle}
                </p>

                <div className="space-y-6 text-gray-400 leading-relaxed text-sm md:text-base">
                    {CULTURE_CONTENT.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>

                <div className="mt-10 flex items-center gap-4 text-xs font-mono text-gray-500">
                     <span className="flex items-center gap-2">
                        <Coffee size={14} />
                        LIFESTYLE
                     </span>
                     <span>/</span>
                     <span>AGRICULTURE</span>
                     <span>/</span>
                     <span>PHILOSOPHY</span>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default CultureSection;