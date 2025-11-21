
import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { ShieldCheck, Lock, CreditCard, ArrowLeft, CheckCircle2, Package } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onPlaceOrder: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, total, onBack, onPlaceOrder }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const FREE_SHIPPING_THRESHOLD = 1500000;
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : 20000;
  const finalTotal = total + shippingCost;

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPlaceOrder();
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="h-screen w-full bg-soft-bg flex items-center justify-center px-4 overflow-hidden">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full animate-fade-in border border-white/50">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner">
            <CheckCircle2 size={40} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl text-primary mb-4">Pesanan Dikonfirmasi</h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Terima kasih atas pembelian Anda. <br/>Kami sedang menyiapkan pesanan Anda sekarang.
          </p>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-green-500 animate-[width_3s_linear_forwards]" style={{width: '0%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden animate-fade-in">
      {/* Header - Compact */}
      <header className="h-16 flex-none border-b border-gray-100 bg-white px-6 lg:px-8 flex justify-between items-center z-20 relative shadow-sm">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
             <ArrowLeft size={16} />
          </div>
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Kembali</span>
        </button>
        
        <div className="text-xl font-serif tracking-[0.2em] font-medium text-primary absolute left-1/2 transform -translate-x-1/2">
          AURA
        </div>
        
        <div className="flex items-center gap-2 text-green-700 bg-green-50/50 border border-green-100 px-3 py-1.5 rounded-full">
          <Lock size={12} /> <span className="text-[10px] font-bold uppercase tracking-widest">Aman</span>
        </div>
      </header>

      {/* Split Layout 60:40 */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Form Area (60%) - CENTERED GRID */}
        <div className="w-full lg:w-[60%] h-full overflow-y-auto scrollbar-thin bg-white flex flex-col items-center justify-center relative py-8">
          <div className="w-full max-w-xl px-6 lg:px-10">
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8 w-full">
                
                {/* Contact Info */}
                <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h3 className="text-xl font-serif text-primary">Kontak</h3>
                  </div>
                  
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Alamat Email</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="anda@contoh.com" 
                      className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" 
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h3 className="text-xl font-serif text-primary">Pengiriman</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nama Depan</label>
                      <input required type="text" placeholder="Budi" className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nama Belakang</label>
                      <input required type="text" placeholder="Santoso" className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Alamat Lengkap</label>
                      <input required type="text" placeholder="Jl. Sudirman No. 123" className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                    </div>
                    <div className="col-span-1">
                       <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Kota</label>
                       <input required type="text" placeholder="Jakarta Selatan" className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                    </div>
                    <div className="col-span-1">
                       <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Kode Pos</label>
                       <input required type="text" placeholder="12190" className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
                   <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h3 className="text-xl font-serif text-primary">Pembayaran</h3>
                  </div>
                   
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nomor Kartu</label>
                        <div className="relative">
                          <input required type="text" placeholder="0000 0000 0000 0000" className="w-full h-12 bg-white border border-gray-300 rounded-lg pl-11 pr-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                          <CreditCard size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Masa Berlaku</label>
                          <input required type="text" placeholder="BB / TT" className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">CVC</label>
                          <input required type="text" placeholder="123" className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-gray-400" />
                        </div>
                      </div>
                   </div>
                </div>
                
                <div className="h-8 lg:hidden"></div>
              </form>
          </div>
        </div>

        {/* Right: Summary & Action Area (40%) */}
        <div className="w-full lg:w-[40%] bg-[#f8f8f8] border-l border-gray-200 flex flex-col h-[35vh] lg:h-full shadow-[-10px_0_40px_rgba(0,0,0,0.02)] z-10 relative">
          
          {/* Order Items - Grows */}
          <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-thin">
            <h3 className="text-lg font-serif text-primary mb-6">Pilihan Anda</h3>
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-5 items-start">
                   <div className="w-16 h-20 rounded-lg bg-white border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0 pt-1">
                      <div className="flex justify-between items-start">
                        <p className="text-base font-medium text-primary truncate pr-3 font-serif">{item.name}</p>
                        <p className="text-base font-semibold text-primary">{formatIDR(item.price * item.quantity)}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 mb-1.5 capitalize">{item.category}</p>
                      <div className="text-xs text-gray-400 font-medium">
                        Jml: {item.quantity}
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals & Checkout Button - Fixed at Bottom */}
          <div className="p-8 lg:p-12 bg-white border-t border-gray-200 shadow-[0_-4px_30px_rgba(0,0,0,0.04)]">
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatIDR(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Pengiriman</span>
                <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                  {shippingCost === 0 ? 'Gratis' : formatIDR(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-serif text-primary pt-4 border-t border-gray-100 mt-3">
                <span>Total</span>
                <span>{formatIDR(finalTotal)}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                const form = document.getElementById('checkout-form') as HTMLFormElement;
                if (form) form.requestSubmit();
              }}
              disabled={isProcessing}
              className="w-full bg-accent hover:bg-[#b56f78] text-white h-16 rounded-xl text-base uppercase tracking-widest font-bold transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 group"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"/> 
              ) : (
                <>
                  <span>Bayar Sekarang</span>
                  <ShieldCheck size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </button>
            
            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Package size={14} /> Gratis Pengembalian 30 Hari
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
