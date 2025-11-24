import React from 'react';
import { SolarTerm } from '../types';
import { SEASON_DESCRIPTIONS } from '../constants';
import { CloudRain, Sun, Leaf, Snowflake, ChevronRight } from 'lucide-react';

interface SeasonGridProps {
  terms: SolarTerm[];
  onSelectTerm: (term: SolarTerm) => void;
  onOpenModal: (term: SolarTerm) => void;
}

const SeasonIcon = ({ season, className }: { season: string; className?: string }) => {
    switch (season) {
        case 'Spring': return <Leaf className={`text-cosmos-green ${className}`} />;
        case 'Summer': return <Sun className={`text-red-500 ${className}`} />;
        case 'Autumn': return <CloudRain className={`text-amber-500 ${className}`} />;
        case 'Winter': return <Snowflake className={`text-blue-500 ${className}`} />;
        default: return null;
    }
}

const SeasonSection: React.FC<{ 
    season: string; 
    terms: SolarTerm[]; 
    onSelectTerm: (term: SolarTerm) => void;
    onOpenModal: (term: SolarTerm) => void;
}> = ({ season, terms, onSelectTerm, onOpenModal }) => {
    // Mapping internal English keys to Chinese Display
    const seasonMap: Record<string, string> = {
        'Spring': '春季',
        'Summer': '夏季',
        'Autumn': '秋季',
        'Winter': '冬季'
    };
    
    const displayTitle = seasonMap[season];
    const description = SEASON_DESCRIPTIONS[season as keyof typeof SEASON_DESCRIPTIONS];

    return (
        <div className="mb-16">
            <div className="flex items-end gap-4 mb-6 border-b border-gray-800 pb-2">
                <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                    <SeasonIcon season={season} className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-wider">
                        {displayTitle} <span className="text-lg text-gray-600 font-mono ml-2 uppercase">{season}</span>
                    </h2>
                    <p className="text-gray-500 font-mono text-sm mt-1">{description}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {terms.map(term => (
                    <div 
                        key={term.id}
                        onClick={() => onOpenModal(term)}
                        className="group relative bg-slate-900/40 border border-white/5 hover:border-cosmos-cyan/50 p-4 rounded-lg cursor-pointer transition-all hover:bg-slate-800/60 overflow-hidden"
                    >
                         <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/5 to-transparent -mr-6 -mt-6 rounded-full group-hover:from-cosmos-cyan/20 transition-all"></div>
                        
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-200 group-hover:text-cosmos-cyan transition-colors">{term.name}</h3>
                            <span className="text-[10px] text-gray-500 font-mono border border-gray-800 px-1 rounded">{term.id.toString().padStart(2, '0')}</span>
                        </div>
                        <div className="text-xs text-cosmos-green font-mono uppercase tracking-wider mb-2">{term.enName}</div>
                        <div className="text-xs text-gray-400 font-mono mb-3">{term.date}</div>
                        
                        <div className="h-[1px] w-full bg-gray-800 mb-3"></div>
                        
                        <div className="flex items-center justify-between mt-auto">
                            <div className="text-[10px] text-gray-500 bg-black/20 px-2 py-1 rounded">
                                查看详情
                            </div>
                            <ChevronRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SeasonGrid: React.FC<SeasonGridProps> = ({ terms, onSelectTerm, onOpenModal }) => {
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

  return (
    <div className="w-full">
        {seasons.map(season => (
            <SeasonSection 
                key={season}
                season={season}
                terms={terms.filter(t => t.category === season)}
                onSelectTerm={onSelectTerm}
                onOpenModal={onOpenModal}
            />
        ))}
    </div>
  );
};

export default SeasonGrid;