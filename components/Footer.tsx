import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="font-serif text-xl mb-4 tracking-wider">AURA</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Meningkatkan esensi sehari-hari melalui praktik berkelanjutan dan kualitas tanpa kompromi.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-300">Belanja</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Koleksi Terbaru</a></li>
            <li><a href="#" className="hover:text-white transition">Terlaris</a></li>
            <li><a href="#" className="hover:text-white transition">Kecantikan</a></li>
            <li><a href="#" className="hover:text-white transition">Mode</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-300">Bantuan</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Pengiriman & Pengembalian</a></li>
            <li><a href="#" className="hover:text-white transition">Panduan Ukuran</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-300">Tetap Terhubung</h4>
          <p className="text-xs text-gray-500 mb-4">Dapatkan diskon 10% untuk pesanan pertama Anda.</p>
          <div className="flex border-b border-gray-600 pb-2">
            <input 
              type="email" 
              placeholder="Masukkan email Anda" 
              className="bg-transparent w-full focus:outline-none text-sm placeholder-gray-500"
            />
            <button className="text-xs uppercase font-bold text-accent hover:text-white transition">Gabung</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} AURA. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
};

export default Footer;