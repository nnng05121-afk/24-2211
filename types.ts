export interface SolarTerm {
  id: number;
  name: string; // e.g., 立春
  pinyin: string;
  enName: string;
  date: string; // Approximate date
  description: string;
  category: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  color: string;
  data: {
    temperature: number; // Avg temp °C
    rainfall: number; // Avg rainfall mm
    humidity: number; // %
    sunlight: number; // Hours
  };
  poem: string;
  pentads: string[]; // The "Three Pentads" (一候, 二候, 三候)
  farming: string; // Agricultural activities
  diet: string; // Health/Diet advice (Yang Sheng)
}

export enum Season {
  Spring = 'Spring',
  Summer = 'Summer',
  Autumn = 'Autumn',
  Winter = 'Winter',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}