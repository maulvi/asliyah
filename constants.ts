
import { Product, BlogPost } from './types';

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
    scarcityText: "Terjual cepat: Sisa 5",
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
    scarcityText: "Stok Menipis: Sisa 2",
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
    scarcityText: "Tersisa 3 pasang",
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
    scarcityText: "Hampir Habis",
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
    scarcityText: "Restock segera",
    description: "Tas tote kulit premium dengan ruang luas untuk kebutuhan esensial. Menampilkan garis ramping, konstruksi tahan lama, dan kantong terpisah untuk barang berharga."
  }
];

export const PSYCHOLOGY_TRIGGERS = [
  "Gratis Ongkir di atas Rp 1.500.000",
  "Dibuat Secara Etis",
  "Jaminan Kepuasan 30 Hari"
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'the-art-of-slow-living',
    title: "Seni Hidup Lambat di Era Modern",
    subtitle: "Mengapa kembali ke dasar adalah kemewahan sejati.",
    category: "Gaya Hidup",
    author: "Elena Wijaya",
    date: "12 Oktober 2023",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Di dunia yang menuntut kecepatan instan, memilih untuk melambat adalah sebuah tindakan revolusioner. Konsep 'Slow Living' bukan berarti bermalas-malasan, melainkan melakukan segala sesuatu dengan kesadaran penuh dan intensi yang mendalam.",
      "Dalam konteks mode dan kecantikan, ini berarti memilih kualitas di atas kuantitas. Memilih satu mantel wol yang dibuat dengan jahitan sempurna yang akan bertahan sepuluh tahun, daripada sepuluh jaket murah yang akan rusak dalam satu musim. Ini tentang membangun lemari kapsul yang mencerminkan siapa diri Anda, bukan siapa yang didikte oleh tren.",
      "Ritual perawatan kulit malam hari bukan sekadar rutinitas membersihkan wajah, tetapi sebuah meditasi. Momen hening di mana kita menghargai tubuh yang telah bekerja keras seharian. Dengan menggunakan produk yang memiliki bahan-bahan alami dan aroma yang menenangkan, kita mengubah tugas harian menjadi pengalaman spa mini di rumah.",
      "Mari kita mulai menghargai proses. Menikmati tekstur kain di kulit, aroma serum favorit, dan perasaan percaya diri saat mengenakan pakaian yang benar-benar pas. Karena pada akhirnya, kemewahan sejati bukanlah tentang label harga, tetapi tentang bagaimana sesuatu membuat Anda merasa."
    ]
  },
  {
    id: 'capsule-wardrobe-essentials',
    title: "Membangun Lemari Kapsul Minimalis",
    subtitle: "5 Potongan kunci yang harus dimiliki setiap wanita modern.",
    category: "Mode",
    author: "Sarah Andini",
    date: "05 November 2023",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Konsep lemari kapsul bukan tentang membatasi diri, melainkan membebaskan pikiran. Bayangkan bangun di pagi hari dan tidak pernah merasa 'tidak ada baju untuk dipakai' meskipun lemari Anda tidak penuh sesak.",
      "Kuncinya adalah kohesi dan kualitas. Kita mulai dengan 'The Perfect White Shirt'. Kemeja putih yang renyah, berpotongan longgar namun pas di bahu, bisa membawa Anda dari rapat direksi hingga makan malam santai di pinggir pantai.",
      "Selanjutnya, celana panjang berpotongan lurus (tailored trousers) dengan warna netral seperti hitam atau beige. Investasikan pada bahan wol ringan atau linen berkualitas tinggi yang jatuhnya indah di kaki.",
      "Jangan lupakan 'Little Black Dress' yang ikonik, namun pilihlah siluet yang modern. Slip dress satin atau wrap dress bisa menjadi pilihan yang sangat serbaguna.",
      "Dengan memiliki dasar yang kuat, Anda bisa bermain dengan aksesoris untuk mengubah suasana. Syal sutra, anting emas, atau sepatu statement akan memberikan nyawa baru pada tampilan klasik Anda setiap hari."
    ]
  },
  {
    id: 'skincare-layering-guide',
    title: "Panduan Layering Skincare yang Benar",
    subtitle: "Urutan pemakaian produk untuk hasil maksimal.",
    category: "Kecantikan",
    author: "Dr. Rina Santoso",
    date: "20 November 2023",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Dunia perawatan kulit bisa sangat membingungkan dengan banyaknya jenis serum, essence, dan oil. Namun, aturan dasarnya sebenarnya sederhana: dari tekstur paling cair ke paling kental.",
      "Mulailah selalu dengan pembersih ganda (double cleansing) di malam hari. Tidak ada produk mahal yang akan bekerja efektif di atas kulit yang kotor.",
      "Setelah toner, aplikasikan produk berbasis air seperti essence atau serum vitamin C. Biarkan meresap sejenak. Ini adalah saat di mana kulit paling reseptif terhadap bahan aktif.",
      "Lanjutkan dengan produk yang lebih berat seperti moisturizer. Pelembab bertugas mengunci hidrasi dan bahan aktif yang sudah Anda aplikasikan sebelumnya.",
      "Terakhir, dan opsional namun mewah, adalah face oil. Minyak bertindak sebagai 'sealer' terakhir yang menjaga kelembaban tidak menguap semalaman. Di pagi hari, langkah terakhir wajib diganti dengan sunscreen, tanpa kompromi."
    ]
  }
];
