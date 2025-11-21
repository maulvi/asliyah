
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogProps {
  onReadPost: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ onReadPost }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  const categories = ['Semua', 'Gaya Hidup', 'Mode', 'Kecantikan'];

  const filteredPosts = activeCategory === 'Semua' 
    ? otherPosts 
    : otherPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-soft-bg animate-fade-in pb-20">
      
      {/* Editorial Header */}
      <div className="pt-16 pb-12 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-primary mb-4">AURA Editorial</h1>
        <p className="text-secondary text-sm max-w-xl mx-auto font-light leading-relaxed">
          Jelajahi wawasan, tren, dan cerita yang dikurasi untuk meningkatkan gaya hidup modern Anda.
        </p>
      </div>

      {/* Filter */}
      <div className="flex justify-center gap-4 mb-12 px-6 overflow-x-auto">
         {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-transparent text-secondary border-gray-200 hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Featured Post (Only show if 'Semua' or if category matches) */}
        {(activeCategory === 'Semua' || featuredPost.category === activeCategory) && (
          <div className="mb-16 group cursor-pointer" onClick={() => onReadPost(featuredPost)}>
             <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 text-white">
                   <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-white/80">
                      <span>{featuredPost.category}</span>
                      <span className="w-1 h-1 bg-white rounded-full"></span>
                      <span>{featuredPost.date}</span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-4 group-hover:underline underline-offset-4 decoration-1">
                     {featuredPost.title}
                   </h2>
                   <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-2 mb-6">
                     {featuredPost.subtitle}
                   </p>
                   <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-white pb-1">
                     Baca Artikel <ArrowRight size={14} />
                   </span>
                </div>
             </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {filteredPosts.length > 0 ? (
             filteredPosts.map(post => (
               <div 
                 key={post.id} 
                 className="group cursor-pointer flex flex-col h-full" 
                 onClick={() => onReadPost(post)}
               >
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-accent mb-3">
                      <span>{post.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-serif text-primary leading-snug mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
                      {post.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                       <div className="flex items-center gap-2 text-[10px] text-gray-400">
                          <User size={12} /> {post.author}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] text-gray-400">
                          <Calendar size={12} /> {post.date}
                       </div>
                    </div>
                  </div>
               </div>
             ))
           ) : (
             (activeCategory !== 'Semua' && featuredPost.category !== activeCategory) && (
               <div className="col-span-full text-center py-20">
                 <p className="text-gray-400 font-serif italic">Belum ada artikel di kategori ini.</p>
               </div>
             )
           )}
        </div>

      </div>
    </div>
  );
};

export default Blog;
