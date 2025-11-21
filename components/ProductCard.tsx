import React, { memo } from 'react';
import { Product } from '../types';
import { Plus, Star, Heart, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

// Using memo to prevent re-renders when parent state changes (e.g., opening cart)
const ProductCard: React.FC<ProductCardProps> = memo(({ product, onAddToCart, onClick }) => {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(product);
    }
  };

  return (
    <div 
      className="group relative flex flex-col h-full cursor-pointer focus:outline-none" 
      onClick={() => onClick(product)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}, price ${formatIDR(product.price)}`}
    >
      {/* Image Container - Organic Corners & Immersive */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl bg-[#F2F0EB] shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-500">
        
        {/* Main Image with Optimized Loading */}
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform group-hover:scale-110"
        />
        
        {/* Subtle Dark Overlay on Hover for Text Readability */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" aria-hidden="true" />

        {/* Top Badges (Floating) */}
        <div className="absolute top-2 left-2 right-2 md:top-3 md:left-3 md:right-3 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1.5 md:gap-2">
            {product.isNew && (
              <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-primary shadow-sm border border-white/50 w-fit">
                Baru
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-accent/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white shadow-sm border border-white/10 w-fit">
                Best Seller
              </span>
            )}
          </div>
          
          {/* Wishlist Button - Desktop Only Animation */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 shadow-sm md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 focus:opacity-100 focus:translate-x-0"
            aria-label={`Add ${product.name} to Wishlist`}
          >
            <Heart size={12} className="md:w-[14px] md:h-[14px]" strokeWidth={2} />
          </button>
        </div>

        {/* Mobile: Always visible circular add button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="md:hidden absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-lg flex items-center justify-center active:scale-95 transition-transform z-20"
          aria-label={`Add ${product.name} to Cart`}
        >
          <Plus size={16} strokeWidth={2} />
        </button>

        {/* Desktop: Slide Up Button */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) will-change-transform">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-white/95 backdrop-blur-md border border-white/50 text-primary py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 shadow-lg group/btn focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Add ${product.name} to Cart`}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Masuk Tas</span>
            <Plus size={14} strokeWidth={2} className="group-hover/btn:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Product Details - Mobile Optimized */}
      <div className="pt-3 md:pt-4 px-0 md:px-1 flex flex-col gap-0.5 md:gap-1">
        {/* Category & Rating Row */}
        <div className="flex justify-between items-center">
          <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-secondary/70 truncate max-w-[70%]">
            {product.category}
          </p>
          <div className="flex items-center gap-1 bg-[#F2F0EB] px-1.5 py-0.5 rounded" aria-label={`Rated ${product.rating} out of 5 stars`}>
            <Star size={8} fill="currentColor" className="md:w-[9px] md:h-[9px] text-accent" />
            <span className="text-[8px] md:text-[9px] font-bold text-secondary">{product.rating}</span>
          </div>
        </div>
        
        {/* Product Name */}
        <h3 className="font-serif text-[13px] md:text-[17px] leading-tight text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2 min-h-[1.5em]">
          {product.name}
        </h3>

        {/* Scarcity - Moved Below Name */}
        {product.scarcityText ? (
          <div className="flex items-center gap-1 mt-0.5">
            <AlertCircle size={10} className="text-red-600" />
            <p className="text-[10px] md:text-[11px] font-medium text-red-600 leading-none truncate">
              {product.scarcityText}
            </p>
          </div>
        ) : (
          <div className="h-[14px] md:h-[17px]" aria-hidden="true"></div> // Spacer to keep alignment
        )}
        
        {/* Price Section */}
        <div className="flex flex-wrap items-baseline gap-1.5 md:gap-2 mt-1">
          <span className="text-xs md:text-sm font-bold text-primary tracking-tight">
            {formatIDR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] md:text-xs text-gray-400 line-through decoration-gray-300" aria-label={`Original price ${formatIDR(product.originalPrice)}`}>
              {formatIDR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;