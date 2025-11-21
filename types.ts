
export interface ProductAttribute {
  name: string;
  options: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  gallery?: string[]; // For WooCommerce Product Gallery
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  scarcityText?: string;
  description: string;
  shortDescription?: string; // WooCommerce Short Desc
  attributes?: ProductAttribute[]; // For Variable Products (Size, Color)
  sku?: string;
  stockStatus?: 'instock' | 'outofstock' | 'onbackorder';
}

export interface CartItem extends Product {
  quantity: number;
  selectedAttributes?: Record<string, string>; // e.g., { Size: 'M', Color: 'Red' }
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'completed' | 'cancelled' | 'on-hold';
  total: number;
  items: CartItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string[];
}
