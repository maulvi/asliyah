import React from 'react';
import { X, ArrowRight, Lock, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  total: number;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, total, onCheckout }) => {
  const FREE_SHIPPING_THRESHOLD = 1500000;
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.2, 0.8, 0.2, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-50 bg-soft-bg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif text-primary">Tas Anda ({items.length})</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-primary transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            {items.length > 0 && (
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                 <p className="text-[10px] text-center mb-2 text-gray-500 font-medium uppercase tracking-wide">
                   {total < FREE_SHIPPING_THRESHOLD 
                     ? <span>Tambah <span className="text-accent">{formatIDR(FREE_SHIPPING_THRESHOLD - total)}</span> untuk gratis ongkir</span>
                     : <span className="text-green-600">Gratis ongkir aktif</span>
                   }
                 </p>
                 <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-accent transition-all duration-1000 ease-out rounded-full" 
                     style={{ width: `${progress}%` }}
                   />
                 </div>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-soft-bg">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-300 space-y-4">
                <div className="bg-white p-6 rounded-full shadow-sm">
                  <ShoppingBag size={32} strokeWidth={1} />
                </div>
                <span className="text-sm font-medium text-gray-400">Tas belanja Anda kosong</span>
                <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">Lanjut Belanja</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-50/50">
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-primary font-serif truncate pr-2">{item.name}</h3>
                        <p className="text-sm font-semibold text-primary">{formatIDR(item.price)}</p>
                      </div>
                      <p className="text-[10px] text-gray-400 capitalize">{item.category}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded text-xs">Jml: {item.quantity}</span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatIDR(total)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Pengiriman</span>
                  <span>{total >= FREE_SHIPPING_THRESHOLD ? 'Gratis' : formatIDR(20000)}</span>
                </div>
                <div className="flex justify-between text-base font-medium text-primary pt-3 border-t border-dashed border-gray-200">
                  <span>Total</span>
                  <span>{formatIDR(total + (total >= FREE_SHIPPING_THRESHOLD ? 0 : 20000))}</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-primary text-white py-3.5 rounded-full text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 hover:bg-accent transition-all shadow-lg hover:shadow-accent/30 group"
              >
                Pembayaran <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-3 flex justify-center items-center gap-1.5 text-[9px] text-gray-400 uppercase tracking-widest">
                <Lock size={10} /> Transaksi SSL Terenkripsi
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;