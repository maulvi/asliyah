
export interface ProductAttribute {
  id?: number;
  name: string;
  position?: number;
  visible?: boolean;
  variation?: boolean;
  options: string[];
}

export interface ProductImage {
  id: number;
  src: string;
  name?: string;
  alt?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string; // Essential for WordPress SEO
  permalink?: string;
  date_created?: string;
  type?: 'simple' | 'variable' | 'grouped';
  status?: 'publish' | 'draft';
  featured?: boolean;
  description: string; // HTML Content from WP
  short_description: string; // HTML Content from WP
  sku?: string;
  price: number; // Casted from string in WC
  regular_price?: number;
  sale_price?: number;
  on_sale?: boolean;
  purchasable?: boolean;
  total_sales?: number;
  stock_quantity?: number | null;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  weight?: string;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
  categories?: { id: number; name: string; slug: string }[];
  tags?: { id: number; name: string; slug: string }[];
  images: ProductImage[];
  attributes?: ProductAttribute[];
  rating_count?: number;
  average_rating?: string;
  
  // Frontend specific helpers (mapped from WC data)
  category: string; 
  image: string; // Main image helper
  rating: number;
  reviews: number;
  scarcityText?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedAttributes?: Record<string, string>;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'completed' | 'cancelled' | 'on-hold' | 'pending';
  total: number;
  currency?: string;
  billing?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    postcode: string;
  };
  items: CartItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string; // WP Username
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string[]; // Or HTML string for WP
  excerpt?: string;
}