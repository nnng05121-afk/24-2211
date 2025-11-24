import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SolarTerm } from '../types';
import { Bot, Sparkles, X, Thermometer, CloudRain, Wind, Sprout, Utensils, Wheat } from 'lucide-react';
import { explainSolarTerm } from '../services/geminiService';
import { AttributeRadar } from './Charts';

interface TermModalProps {
  term: SolarTerm | null;
  onClose: () => void;
}

const TermModal: React.FC<TermModalProps> = ({ term, onClose }) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!term) return null;

  const handleAiExplain = async () => {
    setLoading(true);
    const text = await explainSolarTerm(term);
    setAiResponse(text);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {term && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#020617] border border-cosmos-green/30 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col md:flex-row"
          >
             {/* Close Button */}
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
             >
                <X size={24} />
             </button>

            {/* Left Sidebar: Visuals & Stats */}
            <div className="w-full md:w-1/3 bg-slate-900/50 p-6 md:p-8 border-r border-white/5 flex flex-col gap-6 relative overflow-hidden">
                {/* Decorative BG */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cosmos-green to-transparent"></div>
                <div 
                    className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none" 
                    style={{ backgroundColor: term.color }}
                ></div>

                {/* Header */}
                <div>
                     <div className="text-6xl font-bold text-white mb-2 tracking-tighter shadow-black drop-shadow-lg">{term.name}</div>
                     <div className="text-cosmos-green font-mono tracking-[0.2em] uppercase text-sm mb-1">{term.enName}</div>
                     <div className="text-gray-400 font-mono text-sm">{term.date}</div>
                </div>

                {/* Poem Card */}
                <div className="bg-black/40 border border-white/10 p-4 rounded-lg italic text-gray-300 font-serif text-center leading-relaxed relative">
                    <span className="absolute top-2 left-2 text-4xl text-white/10 font-serif">"</span>
                    {term.poem}
                    <span className="absolute bottom-2 right-2 text-4xl text-white/10 font-serif">"</span>
                </div>

                {/* Radar Chart */}
                <div className="flex-1 min-h-[180px]">
                    <AttributeRadar term={term} />
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Thermometer size={14} className="text-red-400" />
                        <span>{term.data.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <CloudRain size={14} className="text-blue-400" />
                        <span>{term.data.rainfall}mm</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Wind size={14} className="text-gray-400" />
                        <span>{term.data.humidity}%</span>
                    </div>
                </div>
            </div>

            {/* Right Content: Details & AI */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                
                {/* Phenology (Three Pentads) */}
                <div className="mb-8">
                    <h3 className="flex items-center gap-2 text-cosmos-cyan font-bold mb-4">
                        <Sprout size={18} />
                        <span className="tracking-widest uppercase text-sm">Phenology (三候)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {term.pentads.map((p, i) => (
                            <div key={i} className="bg-slate-900/80 border border-white/5 p-3 rounded flex flex-col items-center text-center gap-2 hover:border-cosmos-cyan/30 transition-colors">
                                <div className="text-xs text-gray-500 font-mono mb-1">第 {i+1} 候</div>
                                <div className="text-gray-200 font-bold">{p}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8 text-gray-300 leading-loose text-sm md:text-base border-l-2 border-cosmos-green/20 pl-4">
                    {term.description}
                </div>

                {/* Farming & Diet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                     <div className="bg-slate-900/30 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                            <Wheat size={16} /> 农事指导
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{term.farming}</p>
                     </div>
                     <div className="bg-slate-900/30 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center gap-2 text-pink-400 font-bold text-sm mb-2">
                            <Utensils size={16} /> 养生食俗
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{term.diet}</p>
                     </div>
                </div>

                {/* AI Section (At Bottom) */}
                <div className="mt-auto border-t border-gray-800 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                             <div className="bg-cosmos-accent/10 p-2 rounded-lg">
                                 <Bot size={20} className="text-cosmos-accent" />
                             </div>
                             <div>
                                 <div className="text-white font-bold text-sm">AI 深度洞察</div>
                                 <div className="text-[10px] text-gray-500 font-mono">POWERED BY GEMINI 2.5</div>
                             </div>
                        </div>
                        <button 
                            onClick={handleAiExplain}
                            disabled={loading || !!aiResponse}
                            className="flex items-center gap-2 px-4 py-2 bg-cosmos-accent/10 text-cosmos-accent border border-cosmos-accent/20 rounded hover:bg-cosmos-accent hover:text-white transition-all text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <Sparkles size={14} />}
                            {loading ? "分析计算中..." : "生成更多知识"}
                        </button>
                    </div>
                    
                    {/* AI Output Area */}
                    <div className="min-h-[100px] bg-black/40 border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300 relative overflow-hidden">
                        {aiResponse ? (
                             <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="leading-relaxed"
                             >
                                 <span className="text-cosmos-accent mr-2">➜</span>
                                 {aiResponse}
                             </motion.div>
                        ) : (
                            <div className="text-gray-600 italic flex items-center justify-center h-full opacity-50">
                                等待指令... 点击按钮获取该节气的现代科学解读、历史典故扩展及个性化建议。
                            </div>
                        )}
                         {/* Scanline effect */}
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none animate-[pulse_4s_ease-in-out_infinite] translate-y-[-100%]"></div>
                    </div>
                </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermModal;