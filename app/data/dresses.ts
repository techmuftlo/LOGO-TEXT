export type ColorVariant = {
  name: string;
  images: string[];
  video?: string;
};

export type DressProduct = {
  id: number;
  slug: string;
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  colorVariants: ColorVariant[];
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
};

export const dresses: DressProduct[] = [
  {
    id: 101,
    slug:  "womens-elegant-black-pleated-shirt-dress-with-waist-tie",

    image: "/images/dresses/dress-01.jpg",

    name:
      "Women's Elegant Black Pleated Shirt Dress With Waist Tie",

    price: 499,

    category: "Dresses",

    description:
      "Elegant black pleated shirt dress with a comfortable silhouette and waist tie detail.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Black"],

    colorVariants: [
      {
        name: "Black",

        images: [
          "/images/dresses/dress-01.jpg",
        ],
      },
    ],

    rating: 4.6,

    reviews: 84,

    stock: 15,

    images: [
      "/images/dresses/dress-01.jpg",
    ],
  },

  {
    id: 102,
    slug: "womens-striped-sleeveless-square-neck-fit-flare-maxi-dress",
    image: "/images/dresses/dress-02.jpg",

    name:
      "Women's Striped Sleeveless Square Neck Fit & Flare Maxi Dress",

    price: 499,

    category: "Dresses",

    description:
      "Stylish striped sleeveless maxi dress with a flattering fit and flare silhouette.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Green", "White"],

    colorVariants: [
      {
        name: "Green",

        images: [
          "/images/dresses/dress-02.jpg",
        ],
      },

      {
        name: "White",

        images: [
          "/images/dresses/dress-02-white.jpg",
        ],
      },
    ],

    rating: 4.5,

    reviews: 61,

    stock: 12,

    images: [
      "/images/dresses/dress-02.jpg",
    ],
  },

  {
    id: 103,
    slug: "womens-gingham-check-halter-neck-sleeveless-maxi-dress",
    image: "/images/dresses/dress-03.jpg",

    name:
      "Women's Gingham Check Halter Neck Sleeveless Maxi Dress",

    price: 499,

    oldPrice: 999,

    discount: 50,

    category: "Dresses",

    description:
      "Beautiful gingham check halter neck maxi dress perfect for summer outings and casual occasions.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Blue"],

    colorVariants: [
      {
        name: "Blue",

        images: [
          "/images/dresses/dress-03.jpg",
        ],
      },
    ],

    rating: 4.7,

    reviews: 103,

    stock: 18,

    images: [
      "/images/dresses/dress-03.jpg",
    ],
  },

  {
    id: 104,
    slug: "womens-blue-white-tropical-print-sleeveless-square-neck-maxi-dress",

    image: "/images/dresses/dress-04.jpg",

    name:
      "Women's Blue & White Tropical Print Sleeveless Square Neck Maxi Dress",

    price: 499,

    oldPrice: 999,

    discount: 50,

    category: "Dresses",

    description:
      "Fresh tropical print maxi dress featuring a beautiful blue and white floral pattern.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Blue", "White"],

    colorVariants: [
      {
        name: "Blue",

        images: [
          "/images/dresses/dress-04.jpg",
        ],
      },

      {
        name: "White",

        images: [
          "/images/dresses/dress-04-white.jpg",
        ],
      },
    ],

    rating: 4.6,

    reviews: 75,

    stock: 14,

    images: [
      "/images/dresses/dress-04.jpg",
    ],
  },

  {
    id: 105,
    slug: "womens-black-floral-printed-wrap-style-maxi-dress",
    image: "/images/dresses/dress-05.jpg",

    name:
      "Women's Black Floral Printed Wrap Style Maxi Dress",

    price: 499,

    oldPrice: 999,

    discount: 50,

    category: "Dresses",

    description:
      "Elegant black floral printed wrap style maxi dress with a flowing silhouette.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Black", "Pink"],

    colorVariants: [
      {
        name: "Black",

        images: [
          "/images/dresses/dress-05.jpg",
        ],
      },

      {
        name: "Pink",

        images: [
          "/images/dresses/dress-05-pink.jpg",
        ],
      },
    ],

    rating: 4.7,

    reviews: 91,

    stock: 11,

    images: [
      "/images/dresses/dress-05.jpg",
    ],
  },

  {
    id: 106,
    slug: "womens-black-white-striped-shirt-style-midi-dress",
    image: "/images/dresses/dress-06.jpg",

    name:
      "Women's Black & White Striped Shirt Style Midi Dress",

    price: 499,

    oldPrice: 999,

    discount: 50,

    category: "Dresses",

    description:
      "Classic striped shirt style midi dress designed for comfortable everyday wear.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Black", "White"],

    colorVariants: [
      {
        name: "Black",

        images: [
          "/images/dresses/dress-06.jpg",
        ],
      },

      {
        name: "White",

        images: [
          "/images/dresses/dress-06-white.jpg",
        ],
      },
    ],

    rating: 4.5,

    reviews: 68,

    stock: 17,

    images: [
      "/images/dresses/dress-06.jpg",
    ],
  },

  {
    id: 107,
    slug: "womens-square-neck-ruffle-sleeve-tiered-midi-dress",

    image: "/images/dresses/dress-07.jpg",

    name:
      "Women's Square Neck Ruffle Sleeve Tiered Midi Dress",

    price: 499,

    oldPrice: 999,

    discount: 50,

    category: "Dresses",

    description:
      "Chic square neck midi dress with ruffle sleeves and a beautiful tiered design.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Black"],

    colorVariants: [
      {
        name: "Black",

        images: [
          "/images/dresses/dress-07.jpg",
        ],
      },
    ],

    rating: 4.6,

    reviews: 57,

    stock: 13,

    images: [
      "/images/dresses/dress-07.jpg",
    ],
  },

  {
    id: 108,
    slug: "womens-shoulder-strap-long-fit-flare-maxi-dress",

    image: "/images/dresses/dress-08.jpg",

    name:
      "Women's Shoulder Strap Long Fit & Flare Maxi Dress",

    price: 499,

    oldPrice: 999,

    discount: 50,

    category: "Dresses",

    description:
      "Elegant shoulder strap maxi dress with a relaxed fit and flare silhouette.",

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Brown", "Black"],

    colorVariants: [
      {
        name: "Brown",

        images: [
          "/images/dresses/dress-08.jpg",
        ],
      },

      {
        name: "Black",

        images: [
          "/images/dresses/dress-08-black.jpg",
        ],
      },
    ],

    rating: 4.6,

    reviews: 82,

    stock: 10,

    images: [
      "/images/dresses/dress-08.jpg",
    ],
  },
];