
import { Product, BlogPost } from '../types';
import { PRODUCTS, BLOG_POSTS } from '../constants';

// Konfigurasi untuk WooCommerce REST API
const WC_CONFIG = {
  baseUrl: process.env.REACT_APP_WC_URL || '', // e.g., https://your-site.com
  consumerKey: process.env.REACT_APP_WC_KEY || '',
  consumerSecret: process.env.REACT_APP_WC_SECRET || '',
};

/**
 * Helper untuk mengubah Mock Data (constants.ts) menjadi format yang sesuai interface baru
 * Ini memastikan aplikasi tidak error saat transisi ke tipe data WooCommerce
 */
const mapMockProductToWC = (p: any): Product => ({
  ...p,
  slug: p.name.toLowerCase().replace(/ /g, '-'),
  short_description: p.shortDescription || p.description.substring(0, 100) + '...',
  description: `<p>${p.description}</p>`, // Simulasi HTML WP
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
  // JIKA API KEY TERSEDIA, GUNAKAN LIVE WOOCOMMERCE
  if (WC_CONFIG.baseUrl && WC_CONFIG.consumerKey) {
    try {
      let url = `${WC_CONFIG.baseUrl}/wp-json/wc/v3/products?consumer_key=${WC_CONFIG.consumerKey}&consumer_secret=${WC_CONFIG.consumerSecret}&page=${page}&per_page=${perPage}&status=publish`;
      
      if (category !== 'Semua') {
         // Di real app, Anda perlu fetch category ID dulu. Disini kita mock category ID param
         // url += `&category=${categoryId}`; 
      }

      const res = await fetch(url);
      const data = await res.json();
      const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
      
      // Mapping Real WC Data ke UI kita
      const mappedProducts = data.map((p: any) => ({
        ...p,
        image: p.images[0]?.src || 'placeholder.jpg',
        category: p.categories[0]?.name || 'Uncategorized',
        price: parseInt(p.price || '0', 10),
        rating: parseFloat(p.average_rating),
        reviews: p.rating_count,
        description: p.description,
        short_description: p.short_description,
      }));

      return { products: mappedProducts, total };
    } catch (error) {
      console.error("WC Fetch Error, falling back to mock", error);
    }
  }

  // FALLBACK: MOCK DATA (Untuk demo saat ini)
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network latency
  
  let filtered = PRODUCTS.map(mapMockProductToWC);
  if (category !== 'Semua') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return { products: paginated, total: filtered.length };
};

export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  // Fallback Logic
  await new Promise(resolve => setTimeout(resolve, 300));
  const found = PRODUCTS.map(mapMockProductToWC).find(p => p.slug === slug);
  return found || null;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // Bisa dihubungkan ke WP REST API (/wp-json/wp/v2/posts)
  await new Promise(resolve => setTimeout(resolve, 400));
  return BLOG_POSTS.map(mapMockPostToWC);
};

export const createOrder = async (orderData: any) => {
  console.log("Sending order to WooCommerce:", orderData);
  // Di sini implementasi POST ke /wp-json/wc/v3/orders
  return { success: true, orderId: Math.floor(Math.random() * 10000) };
};
