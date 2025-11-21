
import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { ShieldCheck, Lock, CreditCard, ArrowLeft, CheckCircle2, Package, ChevronDown, ChevronUp, Landmark, Banknote, Wallet, AlertCircle } from 'lucide-react';
import { validateInput, escapeInput } from '../utils/security';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onPlaceOrder: () => void;
}

type PaymentMethod = 'card' | 'transfer' | 'cod';

const Checkout: React.FC<CheckoutProps> = ({ cart, total, onBack, onPlaceOrder }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [selectedBank, setSelectedBank] = useState('bca');
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  // Error State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const FREE_SHIPPING_THRESHOLD = 1500000;
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : 20000;
  const codFee = paymentMethod === 'cod' ? 5000 : 0; 
  const finalTotal = total + shippingCost + codFee;

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Security: Sanitize Input (prevent injection characters)
    const cleanValue = escapeInput(value);

    setFormData(prev => ({
      ...prev,
      [name]: cleanValue
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Security: Validate against strict patterns (Penetration Testing Defense)
    if (!validateInput(formData.email, 'EMAIL')) newErrors.email = "Format email tidak valid";
    if (!validateInput(formData.firstName, 'TEXT_SAFE')) newErrors.firstName = "Karakter tidak valid";
    if (!validateInput(formData.lastName, 'TEXT_SAFE')) newErrors.lastName = "Karakter tidak valid";
    if (!validateInput(formData.address, 'TEXT_SAFE')) newErrors.address = "Alamat mengandung karakter tidak valid";
    if (!validateInput(formData.city, 'TEXT_SAFE')) newErrors.city = "Nama kota tidak valid";
    if (!validateInput(formData.zip, 'ZIP')) newErrors.zip = "Kode pos tidak valid (3-10 karakter)";

    if (paymentMethod === 'card') {
      const cleanCard = formData.cardNumber.replace(/\s/g, '');
      if (!validateInput(cleanCard, 'CARD')) newErrors.cardNumber = "Nomor kartu tidak valid";
      if (!validateInput(formData.expiry, 'EXPIRY')) newErrors.expiry = "Format BB/TT salah";
      if (!validateInput(formData.cvc, 'CVC')) newErrors.cvc = "CVC tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate secure processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPlaceOrder();
      }, 3000);
    }, 2000);
  };

  const handleExternalSubmit = () => {
    handleSubmit();
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
    <div className="min-h-screen w-full bg-white flex flex-col animate-fade-in lg:h-screen lg:overflow-hidden">
      {/* Header */}
      <header className="h-16 flex-none border-b border-gray-100 bg-white px-6 lg:px-8 flex justify-between items-center z-30 sticky top-0 lg:relative shadow-sm lg:shadow-none">
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

      {/* Main Layout */}
      <div className="flex-1 flex flex-col-reverse lg:flex-row overflow-visible lg:overflow-hidden">
        
        {/* 1. FORM AREA */}
        <div className="w-full lg:w-[60%] h-auto lg:h-full overflow-visible lg:overflow-y-auto bg-white relative z-10 pb-32 lg:pb-0">
          <div className="w-full max-w-xl mx-auto px-6 lg:px-10 py-8">
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8 w-full" noValidate>
                
                {/* Contact Info */}
                <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h3 className="text-xl font-serif text-primary">Kontak</h3>
                  </div>
                  
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Alamat Email</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="anda@contoh.com" 
                      className={`w-full h-12 bg-gray-50 border rounded-lg px-4 text-base text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder-gray-400 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-300 focus:border-accent focus:ring-accent/20'}`} 
                    />
                    {errors.email && <div className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle size={10}/> {errors.email}</div>}
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
                      <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="Budi" className={`w-full h-12 bg-gray-50 border rounded-lg px-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.firstName ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:border-accent focus:ring-accent/20'}`} />
                      {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nama Belakang</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Santoso" className={`w-full h-12 bg-gray-50 border rounded-lg px-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.lastName ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:border-accent focus:ring-accent/20'}`} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Alamat Lengkap</label>
                      <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Jl. Sudirman No. 123" className={`w-full h-12 bg-gray-50 border rounded-lg px-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.address ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:border-accent focus:ring-accent/20'}`} />
                      {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
                    </div>
                    <div className="col-span-1">
                       <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Kota</label>
                       <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="Jakarta Selatan" className={`w-full h-12 bg-gray-50 border rounded-lg px-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.city ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:border-accent focus:ring-accent/20'}`} />
                    </div>
                    <div className="col-span-1">
                       <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Kode Pos</label>
                       <input name="zip" value={formData.zip} onChange={handleChange} type="text" placeholder="12190" className={`w-full h-12 bg-gray-50 border rounded-lg px-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.zip ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:border-accent focus:ring-accent/20'}`} />
                       {errors.zip && <p className="text-[10px] text-red-500 mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
                   <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h3 className="text-xl font-serif text-primary">Pembayaran</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button" 
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'border-accent bg-accent/5 text-accent shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'}`}
                    >
                      <CreditCard size={24} strokeWidth={1.5} className="mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">Kartu</span>
                    </button>
                    <button
                      type="button" 
                      onClick={() => setPaymentMethod('transfer')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'transfer' ? 'border-accent bg-accent/5 text-accent shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'}`}
                    >
                      <Landmark size={24} strokeWidth={1.5} className="mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">Transfer</span>
                    </button>
                    <button
                      type="button" 
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'cod' ? 'border-accent bg-accent/5 text-accent shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'}`}
                    >
                      <Banknote size={24} strokeWidth={1.5} className="mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">COD</span>
                    </button>
                  </div>
                   
                   {/* Conditional Payment Forms */}
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all duration-300">
                      
                      {paymentMethod === 'card' && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nomor Kartu</label>
                              <div className="relative">
                                <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} type="text" placeholder="0000 0000 0000 0000" className={`w-full h-12 bg-white border rounded-lg pl-11 pr-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.cardNumber ? 'border-red-300' : 'border-gray-300 focus:border-accent'}`} />
                                <CreditCard size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              </div>
                              {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Masa Berlaku</label>
                                <input name="expiry" value={formData.expiry} onChange={handleChange} type="text" placeholder="BB/TT" className={`w-full h-12 bg-white border rounded-lg px-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.expiry ? 'border-red-300' : 'border-gray-300 focus:border-accent'}`} />
                                {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">CVC</label>
                                <input name="cvc" value={formData.cvc} onChange={handleChange} type="text" placeholder="123" className={`w-full h-12 bg-white border rounded-lg px-4 text-base focus:outline-none focus:ring-2 transition-all ${errors.cvc ? 'border-red-300' : 'border-gray-300 focus:border-accent'}`} />
                                {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
                              </div>
                            </div>
                        </div>
                      )}

                      {paymentMethod === 'transfer' && (
                        <div className="space-y-4 animate-fade-in">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Pilih Bank</label>
                            <div className="relative">
                              <select 
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                className="w-full h-12 bg-white border border-gray-300 rounded-lg pl-4 pr-10 text-base text-gray-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
                              >
                                <option value="bca">Bank BCA (Dicek Otomatis)</option>
                                <option value="mandiri">Bank Mandiri (Dicek Otomatis)</option>
                                <option value="bri">Bank BRI</option>
                                <option value="bni">Bank BNI</option>
                              </select>
                              <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
                            <p>Nomor Virtual Account akan digenerate setelah Anda menekan tombol <strong>Bayar Sekarang</strong>. Verifikasi pembayaran berjalan otomatis.</p>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="flex items-start gap-3 animate-fade-in">
                          <div className="bg-accent/10 p-2 rounded-full text-accent">
                             <Wallet size={20} />
                          </div>
                          <div>
                             <h4 className="font-bold text-primary text-sm mb-1">Bayar di Tempat</h4>
                             <p className="text-xs text-gray-500 leading-relaxed">
                               Silakan siapkan uang tunai sebesar <span className="font-bold text-primary">{formatIDR(finalTotal)}</span> saat kurir tiba.
                               <br/><span className="text-accent italic mt-1 block">*Biaya penanganan COD Rp 5.000 sudah termasuk.</span>
                             </p>
                          </div>
                        </div>
                      )}

                   </div>
                </div>
              </form>
          </div>
        </div>

        {/* 2. SUMMARY AREA (Right on Desktop, Top on Mobile) */}
        <div className="w-full lg:w-[40%] bg-[#f8f8f8] border-b lg:border-b-0 lg:border-l border-gray-200 flex flex-col h-auto lg:h-full shadow-[-10px_0_40px_rgba(0,0,0,0.02)] z-20 lg:z-10">
          
          {/* Mobile Accordion */}
          <button 
            className="lg:hidden w-full p-4 flex justify-between items-center bg-gray-50 border-b border-gray-200"
            onClick={() => setShowMobileSummary(!showMobileSummary)}
          >
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <span>{showMobileSummary ? 'Sembunyikan' : 'Lihat'} Ringkasan Pesanan</span>
              {showMobileSummary ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </div>
            <span className="font-serif font-bold text-primary">{formatIDR(finalTotal)}</span>
          </button>

          {/* Order Items Area */}
          <div className={`
            flex-1 overflow-hidden transition-all duration-300 lg:block
            ${showMobileSummary ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-full lg:opacity-100'}
          `}>
            <div className="p-6 lg:p-12 lg:overflow-y-auto lg:h-[calc(100vh-250px)] scrollbar-thin">
              <h3 className="hidden lg:block text-lg font-serif text-primary mb-6">Pilihan Anda</h3>
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-start">
                     <div className="w-16 h-20 lg:w-16 lg:h-20 rounded-lg bg-white border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold lg:hidden shadow-sm">
                          {item.quantity}
                        </span>
                     </div>
                     <div className="flex-1 min-w-0 pt-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm lg:text-base font-medium text-primary truncate pr-3 font-serif">{item.name}</p>
                          <p className="text-sm lg:text-base font-semibold text-primary">{formatIDR(item.price * item.quantity)}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 mb-1.5 capitalize">{item.category}</p>
                        <div className="hidden lg:block text-xs text-gray-400 font-medium">
                          Jml: {item.quantity}
                        </div>
                     </div>
                  </div>
                ))}
              </div>

              {/* Mobile Breakdown Inline */}
              <div className="lg:hidden mt-8 pt-6 border-t border-gray-200 space-y-3">
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
                   {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Biaya COD</span>
                      <span>{formatIDR(codFee)}</span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* DESKTOP Bottom Section (Total + Pay Button) */}
          <div className="hidden lg:block p-12 bg-white border-t border-gray-200 shadow-[0_-4px_30px_rgba(0,0,0,0.04)] mt-auto">
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
              {paymentMethod === 'cod' && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Biaya COD</span>
                  <span>{formatIDR(codFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-serif text-primary pt-4 border-t border-gray-100 mt-3">
                <span>Total</span>
                <span>{formatIDR(finalTotal)}</span>
              </div>
            </div>

            <button 
              onClick={handleExternalSubmit}
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

      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom">
         <div className="flex gap-4 items-center">
            <div className="flex-1">
               <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Total</p>
               <p className="text-lg font-serif font-bold text-primary leading-none">{formatIDR(finalTotal)}</p>
            </div>
            <button 
              onClick={handleExternalSubmit}
              disabled={isProcessing}
              className="flex-1 bg-accent text-white h-12 rounded-lg text-sm uppercase tracking-widest font-bold shadow-lg shadow-accent/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> 
              ) : (
                <>Bayar <ShieldCheck size={16} /></>
              )}
            </button>
         </div>
      </div>

    </div>
  );
};

export default Checkout;
