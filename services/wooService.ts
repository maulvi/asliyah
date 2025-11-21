
import { Product, BlogPost } from '../types';
import { PRODUCTS, BLOG_POSTS } from '../constants';

// Helper to safely get env vars in both Vite and CRA/Node environments
const getEnv = (key: string, viteKey: string) => {
  let val = '';
  // Check process.env (Node/CRA)
  try {
    if (typeof process !== 'undefined' && process.env) {
      val = process.env[key] || '';
    }
  } catch {}
  
  // Check import.meta.env (Vite)
  if (!val) {
    try {
       // @ts-ignore
       if (typeof import.meta !== 'undefined' && import.meta.env) {
          // @ts-ignore
          val = import.meta.env[key] || import.meta.env[viteKey] || '';
       }
    } catch {}
  }
  return val;
};

// Configuration for WooCommerce REST API
const WC_CONFIG = {
  baseUrl: getEnv('REACT_APP_WC_URL', 'VITE_WC_URL'), 
  consumerKey: getEnv('REACT_APP_WC_KEY', 'VITE_WC_KEY'),
  consumerSecret: getEnv('REACT_APP_WC_SECRET', 'VITE_WC_SECRET'),
};

/**
 * Helper to map Mock Data to WC Interface
 */
const mapMockProductToWC = (p: any): Product => ({
  ...p,
  slug: p.name.toLowerCase().replace(/ /g, '-'),
  short_description: p.shortDescription || p.description.substring(0, 100) + '...',
  description: `<p>${p.description}</p>`, // Simulate WP HTML
  images: p.gallery ? p.gallery.map((url: string, i: number) => ({ id: i, src: url, name: p.name })) : [{ id: 1, src: p.image, name: p.name }],
  average_rating: p.rating.toString(),
  rating_count: p.reviews,
  categories: [{ id: 1, name: p.category, slug: p.category.toLowerCase() }],
  on_sale: !!p.originalPrice,
  regular_price: p.originalPrice || p.price,
  tags: []
});

const mapMockPostToWC = (p: any): BlogPost => ({
  ...p,
  slug: p.id,
  excerpt: p.subtitle,
});

// --- API SERVICES ---

export const fetchProducts = async (category: string = 'Semua', page: number = 1, perPage: number = 10): Promise<{ products: Product[], total: number }> => {
  // IF API KEY IS AVAILABLE, USE LIVE WOOCOMMERCE
  if (WC_CONFIG.baseUrl && WC_CONFIG.consumerKey) {
    try {
      let url = `${WC_CONFIG.baseUrl}/wp-json/wc/v3/products?consumer_key=${WC_CONFIG.consumerKey}&consumer_secret=${WC_CONFIG.consumerSecret}&page=${page}&per_page=${perPage}&status=publish`;
      
      const res = await fetch(url);
      const data = await res.json();
      const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
      
      const mappedProducts = data.map((p: any) => ({
        ...p,
        image: p.images[0]?.src || 'placeholder.jpg',
        category: p.categories[0]?.name || 'Uncategorized',
        price: parseInt(p.price || '0', 10),
        rating: parseFloat(p.average_rating) || 0,
        reviews: p.rating_count || 0,
        description: p.description,
        short_description: p.short_description,
      }));

      return { products: mappedProducts, total };
    } catch (error) {
      console.error("WC Fetch Error, falling back to mock", error);
    }
  }

  // FALLBACK: MOCK DATA
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network
  
  let filtered = PRODUCTS.map(mapMockProductToWC);
  if (category !== 'Semua') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return { products: paginated, total: filtered.length };
};

export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const found = PRODUCTS.map(mapMockProductToWC).find(p => p.slug === slug);
  return found || null;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return BLOG_POSTS.map(mapMockPostToWC);
};

export const createOrder = async (orderData: any) => {
  console.log("Sending order to WooCommerce:", orderData);
  return { success: true, orderId: Math.floor(Math.random() * 10000) };
};
