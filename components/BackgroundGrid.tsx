import React from 'react';

const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Radial Gradient Center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#02040a] to-[#02040a]" />

      {/* Grid Lines */}
      <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
             <rect width="200" height="200" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="4 4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#grid-large)" />
      </svg>
      
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cosmos-green/20 rounded-full animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cosmos-cyan/20 rounded-full animate-reverse-spin border-dashed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-cosmos-accent/10 rounded-full animate-spin-slow" style={{ animationDuration: '120s' }} />

      {/* Top right decorative text */}
      <div className="absolute top-10 right-10 text-xs text-cosmos-green font-mono opacity-60 writing-vertical-rl">
        SYSTEM_STATUS: ONLINE<br/>
        DATA_STREAM: ACTIVE<br/>
        NODE: EARTH_OBSERVATORY
      </div>
    </div>
  );
};

export default BackgroundGrid;