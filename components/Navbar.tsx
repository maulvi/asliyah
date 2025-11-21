import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/98 backdrop-blur-md py-4 text-primary shadow-sm' 
          : 'bg-gradient-to-b from-black/50 to-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-3 items-center">
        
        {/* Left: Navigation Actions */}
        <div className="flex items-center gap-6 sm:gap-8">
           <button className="group flex items-center gap-2 hover:text-accent transition-colors">
             <Menu size={20} strokeWidth={1.5} />
             <span className="hidden lg:block text-xs font-bold uppercase tracking-widest opacity-90 group-hover:opacity-100">Menu</span>
           </button>
           <button className="group flex items-center gap-2 hover:text-accent transition-colors">
             <Search size={20} strokeWidth={1.5} />
             <span className="hidden lg:block text-xs font-bold uppercase tracking-widest opacity-90 group-hover:opacity-100">Cari</span>
           </button>
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-medium hover:opacity-80 transition-opacity"
          >
            AURA
          </a>
        </div>

        {/* Right: User & Cart */}
        <div className="flex items-center justify-end gap-6 sm:gap-8">
          <button className="group flex items-center gap-2 hover:text-accent transition-colors">
             <span className="hidden lg:block text-xs font-bold uppercase tracking-widest opacity-90 group-hover:opacity-100">Akun</span>
             <User size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={onOpenCart}
            className="group flex items-center gap-2 hover:text-accent transition-colors relative"
          >
             <span className="hidden lg:block text-xs font-bold uppercase tracking-widest opacity-90 group-hover:opacity-100">Tas</span>
             <div className="relative">
               <ShoppingBag size={20} strokeWidth={1.5} />
               {cartCount > 0 && (
                 <span className={`absolute -top-1 -right-1 text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full ${scrolled ? 'bg-accent text-white' : 'bg-white text-primary'}`}>
                   {cartCount}
                 </span>
               )}
             </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;