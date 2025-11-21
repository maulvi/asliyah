
import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { escapeInput } from '../utils/security';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onProductClick }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    // Sanitize query before processing
    const safeQuery = escapeInput(query.trim());

    if (safeQuery === '') {
      setResults([]);
      return;
    }
    
    const lowerQuery = safeQuery.toLowerCase();

    const filtered = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic sanitization on input to prevent weird characters
    const val = e.target.value;
    // Allow only safe characters for search (alphanumeric, spaces, basic punctuation)
    if (/^[a-zA-Z0-9\s\-_.,']*$/.test(val) || val === '') {
        setQuery(val);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[80] transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" onClick={onClose} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-12 animate-slide-up">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Cari produk, koleksi, atau gaya..."
            className="w-full text-2xl md:text-4xl font-serif text-primary placeholder-gray-300 bg-transparent border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors"
          />
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300" size={28} />
        </div>

        {/* Results or Suggestions */}
        <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
          {query === '' ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary mb-6">
                <TrendingUp size={14} /> Pencarian Populer
              </div>
              <div className="flex flex-wrap gap-3">
                {['Serum', 'Coat', 'Lipstick', 'Gold Hoops', 'Tas Kulit'].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-5 py-2.5 rounded-full bg-gray-50 hover:bg-primary hover:text-white text-sm text-gray-600 transition-all border border-gray-100"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
               <p className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-4">
                 {results.length} Hasil Ditemukan
               </p>
               
               {results.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {results.map(product => (
                     <div 
                       key={product.id}
                       onClick={() => {
                         onProductClick(product);
                         onClose();
                       }}
                       className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group border border-transparent hover:border-gray-100"
                     >
                       <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 flex flex-col justify-center">
                         <h4 className="font-serif text-lg text-primary group-hover:text-accent transition-colors">{product.name}</h4>
                         <p className="text-sm font-bold text-gray-900 mt-1">{formatIDR(product.price)}</p>
                         <p className="text-xs text-gray-400 mt-1">{product.category}</p>
                       </div>
                       <div className="flex items-center justify-center text-gray-300 group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-300">
                         <ArrowRight size={20} />
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-20">
                   <p className="text-gray-400 italic font-serif text-lg">Tidak ada hasil yang cocok untuk "{query}"</p>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
