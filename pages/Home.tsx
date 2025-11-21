
import React, { useState } from 'react';
import { Star, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, PSYCHOLOGY_TRIGGERS } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onViewProduct, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  
  const filteredProducts = activeCategory === 'Semua' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  // Spotlight Product (e.g., The Coat)
  const spotlightProduct = PRODUCTS.find(p => p.id === 2) || PRODUCTS[0];

  return (
    <div className="animate-fade-in w-full bg-soft-bg">
      
      {/* 1. COMPACT BOXED HERO */}
      {/* Optimized for LCP: Eager loading + High Priority */}
      <div className="px-4 md:px-6 pt-2 pb-8">
        <section className="relative h-[550px] w-full rounded-[2rem] overflow-hidden group">
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop" 
            alt="Hero Fashion" 
            // @ts-ignore
            fetchPriority="high" // CRITICAL for Core Web Vitals (LCP)
            loading="eager"
            decoding="sync" // Decode immediately for Hero
            className="w-full h-full object-cover object-[center_25%] transition-transform duration-[2s] group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#262320]/80 via-transparent to-transparent"></div>

          {/* Content - Bottom Aligned */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-12 text-center items-center">
             <span className="animate-slide-up px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-4">
               Musim Baru
             </span>
             <h1 className="animate-slide-up text-5xl md:text-7xl font-serif font-medium text-[#F2F0EB] leading-none tracking-tight mb-6">
               Esensi <span className="italic font-light text-white/80">Modern</span>
             </h1>
             <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="animate-slide-up group bg-[#F2F0EB] text-primary px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 flex items-center gap-3 shadow-lg shadow-black/20"
                style={{ animationDelay: '0.2s' }}
              >
                Lihat Koleksi <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </section>
      </div>

      {/* 2. COMPACT MARQUEE */}
      <div className="border-y border-primary/5 bg-white py-3 overflow-hidden content-visibility-auto">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex items-center">
               {PSYCHOLOGY_TRIGGERS.map((trigger, idx) => (
                 <span key={`${i}-${idx}`} className="mx-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-primary/80 flex items-center gap-2">
                    <Sparkles size={10} className="text-accent" /> {trigger}
                 </span>
               ))}
             </div>
          ))}
        </div>
      </div>

      {/* 3. SHOP SECTION */}
      <section id="shop" className="py-12 px-4 md:px-8 content-visibility-auto">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
           <div>
             <h2 className="text-2xl md:text-3xl font-serif text-primary">Koleksi Terpilih</h2>
           </div>
           
           {/* Filter Pills */}
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Semua', 'Mode', 'Kecantikan', 'Perhiasan'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-transparent text-secondary border-gray-200 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
           </div>
        </div>

        {/* Product Grid - Compact Gap */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onClick={onViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 4. THE EDIT - Boxed Banner */}
      <section className="py-8 px-4 md:px-8 content-visibility-auto">
         <div className="bg-primary rounded-[2rem] overflow-hidden text-[#F2F0EB] relative grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto">
               <img 
                 src={spotlightProduct.image} 
                 alt="Editor Pick" 
                 loading="lazy" // Lazy load below fold
                 decoding="async"
                 className="w-full h-full object-cover opacity-90"
               />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center relative">
               <div className="flex items-center gap-2 text-accent mb-4">
                  <TrendingUp size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Sorotan Utama</span>
               </div>
               <h2 className="text-3xl md:text-4xl font-serif mb-4">{spotlightProduct.name}</h2>
               <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
                 {spotlightProduct.description.substring(0, 100)}... Kemewahan yang tidak mencolok, dirancang untuk Anda yang mengerti kualitas.
               </p>
               <div className="flex items-center gap-4">
                 <button onClick={() => onViewProduct(spotlightProduct)} className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 hover:text-accent hover:border-accent transition-colors">
                   Beli Sekarang
                 </button>
                 <span className="text-xl font-serif italic text-accent">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(spotlightProduct.price)}
                 </span>
               </div>
            </div>
         </div>
      </section>

      {/* 5. NEWSLETTER - Minimalist */}
      <section className="py-16 px-6 text-center bg-surface mt-8 content-visibility-auto">
         <h2 className="text-2xl font-serif text-primary mb-3">Aura Inner Circle</h2>
         <p className="text-secondary text-xs md:text-sm mb-6">Dapatkan inspirasi mingguan & akses awal ke koleksi baru.</p>
         <div className="flex max-w-sm mx-auto border-b border-primary pb-1">
            <input 
              type="email" 
              placeholder="Email Anda" 
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-400"
            />
            <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent">
              Daftar
            </button>
         </div>
      </section>
    </div>
  );
};

export default Home;
