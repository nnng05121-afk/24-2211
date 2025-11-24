import React from 'react';
import { TIMELINE_DATA } from '../constants';
import { History } from 'lucide-react';

const TimelineSection: React.FC = () => {
    return (
        <section className="relative w-full py-32 container mx-auto px-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-20">
                <div className="p-3 rounded-lg bg-cosmos-accent/10 text-cosmos-accent border border-cosmos-accent/20">
                    <History size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-wider">历史回溯 · 时空演变</h2>
                    <p className="text-gray-500 font-mono text-xs mt-1 uppercase tracking-widest">Temporal Evolution Timeline</p>
                </div>
            </div>

            <div className="relative border-l border-gray-800 ml-4 md:ml-10 space-y-20">
                {TIMELINE_DATA.map((item, index) => (
                    <div key={index} className="relative pl-12 group">
                        {/* Dot */}
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-900 border border-gray-600 group-hover:border-cosmos-accent group-hover:bg-cosmos-accent transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                        
                        {/* Year Marker */}
                        <div className="absolute -left-[140px] top-1 w-[120px] text-right pr-4 hidden md:block">
                             <div className="text-cosmos-accent font-mono font-bold text-lg">{item.year}</div>
                             <div className="text-gray-600 text-xs">{item.cnYear}</div>
                        </div>
                        {/* Mobile Year Marker */}
                         <div className="md:hidden mb-2">
                             <span className="text-cosmos-accent font-mono font-bold text-sm mr-2">{item.year}</span>
                             <span className="text-gray-600 text-xs">{item.cnYear}</span>
                        </div>

                        {/* Content */}
                        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-lg backdrop-blur-sm group-hover:border-cosmos-accent/30 transition-all duration-500">
                            <h3 className="text-xl font-bold text-gray-200 mb-2">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TimelineSection;