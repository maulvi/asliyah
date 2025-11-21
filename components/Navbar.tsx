
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (page: 'home' | 'shop' | 'blog' | 'account') => void;
  onSearchClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate, onSearchClick }) => {
  const [scrolled, setScrolled] = useState(false);

  // Using a ref would be better in a real app, but window scroll works for sticky inside body too
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-soft-bg py-5'
      }`}
    >
      <div className="px-6 md:px-10 grid grid-cols-3 items-center">
        
        {/* Left: Navigation Actions */}
        <div className="flex items-center gap-4 md:gap-8">
           <button className="lg:hidden group flex items-center gap-2 text-primary hover:text-accent transition-colors">
             <Menu size={20} strokeWidth={1.5} />
           </button>
           
           {/* Desktop Nav Links */}
           <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('shop')}
                className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors relative group"
              >
                Belanja
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => onNavigate('blog')}
                className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all group-hover:w-full"></span>
              </button>
              <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors relative group">
                Tentang
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all group-hover:w-full"></span>
              </button>
           </nav>

           <button 
             onClick={onSearchClick}
             className="hidden lg:flex items-center gap-2 text-primary hover:text-accent transition-colors"
           >
             <Search size={18} strokeWidth={1.5} />
           </button>
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <a 
            href="/" 
            onClick={(e) => { 
              e.preventDefault(); 
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }}
            className="text-2xl font-serif tracking-[0.25em] font-bold text-primary"
          >
            AURA
          </a>
        </div>

        {/* Right: User & Cart */}
        <div className="flex items-center justify-end gap-6">
           <button 
             onClick={onSearchClick}
             className="lg:hidden flex items-center gap-2 text-primary hover:text-accent transition-colors"
           >
             <Search size={20} strokeWidth={1.5} />
           </button>
          <button 
            onClick={() => onNavigate('account')}
            className="hidden sm:flex items-center gap-2 text-primary hover:text-accent transition-colors"
          >
             <User size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={onOpenCart}
            className="group flex items-center gap-2 text-primary hover:text-accent transition-colors relative"
          >
             <div className="relative">
               <ShoppingBag size={20} strokeWidth={1.5} />
               {cartCount > 0 && (
                 <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full bg-accent text-white animate-fade-in">
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
