import React from 'react';
import { QUOTES } from '../constants';
import { Quote } from 'lucide-react';

interface QuoteSeparatorProps {
    index: number;
}

const QuoteSeparator: React.FC<QuoteSeparatorProps> = ({ index }) => {
    // Ensure index is valid
    const safeIndex = Math.abs(index) % QUOTES.length;
    const quote = QUOTES[safeIndex];

    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center relative overflow-hidden my-24">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmos-green/20 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmos-cyan/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-3xl text-center px-6">
                <Quote size={48} className="text-white/10 mx-auto mb-8" />
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400 leading-tight mb-6">
                    "{quote.text}"
                </h2>
                <p className="text-gray-400 font-serif italic text-lg mb-8">
                    {quote.sub}
                </p>
                <div className="flex items-center justify-center gap-4">
                     <div className="h-[1px] w-12 bg-gray-700"></div>
                     <span className="text-cosmos-green font-mono text-xs uppercase tracking-widest">{quote.source}</span>
                     <div className="h-[1px] w-12 bg-gray-700"></div>
                </div>
            </div>
        </div>
    );
};

export default QuoteSeparator;