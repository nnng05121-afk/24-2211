import React from 'react';
import { SolarTerm } from '../types';
import { MousePointerClick } from 'lucide-react';

interface InfoPanelProps {
  term: SolarTerm;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ term }) => {
  return (
    <div className="h-full flex flex-col gap-4 p-6 justify-center">
      {/* Header Block */}
      <div className="border-l-4 pl-6 py-2 border-cosmos-green bg-gradient-to-r from-cosmos-green/10 to-transparent">
        <h2 className="text-5xl font-bold text-white mb-2">{term.name}</h2>
        <div className="flex justify-between items-baseline">
          <span className="text-cosmos-green text-sm font-mono tracking-widest uppercase">{term.enName}</span>
          <span className="text-gray-400 font-mono text-sm">{term.date}</span>
        </div>
      </div>

      <div className="text-gray-400 leading-relaxed text-sm my-4">
         {term.description}
      </div>

      <div className="mt-auto flex items-center gap-2 text-cosmos-cyan animate-pulse text-xs font-mono uppercase tracking-widest border border-cosmos-cyan/30 rounded px-3 py-2 w-fit">
        <MousePointerClick size={14} />
        Click Wheel Node for Full Data Card
      </div>
    </div>
  );
};

export default InfoPanel;