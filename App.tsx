import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import { Product, CartItem } from './types';

// Simple routing state
type Page = 'home' | 'product' | 'checkout';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Navigation Handlers
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
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
  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Render Logic
  if (currentPage === 'checkout') {
    return (
      <Checkout 
        cart={cart} 
        total={cartTotal} 
        onBack={() => setCurrentPage('home')}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-primary">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Home 
            onViewProduct={handleViewProduct} 
            onAddToCart={(p) => addToCart(p, 1)}
          />
        )}
        
        {currentPage === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToHome}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        total={cartTotal}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;