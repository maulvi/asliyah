import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getStylingAdvice } from '../services/geminiService';

interface AIStylistProps {
  currentProductContext?: string;
}

const AIStylist: React.FC<AIStylistProps> = ({ currentProductContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: currentProductContext 
        ? `Welcome lovely. I see you're admiring the ${currentProductContext}. Any questions about fit or styling?`
        : "Hello! I'm Aura, your personal stylist. Looking for something specific or just browsing?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (currentProductContext && messages.length === 1) {
        setMessages([{
            id: 'welcome-context',
            role: 'model',
            text: `Welcome lovely. I see you're admiring the ${currentProductContext}. Do you have questions about fit, ingredients, or styling?`
        }]);
    }
  }, [currentProductContext]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const aiResponseText = await getStylingAdvice(userText, currentProductContext);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponseText
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button - Soft Gradient */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 shadow-xl shadow-accent/30 transition-all duration-500 group hover:-translate-y-1 ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
      >
        <div className="bg-gradient-to-tr from-primary to-accent text-white p-3.5 rounded-full border border-white/20">
            <Sparkles size={22} strokeWidth={1.5} />
        </div>
      </button>

      {/* Chat Window - Soft Glassmorphism */}
      <div 
        className={`fixed bottom-6 right-6 w-[90vw] sm:w-[360px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 z-50 overflow-hidden transition-all duration-500 origin-bottom-right flex flex-col ${isOpen ? 'h-[550px] opacity-100 translate-y-0 scale-100' : 'h-0 opacity-0 translate-y-10 scale-90 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-[#4a4a4a] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-serif italic">
               A
             </div>
             <div>
               <h3 className="font-serif text-sm tracking-wide">Aura Stylist</h3>
               <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                 <p className="text-[9px] text-gray-300 uppercase tracking-widest">Online</p>
               </div>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-1">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-soft-bg">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent text-white rounded-2xl rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-2 shadow-sm">
                 <Loader2 size={12} className="animate-spin text-accent" />
                 <span className="text-[10px] text-gray-400 tracking-wide">Thinking...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-50">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-1.5 py-1.5 border border-gray-100 focus-within:border-accent/30 focus-within:ring-2 focus-within:ring-accent/5 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about style, fit, or beauty..."
              className="flex-1 bg-transparent px-3 py-1 text-sm text-primary placeholder-gray-400 focus:outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-primary text-white rounded-full hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIStylist;