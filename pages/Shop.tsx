
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, Search, Loader2, ArrowDown } from 'lucide-react';

interface ShopProps {
  initialCategory?: string;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ITEMS_PER_PAGE = 8; // Menampilkan 8 produk di awal

const Shop: React.FC<ShopProps> = ({ initialCategory = 'Semua', onViewProduct, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk fitur Load More
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Sync if prop changes
  useEffect(() => {
    setActiveCategory(initialCategory);
    window.scrollTo(0, 0);
  }, [initialCategory]);

  // Reset visible count saat filter berubah (Kategori, Search, Sort)
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, searchQuery, sortBy]);

  const categories = ['Semua', 'Mode', 'Kecantikan', 'Perhiasan'];

  // 1. Filter & Sort Semua Produk
  const allFilteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'Semua' ? true : p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    // Mock "newest" sorting by ID for now
    return b.id - a.id;
  });

  // 2. Slice produk berdasarkan visibleCount
  const visibleProducts = allFilteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < allFilteredProducts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulasi network delay agar terasa lebih natural (UX Psychology)
    setTimeout(() => {
      setVisibleCount(prev => prev + 4); // Tambah 4 produk lagi
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-soft-bg animate-fade-in">
      
      {/* Header */}
      <div className="pt-12 pb-8 px-6 md:px-10 border-b border-primary/5">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
          {activeCategory === 'Semua' ? 'Koleksi Lengkap' : `Koleksi ${activeCategory}`}
        </h1>
        <p className="text-secondary text-sm max-w-2xl leading-relaxed">
          Temukan potongan-potongan yang dikurasi dengan hati-hati untuk meningkatkan esensi gaya hidup modern Anda. Kualitas tanpa kompromi, estetika abadi.
        </p>
      </div>

      {/* Controls */}
      <div className="sticky top-[72px] z-20 bg-soft-bg/95 backdrop-blur-sm px-6 md:px-10 py-4 border-b border-primary/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-transparent text-secondary border-gray-200 hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 ml-auto w-full md:w-auto">
           
           {/* Inline Search */}
           <div className="relative w-full md:w-60">
             <input 
               type="text" 
               placeholder="Filter produk..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
             />
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           </div>

           <div className="relative group">
             <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors whitespace-nowrap">
               Urutkan <ChevronDown size={14} />
             </button>
             <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-30 overflow-hidden">
               <button onClick={() => setSortBy('newest')} className={`block w-full text-left px-4 py-3 text-xs hover:bg-gray-50 ${sortBy === 'newest' ? 'text-accent font-bold' : 'text-gray-600'}`}>Terbaru</button>
               <button onClick={() => setSortBy('price-asc')} className={`block w-full text-left px-4 py-3 text-xs hover:bg-gray-50 ${sortBy === 'price-asc' ? 'text-accent font-bold' : 'text-gray-600'}`}>Harga Terendah</button>
               <button onClick={() => setSortBy('price-desc')} className={`block w-full text-left px-4 py-3 text-xs hover:bg-gray-50 ${sortBy === 'price-desc' ? 'text-accent font-bold' : 'text-gray-600'}`}>Harga Tertinggi</button>
             </div>
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 py-12">
        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 mb-16">
              {visibleProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onClick={onViewProduct}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="flex justify-center pt-4 pb-8">
                 <button 
                   onClick={handleLoadMore}
                   disabled={isLoadingMore}
                   className="group relative px-8 py-3 overflow-hidden rounded-full border border-primary text-primary hover:text-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   <span className="absolute inset-0 w-full h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left"></span>
                   <span className="relative flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                     {isLoadingMore ? (
                       <>
                         <Loader2 size={14} className="animate-spin" />
                         Memuat...
                       </>
                     ) : (
                       <>
                         Muat Lebih Banyak
                         <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                       </>
                     )}
                   </span>
                 </button>
                 
                 {/* Status Text (Psychology: Show progress) */}
                 <div className="absolute mt-12 text-[10px] text-gray-400 uppercase tracking-widest">
                   Menampilkan {visibleProducts.length} dari {allFilteredProducts.length} Produk
                 </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-serif italic text-xl">Tidak ditemukan produk yang cocok.</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-xs font-bold uppercase tracking-widest text-accent hover:underline">Reset Pencarian</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
