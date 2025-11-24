import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SolarTerm } from '../types';
import { Play, Pause, Sun, Globe, Compass } from 'lucide-react';

interface SolarOrbitSystemProps {
    terms: SolarTerm[];
    selectedTerm: SolarTerm;
    onSelectTerm: (term: SolarTerm) => void;
}

const SolarOrbitSystem: React.FC<SolarOrbitSystemProps> = ({ terms, selectedTerm, onSelectTerm }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: 600
                });
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                const currentIndex = terms.findIndex(t => t.id === selectedTerm.id);
                const nextIndex = (currentIndex + 1) % terms.length;
                onSelectTerm(terms[nextIndex]);
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isPlaying, selectedTerm, terms, onSelectTerm]);

    // Geometry Constants
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const orbitRadiusX = Math.min(dimensions.width, dimensions.height) * 0.35;
    const orbitRadiusY = orbitRadiusX * 0.85; // Slight ellipse

    // Helper to calculate position based on Solar Longitude
    const getTermPosition = (index: number) => {
        // Find index of Chunfen (Spring Equinox) to set as 0 deg anchor
        const springEquinoxIndex = terms.findIndex(t => t.name === '春分');
        
        // Calculate diff from spring equinox. 
        // Earth orbits counter-clockwise. Terms progress in order.
        // We map Chunfen to 0 degrees (Right side of circle in standard math)
        // Note: In heliocentric view, Earth is at 180 deg longitude when sun is at 0 deg longitude (Spring Equinox).
        // For simplicity of visualization, we will place Earth relative to the background stars (Yellow path).
        
        const diff = index - springEquinoxIndex;
        const angleDeg = diff * 15;
        const angleRad = (angleDeg * Math.PI) / 180; 
        
        const x = centerX + orbitRadiusX * Math.cos(angleRad);
        const y = centerY - orbitRadiusY * Math.sin(angleRad); // Minus Y because screen Y is down
        
        return { x, y, angleDeg, angleRad };
    };

    const selectedIndex = terms.findIndex(t => t.id === selectedTerm.id);
    const earthPos = getTermPosition(selectedIndex);
    
    // Solar Longitude calculation
    const springIdx = terms.findIndex(t => t.name === '春分');
    const rawLon = (selectedIndex - springIdx) * 15;
    const normalizedLongitude = rawLon < 0 ? 360 + rawLon : rawLon;

    return (
        <section className="w-full py-12 container mx-auto px-4 md:px-6 mb-24 relative" ref={containerRef}>
            {/* Header / HUD */}
            <div className="absolute top-0 left-4 z-10 p-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg">
                        <Sun size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-widest">黄道与光照</h2>
                        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">ECLIPTIC ILLUMINATION</p>
                    </div>
                </div>
            </div>

            {/* Info HUD Right */}
            <div className="absolute top-0 right-4 z-10 p-4 text-right">
                <div className="text-4xl font-mono text-white font-bold mb-1">
                    {normalizedLongitude}°
                </div>
                <div className="text-xs text-cosmos-cyan font-mono uppercase tracking-widest mb-4">
                    SOLAR LONGITUDE (黄经)
                </div>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 ml-auto px-4 py-2 bg-slate-800 border border-white/10 hover:border-cosmos-green text-cosmos-green rounded-full transition-all"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span className="text-xs font-bold">{isPlaying ? 'PAUSE ORBIT' : 'PLAY ORBIT'}</span>
                </button>
            </div>

            {/* Visualization Area */}
            <div className="relative w-full h-[600px] bg-[#020617] border border-white/10 rounded-3xl overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
                 {/* Starfield */}
                 <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-[#02040a] to-black"></div>
                 
                 <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
                     <defs>
                         <radialGradient id="sunGradient">
                             <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                             <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.8" />
                             <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
                         </radialGradient>
                         <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                             <feGaussianBlur stdDeviation="15" result="blur" />
                             <feComposite in="SourceGraphic" in2="blur" operator="over" />
                         </filter>
                     </defs>

                    {/* Orbit Path */}
                    <ellipse 
                        cx={centerX} 
                        cy={centerY} 
                        rx={orbitRadiusX} 
                        ry={orbitRadiusY} 
                        fill="none" 
                        stroke="#334155" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                        opacity="0.3"
                    />

                    {/* Solar Angle Lines */}
                    {terms.map((term, i) => {
                        const pos = getTermPosition(i);
                        const isSelected = selectedTerm.id === term.id;
                        return (
                            <g key={`guide-${i}`}>
                                <line 
                                    x1={centerX} 
                                    y1={centerY} 
                                    x2={pos.x} 
                                    y2={pos.y} 
                                    stroke={isSelected ? term.color : "#1e293b"}
                                    strokeWidth={isSelected ? 1 : 0.5}
                                    opacity={isSelected ? 0.4 : 0}
                                />
                            </g>
                        );
                    })}
                 </svg>

                 {/* Interactive Layer */}
                 <div className="absolute inset-0">
                     {/* The Sun */}
                     <div 
                        className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        style={{ left: centerX, top: centerY }}
                     >
                        <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-[40px] animate-pulse"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-600 rounded-full shadow-[0_0_30px_#f59e0b] z-20"></div>
                     </div>

                     {/* The Earth */}
                     <motion.div
                        className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 z-30"
                        animate={{ left: earthPos.x, top: earthPos.y }}
                        transition={{ type: "spring", stiffness: 40, damping: 20 }}
                     >
                         <div className="relative w-full h-full">
                             {/* Earth Body */}
                             <div className="w-full h-full bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] overflow-hidden border border-white/20 relative">
                                 <Globe size={32} className="text-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" />
                                 
                                 {/* Day/Night Terminator Simulation */}
                                 {/* 
                                     The shadow needs to always point AWAY from the sun.
                                     Since Earth orbits around Sun at center:
                                     If earth is at 0 deg (Right), Sun is left. Shadow is on Right side.
                                     We rotate the shadow mask based on the earth's angle.
                                 */}
                                 <div 
                                    className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent"
                                    style={{ 
                                        // The gradient goes right-to-left. 
                                        // If angle is 0 (Earth at Right), shadow should be on Right. 
                                        // Gradient default is Left(light) -> Right(dark) if we use 'to right'.
                                        // Actually let's use a simple overlay that rotates.
                                        // angleDeg is position relative to center.
                                        // If earth is at 0 deg (Right), we want shadow pointing Right (away from sun).
                                        // So rotation should be 0 deg?
                                        transform: `rotate(${earthPos.angleDeg}deg)` 
                                    }}
                                 ></div>
                             </div>
                             
                             {/* Label */}
                             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap">
                                 <div className="px-3 py-1 bg-black/80 border border-cosmos-cyan/30 rounded-full text-xs text-cosmos-cyan font-bold backdrop-blur-md shadow-lg flex flex-col items-center">
                                     <span>{selectedTerm.name}</span>
                                 </div>
                             </div>
                         </div>
                     </motion.div>

                     {/* Term Markers */}
                     {terms.map((term, i) => {
                         const pos = getTermPosition(i);
                         const isSelected = selectedTerm.id === term.id;
                         
                         return (
                             <button 
                                key={term.id}
                                className={`absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 z-20 group outline-none ${isSelected ? 'scale-150 bg-white shadow-[0_0_15px_white]' : 'bg-slate-800 border border-slate-600 hover:border-cosmos-cyan hover:scale-125'}`}
                                style={{ left: pos.x, top: pos.y }}
                                onClick={() => onSelectTerm(term)}
                             >
                                 <span className={`absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${isSelected ? 'hidden' : ''}`}>
                                     {term.enName}
                                 </span>
                             </button>
                         );
                     })}
                 </div>
            </div>

            {/* Timeline Slider Control */}
            <div className="mt-8 px-8 relative">
                 <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full bg-cosmos-cyan"
                        animate={{ width: `${((selectedIndex + 1) / 24) * 100}%` }}
                     />
                 </div>
                 <div className="flex justify-between mt-4">
                     {terms.filter((_, i) => i % 3 === 0).map((term) => ( // Show every 3rd term to avoid crowding
                         <div key={term.id} className="flex flex-col items-center">
                             <div className="h-2 w-[1px] bg-gray-600 mb-2"></div>
                             <span className="text-[10px] text-gray-500 font-mono uppercase">{term.enName}</span>
                         </div>
                     ))}
                 </div>
            </div>
        </section>
    );
};

export default SolarOrbitSystem;