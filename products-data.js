// products-data.js
const productsData = {
  categories: [
    {
      id: "gloves",
      name: "Safety Gloves",
      icon: "fas fa-hand-paper",
      count: 15,
      description: "Leather, cut-resistant, chemical-resistant, and specialized gloves for industrial applications.",
      color: "#1a365d"
    },
    {
      id: "jackets",
      name: "Safety Jackets",
      icon: "fas fa-vest",
      count: 12,
      description: "High-visibility, weather-resistant, flame-retardant jackets for outdoor and industrial use.",
      color: "#ff6b35"
    },
    {
      id: "flame-resistant",
      name: "Flame-Resistant PPE",
      icon: "fas fa-fire",
      count: 8,
      description: "NFPA certified gear for welding, foundry work, and high-temperature environments.",
      color: "#ff3b30"
    },
    {
      id: "chemical",
      name: "Chemical Protection",
      icon: "fas fa-flask",
      count: 10,
      description: "Chemical-resistant gloves and aprons for laboratory and industrial chemical handling.",
      color: "#10b981"
    }
  ],

  products: {
    gloves: [
      {
        id: 1,
        sku: "GL-1001",
        name: "Premium Leather Work Gloves",
        icon: "fas fa-hand-rock",
        badges: ["BEST SELLER", "ANSI A4"],
        description: "Heavy-duty split leather gloves with reinforced palms and knuckle protection. Perfect for construction and material handling. Features double stitching, enhanced grip, and breathable design.",
        specs: {
          material: "Premium Split Leather",
          protection: "ANSI A4 Cut Level",
          sizes: "S - XXL",
          certifications: "ISO 9001, ANSI 105"
        },
        price: "24.99",
        category: "gloves"
      },
      {
        id: 2,
        sku: "GL-2005",
        name: "Cut-Resistant Kevlar Gloves",
        icon: "fas fa-cut",
        badges: ["NEW", "ANSI A9"],
        description: "Level 5 cut resistance with Kevlar and stainless steel blend. Lightweight and flexible for precision work. Ideal for metal handling, glass manufacturing, and food processing.",
        specs: {
          material: "Kevlar + Stainless Steel",
          protection: "ANSI A9 Cut Level",
          sizes: "M - XXL",
          certifications: "EN388, ANSI 105"
        },
        price: "32.99",
        category: "gloves"
      },
      {
        id: 3,
        sku: "GL-3008",
        name: "Heat-Resistant Welding Gloves",
        icon: "fas fa-temperature-high",
        badges: ["HEAT PROOF", "NFPA 2112"],
        description: "Heavy-duty heat and spark resistance up to 932°F (500°C). Extra-long cuff for forearm protection. Designed for welding, foundry work, and high-temperature applications.",
        specs: {
          material: "Fire-Retardant Leather",
          protection: "Up to 500°C",
          sizes: "One Size",
          certifications: "NFPA 2112, ISO 11611"
        },
        price: "38.99",
        category: "gloves"
      },
      {
        id: 4,
        sku: "GL-4012",
        name: "Chemical-Resistant Nitrile Gloves",
        icon: "fas fa-flask",
        badges: ["NEW", "CHEMICAL PROOF"],
        description: "Nitrile-coated gloves offering superior protection against chemicals, oils, and solvents in laboratory and industrial settings. Features textured grip and comfort lining.",
        specs: {
          material: "Nitrile Coated",
          protection: "Level A Chemical",
          sizes: "S - XXL",
          certifications: "EN374, ISO"
        },
        price: "29.99",
        category: "gloves"
      }
    ],
    jackets: [
      {
        id: 5,
        sku: "SJ-5001",
        name: "High-Visibility Safety Jacket",
        icon: "fas fa-vest",
        badges: ["ANSI CLASS 3", "WATER RESISTANT"],
        description: "ANSI/ISEA 107-2020 compliant Class 3 high-visibility jacket with reflective tape. Water-resistant fabric with ventilation for comfort.",
        specs: {
          material: "Polyester Mesh",
          protection: "ANSI Class 3",
          sizes: "XS-4XL",
          certifications: "ANSI 107, EN ISO 20471"
        },
        price: "49.99",
        category: "jackets"
      }
    ]
  }
};