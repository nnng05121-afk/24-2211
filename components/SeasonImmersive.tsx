import React from 'react';
import { SolarTerm } from '../types';

interface SeasonImmersiveProps {
    terms: SolarTerm[];
}

const SeasonCard: React.FC<{ 
    season: string; 
    cnSeason: string;
    description: string;
    color: string;
    terms: SolarTerm[] 
}> = ({ season, cnSeason, description, color, terms }) => {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row relative border-t border-white/5 overflow-hidden">
             {/* Big Typo BG */}
             <div className="absolute top-0 right-0 text-[20vw] font-black text-white/5 select-none leading-none pointer-events-none overflow-hidden">
                {season}
             </div>

             {/* Left: Intro */}
             <div className="w-full md:w-1/3 p-12 md:p-24 flex flex-col justify-center relative z-10 bg-gradient-to-r from-[#02040a] to-transparent">
                 <div className="text-xs font-mono text-gray-500 mb-4 tracking-[0.5em] uppercase">SEASONAL PHASE</div>
                 <h2 className="text-6xl md:text-8xl font-bold text-white mb-6" style={{textShadow: `0 0 30px ${color}40`}}>{cnSeason}</h2>
                 <p className="text-gray-400 text-lg leading-relaxed mb-12 border-l-4 pl-6" style={{borderColor: color}}>
                     {description}
                 </p>
                 <div className="flex flex-wrap gap-2">
                     {terms.map(t => (
                         <span key={t.id} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-gray-500">
                             {t.enName}
                         </span>
                     ))}
                 </div>
             </div>

             {/* Right: Visual Abstract */}
             <div className="w-full md:w-2/3 relative flex items-center justify-center">
                  <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/10 flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
                        <div className="absolute inset-0 rounded-full blur-[100px] opacity-30" style={{backgroundColor: color}}></div>
                        <div className="w-[80%] h-[80%] border border-dashed border-white/20 rounded-full"></div>
                        <div className="w-[60%] h-[60%] border border-white/10 rounded-full flex items-center justify-center">
                             <div className="text-4xl font-mono text-white/20">{season}</div>
                        </div>
                  </div>
             </div>
        </div>
    );
};

const SeasonImmersive: React.FC<SeasonImmersiveProps> = ({ terms }) => {
    return (
        <div className="w-full">
            <SeasonCard 
                season="SPRING" 
                cnSeason="春" 
                description="阳气回升，万物复苏。东风解冻，蛰虫始振。春季是生命的起点，是耕耘的序曲，大地从沉睡中苏醒，能量开始向上升腾。"
                color="#10b981"
                terms={terms.filter(t => t.category === 'Spring')}
            />
            <SeasonCard 
                season="SUMMER" 
                cnSeason="夏" 
                description="繁荣盛极，万物竞长。日北至，日长之至。夏季是能量的巅峰，热量与光照达到极致，生命在烈日与暴雨中展现出最强韧的姿态。"
                color="#ef4444"
                terms={terms.filter(t => t.category === 'Summer')}
            />
             <SeasonCard 
                season="AUTUMN" 
                cnSeason="秋" 
                description="丰收敛藏，气肃而凝。阳气渐收，阴气渐长。秋季是成熟的季节，也是内敛的开始，万物在辉煌过后回归平静，准备迎接寒冷。"
                color="#eab308"
                terms={terms.filter(t => t.category === 'Autumn')}
            />
             <SeasonCard 
                season="WINTER" 
                cnSeason="冬" 
                description="闭藏休养，蓄势待发。水始冰，地始冻。冬季是生命的沉淀期，万物归根，在寒冷的包裹下积蓄力量，等待下一个轮回的开始。"
                color="#3b82f6"
                terms={terms.filter(t => t.category === 'Winter')}
            />
        </div>
    );
};

export default SeasonImmersive;