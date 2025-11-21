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
    <div className="animate-fade-in w-full overflow-x-hidden bg-soft-bg">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Parallax-feel image - Optimized loading priority */}
          <img 
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop" 
            alt="Hero Fashion" 
            // High priority for LCP (Largest Contentful Paint) optimization
            // @ts-ignore - fetchPriority is standard but TS might complain in older versions
            fetchPriority="high"
            className="w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-[#262320]/20"></div>
          {/* Gradient matched to new primary 'Espresso' color */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#262320]/70 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 sm:px-12 md:px-20 max-w-[1600px] mx-auto">
          <div className="animate-slide-up text-white max-w-3xl">
            <div className="flex items-center gap-3 mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
               <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#F2F0EB]">
                 Koleksi Musim Baru
               </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 leading-[0.9] tracking-tight text-[#F2F0EB]">
              Esensi <br/>
              <span className="italic font-light text-white/90">Personal Anda</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md leading-relaxed font-light">
              Temukan potongan abadi yang dirancang untuk meningkatkan aura alami Anda. Kurasi modern yang memahami keunikan wanita Indonesia.
            </p>
            
            <button 
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-[#F2F0EB] text-primary pl-8 pr-6 py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-accent hover:text-white transition-all duration-500 flex items-center gap-4 border border-transparent"
            >
              Belanja Sekarang <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. PSYCHOLOGY MARQUEE (Infinite Scroll) */}
      <div className="bg-primary text-[#F2F0EB] py-4 overflow-hidden relative z-20 border-t border-white/5">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] will-change-transform">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex items-center">
               {PSYCHOLOGY_TRIGGERS.map((trigger, idx) => (
                 <span key={`${i}-${idx}`} className="mx-8 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4 opacity-90">
                    <Sparkles size={12} className="text-accent" /> {trigger}
                 </span>
               ))}
             </div>
          ))}
        </div>
      </div>

      {/* 3. SHOP SECTION WITH STICKY TABS */}
      <section id="shop" className="py-20 max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 min-h-screen">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 px-2">
           <div>
             <h2 className="text-3xl md:text-4xl font-serif text-primary">Pilihan Kurasi</h2>
             <p className="text-secondary mt-2 text-sm">Dipilih khusus untuk karakter dan gaya hidup Anda.</p>
           </div>
        </div>

        {/* Sticky Category Bar */}
        <div className="sticky top-[72px] z-30 bg-soft-bg/95 backdrop-blur-md py-4 mb-8 md:mb-12 border-b border-gray-200 transition-all -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 overflow-x-auto no-scrollbar items-center">
            {['Semua', 'Mode', 'Kecantikan', 'Perhiasan'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat 
                    ? 'bg-primary text-white border-primary shadow-md' 
                    : 'bg-white text-secondary border-gray-200 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - 2 Columns Mobile / 4 Columns Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-16">
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

      {/* 4. "THE EDIT" SPOTLIGHT SECTION */}
      <section className="py-12 px-4 md:px-8">
         <div className="max-w-[1600px] mx-auto bg-primary text-[#F2F0EB] rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <h2 className="text-9xl font-serif">AURA</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
               <div className="relative h-[500px] lg:h-[700px] group overflow-hidden">
                  <img 
                    src={spotlightProduct.image} 
                    alt="Spotlight" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-primary">
                     <p className="text-[10px] font-bold uppercase tracking-widest">Sedang Tren</p>
                  </div>
               </div>
               
               <div className="p-10 md:p-20 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-2 text-accent mb-6">
                     <TrendingUp size={18} />
                     <span className="text-xs font-bold uppercase tracking-widest">Pilihan Editor</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                     {spotlightProduct.name}
                  </h2>
                  
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-md">
                     Sebuah karya masterpiece dari {spotlightProduct.category}. {spotlightProduct.description} 
                     Sempurna untuk meningkatkan kepercayaan diri Anda di setiap kesempatan.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                     <button 
                        onClick={() => onViewProduct(spotlightProduct)}
                        className="bg-[#F2F0EB] text-primary px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent hover:text-white transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                     >
                        Lihat Detail
                     </button>
                     <div className="text-2xl font-serif italic text-accent">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(spotlightProduct.price)}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. EDITORIAL / STORY */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
         <Star size={32} className="text-accent mx-auto mb-8" />
         <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 leading-tight">
            "Gaya sejati adalah yang terasa seperti<br/> 
            <span className="italic text-accent">kulit kedua</span>. Nyaman, percaya diri,<br/>
            dan sepenuhnya milik Anda."
         </h2>
         <a href="#" className="text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
            Baca Cerita Kami
         </a>
      </section>

      {/* 6. NEWSLETTER WITH RECIPROCITY TRIGGER */}
      <section className="bg-surface py-24 px-6">
         <div className="max-w-2xl mx-auto text-center space-y-8">
             <h2 className="text-3xl font-serif text-primary">Bergabung dengan Lingkaran Kami</h2>
             <p className="text-secondary leading-relaxed">
               Kami jarang mengirim email, tetapi ketika kami melakukannya, itu berharga.
               <br/>Daftar sekarang untuk mendapatkan <span className="text-primary font-semibold underline decoration-accent decoration-2 underline-offset-4">kode diskon 10%</span> instan.
             </p>
             <div className="flex flex-col sm:flex-row gap-0 shadow-lg rounded-full overflow-hidden max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Masukkan alamat email Anda" 
                  className="flex-1 bg-white py-4 px-6 text-sm focus:outline-none placeholder-gray-400 text-primary"
                />
                <button className="bg-primary text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-accent transition-colors">
                  Gabung
                </button>
             </div>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest">Tidak ada spam. Berhenti berlangganan kapan saja.</p>
         </div>
      </section>
    </div>
  );
};

export default Home;