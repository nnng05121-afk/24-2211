import React, { useState } from 'react';
import { TCM_CONTENT } from '../constants';
import { Heart, Activity, Wind, Droplets, Thermometer, Brain, Utensils, Zap, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TCMSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeSeason = TCM_CONTENT.seasons[activeIdx];

  const getIcon = (idx: number) => {
      switch(idx) {
          case 0: return <Wind size={24} />;
          case 1: return <Thermometer size={24} />;
          case 2: return <Droplets size={24} />;
          case 3: return <Brain size={24} />;
          default: return <Activity size={24} />;
      }
  };

  return (
    <section className="w-full py-32 container mx-auto px-6 max-w-7xl">
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
      <div className="flex flex-col md:flex-row gap-12 mb-16">
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

      <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Selector Nav */}
          <div className="lg:w-1/3 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {TCM_CONTENT.seasons.map((season, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative p-6 rounded-xl border text-left transition-all duration-300 group ${
                        activeIdx === idx 
                        ? 'bg-red-900/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                        : 'bg-slate-900/50 border-white/5 hover:bg-slate-800'
                    }`}
                  >
                      <div className={`absolute top-4 right-4 transition-colors ${activeIdx === idx ? 'text-red-500' : 'text-gray-600'}`}>
                          {getIcon(idx)}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">{season.season} PHASE</div>
                      <div className={`text-xl font-bold mb-1 ${activeIdx === idx ? 'text-white' : 'text-gray-400'}`}>{season.organ}</div>
                      <div className="text-sm text-gray-500">{season.element} / {season.principle}</div>
                      
                      {activeIdx === idx && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-xl"
                          />
                      )}
                  </button>
              ))}
          </div>

          {/* Right: Detailed View */}
          <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#020617] border border-gray-800 rounded-2xl p-8 lg:p-10 relative overflow-hidden h-full"
                  >
                      {/* Decorative Background */}
                      <div className="absolute top-0 right-0 p-32 bg-red-600/5 rounded-full blur-[80px] pointer-events-none"></div>
                      
                      <div className="relative z-10">
                          <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                              {activeSeason.organ} 
                              <span className="text-red-500 text-lg font-mono px-2 py-1 bg-red-500/10 rounded border border-red-500/20">
                                  {activeSeason.element}
                              </span>
                          </h3>
                          
                          <p className="text-gray-400 text-lg leading-relaxed mb-8">
                              {activeSeason.desc}
                          </p>

                          {/* Advice Card */}
                          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8 flex gap-4">
                              <Brain className="text-cosmos-cyan flex-shrink-0 mt-1" />
                              <div>
                                  <div className="text-sm font-bold text-cosmos-cyan mb-2 uppercase tracking-wide">Wellness Advice</div>
                                  <p className="text-gray-300 leading-relaxed">{activeSeason.advice}</p>
                              </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Recipe */}
                              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-cosmos-green/30 transition-colors">
                                  <div className="flex items-center gap-3 mb-4 text-cosmos-green">
                                      <Utensils size={20} />
                                      <span className="font-bold text-sm uppercase tracking-wide">Medicinal Recipe</span>
                                  </div>
                                  <h4 className="text-xl font-bold text-white mb-2">{activeSeason.recipe?.name}</h4>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                      {activeSeason.recipe?.ingredients.map((ing, i) => (
                                          <span key={i} className="text-xs bg-black/40 px-2 py-1 rounded text-gray-400 border border-white/5">{ing}</span>
                                      ))}
                                  </div>
                                  <p className="text-sm text-gray-500">{activeSeason.recipe?.benefit}</p>
                              </div>

                              {/* Acupoint */}
                              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-cosmos-accent/30 transition-colors">
                                  <div className="flex items-center gap-3 mb-4 text-cosmos-accent">
                                      <Fingerprint size={20} />
                                      <span className="font-bold text-sm uppercase tracking-wide">Key Acupoint</span>
                                  </div>
                                  <h4 className="text-xl font-bold text-white mb-2">{activeSeason.acupoint?.name}</h4>
                                  <p className="text-xs text-gray-400 mb-3 bg-black/40 p-2 rounded border border-white/5">
                                      📍 {activeSeason.acupoint?.location}
                                  </p>
                                  <p className="text-sm text-gray-500 flex items-start gap-2">
                                      <Zap size={14} className="mt-0.5 flex-shrink-0" />
                                      {activeSeason.acupoint?.benefit}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </motion.div>
              </AnimatePresence>
          </div>
      </div>
    </section>
  );
};

export default TCMSection;