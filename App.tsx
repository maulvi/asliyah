
import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import AIStylist from './components/AIStylist'; 
import { Product, CartItem, User } from './types';
import { BLOG_POSTS } from './constants';
import { Loader2 } from 'lucide-react';

// Eager Load Home for LCP (Largest Contentful Paint) optimization
import Home from './pages/Home';

// Lazy Load other pages to reduce initial bundle size
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Shop = lazy(() => import('./pages/Shop'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPost'));
const Account = lazy(() => import('./pages/Account'));
const Auth = lazy(() => import('./pages/Auth'));

// Updated routing state
type Page = 'home' | 'shop' | 'product' | 'checkout' | 'blog' | 'blog-post' | 'account' | 'auth';

// Elegant Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center w-full">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-gray-100 border-t-primary rounded-full animate-spin"></div>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">Memuat Aura...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopCategory, setShopCategory] = useState<string>('Semua');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Navigation Handlers
  const handleNavigate = (page: 'home' | 'shop' | 'blog' | 'account') => {
    if (page === 'shop') setShopCategory('Semua');
    
    if (page === 'account') {
      if (currentUser) {
        setCurrentPage('account');
      } else {
        setCurrentPage('auth');
      }
    } else if (page === 'blog') {
      setCurrentPage('blog');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const handleReadPost = (post: any) => {
    setSelectedPostId(post.id);
    setCurrentPage('blog-post');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setTimeout(() => {
      setCurrentPage('home');
    }, 500);
  };

  // Cart Logic
  const addToCart = (product: Product, qty: number = 1, attributes?: Record<string, string>) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id); 
      
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }
      return [...prev, { ...product, quantity: qty, selectedAttributes: attributes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('account');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('auth');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Render Logic
  const renderContent = () => {
    switch (currentPage) {
      case 'checkout':
        return (
          <Suspense fallback={<PageLoader />}>
            <Checkout 
              cart={cart} 
              total={cartTotal} 
              onBack={() => setCurrentPage('home')}
              onPlaceOrder={handlePlaceOrder}
            />
          </Suspense>
        );
      case 'product':
        return selectedProduct ? (
           <Suspense fallback={<PageLoader />}>
             <ProductDetail 
                product={selectedProduct} 
                onBack={handleBackToHome}
                onAddToCart={addToCart}
              />
           </Suspense>
        ) : null;
      case 'shop':
        return (
          <Suspense fallback={<PageLoader />}>
            <Shop 
              initialCategory={shopCategory}
              onViewProduct={handleViewProduct}
              onAddToCart={(p) => addToCart(p, 1)}
            />
          </Suspense>
        );
      case 'blog':
        return (
          <Suspense fallback={<PageLoader />}>
            <Blog onReadPost={handleReadPost} />
          </Suspense>
        );
      case 'blog-post':
        const post = BLOG_POSTS.find(p => p.id === selectedPostId) || BLOG_POSTS[0];
        return (
          <Suspense fallback={<PageLoader />}>
            <BlogPostDetail 
              post={post} 
              onBack={() => setCurrentPage('blog')} 
            />
          </Suspense>
        );
      case 'auth':
        return (
          <Suspense fallback={<PageLoader />}>
            <Auth onLogin={handleLogin} />
          </Suspense>
        );
      case 'account':
        return currentUser ? (
          <Suspense fallback={<PageLoader />}>
            <Account user={currentUser} onLogout={handleLogout} />
          </Suspense>
        ) : (
          <Suspense fallback={<PageLoader />}>
            <Auth onLogin={handleLogin} />
          </Suspense>
        );
      case 'home':
      default:
        // Home is eager loaded
        return (
           <Home 
              onViewProduct={handleViewProduct} 
              onAddToCart={(p) => addToCart(p, 1)}
            />
        );
    }
  };

  if (currentPage === 'checkout') {
    return renderContent();
  }

  return (
    <div className="min-h-screen flex justify-center sm:py-4 lg:py-8 px-0 sm:px-4">
      {/* THE BOX WRAPPER */}
      <div className="w-full max-w-[1320px] bg-soft-bg shadow-2xl sm:rounded-[2rem] overflow-hidden relative flex flex-col min-h-[calc(100vh-2rem)] border border-white/50 ring-1 ring-black/5">
        
        <Navbar 
          cartCount={cartCount} 
          onOpenCart={() => setIsCartOpen(true)} 
          onNavigate={handleNavigate}
          onSearchClick={() => setIsSearchOpen(true)}
        />
        
        <main className="flex-grow">
          {renderContent()}
        </main>

        <Footer />

        <AIStylist currentProductContext={selectedProduct?.name} />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cart} 
          onRemove={removeFromCart}
          total={cartTotal}
          onCheckout={handleCheckout}
        />

        <SearchOverlay 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onProductClick={handleViewProduct}
        />
      </div>
    </div>
  );
};

export default App;
