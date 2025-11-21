
import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Clock, Share2, User } from 'lucide-react';

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostProps> = ({ post, onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <div className="min-h-screen bg-soft-bg animate-fade-in pb-20">
      
      {/* Sticky Header for easy navigation */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 flex justify-between items-center">
         <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke Blog
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:block">{post.category}</span>
        <button className="text-primary hover:text-accent transition-colors">
           <Share2 size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover attachment-fixed"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-[800px] mx-auto px-6 -mt-20 relative z-10 animate-slide-up">
        <div className="bg-white p-8 md:p-16 shadow-xl shadow-gray-200/50 rounded-t-[2rem] rounded-b-[2rem]">
          
          {/* Meta */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-8">
            <span>{post.category}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl text-center text-primary leading-tight mb-6">
            {post.title}
          </h1>
          <h2 className="text-center text-gray-500 font-serif italic text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            {post.subtitle}
          </h2>

          {/* Author Bar */}
          <div className="flex justify-center items-center gap-3 mb-12 pb-12 border-b border-gray-100">
             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary font-serif italic border border-gray-200">
                {post.author.charAt(0)}
             </div>
             <div className="text-left">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Ditulis Oleh</p>
                <p className="text-xs font-bold text-primary">{post.author}</p>
             </div>
          </div>

          {/* Body Text */}
          <div className="prose prose-stone prose-lg max-w-none mx-auto">
            {post.content.map((paragraph, index) => (
              <p 
                key={index} 
                className={`
                  text-gray-700 leading-loose font-light text-base md:text-lg mb-8
                  ${index === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]" : ""}
                `}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer Tags/Share */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500">#{post.category.toLowerCase()}</span>
               <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500">#aura</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Read Next (Simple implementation) */}
      <div className="max-w-4xl mx-auto mt-20 px-6">
         <h3 className="text-center font-serif text-2xl text-primary mb-10">Artikel Lainnya</h3>
         {/* In a real app, map other posts here. For now, just a 'Back to Blog' button visually centered */}
         <div className="flex justify-center">
            <button 
              onClick={onBack}
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full text-xs font-bold uppercase tracking-widest"
            >
              Lihat Semua Artikel
            </button>
         </div>
      </div>

    </div>
  );
};

export default BlogPostDetail;
