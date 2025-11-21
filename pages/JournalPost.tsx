import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';

interface JournalPostProps {
  post: BlogPost;
  onBack: () => void;
}

const JournalPost: React.FC<JournalPostProps> = ({ post, onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <div className="min-h-screen bg-soft-bg animate-fade-in pb-20">
      
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Kembali ke Jurnal
        </button>
      </div>

      {/* Content Container */}
      <div className="max-w-[800px] mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white p-8 md:p-16 shadow-xl shadow-gray-200/50 rounded-t-[2rem] rounded-b-[2rem]">
          
          {/* Meta */}
          <div className="flex justify-center items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-8">
            <span>{post.category}</span>
            <span className="w-1 h-1 bg-accent rounded-full"></span>
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl text-center text-primary leading-tight mb-6">
            {post.title}
          </h1>
          <h2 className="text-center text-gray-500 font-serif italic text-lg md:text-xl mb-10 max-w-lg mx-auto">
            {post.subtitle}
          </h2>

          {/* Divider */}
          <div className="w-10 h-0.5 bg-accent mx-auto mb-12"></div>

          {/* Body Text */}
          <div className="prose prose-stone prose-lg max-w-none mx-auto">
            {post.content.map((paragraph, index) => (
              <p 
                key={index} 
                className={`
                  text-gray-700 leading-loose font-light text-base md:text-lg mb-6
                  ${index === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]" : ""}
                `}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author & Footer */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                 {/* Placeholder avatar */}
                 <div className="w-full h-full bg-primary flex items-center justify-center text-white font-serif italic">
                   {post.author.charAt(0)}
                 </div>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Ditulis Oleh</p>
                 <p className="font-serif text-primary">{post.author}</p>
               </div>
            </div>
            
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors">
              <Share2 size={14} /> Bagikan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JournalPost;