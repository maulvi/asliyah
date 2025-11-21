
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../services/wooService';
import ProductCard from '../components/ProductCard';
import { ChevronDown, Search, Loader2, ArrowDown, WifiOff } from 'lucide-react';

interface ShopProps {
  initialCategory?: string;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ITEMS_PER_PAGE = 8;

const Shop: React.FC<ShopProps> = ({ initialCategory = 'Semua', onViewProduct, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const categories = ['Semua', 'Mode', 'Kecantikan', 'Perhiasan'];

  // Initial Fetch & Filter Change
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setPage(1);
      try {
        const { products: newProducts, total } = await fetchProducts(activeCategory, 1, ITEMS_PER_PAGE);
        setProducts(newProducts);
        setHasMore(newProducts.length < total);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    window.scrollTo(0, 0);
    loadInitialData();
  }, [activeCategory]);

  // Handle Load More
  const handleLoadMore = async () => {
    setIsLoadMoreLoading(true);
    const nextPage = page + 1;
    try {
      const { products: moreProducts, total } = await fetchProducts(activeCategory, nextPage, ITEMS_PER_PAGE);
      setProducts(prev => [...prev, ...moreProducts]);
      setPage(nextPage);
      // Check logic if we have fetched all available items (mock logic here simplifies to array length check)
      // In real WC, compare total vs products.length
      if (products.length + moreProducts.length >= total) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadMoreLoading(false);
    }
  };

  // Client-side sorting/filtering for Search (Hybrid approach)
  // Note: Idealnya Search dilakukan via API, tapi untuk hybrid responsiveness kita filter client-side hasil fetch
  const displayedProducts = products.filter(p => {
     return p.name.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return b.id - a.id;
  });

  return (
    <div className="min-h-screen w-full bg-soft-bg animate-fade-in">
      
      {/* Header */}
      <div className="pt-12 pb-8 px-6 md:px-10 border-b border-primary/5">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
          {activeCategory === 'Semua' ? 'Koleksi Lengkap' : `Koleksi ${activeCategory}`}
        </h1>
        <p className="text-secondary text-sm max-w-2xl leading-relaxed">
          Temukan potongan-potongan yang dikurasi dengan hati-hati untuk meningkatkan esensi gaya hidup modern Anda.
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
           <div className="relative w-full md:w-60">
             <input 
               type="text" 
               placeholder="Cari produk..." 
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
               <button onClick={() => setSortBy('newest')} className="block w-full text-left px-4 py-3 text-xs hover:bg-gray-50 text-gray-600 hover:text-primary">Terbaru</button>
               <button onClick={() => setSortBy('price-asc')} className="block w-full text-left px-4 py-3 text-xs hover:bg-gray-50 text-gray-600 hover:text-primary">Harga Terendah</button>
               <button onClick={() => setSortBy('price-desc')} className="block w-full text-left px-4 py-3 text-xs hover:bg-gray-50 text-gray-600 hover:text-primary">Harga Tertinggi</button>
             </div>
           </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="px-6 md:px-10 py-12">
        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-20 space-y-4">
             <Loader2 size={40} className="animate-spin text-accent" />
             <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Mengambil Data Produk...</span>
           </div>
        ) : displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 mb-16">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onClick={onViewProduct}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMore && !searchQuery && (
              <div className="flex justify-center pt-4 pb-8">
                 <button 
                   onClick={handleLoadMore}
                   disabled={isLoadMoreLoading}
                   className="group relative px-8 py-3 overflow-hidden rounded-full border border-primary text-primary hover:text-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   <span className="absolute inset-0 w-full h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left"></span>
                   <span className="relative flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                     {isLoadMoreLoading ? (
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
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <WifiOff size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-400 font-serif italic text-xl">Tidak ditemukan produk.</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-xs font-bold uppercase tracking-widest text-accent hover:underline">Reset Filter</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
