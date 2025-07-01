const services = [
  {
    id: 1,
    name: "Luxury Facial Treatment",
    category: "Facial Care",
    price: "$120",
    duration: "90 minutes",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=300&fit=crop",
    description: "Indulge in our signature luxury facial treatment that combines deep cleansing, exfoliation, and hydrating masks to leave your skin glowing and refreshed.",
    benefits: [
      "Deep pore cleansing and detoxification",
      "Anti-aging treatment with collagen boost",
      "Hydration and skin barrier repair",
      "Stress relief and relaxation"
    ],
    includes: [
      "Consultation and skin analysis",
      "Steam treatment and extraction",
      "Custom mask application",
      "Facial massage and moisturizing",
      "SPF protection application"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=150&fit=crop"
    }
  },
  {
    id: 2,
    name: "Bridal Make Up",
    category: "Make Up",
    price: "$30",
    duration: "60 minutes",
    rating: 4.5,
    reviews: 98,
    image: "https://crazygirlssalon.com/wp-content/uploads/2024/12/bridal-makeup.png",
    description: "Elegant and flawless bridal makeup to make you shine on your special day.",
    benefits: [
      "Long-lasting makeup finish",
      "Photo-ready glow",
      "Custom color palette matching your outfit",
      "Smudge-proof and waterproof"
    ],
    includes: [
      "Skin prep and primer application",
      "Foundation, contouring, and blush",
      "Eye makeup and false lashes",
      "Lip color application",
      "Setting spray and final touch-ups"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1618354691210-f8f6ec42b31e?w=200&h=150&fit=crop"
    }
  },
  {
    id: 3,
    name: "Hair Coloring",
    category: "Hair Styling",
    price: "$49",
    duration: "45 minutes",
    rating: 4.5,
    reviews: 76,
    image: "https://media-api.xogrp.com/images/742594e1-700f-48cb-805e-82a09a40820a~rs_768.h-cr_0.146.1080.1226",
    description: "Chic and elegant low bun perfect for weddings, parties, or formal events.",
    benefits: [
      "Elegant and sleek look",
      "Perfect for all hair types",
      "Stays secure all day",
      "Adds sophistication to any outfit"
    ],
    includes: [
      "Hair brushing and smoothing",
      "Sectioning and pinning",
      "Bun shaping and securing",
      "Optional accessory placement",
      "Finishing spray"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1588167056548-08d3e9c40163?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1613126511166-3c8d7d4d243c?w=200&h=150&fit=crop"
    }
  },
  {
    id: 4,
    name: "Party Make Up",
    category: "Make Up",
    price: "$49",
    duration: "50 minutes",
    rating: 4.5,
    reviews: 88,
    image: "http://shivanigargbrides.com/wp-content/uploads/2022/11/makeup-artist-covering-model-face-by-powder-min.jpg",
    description: "Get ready to stand out at your party with our glam makeover service.",
    benefits: [
      "Glowy and bold look",
      "Smudge-proof finish",
      "Perfect for photos and night lighting",
      "Customized to outfit and theme"
    ],
    includes: [
      "Skin prepping",
      "Eye shadow and lashes",
      "Foundation and blush",
      "Lip color selection",
      "Final setting and glow mist"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1613419326235-9d68b376b42d?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1612197522628-061a19871b65?w=200&h=150&fit=crop"
    }
  }
  ,
   {
    id: 5,
    name: "Luxury Facial Treatment",
    category: "Facial Care",
    price: "$120",
    duration: "90 minutes",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=300&fit=crop",
    description: "Indulge in our signature luxury facial treatment that combines deep cleansing, exfoliation, and hydrating masks to leave your skin glowing and refreshed.",
    benefits: [
      "Deep pore cleansing and detoxification",
      "Anti-aging treatment with collagen boost",
      "Hydration and skin barrier repair",
      "Stress relief and relaxation"
    ],
    includes: [
      "Consultation and skin analysis",
      "Steam treatment and extraction",
      "Custom mask application",
      "Facial massage and moisturizing",
      "SPF protection application"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=150&fit=crop"
    }
  },
  {
    id: 6,
    name: "Bridal Make Up",
    category: "Make Up",
    price: "$30",
    duration: "60 minutes",
    rating: 4.5,
    reviews: 98,
    image: "https://crazygirlssalon.com/wp-content/uploads/2024/12/bridal-makeup.png",
    description: "Elegant and flawless bridal makeup to make you shine on your special day.",
    benefits: [
      "Long-lasting makeup finish",
      "Photo-ready glow",
      "Custom color palette matching your outfit",
      "Smudge-proof and waterproof"
    ],
    includes: [
      "Skin prep and primer application",
      "Foundation, contouring, and blush",
      "Eye makeup and false lashes",
      "Lip color application",
      "Setting spray and final touch-ups"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1618354691210-f8f6ec42b31e?w=200&h=150&fit=crop"
    }
  },
  {
    id: 7,
    name: "Low Bun Style",
    category: "Hair Styling",
    price: "$49",
    duration: "45 minutes",
    rating: 4.5,
    reviews: 76,
    image: "https://media-api.xogrp.com/images/742594e1-700f-48cb-805e-82a09a40820a~rs_768.h-cr_0.146.1080.1226",
    description: "Chic and elegant low bun perfect for weddings, parties, or formal events.",
    benefits: [
      "Elegant and sleek look",
      "Perfect for all hair types",
      "Stays secure all day",
      "Adds sophistication to any outfit"
    ],
    includes: [
      "Hair brushing and smoothing",
      "Sectioning and pinning",
      "Bun shaping and securing",
      "Optional accessory placement",
      "Finishing spray"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1588167056548-08d3e9c40163?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1613126511166-3c8d7d4d243c?w=200&h=150&fit=crop"
    }
  },
  {
    id: 8,
    name: "Party Make Up",
    category: "Make Up",
    price: "$49",
    duration: "50 minutes",
    rating: 4.5,
    reviews: 88,
    image: "http://shivanigargbrides.com/wp-content/uploads/2022/11/makeup-artist-covering-model-face-by-powder-min.jpg",
    description: "Get ready to stand out at your party with our glam makeover service.",
    benefits: [
      "Glowy and bold look",
      "Smudge-proof finish",
      "Perfect for photos and night lighting",
      "Customized to outfit and theme"
    ],
    includes: [
      "Skin prepping",
      "Eye shadow and lashes",
      "Foundation and blush",
      "Lip color selection",
      "Final setting and glow mist"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1613419326235-9d68b376b42d?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1612197522628-061a19871b65?w=200&h=150&fit=crop"
    }
  }
  ,
   {
    id: 9,
    name: "Luxury Facial Treatment",
    category: "Facial Care",
    price: "$120",
    duration: "90 minutes",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=300&fit=crop",
    description: "Indulge in our signature luxury facial treatment that combines deep cleansing, exfoliation, and hydrating masks to leave your skin glowing and refreshed.",
    benefits: [
      "Deep pore cleansing and detoxification",
      "Anti-aging treatment with collagen boost",
      "Hydration and skin barrier repair",
      "Stress relief and relaxation"
    ],
    includes: [
      "Consultation and skin analysis",
      "Steam treatment and extraction",
      "Custom mask application",
      "Facial massage and moisturizing",
      "SPF protection application"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=150&fit=crop"
    }
  },
  {
    id: 10,
    name: "Bridal Make Up",
    category: "Make Up",
    price: "$30",
    duration: "60 minutes",
    rating: 4.5,
    reviews: 98,
    image: "https://crazygirlssalon.com/wp-content/uploads/2024/12/bridal-makeup.png",
    description: "Elegant and flawless bridal makeup to make you shine on your special day.",
    benefits: [
      "Long-lasting makeup finish",
      "Photo-ready glow",
      "Custom color palette matching your outfit",
      "Smudge-proof and waterproof"
    ],
    includes: [
      "Skin prep and primer application",
      "Foundation, contouring, and blush",
      "Eye makeup and false lashes",
      "Lip color application",
      "Setting spray and final touch-ups"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1618354691210-f8f6ec42b31e?w=200&h=150&fit=crop"
    }
  },
  {
    id: 11,
    name: "Low Bun Style",
    category: "Hair Styling",
    price: "$49",
    duration: "45 minutes",
    rating: 4.5,
    reviews: 76,
    image: "https://media-api.xogrp.com/images/742594e1-700f-48cb-805e-82a09a40820a~rs_768.h-cr_0.146.1080.1226",
    description: "Chic and elegant low bun perfect for weddings, parties, or formal events.",
    benefits: [
      "Elegant and sleek look",
      "Perfect for all hair types",
      "Stays secure all day",
      "Adds sophistication to any outfit"
    ],
    includes: [
      "Hair brushing and smoothing",
      "Sectioning and pinning",
      "Bun shaping and securing",
      "Optional accessory placement",
      "Finishing spray"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1588167056548-08d3e9c40163?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1613126511166-3c8d7d4d243c?w=200&h=150&fit=crop"
    }
  },
  {
    id: 13,
    name: "Party Make Up",
    category: "Hair Coloring",
    price: "$49",
    duration: "50 minutes",
    rating: 4.5,
    reviews: 88,
    image: "http://shivanigargbrides.com/wp-content/uploads/2022/11/makeup-artist-covering-model-face-by-powder-min.jpg",
    description: "Get ready to stand out at your party with our glam makeover service.",
    benefits: [
      "Glowy and bold look",
      "Smudge-proof finish",
      "Perfect for photos and night lighting",
      "Customized to outfit and theme"
    ],
    includes: [
      "Skin prepping",
      "Eye shadow and lashes",
      "Foundation and blush",
      "Lip color selection",
      "Final setting and glow mist"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1613419326235-9d68b376b42d?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1612197522628-061a19871b65?w=200&h=150&fit=crop"
    }
  }
  ,
   {
    id: 9,
    name: "Luxury Facial Treatment",
    category: "Facial Care",
    price: "$120",
    duration: "90 minutes",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=300&fit=crop",
    description: "Indulge in our signature luxury facial treatment that combines deep cleansing, exfoliation, and hydrating masks to leave your skin glowing and refreshed.",
    benefits: [
      "Deep pore cleansing and detoxification",
      "Anti-aging treatment with collagen boost",
      "Hydration and skin barrier repair",
      "Stress relief and relaxation"
    ],
    includes: [
      "Consultation and skin analysis",
      "Steam treatment and extraction",
      "Custom mask application",
      "Facial massage and moisturizing",
      "SPF protection application"
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&h=150&fit=crop",
      after: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=150&fit=crop"
    }
  },
];

export default services;
