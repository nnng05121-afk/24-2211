import React, { useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Globe, Info } from 'lucide-react';

interface GeoFeature {
  type: string;
  properties: {
    name: string;
    [key: string]: any;
  };
  geometry: any;
}

const HIGHLIGHTS: Record<string, { level: string; desc: string; color: string }> = {
  "China": { level: "Origin", desc: "Origin (Yellow River Basin) - 11th Century BC", color: "#10b981" },
  "Japan": { level: "Influence", desc: "Adapted as 'Sekki' - Heian Period", color: "#06b6d4" },
  "South Korea": { level: "Influence", desc: "Integrated into Agricultural Calendar", color: "#06b6d4" },
  "North Korea": { level: "Influence", desc: "Traditional Usage Preserved", color: "#06b6d4" },
  "Vietnam": { level: "Influence", desc: "Tiết Khí - Lunar Calendar Integration", color: "#06b6d4" },
};

const WorldMapSolarTerms: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoFeature[] | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: any } | null>(null);
  const [loading, setLoading] = useState(true);

  // SVG dimensions
  const width = 1000;
  const height = 500;

  useEffect(() => {
    // Fetch a simplified world GeoJSON
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(data => {
        setGeoData(data.features);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load map data", err);
        setLoading(false);
      });
  }, []);

  const projection = useMemo(() => {
    return d3.geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.5]); // Adjust center to focus slightly more on Asia/Global
  }, []);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  const handleMouseEnter = (e: React.MouseEvent, feature: GeoFeature) => {
    const name = feature.properties.name;
    if (HIGHLIGHTS[name]) {
      const rect = (e.target as Element).getBoundingClientRect();
      setTooltip({
        x: e.clientX,
        y: e.clientY - 20,
        content: { name, ...HIGHLIGHTS[name] }
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <section className="w-full py-24 container mx-auto px-6 max-w-6xl relative">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-blue-900/20 border border-blue-500/30 text-blue-400 rounded-lg">
           <Globe size={24} />
        </div>
        <div>
           <h2 className="text-3xl font-bold text-white tracking-wide">全球影响力分布</h2>
           <p className="text-blue-500/60 font-mono text-xs mt-1 uppercase tracking-widest">GLOBAL DISTRIBUTION & INFLUENCE</p>
        </div>
      </div>

      <div className="relative w-full aspect-[2/1] bg-[#020617] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {loading ? (
          <div className="flex items-center justify-center h-full text-cosmos-cyan animate-pulse font-mono">
            INITIALIZING SATELLITE LINK...
          </div>
        ) : (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
               <filter id="glow-map" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
            </defs>

            {/* Graticule (Grid lines) */}
            <path 
                d={d3.geoPath().projection(projection)(d3.geoGraticule10() as any) || undefined} 
                fill="none" 
                stroke="#1e293b" 
                strokeWidth="0.5" 
            />

            {geoData?.map((feature, i) => {
              const name = feature.properties.name;
              const isHighlighted = !!HIGHLIGHTS[name];
              const highlight = HIGHLIGHTS[name];
              const pathD = pathGenerator(feature);

              if (!pathD) return null;

              return (
                <g key={i}>
                  <path
                    d={pathD}
                    fill={isHighlighted ? highlight.color : "#0f172a"}
                    fillOpacity={isHighlighted ? 0.6 : 0.8}
                    stroke={isHighlighted ? highlight.color : "#334155"}
                    strokeWidth={isHighlighted ? 1.5 : 0.5}
                    className="transition-all duration-300 hover:fill-opacity-80 cursor-default"
                    filter={isHighlighted ? "url(#glow-map)" : ""}
                    onMouseEnter={(e) => handleMouseEnter(e, feature)}
                    onMouseLeave={handleMouseLeave}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-lg pointer-events-none">
             <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Map Legend</div>
             <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                     <span className="w-3 h-3 bg-[#10b981] rounded-sm shadow-[0_0_10px_#10b981]"></span>
                     <span className="text-xs text-gray-300">Origin (China)</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="w-3 h-3 bg-[#06b6d4] rounded-sm shadow-[0_0_10px_#06b6d4]"></span>
                     <span className="text-xs text-gray-300">Cultural Influence (East Asia)</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="w-3 h-3 border border-gray-600 bg-[#0f172a] rounded-sm"></span>
                     <span className="text-xs text-gray-500">Global Recognition (UNESCO)</span>
                 </div>
             </div>
        </div>

        {/* Scanline */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_4s_linear_infinite] pointer-events-none"></div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div 
            className="fixed z-50 pointer-events-none bg-slate-900/90 border border-cosmos-cyan/50 p-3 rounded-lg backdrop-blur-md shadow-xl max-w-[200px]"
            style={{ left: tooltip.x + 10, top: tooltip.y - 10 }}
        >
             <div className="text-cosmos-cyan font-bold text-sm mb-1">{tooltip.content.name}</div>
             <div className="text-[10px] bg-white/10 text-white px-1.5 py-0.5 rounded w-fit mb-2">
                 {tooltip.content.level.toUpperCase()}
             </div>
             <div className="text-xs text-gray-400 leading-tight">
                 {tooltip.content.desc}
             </div>
        </div>
      )}
    </section>
  );
};

export default WorldMapSolarTerms;