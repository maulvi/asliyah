
import React, { useState } from 'react';
import { User } from '../types';
import { ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock Authentication
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        id: 'user-123',
        name: 'Aura Member',
        email: 'member@aura.com',
        avatar: 'https://ui-avatars.com/api/?name=Aura+Member&background=262320&color=fff'
      });
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-soft-bg animate-fade-in">
      <div className="w-full max-w-md">
        
        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-200 relative">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'login' ? 'text-primary' : 'text-gray-400'}`}
          >
            Masuk
          </button>
          <button 
            onClick={() => setMode('register')}
            className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'register' ? 'text-primary' : 'text-gray-400'}`}
          >
            Daftar
          </button>
          
          {/* Animated Indicator */}
          <div 
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
            style={{ 
              width: '50%', 
              left: mode === 'login' ? '0%' : '50%' 
            }}
          />
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-100 border border-white/50">
           <h2 className="text-2xl font-serif text-primary mb-2">
             {mode === 'login' ? 'Selamat Datang Kembali' : 'Bergabung dengan Aura'}
           </h2>
           <p className="text-sm text-gray-500 mb-8">
             {mode === 'login' ? 'Akses pesanan, wishlist, dan rekomendasi personal.' : 'Nikmati pengalaman belanja yang dipersonalisasi.'}
           </p>

           <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'register' && (
                <div className="animate-slide-up">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nama Lengkap</label>
                  <input required type="text" className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="Nama Anda" />
                </div>
              )}
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Email</label>
                <input required type="email" className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="nama@email.com" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Password</label>
                <input required type="password" className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="••••••••" />
              </div>

              {mode === 'login' && (
                <div className="flex justify-between items-center text-xs">
                   <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                     <input type="checkbox" className="rounded border-gray-300 text-accent focus:ring-accent" />
                     Ingat saya
                   </label>
                   <a href="#" className="text-accent hover:text-primary transition-colors">Lupa Password?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-primary text-white h-12 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-accent transition-all shadow-lg shadow-accent/20 mt-4 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isLoading ? 'Memproses...' : (mode === 'login' ? 'Masuk Akun' : 'Buat Akun')}
                {!isLoading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
              </button>
           </form>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed">
          Dengan melanjutkan, Anda menyetujui <br/>Syarat & Ketentuan serta Kebijakan Privasi kami.
        </p>

      </div>
    </div>
  );
};

export default Auth;
