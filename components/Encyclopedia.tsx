import React from 'react';
import { ENCYCLOPEDIA_CONTENT } from '../constants';
import { Book, Compass, CloudRain, Wheat, User } from 'lucide-react';

const SectionBlock = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    children 
}: { 
    icon: any, 
    title: string, 
    subtitle: string, 
    children?: React.ReactNode 
}) => (
    <div className="mb-20 last:mb-0 relative group">
        <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gray-800 hidden md:block group-hover:bg-cosmos-green/50 transition-colors"></div>
        <div className="absolute -left-[54px] top-0 w-3 h-3 rounded-full bg-slate-900 border border-gray-600 hidden md:block group-hover:border-cosmos-green group-hover:bg-cosmos-green transition-colors"></div>
        
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-slate-900 border border-white/10 text-cosmos-green shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-xs font-mono text-gray-500 tracking-[0.2em] uppercase">{subtitle}</p>
            </div>
        </div>
        <div className="pl-2 md:pl-0 text-gray-400 leading-loose space-y-6 text-justify">
            {children}
        </div>
    </div>
);

const Encyclopedia: React.FC = () => {
    return (
        <section className="relative container mx-auto px-6 py-24 max-w-4xl">
            {/* Header */}
            <div className="text-center mb-24">
                <div className="inline-block p-2 px-4 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-400 mb-4">
                    KNOWLEDGE BASE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6">
                    二十四节气 · 数字百科
                </h2>
                <div className="h-1 w-24 bg-cosmos-green mx-auto rounded-full"></div>
            </div>

            <div className="relative">
                 {/* Intro */}
                <SectionBlock icon={Book} title={ENCYCLOPEDIA_CONTENT.intro.title} subtitle={ENCYCLOPEDIA_CONTENT.intro.subtitle}>
                    <p className="text-lg text-gray-200 font-serif italic border-l-4 border-white/10 pl-6 py-2">
                        {ENCYCLOPEDIA_CONTENT.intro.body}
                    </p>
                </SectionBlock>

                {/* Astronomy */}
                <SectionBlock icon={Compass} title={ENCYCLOPEDIA_CONTENT.astronomy.title} subtitle={ENCYCLOPEDIA_CONTENT.astronomy.subtitle}>
                    {ENCYCLOPEDIA_CONTENT.astronomy.body.map((p, i) => <p key={i}>{p}</p>)}
                </SectionBlock>

                {/* Phenology */}
                <SectionBlock icon={CloudRain} title={ENCYCLOPEDIA_CONTENT.phenology.title} subtitle={ENCYCLOPEDIA_CONTENT.phenology.subtitle}>
                    {ENCYCLOPEDIA_CONTENT.phenology.body.map((p, i) => <p key={i}>{p}</p>)}
                </SectionBlock>

                {/* Agriculture */}
                <SectionBlock icon={Wheat} title={ENCYCLOPEDIA_CONTENT.agriculture.title} subtitle={ENCYCLOPEDIA_CONTENT.agriculture.subtitle}>
                    {ENCYCLOPEDIA_CONTENT.agriculture.body.map((p, i) => <p key={i}>{p}</p>)}
                </SectionBlock>

                {/* Culture */}
                <SectionBlock icon={User} title={ENCYCLOPEDIA_CONTENT.culture.title} subtitle={ENCYCLOPEDIA_CONTENT.culture.subtitle}>
                    {ENCYCLOPEDIA_CONTENT.culture.body.map((p, i) => <p key={i}>{p}</p>)}
                </SectionBlock>
            </div>
        </section>
    );
};

export default Encyclopedia;