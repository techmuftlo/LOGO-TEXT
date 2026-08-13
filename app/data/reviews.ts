export type Review = {
  id: number;
  productId: number;
  customerName: string;
  customerInitial: string;
  customerImage?: string;
  productImage: string;
  rating: number;
  date: string;
  text: string;
  productName: string;
  verified: boolean;
};

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    customerName: "Arti Patel",
    customerInitial: "AP",
    productImage: "/images/reviews/review-01.jpg",
    rating: 5,
    date: "28/07/2026",
    text: "Amazing quality! Loved the product. The embroidery is beautiful and the fitting is also very good.",
    productName:
      "Women's Embroidered A-Line V-Neck Kurta Set",
    verified: true,
  },

  {
    id: 2,
    productId: 2,
    customerName: "Aditya Desai",
    customerInitial: "AD",
    productImage: "/images/reviews/review-02.jpg",
    rating: 5,
    date: "27/07/2026",
    text: "The design is even more beautiful in person. The fabric feels soft and premium.",
    productName:
      "Women's Embroidered V-Neck Kurta Pant With Dupatta Set",
    verified: true,
  },

  {
    id: 3,
    productId: 3,
    customerName: "Riya Patel",
    customerInitial: "RP",
    productImage: "/images/reviews/review-03.jpg",
    rating: 4,
    date: "26/07/2026",
    text: "Bahut comfortable hai. Colour bhi exactly picture jaisa hai.",
    productName:
      "Women Brown Embroidered Kurta Pant Dupatta Set",
    verified: true,
  },

  {
    id: 4,
    productId: 4,
    customerName: "Riddhima Dave",
    customerInitial: "RD",
    productImage: "/images/reviews/review-04.jpg",
    rating: 5,
    date: "27/07/2026",
    text: "Loved it ❤️ Beautiful embroidery and very nice fabric quality.",
    productName:
      "Women's Embroidered Kurta Palazzo Set",
    verified: true,
  },

  {
    id: 5,
    productId: 5,
    customerName: "Prachi Goyal",
    customerInitial: "PG",
    productImage: "/images/reviews/review-05.jpg",
    rating: 5,
    date: "27/07/2026",
    text: "Colour is slightly different but still looks very pretty. Overall very happy.",
    productName:
      "Women's Embroidered Kurta Pant With Dupatta Set",
    verified: true,
  },

  {
    id: 6,
    productId: 6,
    customerName: "Nisha Parmar",
    customerInitial: "NP",
    productImage: "/images/reviews/review-06.jpg",
    rating: 5,
    date: "26/07/2026",
    text: "The embroidery and fabric quality are excellent. Very elegant for festive wear.",
    productName:
      "Women's Embroidered A-Line V-Neck Kurta Set",
    verified: true,
  },

  {
    id: 7,
    productId: 7,
    customerName: "Shiv Shah",
    customerInitial: "SS",
    productImage: "/images/reviews/review-07.jpg",
    rating: 5,
    date: "22/07/2026",
    text: "Very beautiful product. Quality is good and delivery was also quick.",
    productName:
      "Women's Embroidered A-Line Kurta Palazzo Set",
    verified: true,
  },

  {
    id: 8,
    productId: 8,
    customerName: "Ananya Mehta",
    customerInitial: "AM",
    productImage: "/images/reviews/review-08.jpg",
    rating: 4,
    date: "25/07/2026",
    text: "The dress looks elegant and feels comfortable. Good purchase.",
    productName:
      "Women's Designer Embroidered Ethnic Suit Set",
    verified: true,
  },

  {
    id: 9,
    productId: 9,
    customerName: "Vani Shah",
    customerInitial: "VS",
    productImage: "/images/reviews/review-09.jpg",
    rating: 5,
    date: "24/07/2026",
    text: "Elegant and classy. Received lots of compliments after wearing it.",
    productName:
      "Women's Festive Palazzo Dupatta Set",
    verified: true,
  },

  {
    id: 10,
    productId: 10,
    customerName: "Megha Joshi",
    customerInitial: "MJ",
    productImage: "/images/reviews/review-10.jpg",
    rating: 5,
    date: "23/07/2026",
    text: "Beautiful gown and very nice finishing. Totally worth the price.",
    productName:
      "Women's Floral Embroidered Gown",
    verified: true,
  },
];