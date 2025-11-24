import React from 'react';
import { INTRO_CONTENT } from '../constants';
import { Compass, Star, SunDim } from 'lucide-react';

const IntroSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-5xl mx-auto mb-24 px-6">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-cosmos-cyan/50"></div>
      
      <div className="text-center pt-24 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cosmos-green/30 bg-cosmos-green/5 text-cosmos-green text-xs font-mono mb-6 tracking-widest">
            <Compass size={12} />
            <span>ASTRONOMICAL HERITAGE</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4 tracking-tight">
          {INTRO_CONTENT.title}
        </h2>
        <p className="text-cosmos-cyan/60 font-mono text-xs md:text-sm tracking-[0.5em] uppercase mb-12">
          {INTRO_CONTENT.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="text-gray-400 leading-loose text-sm md:text-base border-l-2 border-cosmos-green/20 pl-6">
             <p>{INTRO_CONTENT.body}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {INTRO_CONTENT.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded bg-slate-900 border border-white/10 flex items-center justify-center text-cosmos-cyan group-hover:border-cosmos-cyan/50 group-hover:bg-cosmos-cyan/10 transition-colors">
                        {idx === 0 ? <SunDim size={18} /> : idx === 1 ? <Compass size={18} /> : <Star size={18} />}
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg">{feature.title}</h4>
                        <p className="text-gray-500 text-xs font-mono">{feature.desc}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;