import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, CartesianGrid, ComposedChart, Bar, Line } from 'recharts';
import { SolarTerm } from '../types';

interface ChartsProps {
  data: SolarTerm[];
  selectedTerm: SolarTerm;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-cosmos-green p-3 rounded shadow-lg backdrop-blur-md">
        <p className="text-cosmos-green text-sm font-bold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
             <p key={index} style={{ color: entry.color }} className="text-xs font-mono">
                {entry.name === 'data.temperature' || entry.name === 'Temperature' ? '气温' : 
                 entry.name === 'data.rainfall' || entry.name === 'Rainfall' ? '降水' : entry.name}: {entry.value}
             </p>
        ))}
      </div>
    );
  }
  return null;
};

export const TrendChart: React.FC<ChartsProps> = ({ data, selectedTerm }) => {
  return (
    <div className="w-full h-40">
       <h3 className="text-xs font-mono text-gray-500 mb-2 flex items-center">
        <span className="w-2 h-2 bg-cosmos-green mr-2 rounded-full"></span>
        全年气温走势 (ANNUAL TEMP)
       </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} interval={3} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize: 9, fill: '#64748b'}} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="data.temperature" name="Temperature" stroke="#10b981" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FullTrendChart: React.FC<{ data: SolarTerm[] }> = ({ data }) => {
    return (
      <div className="w-full h-80">
         <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-mono text-cosmos-cyan flex items-center">
                <span className="w-2 h-2 bg-cosmos-cyan mr-2 rounded-full animate-pulse"></span>
                气候相关性分析 · 气温与降水 [CLIMATE CORRELATION]
             </h3>
         </div>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 12, fill: '#94a3b8'}} interval={0} axisLine={{stroke: '#334155'}} tickLine={false} />
            <YAxis yAxisId="left" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} label={{ value: '气温 (°C)', angle: -90, position: 'insideLeft', fill: '#10b981', fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} label={{ value: '降水 (mm)', angle: 90, position: 'insideRight', fill: '#3b82f6', fontSize: 10 }}/>
            <Tooltip content={<CustomTooltip />} />
            
            <Area yAxisId="right" type="monotone" dataKey="data.rainfall" name="Rainfall" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRain)" />
            <Line yAxisId="left" type="monotone" dataKey="data.temperature" name="Temperature" stroke="#10b981" strokeWidth={3} dot={{r: 3, fill: '#02040a', stroke: '#10b981', strokeWidth: 2}} />
            
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
};

export const AttributeRadar: React.FC<{ term: SolarTerm }> = ({ term }) => {
  // Normalize data for radar chart roughly to 0-100 scale for visualization
  const radarData = [
    { subject: '气温', A: (term.data.temperature + 10) * 2.5, fullMark: 100 }, // Shift temp up for visualization
    { subject: '降水', A: term.data.rainfall, fullMark: 150 },
    { subject: '湿度', A: term.data.humidity, fullMark: 100 },
    { subject: '日照', A: term.data.sunlight * 6, fullMark: 100 },
  ];

  return (
    <div className="w-full h-40 relative">
        <h3 className="text-xs font-mono text-gray-500 mb-2 absolute top-0 left-0">
            当季气候指标 (METRICS)
       </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name={term.name}
            dataKey="A"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="#06b6d4"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};