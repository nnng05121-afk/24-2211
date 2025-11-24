import React from 'react';
import { SolarTerm } from '../types';
import { Grid3X3 } from 'lucide-react';

interface PentadMapProps {
    terms: SolarTerm[];
}

const PentadMap: React.FC<PentadMapProps> = ({ terms }) => {
    return (
        <section className="w-full py-24 container mx-auto px-4 md:px-6">
            <div className="mb-12 flex items-end gap-4">
                 <div className="p-3 bg-slate-900 border border-cosmos-cyan/30 text-cosmos-cyan rounded-lg">
                    <Grid3X3 size={24} />
                 </div>
                 <div>
                     <h2 className="text-3xl font-bold text-white">七十二候微气候矩阵</h2>
                     <p className="text-gray-500 font-mono text-xs mt-1 uppercase tracking-widest">THE 72 PENTADS MICRO-CLIMATE MATRIX</p>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {terms.map(term => (
                    <div key={term.id} className="bg-slate-950/50 border border-white/5 p-4 rounded-lg hover:border-cosmos-cyan/30 transition-colors">
                        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                             <div className="font-bold text-cosmos-cyan">{term.name}</div>
                             <div className="text-[10px] text-gray-600 font-mono">{term.enName}</div>
                        </div>
                        <div className="space-y-3">
                            {term.pentads.map((pentad, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                                    <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-default">
                                        <span className="text-gray-600 text-xs font-mono mr-2">
                                            {idx === 0 ? '一候' : idx === 1 ? '二候' : '三候'}
                                        </span>
                                        {pentad}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-600 font-mono">
                每五日为一候，三候为一气，六气为一季，四季为一岁。
            </div>
        </section>
    );
};

export default PentadMap;