
import React, { useState } from 'react';
import { User, Order } from '../types';
import { PRODUCTS } from '../constants';
import { Package, MapPin, User as UserIcon, LogOut, ChevronRight, Clock, Search } from 'lucide-react';
import OrderDetail from '../components/OrderDetail';

interface AccountProps {
  user: User;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'details'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderSearch, setOrderSearch] = useState('');

  // Mock Orders with Real Product Data for Layout Demo
  const mockOrders: Order[] = [
    {
      id: '#ORD-9231',
      date: '24 Okt 2023',
      status: 'processing',
      total: 2450000,
      items: [
        { ...PRODUCTS[1], quantity: 1, selectedAttributes: { Size: 'M', Color: 'Black' } } // Coat
      ]
    },
    {
      id: '#ORD-8100',
      date: '12 Sep 2023',
      status: 'completed',
      total: 1700000,
      items: [
        { ...PRODUCTS[0], quantity: 1 }, // Serum
        { ...PRODUCTS[4], quantity: 1, selectedAttributes: { Shade: 'Ruby' } } // Lipstick
      ]
    }
  ];

  // Filter logic
  const filteredOrders = mockOrders.filter(order => {
    const searchLower = orderSearch.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.items.some(item => item.name.toLowerCase().includes(searchLower))
    );
  });

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // If an order is selected, show the Detail View instead of the Dashboard
  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-soft-bg pt-12 pb-20 px-4 md:px-8">
         <div className="max-w-4xl mx-auto">
            <OrderDetail 
              order={selectedOrder} 
              onBack={() => setSelectedOrder(null)} 
            />
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-bg animate-fade-in pt-12 pb-20 px-4 md:px-8">
       <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-serif text-2xl italic border-4 border-white shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-2xl text-primary">Halo, {user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="md:col-span-1 space-y-2">
               <button 
                 onClick={() => setActiveTab('orders')}
                 className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary hover:bg-white/50'}`}
               >
                 <Package size={18} /> Pesanan
               </button>
               <button 
                 onClick={() => setActiveTab('addresses')}
                 className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all ${activeTab === 'addresses' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary hover:bg-white/50'}`}
               >
                 <MapPin size={18} /> Alamat
               </button>
               <button 
                 onClick={() => setActiveTab('details')}
                 className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all ${activeTab === 'details' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary hover:bg-white/50'}`}
               >
                 <UserIcon size={18} /> Akun Saya
               </button>
               <div className="pt-4 border-t border-gray-200 mt-4">
                 <button 
                   onClick={onLogout}
                   className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                 >
                   <LogOut size={18} /> Keluar
                 </button>
               </div>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
              {activeTab === 'orders' && (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                     <h2 className="text-xl font-serif">Riwayat Pesanan</h2>
                     
                     {/* Order Search Input */}
                     <div className="relative w-full md:w-64">
                       <input 
                         type="text" 
                         placeholder="Cari ID atau Produk..." 
                         value={orderSearch}
                         onChange={(e) => setOrderSearch(e.target.value)}
                         className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                       />
                       <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                     </div>
                   </div>

                   {filteredOrders.length > 0 ? (
                     filteredOrders.map(order => (
                       <div 
                          key={order.id} 
                          onClick={() => setSelectedOrder(order)}
                          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/20 transition-colors cursor-pointer group"
                       >
                          <div>
                             <div className="flex items-center gap-3 mb-2">
                               <span className="font-bold text-primary">{order.id}</span>
                               <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                 {order.status === 'processing' ? 'Diproses' : 'Selesai'}
                               </span>
                             </div>
                             <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Clock size={12}/> {order.date}</span>
                                <span>{formatIDR(order.total)}</span>
                                <span className="hidden sm:inline text-gray-300">|</span>
                                <span className="text-gray-400">{order.items.length} Barang</span>
                             </div>
                          </div>
                          <button className="text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Detail <ChevronRight size={14} />
                          </button>
                       </div>
                     ))
                   ) : (
                     <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 border-dashed">
                       <p className="text-gray-400 text-sm">Tidak ditemukan pesanan yang cocok dengan "{orderSearch}"</p>
                     </div>
                   )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="animate-fade-in">
                   <h2 className="text-xl font-serif mb-6">Buku Alamat</h2>
                   <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">Utama</div>
                      <h3 className="font-bold text-primary mb-2">{user.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Jl. Jendral Sudirman Kav. 52-53<br/>
                        SCBD, Kebayoran Baru<br/>
                        Jakarta Selatan, 12190<br/>
                        Indonesia
                      </p>
                      <button className="text-xs font-bold text-accent uppercase tracking-widest hover:text-primary transition-colors">Edit Alamat</button>
                   </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="animate-fade-in">
                   <h2 className="text-xl font-serif mb-6">Detail Akun</h2>
                   <form className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 max-w-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Nama Depan</label>
                          <input type="text" defaultValue="Aura" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Nama Belakang</label>
                          <input type="text" defaultValue="Member" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
                          <input type="email" defaultValue={user.email} disabled className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed" />
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Password Baru</label>
                          <input type="password" placeholder="Biarkan kosong jika tidak diubah" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                      </div>
                      <button className="bg-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors">Simpan Perubahan</button>
                   </form>
                </div>
              )}
            </div>
          </div>
       </div>
    </div>
  );
};

export default Account;
