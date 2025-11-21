
import React, { useState } from 'react';
import { Star, ArrowRight, Sparkles, TrendingUp, ShieldCheck, Package, Users } from 'lucide-react';
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

  // Spotlight Product
  const spotlightProduct = PRODUCTS.find(p => p.id === 2) || PRODUCTS[0];

  return (
    <div className="animate-fade-in w-full bg-soft-bg">
      
      {/* 1. HERO SECTION - Improved Psychology & Visuals */}
      <div className="px-4 md:px-6 pt-2 pb-8">
        <section className="relative h-[600px] w-full rounded-[2rem] overflow-hidden group shadow-2xl shadow-primary/10">
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop" 
            alt="Hero Fashion" 
            // @ts-ignore
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-[center_25%] transition-transform duration-[2s] group-hover:scale-105"
          />
          
          {/* Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#262320]/90 via-[#262320]/20 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-12 text-center items-center max-w-4xl mx-auto">
             <span className="animate-slide-up px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-6">
               Koleksi Musim Baru 2024
             </span>
             <h1 className="animate-slide-up text-5xl md:text-8xl font-serif font-medium text-[#F2F0EB] leading-none tracking-tight mb-6 drop-shadow-lg">
               Esensi <span className="italic font-light text-accent-light">Elegan</span>
             </h1>
             <p className="animate-slide-up text-white/80 text-sm md:text-base max-w-lg mb-8 leading-relaxed drop-shadow-md">
               Tingkatkan gaya hidup Anda dengan potongan yang dikurasi untuk kenyamanan dan kepercayaan diri. Terbatas, eksklusif, dan dibuat untuk Anda.
             </p>
             <div className="animate-slide-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.2s' }}>
               <button 
                  onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-[#F2F0EB] text-primary px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-black/20 hover:shadow-white/20 hover:-translate-y-1"
                >
                  Belanja Sekarang <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <button 
                  className="group bg-transparent border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all duration-300"
                >
                  Lihat Lookbook
               </button>
             </div>
          </div>
        </section>
      </div>

      {/* 2. TRUST SIGNALS (Social Proof) */}
      <div className="border-b border-primary/5 bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck size={20} className="text-accent mb-1" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Pembayaran Aman</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Package size={20} className="text-accent mb-1" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Gratis Ongkir &gt; 1.5jt</p>
          </div>
           <div className="flex flex-col items-center gap-2">
            <Users size={20} className="text-accent mb-1" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">10rb+ Wanita Bahagia</p>
          </div>
           <div className="flex flex-col items-center gap-2">
            <Star size={20} className="text-accent mb-1" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Rating 4.9/5.0</p>
          </div>
        </div>
      </div>

      {/* 3. SHOP SECTION */}
      <section id="shop" className="py-16 px-4 md:px-8 content-visibility-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
           <div>
             <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">Pilihan Terkini</h2>
             <p className="text-sm text-secondary">Dikurasi khusus berdasarkan tren global.</p>
           </div>
           
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Semua', 'Mode', 'Kecantikan', 'Perhiasan'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                    : 'bg-transparent text-secondary border-gray-200 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
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
         <div className="bg-primary rounded-[2rem] overflow-hidden text-[#F2F0EB] relative grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
            <div className="relative h-[400px] lg:h-auto overflow-hidden group">
               <img 
                 src={spotlightProduct.image} 
                 alt="Editor Pick" 
                 loading="lazy" 
                 className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
               />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center relative">
               <div className="flex items-center gap-2 text-accent mb-6">
                  <TrendingUp size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Investasi Gaya</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{spotlightProduct.name}</h2>
               <p className="text-gray-300 text-sm leading-loose mb-8 max-w-md">
                 {spotlightProduct.description.substring(0, 120)}... Sebuah karya klasik yang akan bertahan melampaui musim. Kualitas tanpa kompromi untuk Anda yang mengerti.
               </p>
               <div className="flex items-center gap-8">
                 <button onClick={() => onViewProduct(spotlightProduct)} className="bg-white text-primary px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-lg">
                   Beli Sekarang
                 </button>
                 <span className="text-2xl font-serif italic text-accent">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(spotlightProduct.price)}
                 </span>
               </div>
            </div>
         </div>
      </section>

      {/* 5. NEWSLETTER - Minimalist */}
      <section className="py-20 px-6 text-center bg-surface mt-12">
         <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-serif text-primary mb-4">Aura Inner Circle</h2>
            <p className="text-secondary text-sm mb-8 leading-relaxed">Bergabunglah dengan 50.000+ wanita yang mendapatkan inspirasi mingguan & akses awal ke koleksi terbatas.</p>
            <div className="flex border-b border-primary pb-2 focus-within:border-accent transition-colors">
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-400 py-2"
                />
                <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors px-4">
                  Daftar
                </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-4">Kami menghargai privasi Anda. Berhenti berlangganan kapan saja.</p>
         </div>
      </section>
    </div>
  );
};

export default Home;
