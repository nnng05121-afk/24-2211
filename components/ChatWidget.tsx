import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { streamGeminiChat } from '../services/geminiService';
import { Content } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是二十四节气智能向导。您可以问我关于气候、农事或节气文化的任何问题。' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Format history for Gemini SDK
      const history: Content[] = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await streamGeminiChat(history, userMsg);
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].text = fullResponse;
            return newMsgs;
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "抱歉，连接星际网络时出现错误，请稍后再试。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] md:w-[400px] h-[500px] bg-[#020617]/95 border border-cosmos-green/30 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-xl flex flex-col overflow-hidden mb-4"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-cosmos-green/10 to-transparent">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cosmos-green/20 rounded-lg">
                  <Bot size={18} className="text-cosmos-green" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">COSMOS GUIDE</h3>
                  <div className="flex items-center gap-1 text-[10px] text-cosmos-green">
                    <span className="w-1.5 h-1.5 bg-cosmos-green rounded-full animate-pulse"></span>
                    ONLINE
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cosmos-green text-black rounded-tr-sm font-medium' 
                      : 'bg-slate-800/80 text-gray-200 border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-slate-800/50 p-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1">
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about solar terms..."
                  className="w-full bg-slate-900 border border-gray-700 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-cosmos-green/50 placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cosmos-green/10 text-cosmos-green rounded-lg hover:bg-cosmos-green hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 group ${
            isOpen ? 'bg-slate-800 text-gray-400 rotate-90' : 'bg-cosmos-green text-black hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmos-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cosmos-cyan"></span>
            </span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;