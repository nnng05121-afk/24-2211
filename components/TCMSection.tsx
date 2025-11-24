import React from 'react';
import { TCM_CONTENT } from '../constants';
import { Heart, Activity, Wind, Droplets, Thermometer, Brain, Utensils } from 'lucide-react';

const TCMSection: React.FC = () => {
  return (
    <section className="w-full py-32 container mx-auto px-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-end gap-6 mb-16 border-b border-gray-800 pb-6">
        <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-500 rounded-xl">
           <Activity size={32} />
        </div>
        <div>
           <h2 className="text-4xl font-bold text-white tracking-tight">{TCM_CONTENT.title}</h2>
           <p className="text-red-500/60 font-mono text-sm mt-2 uppercase tracking-[0.3em]">{TCM_CONTENT.subtitle}</p>
        </div>
      </div>

      {/* Intro Block */}
      <div className="flex flex-col md:flex-row gap-12 mb-24">
         <div className="md:w-1/3">
             <div className="text-6xl font-black text-gray-800 leading-none select-none">YANG<br/>SHENG</div>
             <div className="h-2 w-24 bg-red-600 mt-4"></div>
         </div>
         <div className="md:w-2/3">
             <p className="text-gray-300 text-lg leading-loose border-l-2 border-red-600/30 pl-8">
                 {TCM_CONTENT.intro}
             </p>
         </div>
      </div>

      {/* Bio-Rhythm Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TCM_CONTENT.seasons.map((season, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-slate-950 border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-500">
                  {/* Decorative Background Icon */}
                  <div className="absolute -right-8 -top-8 text-white/5 group-hover:text-red-900/10 transition-colors duration-500">
                      {idx === 0 ? <Wind size={150} /> : idx === 1 ? <Thermometer size={150} /> : idx === 2 ? <Droplets size={150} /> : <Brain size={150} />}
                  </div>

                  {/* Header */}
                  <div className="relative z-10 flex justify-between items-start mb-6">
                      <div>
                          <div className="text-red-500 font-mono text-xs uppercase tracking-widest mb-1">{season.season} PHASE</div>
                          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                              {season.organ} 
                              <span className="text-gray-600 text-lg font-normal">/ {season.element}</span>
                          </h3>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-red-900/20 border border-red-500/20 text-red-400 text-xs font-mono">
                          {season.principle}
                      </div>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-6 h-20">
                      {season.desc}
                  </p>

                  <div className="relative z-10 h-[1px] w-full bg-gray-800 mb-6"></div>

                  {/* Advice & Food */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <div className="flex items-center gap-2 text-gray-200 text-sm font-bold mb-3">
                              <Brain size={14} className="text-cosmos-cyan" /> 
                              调养建议 (ADVICE)
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                              {season.advice}
                          </p>
                      </div>
                      <div>
                          <div className="flex items-center gap-2 text-gray-200 text-sm font-bold mb-3">
                              <Utensils size={14} className="text-cosmos-green" /> 
                              推荐食谱 (DIET)
                          </div>
                          <div className="flex flex-wrap gap-2">
                              {season.foods.map((f, i) => (
                                  <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400 border border-white/5">
                                      {f}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </section>
  );
};

export default TCMSection;