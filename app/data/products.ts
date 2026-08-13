

export type ColorVariant = {
  name: string;
  images: string[];
};

export type Product = {
  id: number;
  video: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  sizes: string[];
  colors: string[];
  colorVariants: ColorVariant[];
  images: string[];
};

export const products: Product[] = [
  {
    id: 1,
    video: "/videos/products/video-01.mp4",
    name: "Women's Designer Kurta Palazzo Set with Heavy Zari Embellished",
    category: "Palazzo Set",
    price: 1299,
    oldPrice: 3499,
    discount: 63,
    rating: 4.7,
    reviews: 128,
    stock: 12,
    description:
      "Elegant designer kurta palazzo set featuring beautiful zari embroidery and a stylish dupatta. Perfect for festive occasions, weddings and special celebrations.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Wine"],
    colorVariants: [
    {
        name: "Blue",
        images: [
          "/images/products/product-01-1.jpg",
          "/images/products/product-01-2.jpg",
          "/images/products/product-01-3.jpg",
        ],
      },
    {
        name: "Wine",
        images: [
          "/images/products/product-01-1.jpg",
          "/images/products/product-01-2.jpg",
          "/images/products/product-01-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-01-1.jpg",
      "/images/products/product-01-2.jpg",
      "/images/products/product-01-3.jpg",
    ],
  },

  {
    id: 2,
    video: "/videos/products/video-02.mp4",
    name: "Women's Embroidered Floral V-Neck Kurta Set",
    category: "Straight Kurta Set",
    price: 799,
    oldPrice: 3499,
    discount: 77,
    rating: 4.6,
    reviews: 96,
    stock: 18,
    description:
      "Beautiful floral embroidered V-neck kurta set designed for elegant festive and party wear looks.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Maroon", "Cream"],
    colorVariants: [
    {
        name: "Red",
        images: [
          "/images/products/product-02-1.jpg",
          "/images/products/product-02-2.jpg",
          "/images/products/product-02-3.jpg",
        ],
      },
    {
        name: "Maroon",
        images: [
          "/images/products/product-02-1.jpg",
          "/images/products/product-02-2.jpg",
          "/images/products/product-02-3.jpg",
        ],
      },
    {
        name: "Cream",
        images: [
          "/images/products/product-02-1.jpg",
          "/images/products/product-02-2.jpg",
          "/images/products/product-02-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-02-1.jpg",
      "/images/products/product-02-2.jpg",
      "/images/products/product-02-3.jpg",
    ],
  },

  {
    id: 3,
    video: "/videos/products/video-03.mp4",
    name: "Women's Embroidered V-Neck Kurta Pant With Dupatta",
    category: "Kurta Set",
    price: 799,
    oldPrice: 3499,
    discount: 77,
    rating: 4.5,
    reviews: 84,
    stock: 15,
    description:
      "A sophisticated embroidered kurta pant set with matching dupatta for festive and party wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Brown", "Green"],
    colorVariants: [
    {
        name: "Brown",
        images: [
          "/images/products/product-03-1.jpg",
          "/images/products/product-03-2.jpg",
          "/images/products/product-03-3.jpg",
        ],
      },
    {
        name: "Green",
        images: [
          "/images/products/product-03-1.jpg",
          "/images/products/product-03-2.jpg",
          "/images/products/product-03-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-03-1.jpg",
      "/images/products/product-03-2.jpg",
      "/images/products/product-03-3.jpg",
    ],
  },

  {
    id: 4,
    video: "/videos/products/video-04.mp4",
    name: "Women's Round Neck Anarkali Tiered Flared Dress",
    category: "Anarkali",
    price: 1299,
    oldPrice: 3499,
    discount: 63,
    rating: 4.8,
    reviews: 143,
    stock: 9,
    description:
      "Graceful tiered Anarkali dress with intricate embroidery and a beautiful flowing silhouette.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Brown", "Wine"],
    colorVariants: [
    {
        name: "Brown",
        images: [
          "/images/products/product-04-1.jpg",
          "/images/products/product-04-2.jpg",
          "/images/products/product-04-3.jpg",
        ],
      },
    {
        name: "Wine",
        images: [
          "/images/products/product-04-1.jpg",
          "/images/products/product-04-2.jpg",
          "/images/products/product-04-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-04-1.jpg",
      "/images/products/product-04-2.jpg",
      "/images/products/product-04-3.jpg",
    ],
  },

  {
    id: 5,
    video: "/videos/products/video-05.mp4",
    name: "Women's Embroidered V-Neck Kurta Pant Dupatta Set",
    category: "Kurta Set",
    price: 799,
    oldPrice: 3499,
    discount: 77,
    rating: 4.6,
    reviews: 112,
    stock: 21,
    description:
      "Elegant embroidered three-piece ethnic set with detailed neckline and beautiful dupatta work.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Pink", "Red"],
    colorVariants: [
    {
        name: "Pink",
        images: [
          "/images/products/product-05-1.jpg",
          "/images/products/product-05-2.jpg",
          "/images/products/product-05-3.jpg",
        ],
      },
    {
        name: "Red",
        images: [
          "/images/products/product-05-1.jpg",
          "/images/products/product-05-2.jpg",
          "/images/products/product-05-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-05-1.jpg",
      "/images/products/product-05-2.jpg",
      "/images/products/product-05-3.jpg",
    ],
  },

  {
    id: 6,
    video: "/videos/products/video-06.mp4",
    name: "Women Brown Embroidered Anarkali Kurta Pant Dupatta Set",
    category: "Anarkali",
    price: 1299,
    oldPrice: 3499,
    discount: 63,
    rating: 4.7,
    reviews: 76,
    stock: 11,
    description:
      "Premium brown Anarkali set with detailed embroidery, matching pants and dupatta.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Brown"],
    colorVariants: [
    {
        name: "Brown",
        images: [
          "/images/products/product-06-1.jpg",
          "/images/products/product-06-2.jpg",
          "/images/products/product-06-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-06-1.jpg",
      "/images/products/product-06-2.jpg",
      "/images/products/product-06-3.jpg",
    ],
  },

  {
    id: 7,
    video: "/videos/products/video-07.mp4",
    name: "Women Mirror Work A-Line Top Palazzo Suit",
    category: "A-Line Kurta Set",
    price: 1299,
    oldPrice: 3499,
    discount: 63,
    rating: 4.5,
    reviews: 69,
    stock: 14,
    description:
      "Stylish A-line ethnic suit featuring beautiful mirror work and an elegant palazzo silhouette.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Green"],
    colorVariants: [
    {
        name: "Blue",
        images: [
          "/images/products/product-07-1.jpg",
          "/images/products/product-07-2.jpg",
          "/images/products/product-07-3.jpg",
        ],
      },
    {
        name: "Green",
        images: [
          "/images/products/product-07-1.jpg",
          "/images/products/product-07-2.jpg",
          "/images/products/product-07-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-07-1.jpg",
      "/images/products/product-07-2.jpg",
      "/images/products/product-07-3.jpg",
    ],
  },

  {
    id: 8,
    video: "/videos/products/video-08.mp4",
    name: "Women's Designer Embroidered Ethnic Suit Set",
    category: "Ethnic Wear",
    price: 1199,
    oldPrice: 3299,
    discount: 64,
    rating: 4.7,
    reviews: 91,
    stock: 16,
    description:
      "Designer ethnic suit set with elegant embroidery, premium fabric and a comfortable fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Cream", "Maroon"],
    colorVariants: [
    {
        name: "Cream",
        images: [
          "/images/products/product-08-1.jpg",
          "/images/products/product-08-2.jpg",
          "/images/products/product-08-3.jpg",
        ],
      },
    {
        name: "Maroon",
        images: [
          "/images/products/product-08-1.jpg",
          "/images/products/product-08-2.jpg",
          "/images/products/product-08-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-08-1.jpg",
      "/images/products/product-08-2.jpg",
      "/images/products/product-08-3.jpg",
    ],
  },

  {
    id: 9,
    video: "/videos/products/video-09.mp4",
    name: "Women's Festive Embroidered Palazzo Suit",
    category: "Palazzo Set",
    price: 1099,
    oldPrice: 2999,
    discount: 63,
    rating: 4.6,
    reviews: 54,
    stock: 13,
    description:
      "Festive palazzo suit featuring elegant embroidery and a stylish ethnic silhouette.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Purple", "Blue"],
    colorVariants: [
    {
        name: "Purple",
        images: [
          "/images/products/product-09-1.jpg",
          "/images/products/product-09-2.jpg",
          "/images/products/product-09-3.jpg",
        ],
      },
    {
        name: "Blue",
        images: [
          "/images/products/product-09-1.jpg",
          "/images/products/product-09-2.jpg",
          "/images/products/product-09-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-09-1.jpg",
      "/images/products/product-09-2.jpg",
      "/images/products/product-09-3.jpg",
    ],
  },

  {
    id: 10,
    video: "/videos/products/video-10.mp4",
    name: "Women's Floral Embroidered Gown",
    category: "Gown",
    price: 1399,
    oldPrice: 3999,
    discount: 65,
    rating: 4.8,
    reviews: 137,
    stock: 8,
    description:
      "Elegant floral embroidered gown designed for weddings, parties and festive celebrations.",
   sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Green", "Maroon"],
    colorVariants: [
    {
        name: "Green",
        images: [
          "/images/products/product-10-1.jpg",
          "/images/products/product-10-2.jpg",
          "/images/products/product-10-3.jpg",
        ],
      },
    {
        name: "Maroon",
        images: [
          "/images/products/product-10-1.jpg",
          "/images/products/product-10-2.jpg",
          "/images/products/product-10-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-10-1.jpg",
      "/images/products/product-10-2.jpg",
      "/images/products/product-10-3.jpg",
    ],
  },

  {
    id: 11,
    video: "/videos/products/video-11.mp4",
    name: "Women's Printed Straight Kurta Set",
    category: "Straight Kurta Set",
    price: 699,
    oldPrice: 2499,
    discount: 72,
    rating: 4.4,
    reviews: 63,
    stock: 20,
    description:
      "Comfortable printed straight kurta set suitable for everyday and casual festive styling.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Yellow", "Pink"],
    colorVariants: [
    {
        name: "Yellow",
        images: [
          "/images/products/product-11-1.jpg",
          "/images/products/product-11-2.jpg",
          "/images/products/product-11-3.jpg",
        ],
      },
    {
        name: "Pink",
        images: [
          "/images/products/product-11-1.jpg",
          "/images/products/product-11-2.jpg",
          "/images/products/product-11-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-11-1.jpg",
      "/images/products/product-11-2.jpg",
      "/images/products/product-11-3.jpg",
    ],
  },

  {
    id: 12,
    video: "/videos/products/video-12.mp4",
    name: "Women's Designer Sharara Dupatta Set",
    category: "Sharara Set",
    price: 1499,
    oldPrice: 3999,
    discount: 63,
    rating: 4.8,
    reviews: 119,
    stock: 10,
    description:
      "Designer sharara set with statement embroidery and an elegant dupatta for festive occasions.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Pink", "Wine"],
    colorVariants: [
    {
        name: "Pink",
        images: [
          "/images/products/product-12-1.jpg",
          "/images/products/product-12-2.jpg",
          "/images/products/product-12-3.jpg",
        ],
      },
    {
        name: "Wine",
        images: [
          "/images/products/product-12-1.jpg",
          "/images/products/product-12-2.jpg",
          "/images/products/product-12-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-12-1.jpg",
      "/images/products/product-12-2.jpg",
      "/images/products/product-12-3.jpg",
    ],
  },

  {
    id: 13,
    video: "/videos/products/video-13.mp4",
    name: "Women's Elegant A-Line Kurta Set",
    category: "A-Line Kurta Set",
    price: 899,
    oldPrice: 2799,
    discount: 68,
    rating: 4.5,
    reviews: 72,
    stock: 17,
    description:
      "Elegant A-line kurta set designed with a flattering silhouette and detailed ethnic patterns.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Green", "Blue"],
    colorVariants: [
    {
        name: "Green",
        images: [
          "/images/products/product-13-1.jpg",
          "/images/products/product-13-2.jpg",
          "/images/products/product-13-3.jpg",
        ],
      },
    {
        name: "Blue",
        images: [
          "/images/products/product-13-1.jpg",
          "/images/products/product-13-2.jpg",
          "/images/products/product-13-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-13-1.jpg",
      "/images/products/product-13-2.jpg",
      "/images/products/product-13-3.jpg",
    ],
  },

  {
    id: 14,
    video: "/videos/products/video-14.mp4",
    name: "Women's Premium Anarkali Festive Dress",
    category: "Anarkali",
    price: 1399,
    oldPrice: 3799,
    discount: 63,
    rating: 4.7,
    reviews: 88,
    stock: 7,
    description:
      "Premium festive Anarkali dress with a flowing silhouette and beautiful decorative detailing.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Maroon", "Green"],
    colorVariants: [
    {
        name: "Maroon",
        images: [
          "/images/products/product-14-1.jpg",
          "/images/products/product-14-2.jpg",
          "/images/products/product-14-3.jpg",
        ],
      },
    {
        name: "Green",
        images: [
          "/images/products/product-14-1.jpg",
          "/images/products/product-14-2.jpg",
          "/images/products/product-14-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-14-1.jpg",
      "/images/products/product-14-2.jpg",
      "/images/products/product-14-3.jpg",
    ],
  },

  {
    id: 15,
    video: "/videos/products/video-15.mp4",
    name: "Women's Party Wear Embroidered Kurta Set",
    category: "Party Wear",
    price: 999,
    oldPrice: 2999,
    discount: 67,
    rating: 4.6,
    reviews: 61,
    stock: 19,
    description:
      "Stylish party wear kurta set with detailed embroidery and contemporary ethnic styling.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Pink"],
    colorVariants: [
    {
        name: "Black",
        images: [
          "/images/products/product-15-1.jpg",
          "/images/products/product-15-2.jpg",
          "/images/products/product-15-3.jpg",
        ],
      },
    {
        name: "Pink",
        images: [
          "/images/products/product-15-1.jpg",
          "/images/products/product-15-2.jpg",
          "/images/products/product-15-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-15-1.jpg",
      "/images/products/product-15-2.jpg",
      "/images/products/product-15-3.jpg",
    ],
  },

  {
    id: 16,
    video: "/videos/products/video-16.mp4",
    name: "Women's Classic Embroidered Gown",
    category: "Gown",
    price: 1299,
    oldPrice: 3599,
    discount: 64,
    rating: 4.7,
    reviews: 102,
    stock: 12,
    description:
      "Classic embroidered gown created for graceful evening and festive looks.",
   sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Purple"],
    colorVariants: [
    {
        name: "Blue",
        images: [
          "/images/products/product-16-1.jpg",
          "/images/products/product-16-2.jpg",
          "/images/products/product-16-3.jpg",
        ],
      },
    {
        name: "Purple",
        images: [
          "/images/products/product-16-1.jpg",
          "/images/products/product-16-2.jpg",
          "/images/products/product-16-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-16-1.jpg",
      "/images/products/product-16-2.jpg",
      "/images/products/product-16-3.jpg",
    ],
  },

  {
    id: 17,
    video: "/videos/products/video-17.mp4",
    name: "Women's Festive Palazzo Dupatta Set",
    category: "Palazzo Set",
    price: 1199,
    oldPrice: 3299,
    discount: 64,
    rating: 4.5,
    reviews: 57,
    stock: 15,
    description:
      "Beautiful festive palazzo dupatta set with detailed ethnic embroidery.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Wine", "Cream"],
    colorVariants: [
    {
        name: "Wine",
        images: [
          "/images/products/product-17-1.jpg",
          "/images/products/product-17-2.jpg",
          "/images/products/product-17-3.jpg",
        ],
      },
    {
        name: "Cream",
        images: [
          "/images/products/product-17-1.jpg",
          "/images/products/product-17-2.jpg",
          "/images/products/product-17-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-17-1.jpg",
      "/images/products/product-17-2.jpg",
      "/images/products/product-17-3.jpg",
    ],
  },

  {
    id: 18,
    video: "/videos/products/video-18.mp4",
    name: "Women's Contemporary Western Dress",
    category: "Western Wear",
    price: 899,
    oldPrice: 2499,
    discount: 64,
    rating: 4.5,
    reviews: 73,
    stock: 23,
    description:
      "Contemporary western dress designed with a stylish silhouette for casual and party looks.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Pink", "Black"],
    colorVariants: [
    {
        name: "Pink",
        images: [
          "/images/products/product-18-1.jpg",
          "/images/products/product-18-2.jpg",
          "/images/products/product-18-3.jpg",
        ],
      },
    {
        name: "Black",
        images: [
          "/images/products/product-18-1.jpg",
          "/images/products/product-18-2.jpg",
          "/images/products/product-18-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-18-1.jpg",
      "/images/products/product-18-2.jpg",
      "/images/products/product-18-3.jpg",
    ],
  },

  {
    id: 19,
    video: "/videos/products/video-19.mp4",
    name: "Women's Premium Sharara Party Wear Set",
    category: "Sharara Set",
    price: 1599,
    oldPrice: 4299,
    discount: 63,
    rating: 4.9,
    reviews: 145,
    stock: 6,
    description:
      "Premium sharara party wear set featuring detailed embroidery and a statement dupatta.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Purple"],
    colorVariants: [
    {
        name: "Red",
        images: [
          "/images/products/product-19-1.jpg",
          "/images/products/product-19-2.jpg",
          "/images/products/product-19-3.jpg",
        ],
      },
    {
        name: "Purple",
        images: [
          "/images/products/product-19-1.jpg",
          "/images/products/product-19-2.jpg",
          "/images/products/product-19-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-19-1.jpg",
      "/images/products/product-19-2.jpg",
      "/images/products/product-19-3.jpg",
    ],
  },

  {
    id: 20,
    video: "/videos/products/video-20.mp4",
    name: "Women's Designer Ethnic Collection Set",
    category: "Ethnic Wear",
    price: 1299,
    oldPrice: 3499,
    discount: 63,
    rating: 4.8,
    reviews: 111,
    stock: 10,
    description:
      "Designer ethnic collection piece with premium detailing and a modern traditional look.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Green", "Blue", "Brown"],
    colorVariants: [
    {
        name: "Green",
        images: [
          "/images/products/product-20-1.jpg",
          "/images/products/product-20-2.jpg",
          "/images/products/product-20-3.jpg",
        ],
      },
    {
        name: "Blue",
        images: [
          "/images/products/product-20-1.jpg",
          "/images/products/product-20-2.jpg",
          "/images/products/product-20-3.jpg",
        ],
      },
    {
        name: "Brown",
        images: [
          "/images/products/product-20-1.jpg",
          "/images/products/product-20-2.jpg",
          "/images/products/product-20-3.jpg",
        ],
      },
    ],
    images: [
      "/images/products/product-20-1.jpg",
      "/images/products/product-20-2.jpg",
      "/images/products/product-20-3.jpg",
    ],
  },
];