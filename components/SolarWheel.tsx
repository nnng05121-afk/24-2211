import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { SolarTerm } from '../types';

interface SolarWheelProps {
  terms: SolarTerm[];
  selectedTerm: SolarTerm;
  onSelectTerm: (term: SolarTerm) => void;
  onOpenModal: (term: SolarTerm) => void;
}

const SolarWheel: React.FC<SolarWheelProps> = ({ terms, selectedTerm, onSelectTerm, onOpenModal }) => {
  const width = 600;
  const height = 600;
  const radius = 220;
  const center = { x: width / 2, y: height / 2 };

  // Calculate positions for each term
  const termPositions = useMemo(() => {
    return terms.map((term, i) => {
      const angle = (i * 360) / 24 - 90; // Start from top (-90 deg)
      const rad = (angle * Math.PI) / 180;
      const x = center.x + radius * Math.cos(rad);
      const y = center.y + radius * Math.sin(rad);
      
      // Calculate positions for decorative lines
      const innerX = center.x + (radius - 40) * Math.cos(rad);
      const innerY = center.y + (radius - 40) * Math.sin(rad);
      const outerX = center.x + (radius + 60) * Math.cos(rad);
      const outerY = center.y + (radius + 60) * Math.sin(rad);

      return { ...term, x, y, angle, innerX, innerY, outerX, outerY };
    });
  }, [terms, center, radius]);

  // Map season to color for arc generation
  const seasonColors = {
    Spring: '#10b981',
    Summer: '#ef4444',
    Autumn: '#eab308',
    Winter: '#3b82f6'
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[600px]">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-[800px] max-h-[800px]">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Hub */}
        <circle cx={center.x} cy={center.y} r="40" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
        <circle cx={center.x} cy={center.y} r="20" fill="#06b6d4" fillOpacity="0.2" className="animate-pulse" />
        <text 
          x={center.x} 
          y={center.y} 
          dy="5" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="10" 
          className="font-mono tracking-widest"
        >
          EARTH
        </text>

        {/* Connecting Lines (Spider Web Effect) */}
        {termPositions.map((pos) => (
          <g key={`line-${pos.id}`}>
             <line 
              x1={center.x} y1={center.y} 
              x2={pos.x} y2={pos.y} 
              stroke={seasonColors[pos.category]} 
              strokeWidth="1" 
              opacity="0.1" 
            />
            {/* Tick marks */}
            <line x1={pos.innerX} y1={pos.innerY} x2={pos.x} y2={pos.y} stroke={seasonColors[pos.category]} strokeWidth="1" opacity="0.3" />
            
            {/* Selection Highlight Ring Segment */}
            {selectedTerm.id === pos.id && (
                <path
                    d={d3.arc()({
                        innerRadius: radius - 10,
                        outerRadius: radius + 10,
                        startAngle: ((pos.id - 1) * 2 * Math.PI) / 24,
                        endAngle: (pos.id * 2 * Math.PI) / 24
                    }) || ""}
                    transform={`translate(${center.x}, ${center.y}) rotate(-90)`} // Rotate to match standard SVG angle
                    fill={seasonColors[pos.category]}
                    opacity="0.2"
                />
            )}
          </g>
        ))}

        {/* The Terms Nodes */}
        {termPositions.map((pos) => {
          const isSelected = selectedTerm.id === pos.id;
          return (
            <motion.g
              key={pos.id}
              onClick={() => {
                  onSelectTerm(pos);
                  if (isSelected) onOpenModal(pos);
              }}
              className="cursor-pointer hover:opacity-100"
              initial={{ opacity: 0.6 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              animate={{ 
                scale: isSelected ? 1.2 : 1,
                opacity: isSelected ? 1 : 0.6
              }}
            >
              {/* Outer decorative circle for text placement */}
              <circle cx={pos.outerX} cy={pos.outerY} r="2" fill={seasonColors[pos.category]} />
              <line x1={pos.x} y1={pos.y} x2={pos.outerX} y2={pos.outerY} stroke={seasonColors[pos.category]} strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Main Node */}
              <circle 
                cx={pos.x} 
                cy={pos.y} 
                r={isSelected ? 8 : 4} 
                fill={isSelected ? '#fff' : seasonColors[pos.category]} 
                stroke={seasonColors[pos.category]}
                strokeWidth={2}
                filter={isSelected ? "url(#glow)" : ""}
              />

              {/* Text Label */}
              <text
                x={pos.outerX}
                y={pos.outerY}
                dx={pos.x > center.x ? 10 : -10}
                dy={4}
                textAnchor={pos.x > center.x ? 'start' : 'end'}
                fill={isSelected ? '#fff' : '#94a3b8'}
                fontSize={isSelected ? "14" : "10"}
                fontWeight={isSelected ? "bold" : "normal"}
                className="font-sans"
              >
                {pos.name}
              </text>
              {isSelected && (
                 <text
                 x={pos.outerX}
                 y={pos.outerY}
                 dx={pos.x > center.x ? 10 : -10}
                 dy={16}
                 textAnchor={pos.x > center.x ? 'start' : 'end'}
                 fill={seasonColors[pos.category]}
                 fontSize="8"
                 className="font-mono uppercase tracking-widest"
               >
                 {pos.enName}
               </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default SolarWheel;