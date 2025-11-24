import React, { useState } from 'react';
import BackgroundGrid from './components/BackgroundGrid';
import SolarWheel from './components/SolarWheel';
import InfoPanel from './components/InfoPanel';
import SeasonGrid from './components/SeasonGrid';
import Encyclopedia from './components/Encyclopedia';
import TermModal from './components/TermModal';
import IntroSection from './components/IntroSection';
import ChatWidget from './components/ChatWidget';
import SeasonImmersive from './components/SeasonImmersive';
import PentadMap from './components/PentadMap';
import TCMSection from './components/TCMSection';
import SolarOrbitSystem from './components/SolarOrbitSystem';
import QuoteSeparator from './components/QuoteSeparator';
import CosmicArchives from './components/CosmicArchives'; // IMPORTED
import { FullTrendChart, AttributeRadar, TrendChart } from './components/Charts';
import { SOLAR_TERMS } from './constants';
import { SolarTerm } from './types';
import { Activity, Radio, ChevronDown, Database, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<SolarTerm>(SOLAR_TERMS[0]);
  const [modalTerm, setModalTerm] = useState<SolarTerm | null>(null);

  const handleOpenModal = (term: SolarTerm) => {
      setModalTerm(term);
  };

  const handleCloseModal = () => {
      setModalTerm(null);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col text-slate-200 selection:bg-cosmos-green selection:text-black font-sans">
      <BackgroundGrid />
      <TermModal term={modalTerm} onClose={handleCloseModal} />
      <ChatWidget />

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none bg-gradient-to-b from-[#02040a] via-[#02040a]/80 to-transparent backdrop-blur-[2px]">
        <div className="pointer-events-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cosmos-green to-cosmos-cyan font-sans drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            二十四节气
          </h1>
          <p className="text-cosmos-green/60 font-mono text-xs md:text-sm tracking-[0.3em] mt-2">SOLAR TERM COSMOS</p>
        </div>
        <div className="flex flex-col items-end pointer-events-auto">
            <div className="flex items-center gap-2 text-cosmos-cyan text-xs font-mono mb-1">
                <Radio size={14} className="animate-pulse" />
                <span>实时连接 (LIVE)</span>
            </div>
            <div className="h-[1px] w-32 bg-cosmos-cyan/50 mb-1"></div>
            <div className="text-[10px] text-gray-500 font-mono text-right">
                观测地: 35.8617 N, 104.1954 E <br/> 数据源: 天文算法中心
            </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full pt-20">
        
        {/* === PART 1: INTRO CONTEXT === */}
        <IntroSection />
        
        {/* === PART 2: SOLAR ORBIT SYSTEM (Astronomy Core) === */}
        <SolarOrbitSystem 
            terms={SOLAR_TERMS} 
            selectedTerm={selectedTerm} 
            onSelectTerm={setSelectedTerm} 
        />

        <QuoteSeparator index={0} />

        {/* === PART 3: HERO DASHBOARD (VISUALIZER) === */}
        <section className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-140px)] mb-24 scroll-mt-24 pt-4" id="dashboard">
            {/* Left Col: Main Vis */}
            <div className="flex-1 lg:flex-[2] relative flex flex-col gap-4">
                <div className="flex-1 min-h-[600px] border border-white/5 bg-black/20 backdrop-blur-sm rounded-lg relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                    <SolarWheel 
                        terms={SOLAR_TERMS} 
                        selectedTerm={selectedTerm} 
                        onSelectTerm={setSelectedTerm} 
                        onOpenModal={handleOpenModal}
                    />
                </div>
                
                {/* Mini Charts Row */}
                <div className="h-48 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 bg-black/40 border border-white/10 rounded p-4 relative overflow-hidden">
                        <TrendChart data={SOLAR_TERMS} selectedTerm={selectedTerm} />
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded p-4 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2 text-cosmos-accent font-mono text-xs">
                            <Activity size={14} /> 系统诊断 (DIAGNOSTICS)
                        </div>
                        <div className="flex gap-1 h-12 items-end mb-4">
                            {[40, 70, 30, 80, 50, 90, 20, 60, 45, 80].map((h, i) => (
                                <div key={i} style={{height: `${h}%`}} className="flex-1 bg-cosmos-accent/30 hover:bg-cosmos-accent/80 transition-colors"></div>
                            ))}
                        </div>
                        <div className="text-[10px] text-gray-500 leading-tight">
                            物候模式与历史农业数据高度相关。数据流稳定。
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col: Info Panel */}
            <aside className="lg:w-96 flex flex-col gap-4">
                <div className="flex-1 bg-slate-950/80 border border-cosmos-cyan/20 backdrop-blur-md rounded-lg overflow-hidden flex flex-col shadow-lg min-h-[400px]">
                    <InfoPanel term={selectedTerm} />
                </div>
                <div className="h-64 bg-slate-950/50 border border-white/5 rounded-lg p-4">
                    <AttributeRadar term={selectedTerm} />
                </div>
            </aside>
        </section>

        {/* SECTION SEPARATOR */}
        <div className="flex items-center justify-center gap-4 mb-24 opacity-50">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-cosmos-green"></div>
            <div className="text-cosmos-green font-mono text-xs animate-bounce flex flex-col items-center">
                <span>DEEP DIVE SEQUENCE</span>
                <ChevronDown size={14} />
            </div>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-cosmos-green"></div>
        </div>

        {/* === PART 4: COSMIC ARCHIVES (NEW MASSIVE TEXT SECTION) === */}
        <CosmicArchives />

        <QuoteSeparator index={1} />

        {/* === PART 5: SEASONAL IMMERSIVE (FULL SCREENS) === */}
        <SeasonImmersive terms={SOLAR_TERMS} />

        {/* === PART 6: ENCYCLOPEDIA (TEXT) === */}
        <Encyclopedia />

        {/* === PART 7: PENTAD MATRIX (DATA) === */}
        <PentadMap terms={SOLAR_TERMS} />

        <QuoteSeparator index={2} />

        {/* === PART 8: GLOBAL ANALYTICS === */}
        <section className="mb-24 container mx-auto px-6">
             <div className="border-l-4 border-cosmos-cyan pl-6 mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">气候数据全景</h2>
                <p className="text-gray-400 font-mono text-sm max-w-2xl">
                    全年气候数据流可视化。展示了全部24个节气中温度波动与降水密度的相关性分析。
                </p>
            </div>
            <div className="w-full bg-slate-950/40 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                <FullTrendChart data={SOLAR_TERMS} />
            </div>
        </section>

        <QuoteSeparator index={3} />

        {/* === PART 9: TCM / YANG SHENG (BIO-RHYTHM) === */}
        <TCMSection />

        <QuoteSeparator index={0} />

        {/* === PART 10: SEASONAL ARCHIVE (GRID) === */}
        <section className="mb-24 mt-24 container mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
                 <Database className="text-cosmos-green" />
                 <h2 className="text-3xl font-bold text-white">节气档案 (ARCHIVE)</h2>
            </div>
            <SeasonGrid terms={SOLAR_TERMS} onSelectTerm={setSelectedTerm} onOpenModal={handleOpenModal} />
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-white/10 pt-10 pb-20 text-center">
            <div className="flex items-center justify-center gap-2 text-cosmos-green font-mono text-sm mb-4">
                <Globe size={16} />
                <span>SOLAR TERM COSMOS v3.2</span>
            </div>
            <p className="text-gray-600 text-xs max-w-md mx-auto leading-relaxed">
                以未来主义数据视角重构东方古老智慧。
                <br/>
                Powered by Gemini 2.5 Flash | React 19 | D3.js
            </p>
        </footer>

      </main>
      
      {/* Decorative vertical lines */}
      <div className="fixed top-0 bottom-0 left-8 md:left-12 w-[1px] bg-gradient-to-b from-transparent via-cosmos-green/10 to-transparent pointer-events-none hidden xl:block"></div>
      <div className="fixed top-0 bottom-0 right-8 md:right-12 w-[1px] bg-gradient-to-b from-transparent via-cosmos-cyan/10 to-transparent pointer-events-none hidden xl:block"></div>
    </div>
  );
};

export default App;