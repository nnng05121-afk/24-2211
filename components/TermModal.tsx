import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SolarTerm } from '../types';
import { Bot, Sparkles, X, Thermometer, CloudRain, Wind, Sprout, Utensils, Wheat, Compass, BookOpen, Activity } from 'lucide-react';
import { explainSolarTerm } from '../services/geminiService';
import { AttributeRadar } from './Charts';

interface TermModalProps {
  term: SolarTerm | null;
  onClose: () => void;
}

const TermModal: React.FC<TermModalProps> = ({ term, onClose }) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'astro' | 'pheno' | 'farm'>('overview');

  if (!term) return null;

  const handleAiExplain = async () => {
    setLoading(true);
    const text = await explainSolarTerm(term);
    setAiResponse(text);
    setLoading(false);
  };

  const tabs = [
      { id: 'overview', label: '综述', icon: BookOpen },
      { id: 'astro', label: '天象', icon: Compass },
      { id: 'pheno', label: '物候', icon: Sprout },
      { id: 'farm', label: '农耕', icon: Wheat },
  ] as const;

  return (
    <AnimatePresence>
      {term && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl h-[85vh] bg-[#0b0f19] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row"
          >
             {/* Close Button */}
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white bg-black/50 p-2 rounded-full hover:bg-white/10 transition-colors"
             >
                <X size={24} />
             </button>

            {/* Left Sidebar: Visuals & Stats (Fixed) */}
            <div className="w-full lg:w-[350px] bg-[#02040a] p-8 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col gap-8 relative flex-shrink-0">
                {/* Decorative BG */}
                <div 
                    className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none" 
                    style={{ backgroundColor: term.color }}
                ></div>

                {/* Header */}
                <div>
                     <div className="text-7xl font-bold text-white mb-2 tracking-tighter" style={{textShadow: `0 0 30px ${term.color}40`}}>{term.name}</div>
                     <div className="flex items-center gap-3">
                        <div className="px-2 py-0.5 rounded border border-white/10 text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-white/5">{term.category}</div>
                        <div className="text-cosmos-green font-mono tracking-widest uppercase text-sm">{term.enName}</div>
                     </div>
                     <div className="text-gray-500 font-mono text-xs mt-2">{term.date}</div>
                </div>

                {/* Poem Card */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="border-l-2 pl-4 py-1" style={{borderColor: term.color}}>
                         <div className="text-lg text-gray-200 font-serif italic leading-relaxed">
                            "{term.poem}"
                         </div>
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="flex-1 min-h-[200px] relative">
                    <AttributeRadar term={term} />
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Thermometer size={16} className="text-red-400" />
                        <span>{term.data.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <CloudRain size={16} className="text-blue-400" />
                        <span>{term.data.rainfall}mm</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Wind size={16} className="text-gray-400" />
                        <span>{term.data.humidity}%</span>
                    </div>
                     <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Activity size={16} className="text-yellow-400" />
                        <span>{term.data.sunlight}h</span>
                    </div>
                </div>
            </div>

            {/* Right Content: Tabbed Interface */}
            <div className="flex-1 flex flex-col bg-[#0b0f19] relative overflow-hidden">
                {/* Tabs Header */}
                <div className="flex border-b border-white/5 bg-black/20">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-5 text-sm font-bold tracking-wide transition-all relative ${
                                activeTab === tab.id ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                            }`}
                        >
                            <tab.icon size={16} className={activeTab === tab.id ? 'text-cosmos-cyan' : ''} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cosmos-cyan" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <div className="text-xl md:text-2xl leading-relaxed text-gray-200 font-serif">
                                        {term.description}
                                    </div>
                                    <div className="h-px bg-white/10 w-full"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                         <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                                             <div className="text-cosmos-green font-bold mb-2 flex items-center gap-2"><Utensils size={18}/> 养生食俗</div>
                                             <p className="text-gray-400 text-sm leading-loose">{term.diet}</p>
                                         </div>
                                         <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                                             <div className="text-cosmos-accent font-bold mb-2 flex items-center gap-2"><Bot size={18}/> 现代启示</div>
                                             <p className="text-gray-400 text-sm leading-loose">{term.extendedInfo?.modern || "数据加载中..."}</p>
                                         </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'astro' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-white mb-4">天象与黄经</h3>
                                    <p className="text-gray-300 leading-loose text-lg">{term.extendedInfo?.astronomy || "暂无详细天文数据"}</p>
                                    <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/20 mt-6">
                                        <div className="text-blue-400 font-mono text-xs uppercase mb-2">SOLAR LONGITUDE DATA</div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{width: `${(term.id / 24) * 100}%`}}></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                            <span>0° (VERNAL)</span>
                                            <span>180° (AUTUMNAL)</span>
                                            <span>360°</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'pheno' && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold text-white mb-4">物候三候</h3>
                                    <p className="text-gray-400 mb-6">{term.extendedInfo?.phenology_detail}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {term.pentads.map((p, i) => (
                                            <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-white/5 flex flex-col items-center text-center group hover:bg-slate-800 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-cosmos-green/10 text-cosmos-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform font-serif font-bold text-lg">
                                                    {i + 1}
                                                </div>
                                                <div className="text-white font-bold text-lg mb-2">{p}</div>
                                                <div className="text-gray-500 text-xs font-mono">PENTAD {i + 1}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'farm' && (
                                <div className="space-y-6">
                                     <h3 className="text-2xl font-bold text-white mb-4">农事指导与民俗</h3>
                                     <div className="prose prose-invert max-w-none">
                                         <p className="text-lg text-gray-300 leading-loose">{term.farming}</p>
                                         <h4 className="text-cosmos-cyan font-bold mt-8 mb-4">文化习俗</h4>
                                         <p className="text-gray-400 leading-loose">{term.extendedInfo?.culture}</p>
                                     </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* AI Footer */}
                <div className="p-6 border-t border-white/5 bg-[#080c14] flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-cosmos-accent animate-pulse"></div>
                         <div className="text-xs text-gray-500 font-mono">AI KNOWLEDGE ENGINE READY</div>
                     </div>
                     <button 
                        onClick={handleAiExplain}
                        className="flex items-center gap-2 px-4 py-2 bg-cosmos-accent text-white rounded-lg hover:bg-cosmos-accent/90 transition-colors text-sm font-bold shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                        disabled={loading}
                    >
                        {loading ? <span className="animate-spin">⟳</span> : <Sparkles size={16} />}
                        {loading ? 'CALCULATING...' : '生成深度报告'}
                    </button>
                </div>

                {/* AI Response Overlay (Optional, or inline) */}
                {aiResponse && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-20 left-6 right-6 bg-slate-900/95 border border-cosmos-accent/50 p-6 rounded-xl shadow-2xl backdrop-blur-xl z-20"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-cosmos-accent font-bold flex items-center gap-2"><Bot size={18}/> AI ANALYSIS</h4>
                            <button onClick={() => setAiResponse(null)} className="text-gray-500 hover:text-white"><X size={18}/></button>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed">{aiResponse}</p>
                    </motion.div>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermModal;