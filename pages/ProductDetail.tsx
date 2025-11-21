
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Star, Truck, ShieldCheck, Minus, Plus, Heart } from 'lucide-react';
import { Product } from '../types';
import ProductAttributes from '../components/ProductAttributes';
import { sanitizeHtml } from '../utils/security';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, attributes?: Record<string, string>) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  // Fallback to main image if images array is empty
  const mainImage = product.images?.[0]?.src || product.image;
  const [activeImage, setActiveImage] = useState(mainImage);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  // Handle Attributes (Mock logic compatible with WC Attributes)
  // In real WC, attributes come in {name, options[]} structure
  const attributes = product.attributes || (product.category === 'Mode' ? [
    { name: 'Ukuran', options: ['S', 'M', 'L', 'XL'] },
    { name: 'Warna', options: ['Hitam', 'Putih', 'Terracotta'] }
  ] : []);
  
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  // Generate thumbnails from WC images array
  const images = product.images?.length 
    ? product.images.map(img => img.src) 
    : [product.image]; // Fallback

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(mainImage);
    
    // Reset selection
    const initialSelection: Record<string, string> = {};
    if (attributes) {
      attributes.forEach(attr => {
        if(attr.options && attr.options.length > 0) {
            initialSelection[attr.name] = attr.options[0]; 
        }
      });
    }
    setSelectedAttributes(initialSelection);
  }, [product, mainImage]);

  // Security: Sanitize HTML content before rendering
  // Memoize to prevent re-sanitizing on every render
  const safeDescription = useMemo(() => {
    return sanitizeHtml(product.short_description || product.description);
  }, [product.short_description, product.description]);

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-soft-bg animate-fade-in pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary mb-8 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali Belanja
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* Left: Compact Gallery */}
          <div className="space-y-5 sticky top-24">
            <div className="w-full aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={activeImage} 
                alt={product.name} 
                // High priority for LCP if this is the first thing seen
                fetchPriority="high"
                className="w-full h-full object-cover transition-all duration-500" 
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-accent ${activeImage === img ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="md:pt-2 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-serif text-primary leading-tight">{product.name}</h1>
                <button className="p-3 text-gray-300 hover:text-accent transition-colors bg-white rounded-full shadow-sm hover:shadow-md">
                   <Heart size={20} />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <p className="text-2xl font-medium text-accent">{formatIDR(product.price)}</p>
                <div className="h-5 w-px bg-gray-300 mx-2"></div>
                <div className="flex items-center gap-1 text-yellow-400">
                   <Star size={14} fill="currentColor" />
                   <span className="text-xs text-primary font-bold uppercase tracking-wide ml-2 text-gray-900">{product.rating}</span>
                   <span className="text-xs text-gray-400 ml-1">({product.reviews} Ulasan)</span>
                </div>
              </div>

              {/* Safe HTML Description Rendering */}
              <div 
                className="py-2 text-base text-gray-700 leading-loose font-normal prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                    __html: safeDescription 
                }}
              />
            </div>
            
            <ProductAttributes 
              attributes={attributes} 
              selected={selectedAttributes} 
              onChange={handleAttributeChange} 
            />

            {product.scarcityText && (
              <div className="inline-flex px-4 py-2 bg-red-50 text-accent rounded-lg text-xs font-bold uppercase tracking-wide animate-pulse-slow">
                {product.scarcityText}
              </div>
            )}

            {/* Add to Cart Block */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
               <div className="flex items-center gap-5">
                 {/* Qty */}
                 <div className="flex items-center bg-gray-50 rounded-full px-2 h-12 border border-gray-200">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                      className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-base font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)} 
                      className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"
                    >
                      <Plus size={16} />
                    </button>
                 </div>
                 
                 {/* Button */}
                 <button 
                   onClick={() => onAddToCart(product, quantity, selectedAttributes)}
                   className="flex-1 bg-primary text-white h-12 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-accent transition-all shadow-lg shadow-accent/20 transform active:scale-[0.98]"
                 >
                   Tambah ke Tas — {formatIDR(product.price * quantity)}
                 </button>
               </div>
            </div>

            {/* Micro-details */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                 <div className="bg-accent-light p-2.5 rounded-full text-accent"><Truck size={18} /></div>
                 <div>
                    <p className="text-xs font-bold uppercase text-primary">Gratis Ongkir</p>
                    <p className="text-xs text-gray-500 mt-0.5">Pesanan diatas Rp 1.5jt</p>
                 </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                 <div className="bg-accent-light p-2.5 rounded-full text-accent"><ShieldCheck size={18} /></div>
                 <div>
                    <p className="text-xs font-bold uppercase text-primary">Pembayaran Aman</p>
                    <p className="text-xs text-gray-500 mt-0.5">Enkripsi SSL 256-bit</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
