// Demo Dataset for ApexStore E-Commerce Back-Office Platform
// Currency: FCFA (Franc CFA)

window.STORE_DATA = {
  // General Store Info
  storeInfo: {
    name: "ApexStore Dakar",
    legalName: "Apex Digital Retail SARL",
    slogan: "Le meilleur du High-Tech & de l'Équipement en Afrique de l'Ouest",
    email: "contact@apexstore.sn",
    phone: "+221 33 824 50 50",
    whatsapp: "+221 77 450 00 00",
    address: "Avenue Cheikh Anta Diop, Immeuble Horizon, Dakar",
    country: "Sénégal",
    currency: "FCFA",
    taxRate: 18, // 18% TVA
    logoUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=200",
    status: "Active"
  },

  // Categories
  categories: [
    {
      id: "cat-1",
      name: "Électronique & High-Tech",
      slug: "electronique-high-tech",
      description: "Smartphones, ordinateurs portables, tablettes et accessoires de pointe.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500",
      productCount: 12,
      status: "Active"
    },
    {
      id: "cat-2",
      name: "Électroménager & Maison",
      slug: "electromenager-maison",
      description: "Refrigérateurs, climatiseurs, machines à café et petit électroménager.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500",
      productCount: 8,
      status: "Active"
    },
    {
      id: "cat-3",
      name: "Mode & Accessoires",
      slug: "mode-accessoires",
      description: "Montres intelligentes, sacs en cuir, lunettes et vêtements tendances.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=500",
      productCount: 15,
      status: "Active"
    },
    {
      id: "cat-4",
      name: "Beauté & Soins",
      slug: "beaute-soins",
      description: "Parfums de luxe, coffrets de soin et appareils de beauté.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
      productCount: 6,
      status: "Active"
    },
    {
      id: "cat-5",
      name: "Sports & Loisirs",
      slug: "sports-loisirs",
      description: "Tapis de course, vélos électriques et équipements de fitness.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=500",
      productCount: 5,
      status: "Active"
    }
  ],

  // Products
  products: [
    {
      id: "prod-101",
      name: "iPhone 15 Pro Max 256GB - Titanium",
      sku: "APP-IPH15PM-256",
      category: "Électronique & High-Tech",
      categoryId: "cat-1",
      brand: "Apple",
      costPrice: 750000,
      price: 920000,
      promoPrice: 885000,
      stock: 14,
      minStock: 5,
      salesCount: 42,
      rating: 4.9,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
      description: "Écran Super Retina XDR 6,7\", puce A17 Pro, système de caméra triple 48 MP.",
      variants: ["Titanium Naturel", "Titanium Noir", "Titanium Bleu"],
      isFeatured: true
    },
    {
      id: "prod-102",
      name: "Samsung Galaxy S24 Ultra 512GB",
      sku: "SAM-S24U-512",
      category: "Électronique & High-Tech",
      categoryId: "cat-1",
      brand: "Samsung",
      costPrice: 700000,
      price: 860000,
      promoPrice: null,
      stock: 3, // Stock faible
      minStock: 5,
      salesCount: 38,
      rating: 4.8,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
      description: "Galaxy AI intégré, S-Pen, capteur photo 200 MP et châssis en titane.",
      variants: ["Gris Titane", "Noir Titane"],
      isFeatured: true
    },
    {
      id: "prod-103",
      name: "MacBook Pro 16\" M3 Max 36GB / 1TB",
      sku: "APP-MBP16-M3M",
      category: "Électronique & High-Tech",
      categoryId: "cat-1",
      brand: "Apple",
      costPrice: 1850000,
      price: 2350000,
      promoPrice: 2250000,
      stock: 6,
      minStock: 2,
      salesCount: 19,
      rating: 5.0,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
      description: "Performances monstrueuses pour professionnels, écran Liquid Retina XDR.",
      variants: ["Noir Sidéral", "Argent"],
      isFeatured: true
    },
    {
      id: "prod-104",
      name: "Smart TV LG OLED 65\" 4K Cinema",
      sku: "LGG-OLED65-C3",
      category: "Électronique & High-Tech",
      categoryId: "cat-1",
      brand: "LG",
      costPrice: 950000,
      price: 1250000,
      promoPrice: 1150000,
      stock: 0, // Rupture
      minStock: 2,
      salesCount: 15,
      rating: 4.7,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600",
      description: "Processeur alpha9 AI 4K, Dolby Vision IQ, Dolby Atmos et HDMI 2.1.",
      variants: ["65 pouces", "55 pouces"],
      isFeatured: false
    },
    {
      id: "prod-105",
      name: "Machine à Café Espresso DeLonghi Magnifica S",
      sku: "DEL-MAG-S01",
      category: "Électroménager & Maison",
      categoryId: "cat-2",
      brand: "DeLonghi",
      costPrice: 210000,
      price: 295000,
      promoPrice: 270000,
      stock: 18,
      minStock: 4,
      salesCount: 56,
      rating: 4.9,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=600",
      description: "Machine automatique avec broyeur à grains intégré et buse vapeur cappuccinatore.",
      variants: ["Noir Mat", "Inox Chrome"],
      isFeatured: true
    },
    {
      id: "prod-106",
      name: "Climatiseur Inverter Inverter LG 18000 BTU",
      sku: "LGG-CLIM-18K",
      category: "Électroménager & Maison",
      categoryId: "cat-2",
      brand: "LG",
      costPrice: 280000,
      price: 380000,
      promoPrice: null,
      stock: 2, // Stock faible
      minStock: 4,
      salesCount: 29,
      rating: 4.6,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1614633833026-0e31e51f49fa?auto=format&fit=crop&q=80&w=600",
      description: "Économie d'énergie jusqu'à 70%, refroidissement ultra rapide Dual Inverter.",
      variants: ["18000 BTU", "12000 BTU"],
      isFeatured: false
    },
    {
      id: "prod-107",
      name: "Montre Connectée Apple Watch Ultra 2",
      sku: "APP-AWU2-49",
      category: "Mode & Accessoires",
      categoryId: "cat-3",
      brand: "Apple",
      costPrice: 420000,
      price: 540000,
      promoPrice: 510000,
      stock: 9,
      minStock: 3,
      salesCount: 31,
      rating: 4.9,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=600",
      description: "Boîtier en titane 49 mm, GPS double fréquence haute précision, autonomie 36h.",
      variants: ["Boucle Alpine Orange", "Bracelet Ocean Bleu"],
      isFeatured: true
    },
    {
      id: "prod-108",
      name: "Sac à Main Cuir Artisanal Dakar Luxe",
      sku: "ART-SAC-CUIR01",
      category: "Mode & Accessoires",
      categoryId: "cat-3",
      brand: "Dakar Leather Co.",
      costPrice: 45000,
      price: 85000,
      promoPrice: 75000,
      stock: 22,
      minStock: 5,
      salesCount: 64,
      rating: 4.8,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
      description: "Cuir véritable pleine fleur, cousu main à la tradition dakaroise.",
      variants: ["Marron Cognac", "Noir Ébène", "Camel"],
      isFeatured: true
    },
    {
      id: "prod-109",
      name: "Coffret Parfum Prestige Sauvage Elixir 100ml",
      sku: "PER-DIO-SE100",
      category: "Beauté & Soins",
      categoryId: "cat-4",
      brand: "Dior",
      costPrice: 85000,
      price: 125000,
      promoPrice: null,
      stock: 12,
      minStock: 4,
      salesCount: 47,
      rating: 5.0,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      description: "Fragrance concentrée d'une rareté absolue, notes épicées et boisées magnétisantes.",
      variants: ["100 ml", "60 ml"],
      isFeatured: false
    },
    {
      id: "prod-110",
      name: "Tapis de Course Pro-Fitness Foldable 3.5 HP",
      sku: "FIT-TAP-35HP",
      category: "Sports & Loisirs",
      categoryId: "cat-5",
      brand: "ProForm",
      costPrice: 320000,
      price: 490000,
      promoPrice: 440000,
      stock: 4,
      minStock: 2,
      salesCount: 11,
      rating: 4.5,
      status: "Publié",
      visibility: true,
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=600",
      description: "Vitesse max 18 km/h, inclinaison motorisée 12%, écran tactile HD.",
      variants: ["Noir / Rouge"],
      isFeatured: false
    },
    {
      id: "prod-111",
      name: "Écouteurs Sans Fil Sony WH-1000XM5",
      sku: "SON-XM5-BLK",
      category: "Électronique & High-Tech",
      categoryId: "cat-1",
      brand: "Sony",
      costPrice: 150000,
      price: 220000,
      promoPrice: null,
      stock: 0, // Rupture
      minStock: 5,
      salesCount: 51,
      rating: 4.9,
      status: "Brouillon",
      visibility: false,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
      description: "Réduction de bruit active référence mondiale, autonomie 30 heures.",
      variants: ["Noir", "Argent"],
      isFeatured: false
    }
  ],

  // Customers
  customers: [
    {
      id: "cust-001",
      name: "Ousmane Kane",
      email: "o.kane@techdakar.sn",
      phone: "+221 77 632 11 22",
      city: "Dakar (Plateau)",
      ordersCount: 8,
      totalSpent: 3420000,
      lastOrderDate: "2026-08-24",
      status: "VIP",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "cust-002",
      name: "Fatou Bintou Diop",
      email: "fatou.diop@gmail.com",
      phone: "+221 78 145 90 80",
      city: "Dakar (Almadies)",
      ordersCount: 5,
      totalSpent: 1890000,
      lastOrderDate: "2026-08-23",
      status: "Fidèle",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "cust-003",
      name: "Mamadou Lamine Ndiaye",
      email: "ml.ndiaye@orange.sn",
      phone: "+221 70 888 33 44",
      city: "Thiès",
      ordersCount: 3,
      totalSpent: 745000,
      lastOrderDate: "2026-08-21",
      status: "Régulier",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "cust-004",
      name: "Aïssatou Sow",
      email: "aissa.sow@design.sn",
      phone: "+221 77 210 55 66",
      city: "Saint-Louis",
      ordersCount: 12,
      totalSpent: 4850000,
      lastOrderDate: "2026-08-25",
      status: "VIP",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "cust-005",
      name: "Ibrahima Sarr",
      email: "ibrahima.sarr@gmail.com",
      phone: "+221 76 543 21 00",
      city: "Saly Portudal",
      ordersCount: 1,
      totalSpent: 295000,
      lastOrderDate: "2026-08-19",
      status: "Nouveau",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    }
  ],

  // Orders
  orders: [
    {
      id: "CMD-2026-8891",
      customer: {
        id: "cust-004",
        name: "Aïssatou Sow",
        email: "aissa.sow@design.sn",
        phone: "+221 77 210 55 66",
        address: "Villa 14, Cité Mermoz, Dakar"
      },
      date: "2026-08-25T10:15:00",
      items: [
        { productId: "prod-101", name: "iPhone 15 Pro Max 256GB - Titanium", price: 885000, quantity: 1, total: 885000 },
        { productId: "prod-107", name: "Montre Connectée Apple Watch Ultra 2", price: 510000, quantity: 1, total: 510000 }
      ],
      subtotal: 1395000,
      shippingCost: 5000,
      discount: 0,
      totalAmount: 1400000,
      paymentMethod: "Wave Mobile Money",
      paymentStatus: "Payé",
      shippingStatus: "En préparation",
      status: "En préparation",
      notes: "Livraison express avant 17h demandée."
    },
    {
      id: "CMD-2026-8890",
      customer: {
        id: "cust-001",
        name: "Ousmane Kane",
        email: "o.kane@techdakar.sn",
        phone: "+221 77 632 11 22",
        address: "Avenue du Président Lamine Guèye, Dakar"
      },
      date: "2026-08-24T16:45:00",
      items: [
        { productId: "prod-103", name: "MacBook Pro 16\" M3 Max 36GB / 1TB", price: 2250000, quantity: 1, total: 2250000 }
      ],
      subtotal: 2250000,
      shippingCost: 0,
      discount: 50000,
      totalAmount: 2200000,
      paymentMethod: "Carte Bancaire Visa",
      paymentStatus: "Payé",
      shippingStatus: "Expédiée",
      status: "Expédiée",
      notes: "Accompagné d'un sac de transport offert."
    },
    {
      id: "CMD-2026-8889",
      customer: {
        id: "cust-002",
        name: "Fatou Bintou Diop",
        email: "fatou.diop@gmail.com",
        phone: "+221 78 145 90 80",
        address: "Résidence Fleurie, Ngor Almadies, Dakar"
      },
      date: "2026-08-23T11:20:00",
      items: [
        { productId: "prod-105", name: "Machine à Café Espresso DeLonghi", price: 270000, quantity: 1, total: 270000 },
        { productId: "prod-108", name: "Sac à Main Cuir Artisanal Dakar Luxe", price: 75000, quantity: 2, total: 150000 }
      ],
      subtotal: 420000,
      shippingCost: 3000,
      discount: 20000,
      totalAmount: 403000,
      paymentMethod: "Orange Money",
      paymentStatus: "Payé",
      shippingStatus: "Livrée",
      status: "Livrée",
      notes: "Livré en main propre au gardien."
    },
    {
      id: "CMD-2026-8888",
      customer: {
        id: "cust-003",
        name: "Mamadou Lamine Ndiaye",
        email: "ml.ndiaye@orange.sn",
        phone: "+221 70 888 33 44",
        address: "Quartier Dixième, Thiès"
      },
      date: "2026-08-21T09:30:00",
      items: [
        { productId: "prod-106", name: "Climatiseur Inverter LG 18000 BTU", price: 380000, quantity: 1, total: 380000 }
      ],
      subtotal: 380000,
      shippingCost: 15000,
      discount: 0,
      totalAmount: 395000,
      paymentMethod: "Paiement à la livraison",
      paymentStatus: "En attente",
      shippingStatus: "En attente",
      status: "En attente",
      notes: "Vérifier le créneau horaire avant le déplacement."
    },
    {
      id: "CMD-2026-8887",
      customer: {
        id: "cust-005",
        name: "Ibrahima Sarr",
        email: "ibrahima.sarr@gmail.com",
        phone: "+221 76 543 21 00",
        address: "Route de Saly, Mbour"
      },
      date: "2026-08-19T14:10:00",
      items: [
        { productId: "prod-105", name: "Machine à Café Espresso DeLonghi", price: 295000, quantity: 1, total: 295000 }
      ],
      subtotal: 295000,
      shippingCost: 10000,
      discount: 0,
      totalAmount: 305000,
      paymentMethod: "Wave Mobile Money",
      paymentStatus: "Remboursé",
      shippingStatus: "Annulée",
      status: "Annulée",
      notes: "Rétractation client avant expédition."
    }
  ],

  // Promotions & Coupon Codes
  promotions: [
    {
      id: "promo-1",
      code: "SUMMER2026",
      description: "Offre Spéciale Saison d'Été sur les produits High-Tech",
      type: "Pourcentage",
      value: 15, // 15%
      startDate: "2026-08-01",
      endDate: "2026-08-31",
      usageLimit: 200,
      usageCount: 84,
      status: "Active"
    },
    {
      id: "promo-2",
      code: "BIENVENUE10",
      description: "Réduction de bienvenu pour tout premier achat client",
      type: "Pourcentage",
      value: 10,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      usageLimit: 1000,
      usageCount: 412,
      status: "Active"
    },
    {
      id: "promo-3",
      code: "VIPDAKAR50K",
      description: "Remise fixe de 50 000 FCFA à partir de 500 000 FCFA d'achat",
      type: "Montant Fixe",
      value: 50000, // 50 000 FCFA
      startDate: "2026-07-15",
      endDate: "2026-09-15",
      usageLimit: 50,
      usageCount: 29,
      status: "Active"
    },
    {
      id: "promo-4",
      code: "EXPIRED2025",
      description: "Ancienne offre de lancement",
      type: "Pourcentage",
      value: 20,
      startDate: "2025-11-01",
      endDate: "2025-12-31",
      usageLimit: 100,
      usageCount: 100,
      status: "Expirée"
    }
  ],

  // Stock Movement History Log
  stockHistory: [
    { id: "stk-1", date: "2026-08-25 09:30", product: "iPhone 15 Pro Max 256GB", change: -1, type: "Vente (CMD-2026-8891)", stockAfter: 14, user: "Système API" },
    { id: "stk-2", date: "2026-08-24 14:00", product: "Machine à Café Espresso DeLonghi", change: +10, type: "Réapprovisionnement Fournisseur", stockAfter: 18, user: "Aminata Diallo" },
    { id: "stk-3", date: "2026-08-24 11:15", product: "Climatiseur Inverter LG 18000 BTU", change: -1, type: "Ajustement Manuel / Défectueux", stockAfter: 2, user: "Moussa Sow" },
    { id: "stk-4", date: "2026-08-23 16:40", product: "Samsung Galaxy S24 Ultra 512GB", change: -2, type: "Vente Directe Boutique", stockAfter: 3, user: "Aminata Diallo" }
  ],

  // Store Content Settings
  storeContent: {
    heroBannerTitle: "Le Meilleur de la Technologie à Dakar",
    heroBannerSubtitle: "Livraison Express en 24h à Dakar, Thiès et Saint-Louis",
    heroBannerImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1200",
    topAnnouncementText: "⚡ Ventes Flash d'Été : Jusqu'à -20% avec le code SUMMER2026 !",
    showAnnouncement: true,
    enableFreeShippingBanner: true,
    freeShippingThreshold: 100000 // FCFA
  },

  // KPI Metrics Timelines
  analyticsData: {
    periods: {
      "today": {
        ca: 1400000,
        revenue: 1400000,
        estimatedProfit: 320000,
        ordersCount: 1,
        customersCount: 1,
        productsSold: 2,
        averageBasket: 1400000,
        chartLabels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
        chartRevenue: [0, 1400000, 1400000, 1400000, 1400000, 1400000],
        chartOrders: [0, 1, 1, 1, 1, 1]
      },
      "7days": {
        ca: 8950000,
        revenue: 8950000,
        estimatedProfit: 2150000,
        ordersCount: 14,
        customersCount: 12,
        productsSold: 22,
        averageBasket: 639285,
        chartLabels: ["Mer", "Jeu", "Ven", "Sam", "Dim", "Lun", "Mar"],
        chartRevenue: [950000, 1200000, 800000, 1850000, 403000, 2200000, 1400000],
        chartOrders: [2, 2, 1, 3, 1, 3, 2]
      },
      "30days": {
        ca: 38450000,
        revenue: 38450000,
        estimatedProfit: 9800000,
        ordersCount: 68,
        customersCount: 54,
        productsSold: 112,
        averageBasket: 565441,
        chartLabels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
        chartRevenue: [8500000, 9200000, 11800000, 8950000],
        chartOrders: [15, 17, 22, 14]
      },
      "3months": {
        ca: 112000000,
        revenue: 112000000,
        estimatedProfit: 28400000,
        ordersCount: 195,
        customersCount: 142,
        productsSold: 340,
        averageBasket: 574358,
        chartLabels: ["Juin 2026", "Juillet 2026", "Août 2026"],
        chartRevenue: [34500000, 39050000, 38450000],
        chartOrders: [60, 67, 68]
      },
      "year": {
        ca: 425000000,
        revenue: 425000000,
        estimatedProfit: 108000000,
        ordersCount: 780,
        customersCount: 520,
        productsSold: 1350,
        averageBasket: 544871,
        chartLabels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août"],
        chartRevenue: [42000000, 48000000, 51000000, 46000000, 54000000, 62000000, 61000000, 61000000],
        chartOrders: [75, 82, 88, 80, 95, 110, 108, 142]
      }
    }
  }
};
