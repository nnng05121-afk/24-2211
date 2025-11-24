import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sprout, Wheat, Feather, X, ChevronDown, ChevronRight } from 'lucide-react';
import { ARCHIVE_DATA } from '../constants';

const CosmicArchives: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>(null);

    const getIcon = (iconName: string, size = 24) => {
        switch(iconName) {
            case 'Compass': return <Compass size={size} />;
            case 'Sprout': return <Sprout size={size} />;
            case 'Wheat': return <Wheat size={size} />;
            case 'Feather': return <Feather size={size} />;
            default: return <Compass size={size} />;
        }
    };

    return (
        <section className="w-full py-24 container mx-auto px-6 relative">
             <div className="flex items-end gap-6 mb-12">
                 <div className="p-4 bg-purple-900/20 border border-purple-500/30 text-purple-500 rounded-xl">
                    <Feather size={32} />
                 </div>
                 <div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">宇宙档案 · 知识矩阵</h2>
                    <p className="text-purple-500/60 font-mono text-sm mt-2 uppercase tracking-[0.3em]">COSMIC KNOWLEDGE ARCHIVES</p>
                 </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {ARCHIVE_DATA.map((item) => {
                     const isActive = activeId === item.id;
                     return (
                         <motion.div
                            layout
                            key={item.id}
                            onClick={() => setActiveId(isActive ? null : item.id)}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-colors duration-500 ${
                                isActive 
                                ? 'col-span-1 md:col-span-2 lg:col-span-4 bg-slate-900 border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
                                : 'bg-slate-900/40 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/60'
                            }`}
                         >
                             <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                                 <div className="flex justify-between items-start mb-4">
                                     <div className={`p-3 rounded-lg transition-colors ${isActive ? 'bg-purple-500 text-white' : 'bg-white/5 text-purple-400'}`}>
                                         {getIcon(item.icon, isActive ? 28 : 24)}
                                     </div>
                                     <div className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                                         <ChevronDown size={20} className="text-gray-500" />
                                     </div>
                                 </div>

                                 <h3 className={`text-xl font-bold mb-1 ${isActive ? 'text-white text-2xl' : 'text-gray-200'}`}>
                                     {item.title}
                                 </h3>
                                 <div className="text-xs font-mono text-purple-500/80 uppercase tracking-widest mb-4">
                                     {item.subtitle}
                                 </div>

                                 <AnimatePresence mode="wait">
                                     {isActive ? (
                                         <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-gray-300 leading-loose text-base md:text-lg border-t border-white/10 pt-6 mt-2"
                                         >
                                             <div className="whitespace-pre-line text-justify columns-1 md:columns-2 gap-12">
                                                 {item.content}
                                             </div>
                                         </motion.div>
                                     ) : (
                                         <motion.p 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-gray-500 text-sm line-clamp-3"
                                         >
                                             {item.summary}
                                         </motion.p>
                                     )}
                                 </AnimatePresence>
                             </div>

                             {/* Decorative Background Elements */}
                             {isActive && (
                                 <>
                                     <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
                                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
                                 </>
                             )}
                         </motion.div>
                     );
                 })}
             </div>
        </section>
    );
};

export default CosmicArchives;