import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Truck, ShieldCheck, Minus, Plus, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  // Generate thumbnails (mock logic)
  const images = [
    product.image, 
    product.image.includes('unsplash') ? `${product.image}&fit=crop&crop=top` : product.image,
    product.image.includes('unsplash') ? `${product.image}&fit=crop&crop=bottom` : product.image,
    product.image.includes('unsplash') ? `${product.image}&fit=crop&crop=left` : product.image
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(product.image);
  }, [product]);

  return (
    <div className="min-h-screen bg-soft-bg animate-fade-in pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali Belanja
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* Left: Compact Gallery (Main + Thumbs) */}
          <div className="space-y-5 sticky top-24">
            <div className="w-full aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-500" 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
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
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={14} fill="currentColor" className={i < Math.floor(product.rating) ? "" : "text-gray-200"} />
                   ))}
                   <span className="text-xs text-primary font-bold uppercase tracking-wide ml-2 border-b border-gray-200">{product.reviews} Ulasan</span>
                </div>
              </div>

              <div className="py-2">
                 <p className="text-base text-gray-700 leading-loose font-normal">{product.description}</p>
              </div>
            </div>

            {/* Scarcity Pill */}
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
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"><Minus size={16}/></button>
                    <span className="w-8 text-center text-base font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"><Plus size={16}/></button>
                 </div>
                 
                 {/* Button */}
                 <button 
                   onClick={() => onAddToCart(product, quantity)}
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