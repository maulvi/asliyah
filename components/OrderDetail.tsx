
import React from 'react';
import { Order } from '../types';
import { ArrowLeft, Package, Truck, CheckCircle2, MapPin, CreditCard, HelpCircle, RotateCcw } from 'lucide-react';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  // Simple timeline logic based on status
  const steps = [
    { status: 'processing', label: 'Pesanan Dibuat', icon: Package },
    { status: 'shipped', label: 'Dalam Pengiriman', icon: Truck },
    { status: 'completed', label: 'Terkirim', icon: CheckCircle2 },
  ];

  const getCurrentStepIndex = (status: string) => {
    if (status === 'processing') return 0;
    if (status === 'on-hold') return 0;
    if (status === 'shipped') return 1;
    if (status === 'completed') return 2;
    return 0;
  };

  const currentStep = getCurrentStepIndex(order.status);

  return (
    <div className="animate-fade-in">
      {/* Header Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary mb-6 group transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Pesanan
      </button>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Order Header & Timeline */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
           <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
             <div>
               <h2 className="text-2xl font-serif text-primary mb-1">Pesanan {order.id}</h2>
               <p className="text-sm text-gray-500">Dipesan pada {order.date}</p>
             </div>
             <div className="flex gap-3">
               <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-widest text-primary hover:bg-gray-50 transition-colors flex items-center gap-2">
                 <HelpCircle size={14} /> Bantuan
               </button>
               <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors flex items-center gap-2">
                 <RotateCcw size={14} /> Beli Lagi
               </button>
             </div>
           </div>

           {/* Status Timeline */}
           <div className="relative px-4 md:px-12 py-4">
             <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden md:block" />
             <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
               {steps.map((step, index) => {
                 const isActive = index <= currentStep;
                 const Icon = step.icon;
                 return (
                   <div key={step.label} className="flex md:flex-col items-center gap-4 md:gap-3 bg-gray-50/50 md:bg-transparent">
                     <div className={`
                       w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500
                       ${isActive ? 'bg-accent border-accent-light text-white' : 'bg-white border-gray-200 text-gray-300'}
                     `}>
                       <Icon size={18} />
                     </div>
                     <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                       {step.label}
                     </span>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Items List */}
          <div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
             <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Detail Produk</h3>
             <div className="space-y-6">
               {order.items.map((item, idx) => (
                 <div key={idx} className="flex gap-4 items-start">
                    <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-start">
                          <h4 className="font-serif text-lg text-primary truncate pr-4">{item.name}</h4>
                          <p className="font-medium text-primary">{formatIDR(item.price)}</p>
                       </div>
                       <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                       {item.selectedAttributes && (
                         <div className="flex gap-2 mb-2">
                           {Object.entries(item.selectedAttributes).map(([key, val]) => (
                             <span key={key} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 capitalize">
                               {key}: {val}
                             </span>
                           ))}
                         </div>
                       )}
                       <p className="text-xs text-gray-400">Jumlah: {item.quantity}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 bg-gray-50/30 p-6 md:p-8 space-y-8">
             
             {/* Address */}
             <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                 <MapPin size={14} /> Alamat Pengiriman
               </h3>
               <p className="text-sm text-gray-700 leading-relaxed">
                 Aura Member<br/>
                 Jl. Jendral Sudirman Kav. 52-53<br/>
                 Jakarta Selatan, 12190<br/>
                 0812-3456-7890
               </p>
             </div>

             {/* Payment */}
             <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                 <CreditCard size={14} /> Metode Pembayaran
               </h3>
               <div className="flex items-center gap-3 text-sm text-primary font-medium">
                  <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center">
                    <span className="text-[8px] font-bold">BCA</span>
                  </div>
                  Transfer Bank
               </div>
             </div>

             {/* Summary */}
             <div className="pt-6 border-t border-gray-200 space-y-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatIDR(order.items.reduce((acc, i) => acc + (i.price * i.quantity), 0))}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Pengiriman</span>
                  <span>Rp 0</span>
                </div>
                <div className="flex justify-between text-base font-serif text-primary pt-3 border-t border-dashed border-gray-200">
                  <span>Total</span>
                  <span>{formatIDR(order.total)}</span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
