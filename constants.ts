import { Product } from './types';

// Optimized image URLs: w=600 for cards (retina ready but small), q=75 for compression
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Luminous Silk Serum",
    price: 1250000,
    category: "Kecantikan",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=75&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 1240,
    isBestSeller: true,
    scarcityText: "14 orang membeli dalam 1 jam terakhir",
    description: "Serum ringan yang seketika mencerahkan dan menghidrasi untuk kulit bercahaya alami. Diperkaya dengan ekstrak tumbuhan langka untuk mengembalikan kilau alami Anda."
  },
  {
    id: 2,
    name: "The Structured Wool Coat",
    price: 4850000,
    originalPrice: 6500000,
    category: "Mode",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=75&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 320,
    scarcityText: "Tinggal 2 stok ukuran Medium",
    description: "Sentuhan klasik bertemu minimalisme modern. Dibuat dari campuran wol premium, menampilkan siluet santai yang sempurna untuk layering."
  },
  {
    id: 3,
    name: "Midnight Recovery Oil",
    price: 980000,
    category: "Kecantikan",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=75&w=600&auto=format&fit=crop",
    rating: 5.0,
    reviews: 89,
    isNew: true,
    description: "Perbaiki dan regenerasi kulit saat Anda tidur. Campuran minyak esensial ampuh ini mengembalikan elastisitas kulit dan menciptakan lapisan pelindung."
  },
  {
    id: 4,
    name: "Sculptural Gold Hoops",
    price: 675000,
    category: "Perhiasan",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=75&w=600&auto=format&fit=crop",
    rating: 4.7,
    reviews: 450,
    scarcityText: "Edisi Terbatas",
    description: "Anting hoops vermeil emas 18k yang dirancang untuk keanggunan sehari-hari. Konstruksi berongga memastikannya tetap ringan untuk dipakai sepanjang hari."
  },
  {
    id: 5,
    name: "Velvet Matte Lipstick",
    price: 450000,
    category: "Kecantikan",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=75&w=600&auto=format&fit=crop",
    rating: 4.6,
    reviews: 2100,
    isBestSeller: true,
    description: "Warna berpigmen tinggi dengan hasil akhir matte yang nyaman dan tidak kering. Diformulasikan dengan Vitamin E untuk menutrisi bibir sambil memberikan warna yang intens."
  },
  {
    id: 6,
    name: "The Weekender Tote",
    price: 2850000,
    category: "Mode",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=75&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 112,
    scarcityText: "Stok Menipis: Restock 3 minggu lagi",
    description: "Tas tote kulit premium dengan ruang luas untuk kebutuhan esensial. Menampilkan garis ramping, konstruksi tahan lama, dan kantong terpisah untuk barang berharga."
  }
];

export const PSYCHOLOGY_TRIGGERS = [
  "Gratis Ongkir di atas Rp 1.500.000",
  "Dibuat Secara Etis",
  "Jaminan Kepuasan 30 Hari"
];