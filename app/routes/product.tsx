import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiTruck,
  FiRotateCcw,
  FiShield,
  FiHeart,
  FiPackage,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiStar,
  FiCheck,
  FiCreditCard,
  FiX,
  FiUpload,
  FiTrash2,
  FiPlay,
  FiMessageCircle,
} from "react-icons/fi";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { products } from "../data/products";
import { dresses } from "../data/dresses";


import "./product.css";


/* =========================================================
   TYPES
========================================================= */

type ColorVariant = {
  name: string;
  images: string[];
};

type ProductData = {
  id: number;
  name: string;
  category: string;

  image?: string;
  images: string[];

  /* Optional video */
  video?: string;

  price: number;
  oldPrice?: number;
  discount?: number;

  rating?: number;
  reviews?: number;

  description?: string;

  sizes: string[];
  colors: string[];

  /* Optional so old products without variants still work */
  colorVariants?: ColorVariant[];

  stock: number;
};


type ReviewMedia = {
  name: string;
  type: string;
  data: string;
};


type ProductReview = {
  id: string;
  productId: number;
  rating: number;
  feedback: string;
  media: ReviewMedia[];
  createdAt: string;
};


/* =========================================================
   REVIEW HELPERS
========================================================= */

const getReviewStorageKey = (productId: number) =>
  `product_reviews_${productId}`;


const ratingLabels: Record<number, string> = {
  1: "Very Bad",
  2: "Bad",
  3: "Average",
  4: "Good",
  5: "Excellent",
};


const isVideoFile = (url: string) => {
  if (!url) return false;

  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
};


/* =========================================================
   COMPONENT
========================================================= */

export default function Product() {

  const { id } = useParams();

  const navigate = useNavigate();

  const productId = Number(id);


  /* =======================================================
     PRODUCTS
  ======================================================= */

  const allProducts = useMemo<ProductData[]>(() => {

    return [
      ...(products as ProductData[]),
      ...(dresses as ProductData[]),
    ];

  }, []);


  const product = useMemo(() => {

    return allProducts.find(
      (item) => item.id === productId
    );

  }, [
    allProducts,
    productId,
  ]);


  /* =======================================================
     PRODUCT STATES
  ======================================================= */

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [selectedSize, setSelectedSize] =
    useState("");

    const [showSizeChart, setShowSizeChart] =
  useState(false);

const [sizeUnit, setSizeUnit] =
  useState<"INCHES" | "CM">("INCHES");

  const [selectedColor, setSelectedColor] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [wishlist, setWishlist] =
    useState(false);

  const [openSection, setOpenSection] =
    useState<string | null>("delivery");

  const [addedMessage, setAddedMessage] =
    useState("");


  /* =======================================================
     REVIEW STATES
  ======================================================= */

  const [reviews, setReviews] =
    useState<ProductReview[]>([]);

  const [reviewModal, setReviewModal] =
    useState(false);

  const [reviewRating, setReviewRating] =
    useState(0);

  const [hoverRating, setHoverRating] =
    useState(0);

  const [reviewFeedback, setReviewFeedback] =
    useState("");

  const [reviewMedia, setReviewMedia] =
    useState<ReviewMedia[]>([]);

  const [reviewError, setReviewError] =
    useState("");

  const [reviewSuccess, setReviewSuccess] =
    useState(false);


  /* =======================================================
     RESET
  ======================================================= */

  useEffect(() => {

    setSelectedImage(0);
    setSelectedSize("");

    setSelectedColor(
      product?.colorVariants?.[0]?.name ||
      product?.colors?.[0] ||
      ""
    );

    setQuantity(1);
    setWishlist(false);
    setAddedMessage("");
    setOpenSection("delivery");

  }, [productId, product]);


  /* =======================================================
     LOAD REVIEWS
  ======================================================= */

  useEffect(() => {

    if (!product) return;

    try {

      const saved =
        localStorage.getItem(
          getReviewStorageKey(product.id)
        );

      if (saved) {

        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setReviews(parsed);
        } else {
          setReviews([]);
        }

      } else {

        setReviews([]);

      }

    } catch {

      setReviews([]);

    }

  }, [product]);


  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!product) {

    return (

      <main className="product-not-found">

        <div>

          <h1>
            Product Not Found
          </h1>

          <p>
            This product is no longer available.
          </p>

          <Link
            to="/"
            className="product-back-home"
          >
            BACK TO HOME
          </Link>

        </div>

      </main>

    );

  }


  /* =======================================================
     MEDIA
  ======================================================= */

  const selectedColorVariant =
    product.colorVariants?.find(
      (variant) => variant.name === selectedColor
    ) || null;

  const selectedColorImages =
    selectedColorVariant?.images?.length
      ? selectedColorVariant.images
      : product.images || [];

  const productMedia = [
    ...selectedColorImages,
    ...(product.video ? [product.video] : []),
  ].filter(Boolean);


  const currentMedia =
    productMedia[selectedImage] ||
    productMedia[0];


  const currentMediaIsVideo =
    isVideoFile(currentMedia || "");


  /* =======================================================
     PRODUCT PRICE
  ======================================================= */

  const salePrice = product.price;

  const oldPrice = product.oldPrice;

  const discount = product.discount;


  /* =======================================================
     DYNAMIC REVIEW RATING
  ======================================================= */

  const baseRating =
    Number(product.rating || 0);

  const baseReviewCount =
    Number(product.reviews || 0);


  const totalReviews =
    reviews.length + baseReviewCount;


  const reviewRatingSum =
    reviews.reduce(
      (sum, review) =>
        sum + review.rating,
      0
    );


  const totalRatingSum =
    baseRating * baseReviewCount +
    reviewRatingSum;


  const calculatedRating =
    totalReviews > 0
      ? totalRatingSum / totalReviews
      : 0;


  const finalRating =
    Math.round(
      calculatedRating * 10
    ) / 10;


  /* =======================================================
     RATING DISTRIBUTION
  ======================================================= */

  const ratingDistribution =
    [5, 4, 3, 2, 1].map((star) => {

      const productBaseCount =
        Math.round(
          baseReviewCount *
          (
            Math.round(baseRating) === star
              ? 0.78
              : 0.05
          )
        );


      const userCount =
        reviews.filter(
          (review) =>
            review.rating === star
        ).length;


      return {
        star,
        count:
          productBaseCount +
          userCount,
      };

    });


  const maxRatingCount =
    Math.max(
      1,
      ...ratingDistribution.map(
        (item) => item.count
      )
    );


  /* =======================================================
     IMAGE NEXT
  ======================================================= */

  const nextImage = () => {

    if (!productMedia.length) return;

    setSelectedImage(
      (current) =>
        (current + 1) %
        productMedia.length
    );

  };


  /* =======================================================
     IMAGE PREVIOUS
  ======================================================= */

  const previousImage = () => {

    if (!productMedia.length) return;

    setSelectedImage(
      (current) =>
        current === 0
          ? productMedia.length - 1
          : current - 1
    );

  };


  /* =======================================================
     SIZE
  ======================================================= */

  const handleSize = (
    size: string
  ) => {

    setSelectedSize(size);

  };


  /* =======================================================
     COLOR
  ======================================================= */

  const handleColor = (
    color: string
  ) => {

    setSelectedColor(color);
    setSelectedImage(0);

  };


  /* =======================================================
     QUANTITY
  ======================================================= */

  const decreaseQuantity = () => {

    setQuantity(
      (current) =>
        Math.max(
          1,
          current - 1
        )
    );

  };


  const increaseQuantity = () => {

    setQuantity(
      (current) =>
        Math.min(
          product.stock || 99,
          current + 1
        )
    );

  };


  /* =======================================================
     CART
  ======================================================= */

  const addToCart = (
  goToCart = false
) => {
  /* ================================
     SIZE CHECK
  ================================= */

  if (
    product.sizes.length > 0 &&
    !selectedSize
  ) {
    alert("Please select a size.");
    return;
  }


  /* ================================
     COLOR CHECK
  ================================= */

  if (
    product.colors.length > 0 &&
    !selectedColor
  ) {
    alert("Please select a color.");
    return;
  }


  /* ================================
     CART STORAGE KEY
  ================================= */

  const CART_STORAGE_KEY =
    "honky-tonky-cart";


  /* ================================
     GET EXISTING CART
  ================================= */

  let existingCart: any[] = [];

  try {
    const savedCart =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if (savedCart) {
      const parsed =
        JSON.parse(savedCart);

      if (Array.isArray(parsed)) {
        existingCart = parsed;
      }
    }
  } catch {
    existingCart = [];
  }


  /* ================================
     SELECTED COLOR IMAGE
  ================================= */

  const cartImage =
    selectedColorImages?.[0] ||
    product.images?.[0] ||
    product.image;


  /* ================================
     UNIQUE CART ID
     
     Same product:
     Green + S  = separate
     Beige + S  = separate
     Green + M  = separate
  ================================= */

  const cartId =
    `${product.id}-${selectedColor || "default"}-${selectedSize || "default"}`;


  /* ================================
     CART ITEM
  ================================= */

  const cartItem = {

    cartId,

    productId:
      product.id,

    name:
      product.name,

    image:
      cartImage,

    price:
      product.price,

    oldPrice:
      product.oldPrice,

    color:
      selectedColor || "",

    size:
      selectedSize || "",

    quantity,

  };


  /* ================================
     FIND SAME VARIANT
  ================================= */

  const existingIndex =
    existingCart.findIndex(
      (item: any) =>
        String(item.cartId) ===
        String(cartId)
    );


  /* ================================
     UPDATE EXISTING
  ================================= */

  if (
    existingIndex !== -1
  ) {

    existingCart[
      existingIndex
    ] = {

      ...existingCart[
        existingIndex
      ],

      quantity:
        Number(
          existingCart[
            existingIndex
          ].quantity || 0
        ) + quantity,

    };

  }

  /* ================================
     ADD NEW
  ================================= */

  else {

    existingCart.push(
      cartItem
    );

  }


  /* ================================
     SAVE
  ================================= */

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(
      existingCart
    )
  );


  /* ================================
     UPDATE EVENT
  ================================= */

  window.dispatchEvent(
    new Event("cart-updated")
  );


  /* ================================
     BUTTON MESSAGE
  ================================= */

  setAddedMessage(
    "ADDED TO CART"
  );


  setTimeout(() => {

    setAddedMessage("");

  }, 1800);


  /* ================================
     BUY NOW
  ================================= */

  if (goToCart) {

    navigate("/cart");

  }

};


  /* =======================================================
     BUY NOW
  ======================================================= */

  const buyNow = () => {

    addToCart(true);

  };


  /* =======================================================
     ACCORDION
  ======================================================= */

  const toggleSection = (
    section: string
  ) => {

    setOpenSection(
      (current) =>
        current === section
          ? null
          : section
    );

  };


  /* =======================================================
     RELATED PRODUCTS
  ======================================================= */

  const relatedProducts =
    allProducts
      .filter(
        (item) =>
          item.id !== product.id
      )
      .slice(0, 10);


  /* =======================================================
     OPEN REVIEW
  ======================================================= */

  const openReviewModal = (
    rating = 0
  ) => {

    setReviewRating(rating);

    setHoverRating(0);

    setReviewFeedback("");

    setReviewMedia([]);

    setReviewError("");

    setReviewSuccess(false);

    setReviewModal(true);

    document.body.style.overflow =
      "hidden";

  };


  /* =======================================================
     CLOSE REVIEW
  ======================================================= */

  const closeReviewModal = () => {

    setReviewModal(false);

    setReviewRating(0);

    setHoverRating(0);

    setReviewFeedback("");

    setReviewMedia([]);

    setReviewError("");

    document.body.style.overflow =
      "";

  };


  /* =======================================================
     REVIEW FILE UPLOAD
  ======================================================= */

  const handleReviewFiles = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const files =
      Array.from(
        event.target.files || []
      );


    if (!files.length) return;


    const validFiles =
      files.filter((file) => {

        const allowed =
          [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/quicktime",
            "video/x-m4v",
          ].includes(file.type);

        if (!allowed) {

          setReviewError(
            "Only JPG, PNG, GIF, WEBP or MP4/WebM videos are allowed."
          );

          return false;

        }


        if (
          file.size >
          5 * 1024 * 1024
        ) {

          setReviewError(
            "Each image or video must be under 5MB."
          );

          return false;

        }

        return true;

      });


    if (!validFiles.length) return;


    setReviewError("");


    Promise.all(
      validFiles.map(
        (file) =>
          new Promise<ReviewMedia>(
            (resolve, reject) => {

              const reader =
                new FileReader();


              reader.onload = () => {

                resolve({
                  name: file.name,
                  type: file.type,
                  data:
                    String(
                      reader.result
                    ),
                });

              };


              reader.onerror =
                reject;


              reader.readAsDataURL(
                file
              );

            }
          )
      )
    )
      .then((newMedia) => {

        setReviewMedia(
          (current) => [
            ...current,
            ...newMedia,
          ].slice(0, 5)
        );

      })
      .catch(() => {

        setReviewError(
          "Unable to read selected image."
        );

      });


    event.target.value = "";

  };


  /* =======================================================
     REMOVE REVIEW MEDIA
  ======================================================= */

  const removeReviewMedia = (
    index: number
  ) => {

    setReviewMedia(
      (current) =>
        current.filter(
          (_, i) => i !== index
        )
    );

  };


  /* =======================================================
     SUBMIT REVIEW
  ======================================================= */

  const submitReview = () => {

    if (!reviewRating) {

      setReviewError(
        "Please select a star rating."
      );

      return;

    }


    if (
      !reviewFeedback.trim()
    ) {

      setReviewError(
        "Please write your feedback."
      );

      return;

    }


    const newReview: ProductReview = {

      id:
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,

      productId:
        product.id,

      rating:
        reviewRating,

      feedback:
        reviewFeedback.trim(),

      media:
        reviewMedia,

      createdAt:
        new Date().toISOString(),

    };


    const updatedReviews = [
      ...reviews,
      newReview,
    ];


    setReviews(
      updatedReviews
    );


    localStorage.setItem(
      getReviewStorageKey(
        product.id
      ),
      JSON.stringify(
        updatedReviews
      )
    );


    setReviewSuccess(true);

    setReviewError("");


    setTimeout(() => {

      closeReviewModal();

    }, 1200);

  };


  /* =======================================================
     RETURN
  ======================================================= */

  return (

    <main className="product-page">


      {/* =================================================
          PRODUCT MAIN
      ================================================= */}

      <section className="product-detail">


        {/* =================================================
            GALLERY
        ================================================= */}

        <div className="product-gallery-area">


          {/* THUMBNAILS */}

          <div className="product-thumbnails">

            {productMedia.map(
              (
                media,
                index
              ) => {

                const video =
                  isVideoFile(
                    media
                  );


                return (

                  <button
                    key={`${media}-${index}`}
                    type="button"
                    className={
                      `product-thumbnail ${
                        selectedImage ===
                        index
                          ? "active"
                          : ""
                      }`
                    }
                    onClick={() =>
                      setSelectedImage(
                        index
                      )
                    }
                  >

                    {video ? (

                      <div className="video-thumbnail">

                        <video
                          src={media}
                          muted
                          preload="metadata"
                        />

                        <span>
                          <FiPlay />
                        </span>

                        <small>
                          VIDEO
                        </small>

                      </div>

                    ) : (

                      <img
                        src={media}
                        alt={
                          `${product.name} ${index + 1}`
                        }
                      />

                    )}

                  </button>

                );

              }
            )}

          </div>


          {/* MAIN MEDIA */}

          <div className="product-main-image">

            {currentMediaIsVideo ? (

              <video
                className="product-main-video"
                src={currentMedia}
                controls
                playsInline
                preload="metadata"
              />

            ) : (

              <img
                src={currentMedia}
                alt={product.name}
              />

            )}


            {productMedia.length > 1 && (

              <>

                <button
                  type="button"
                  className="product-image-arrow product-image-arrow-left"
                  onClick={
                    previousImage
                  }
                  aria-label="Previous media"
                >
                  <FiChevronLeft />
                </button>


                <button
                  type="button"
                  className="product-image-arrow product-image-arrow-right"
                  onClick={
                    nextImage
                  }
                  aria-label="Next media"
                >
                  <FiChevronRight />
                </button>

              </>

            )}


            {productMedia.length > 1 && (

              <div className="product-image-counter">

                {selectedImage + 1}

                {" / "}

                {productMedia.length}

              </div>

            )}

          </div>

        </div>


        {/* =================================================
            PRODUCT INFORMATION
        ================================================= */}

        <div className="product-information">


          <p className="product-category">
            {product.category}
          </p>


          <h1>
            {product.name}
          </h1>


          {/* PRODUCT RATING */}

          <button
            type="button"
            className="product-rating-row product-rating-button"
            onClick={() =>
              openReviewModal()
            }
          >

            <div className="product-stars">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <FiStar
                    key={star}
                    className={
                      star <=
                      Math.round(
                        finalRating
                      )
                        ? "star-filled"
                        : "star-empty"
                    }
                  />

                )
              )}

            </div>


            <span className="product-review-score">
              {finalRating.toFixed(1)}
            </span>


            <span className="product-review-count">
              ({totalReviews})
            </span>

          </button>


          {/* PRICE */}

          <div className="product-price">

            <span className="product-sale-price">

              ₹
              {salePrice.toLocaleString(
                "en-IN"
              )}

            </span>


            {oldPrice && (

              <span className="product-old-price">

                ₹
                {oldPrice.toLocaleString(
                  "en-IN"
                )}

              </span>

            )}


            {discount && (

              <span className="product-discount">

                {discount}% OFF

              </span>

            )}

          </div>


          {/* OFFERS */}

          <div className="product-offer">
            <FiCheck />
            <span>
              Buy any 3 Dress - Get 15% Off
            </span>
          </div>


          <div className="product-offer">
            <FiCheck />
            <span>
              Buy any 2 Dress - Get 10% Off
            </span>
          </div>


          <div className="product-offer">
            <FiCheck />
            <span>
              Get 5% OFF On All Prepaid Order
            </span>
          </div>


          {/* COLOR */}

          {product.colors.length > 0 && (

            <div className="product-option">

              <div className="product-option-heading">

                <h3>
                  Color:
                </h3>

                <span>
                  {selectedColor ||
                    "Select"}
                </span>

              </div>

              <div className="color-list">

                {product.colors.map(
                  (color) => {

                    const variant =
                      product.colorVariants?.find(
                        (item) =>
                          item.name === color
                      );

                    const colorImage =
                      variant?.images?.[0] ||
                      product.images?.[0] ||
                      product.image ||
                      "";

                    return (
                      <button
                        type="button"
                        key={color}
                        className={
                          `color-option ${
                            selectedColor ===
                            color
                              ? "active"
                              : ""
                          }`
                        }
                        onClick={() =>
                          handleColor(
                            color
                          )
                        }
                        title={color}
                        aria-label={`Select ${color} color`}
                      >

                        <img
                          src={colorImage}
                          alt={color}
                        />

                      </button>
                    );

                  }
                )}

              </div>

            </div>

          )}

          {/* SIZE */}

          {product.sizes.length > 0 && (

            <div className="product-option">

              <div className="size-heading">

                <h3>
                  Size:
                </h3>


                <button
  type="button"
  className="size-guide-button"
  onClick={() => setShowSizeChart(true)}
>
  Size Chart
</button>

              </div>


            <div className="size-list">
  {product.sizes.map((size) => (
    <button
      key={size}
      type="button"
      className={
        selectedSize === size
          ? "selected"
          : ""
      }
      onClick={() => setSelectedSize(size)}
    >
      {size}
    </button>
  ))}
</div>

            </div>

          )}


          {/* QUANTITY */}

          <div className="product-quantity-row">

            <span>
              Quantity
            </span>


            <div className="product-quantity">

              <button
                type="button"
                onClick={
                  decreaseQuantity
                }
              >
                <FiMinus />
              </button>


              <span>
                {quantity}
              </span>


              <button
                type="button"
                onClick={
                  increaseQuantity
                }
              >
                <FiPlus />
              </button>

            </div>

          </div>


          {/* STOCK */}

          <div
            className={
              product.stock > 0
                ? "product-stock"
                : "product-stock out"
            }
          >

            <FiPackage />

            {product.stock > 0
              ? `${product.stock} pieces available`
              : "Out of stock"}

          </div>


          {/* ADD CART */}

         <button
  className="add-to-cart"
  type="button"
  onClick={() => addToCart(false)}
  disabled={product.stock <= 0}
>
  {addedMessage || "ADD TO CART"}
</button>


          {/* BUY NOW */}

          <button
            type="button"
            className="buy-now"
            onClick={buyNow}
            disabled={
              product.stock <= 0
            }
          >
            BUY NOW
          </button>


          {/* BENEFITS */}

          <div className="product-benefits">

            <div className="benefit-card">

              <FiRotateCcw />

              <strong>
                7 Days Easy
              </strong>

              <span>
                Return & Exchange
              </span>

            </div>


            <div className="benefit-card">

              <FiTruck />

              <strong>
                Free Shipping
              </strong>

              <span>
                On all orders
              </span>

            </div>


            <div className="benefit-card">

              <FiCreditCard />

              <strong>
                Cash On Delivery
              </strong>

              <span>
                Available
              </span>

            </div>

          </div>


          {/* SERVICE BOX */}

          <div className="product-service-box">

            <div className="product-service-item">

              <div className="service-icon">
                <FiHeart />
              </div>

              <div>

                <small>
                  WHY THIS DRESS?
                </small>

                <p>
                  Perfect for festive celebrations,
                  weddings, family gatherings,
                  office wear and everyday ethnic
                  elegance.
                </p>

              </div>

            </div>


            <div className="product-service-item">

              <div className="service-icon">
                <FiStar />
              </div>

              <div>

                <small>
                  WHY WILL SHE LOVE IT?
                </small>

                <p>
                  Experience the latest fabrics
                  and trend-inspired designs,
                  crafted for effortless elegance.
                </p>

              </div>

            </div>


            <div className="product-service-item">

              <div className="service-icon">
                <FiShield />
              </div>

              <div>

                <small>
                  OUR QUALITY & PRICE PROMISE
                </small>

                <p>
                  Premium-quality fabric,
                  comfortable fitting and
                  carefully finished details.
                </p>

              </div>

            </div>


            <div className="product-service-item">

              <div className="service-icon">
                <FiPackage />
              </div>

              <div>

                <small>
                  WHY BUY NOW?
                </small>

                <p>
                  Ships within 24 hours.
                </p>

              </div>

            </div>

          </div>


          {/* ACCORDIONS */}

          <div className="product-accordions">


            <div className="product-accordion">

              <button
                type="button"
                onClick={() =>
                  toggleSection(
                    "description"
                  )
                }
              >

                <span>
                  DESCRIPTION
                </span>

                {openSection ===
                "description"
                  ? <FiChevronUp />
                  : <FiChevronDown />
                }

              </button>


              {openSection ===
                "description" && (

                <div className="accordion-content">

                  <p>
                    {product.description ||
                      "Beautifully designed for a comfortable and elegant look. Made with quality fabric and detailed finishing."}
                  </p>

                </div>

              )}

            </div>


            <div className="product-accordion">

              <button
                type="button"
                onClick={() =>
                  toggleSection(
                    "delivery"
                  )
                }
              >

                <span>
                  GET IT DELIVERED IN 4-5 DAYS
                </span>

                {openSection ===
                "delivery"
                  ? <FiChevronUp />
                  : <FiChevronDown />
                }

              </button>


              {openSection ===
                "delivery" && (

                <div className="accordion-content">

                  <p>
                    We usually dispatch orders
                    within 24 hours. Delivery
                    normally takes 4-5 working
                    days depending on your
                    location.
                  </p>

                </div>

              )}

            </div>


            <div className="product-accordion">

              <button
                type="button"
                onClick={() =>
                  toggleSection(
                    "returns"
                  )
                }
              >

                <span>
                  RETURNS & EXCHANGE
                </span>

                {openSection ===
                "returns"
                  ? <FiChevronUp />
                  : <FiChevronDown />
                }

              </button>


              {openSection ===
                "returns" && (

                <div className="accordion-content">

                  <p>
                    Easy returns and exchanges
                    are available according to
                    our return policy. Product
                    should be unused and in
                    original condition.
                  </p>

                </div>

              )}

            </div>


            <div className="product-accordion">

              <button
                type="button"
                onClick={() =>
                  toggleSection(
                    "care"
                  )
                }
              >

                <span>
                  CARE INSTRUCTIONS
                </span>

                {openSection ===
                "care"
                  ? <FiChevronUp />
                  : <FiChevronDown />
                }

              </button>


              {openSection ===
                "care" && (

                <div className="accordion-content">

                  <p>
                    We recommend gentle washing,
                    mild detergent and drying
                    the garment away from
                    direct sunlight. Follow the
                    garment label wherever
                    applicable.
                  </p>

                </div>

              )}

            </div>


            <div className="product-accordion">

              <button
                type="button"
                onClick={() =>
                  toggleSection(
                    "cod"
                  )
                }
              >

                <span>
                  CASH ON DELIVERY
                </span>

                {openSection ===
                "cod"
                  ? <FiChevronUp />
                  : <FiChevronDown />
                }

              </button>


              {openSection ===
                "cod" && (

                <div className="accordion-content">

                  <p>
                    Cash on Delivery is available
                    for eligible locations. Available
                    payment options will be shown
                    during checkout.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          REVIEWS
      =================================================== */}

      <section className="product-reviews-section">


        <div className="product-reviews-header">

          <div>

            <h2>
              Reviews
            </h2>

            <p>
              {totalReviews > 0
                ? `${totalReviews} customer review${totalReviews > 1 ? "s" : ""}`
                : "Be the first to write a review"}
            </p>

          </div>


          <div className="review-write">

            <span>
              Click to review:
            </span>


            <div className="review-write-stars">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <button
                    type="button"
                    key={star}
                    onClick={() =>
                      openReviewModal(
                        star
                      )
                    }
                    aria-label={`Rate ${star} stars`}
                  >

                    <FiStar />

                  </button>

                )
              )}

            </div>

          </div>

        </div>


        {/* RATING SUMMARY */}

        <div className="rating-summary">

          <div className="rating-number">

            <strong>
              {finalRating.toFixed(1)}
            </strong>

            <span>
              /5
            </span>

            <small>
              {totalReviews} reviews
            </small>

          </div>


          <div className="rating-bars">

            {ratingDistribution.map(
              (item) => (

                <div
                  className="rating-bar-row"
                  key={item.star}
                >

                  <span>
                    {item.star}★
                  </span>


                  <div className="rating-bar">

                    <div
                      style={{
                        width:
                          `${Math.round(
                            (
                              item.count /
                              maxRatingCount
                            ) *
                            100
                          )}%`,
                      }}
                    />

                  </div>


                  <small>
                    {item.count}
                  </small>

                </div>

              )
            )}

          </div>

        </div>


        {/* USER REVIEWS */}

        {reviews.length > 0 ? (

          <div className="user-reviews-list">

            {reviews
              .slice()
              .reverse()
              .map(
                (review) => (

                  <article
                    className="user-review-card"
                    key={review.id}
                  >

                    <div className="user-review-top">

                      <div className="user-review-stars">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (

                            <FiStar
                              key={star}
                              className={
                                star <=
                                review.rating
                                  ? "review-star-filled"
                                  : "review-star-empty"
                              }
                            />

                          )
                        )}

                      </div>


                      <time>

                        {new Date(
                          review.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )}

                      </time>

                    </div>


                    <p>
                      {review.feedback}
                    </p>


                    {review.media.length > 0 && (

                      <div className="user-review-media">

                        {review.media.map(
                          (media, index) => (
                            media.type.startsWith("video/") ? (
                              <div
                                className="review-media-video"
                                key={`${media.name}-${index}`}
                              >
                                <video
                                  src={media.data}
                                  controls
                                  playsInline
                                  preload="metadata"
                                />
                                <span className="review-media-video-badge">
                                  <FiPlay />
                                </span>
                              </div>
                            ) : (
                              <img
                                key={`${media.name}-${index}`}
                                src={media.data}
                                alt="Customer review"
                              />
                            )
                          )
                        )}

                      </div>

                    )}

                  </article>

                )
              )}

          </div>

        ) : (

          <div className="no-review-box">

            <FiMessageCircle />

            <span>
              No reviews yet, be the first
              to share your thoughts.
            </span>

          </div>

        )}

      </section>


      {/* ===================================================
          RELATED PRODUCTS
      =================================================== */}

      <section className="related-products-section">

        <h2>
          RELATED PRODUCTS
        </h2>


        <div className="related-products-grid">

          {relatedProducts.map(
            (related) => (

              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="related-product-card"
                onClick={() =>
                  window.scrollTo(
                    0,
                    0
                  )
                }
              >

                <div className="related-image">

                  {related.discount && (

                    <span className="related-sale">

                      SAVE{" "}
                      {related.discount}%

                    </span>

                  )}


                  <img
                    src={
                      related.images?.[0] ||
                      related.image ||
                      ""
                    }
                    alt={
                      related.name
                    }
                    loading="lazy"
                  />

                </div>


                <div className="related-info">

                  <p>
                    {related.name}
                  </p>


                  <div>

                    <strong>
                      ₹
                      {related.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>


                    {related.oldPrice && (

                      <del>
                        ₹
                        {related.oldPrice.toLocaleString(
                          "en-IN"
                        )}
                      </del>

                    )}

                  </div>


                  <div className="related-rating">

                    {"★".repeat(
                      Math.round(
                        related.rating || 0
                      )
                    )}

                    <span>
                      ({related.reviews || 0})
                    </span>

                  </div>

                </div>

              </Link>

            )
          )}

        </div>

      </section>
{/* ===================================================
    SIZE CHART MODAL
=================================================== */}

{showSizeChart && (
  <div
    className="size-chart-overlay"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        setShowSizeChart(false);
      }
    }}
  >
    <div className="size-chart-modal">

      <button
        type="button"
        className="size-chart-close"
        onClick={() => setShowSizeChart(false)}
        aria-label="Close size chart"
      >
        <FiX />
      </button>

      <div className="size-chart-header">
        <h2>{product.name}</h2>
        <p>Size Charts</p>
      </div>

      <div className="size-chart-units">

        <button
          type="button"
          className={
            sizeUnit === "INCHES" ? "active" : ""
          }
          onClick={() => setSizeUnit("INCHES")}
        >
          INCHES
        </button>

        <span>|</span>

        <button
          type="button"
          className={
            sizeUnit === "CM" ? "active" : ""
          }
          onClick={() => setSizeUnit("CM")}
        >
          CM
        </button>

      </div>

      <div className="size-chart-table-wrapper">

        <table className="size-chart-table">

          <thead>
            <tr>
              <th>SIZE</th>
              <th>BUST</th>
              <th>WAIST</th>
              <th>HIP</th>
              <th>SHOULDER</th>
            </tr>
          </thead>

          <tbody>
            {[
              ["XS", 34, 32, 36, 13],
              ["S", 36, 34, 38, 13.5],
              ["M", 38, 36, 40, 14],
              ["L", 40, 38, 42, 14.5],
              ["XL", 42, 40, 44, 15],
              ["XXL", 44, 42, 46, 15.5],
            ].map((row) => {

              const values =
                sizeUnit === "CM"
                  ? [
                      row[0],
                      (Number(row[1]) * 2.54).toFixed(1),
                      (Number(row[2]) * 2.54).toFixed(1),
                      (Number(row[3]) * 2.54).toFixed(1),
                      (Number(row[4]) * 2.54).toFixed(1),
                    ]
                  : row;

              return (
                <tr key={row[0]}>
                  <td>{values[0]}</td>
                  <td>{values[1]}</td>
                  <td>{values[2]}</td>
                  <td>{values[3]}</td>
                  <td>{values[4]}</td>
                </tr>
              );

            })}
          </tbody>

        </table>

      </div>

      <div className="size-chart-guide-image">
        <img
          src="/images/size-chart.webp"
          alt="Dress size measurement guide"
        />
      </div>

      <div className="size-chart-help">

        <p>
          Not sure about your dress size?
          Follow these simple steps to figure it out:
        </p>

        <p>
          <strong>Waist</strong> - Measure at the
          slimmest part of natural waist above the naval.
        </p>

        <p>
          <strong>Shoulder</strong> - Measure one
          shoulder tip to the other at the back.
        </p>

        <p>
          <strong>Bust</strong> - Measure around
          fullest part of the bust.
        </p>

        <p>
          <strong>Hip</strong> - Measure at the
          widest part below the waist.
        </p>

      </div>

    </div>
  </div>
)}

      {/* ===================================================
          REVIEW MODAL
      =================================================== */}

      {reviewModal && (

        <div
          className="review-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              closeReviewModal();
            }

          }}
        >

          <div
            className="review-modal"
            role="dialog"
            aria-modal="true"
          >


            {/* CLOSE */}

            <button
              type="button"
              className="review-modal-close"
              onClick={
                closeReviewModal
              }
              aria-label="Close review"
            >
              <FiX />
            </button>


            {reviewSuccess ? (

              <div className="review-success">

                <div className="review-success-icon">
                  <FiCheck />
                </div>

                <h3>
                  Thank you!
                </h3>

                <p>
                  Your review has been submitted successfully.
                </p>

              </div>

            ) : (

              <>

                <h2>
                  How do you like this item?
                </h2>


                {/* PRODUCT PREVIEW */}

                <div className="review-product-preview">

                  <div className="review-product-image">

                    <img
                      src={
                        product.images?.[0] ||
                        product.image ||
                        ""
                      }
                      alt={
                        product.name
                      }
                    />

                  </div>


                  <div className="review-product-name">

                    {product.name}

                  </div>

                </div>


                {/* MODAL STARS */}

                <div className="review-modal-rating">

                  <div className="review-modal-stars">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <button
                          type="button"
                          key={star}
                          onMouseEnter={() =>
                            setHoverRating(
                              star
                            )
                          }
                          onMouseLeave={() =>
                            setHoverRating(
                              0
                            )
                          }
                          onClick={() =>
                            setReviewRating(
                              star
                            )
                          }
                          aria-label={`Give ${star} stars`}
                        >

                          <FiStar
                            className={
                              star <=
                              (
                                hoverRating ||
                                reviewRating
                              )
                                ? "modal-star-active"
                                : "modal-star-empty"
                            }
                          />

                        </button>

                      )
                    )}

                  </div>


                  <strong>
                    {
                      ratingLabels[
                        hoverRating ||
                        reviewRating
                      ] ||
                      "Select a rating"
                    }
                  </strong>

                </div>


                {/* FEEDBACK */}

                <label
                  className="review-field-label"
                  htmlFor="review-feedback"
                >
                  Feedback
                  <span>*</span>
                </label>


                <textarea
                  id="review-feedback"
                  className="review-feedback"
                  value={
                    reviewFeedback
                  }
                  onChange={(event) =>
                    setReviewFeedback(
                      event.target.value
                    )
                  }
                  placeholder="Write your feedback..."
                  maxLength={1000}
                />


                <div className="review-character-count">
                  {reviewFeedback.length}/1000
                </div>


                {/* FILE UPLOAD */}

                <div className="review-upload-box">

                  <label
                    htmlFor="review-files"
                    className="review-upload-button"
                  >
                    <FiUpload />
                    Add files
                  </label>


                  <input
                    id="review-files"
                    type="file"
                    accept=".gif,.jpg,.jpeg,.png,.webp,.mp4,.webm,.ogg,.mov,.m4v,video/*"
                    multiple
                    onChange={
                      handleReviewFiles
                    }
                    hidden
                  />


                  <p>
                    (Accepts JPG, PNG, GIF, WEBP, MP4/WebM and 5MB limit)
                  </p>

                </div>


                {/* MEDIA PREVIEW */}

                {reviewMedia.length > 0 && (

                  <div className="review-upload-preview">

                    {reviewMedia.map(
                      (
                        media,
                        index
                      ) => (

                        <div
                          className="review-preview-item"
                          key={`${media.name}-${index}`}
                        >

                          {media.type.startsWith("video/") ? (
                            <div className="review-media-video">
                              <video
                                src={media.data}
                                muted
                                playsInline
                                preload="metadata"
                              />
                              <span className="review-media-video-badge">
                                <FiPlay />
                              </span>
                            </div>
                          ) : (
                            <img
                              src={media.data}
                              alt="Upload preview"
                            />
                          )}


                          <button
                            type="button"
                            onClick={() =>
                              removeReviewMedia(
                                index
                              )
                            }
                            aria-label="Remove image"
                          >
                            <FiTrash2 />
                          </button>

                        </div>

                      )
                    )}

                  </div>

                )}


                {/* ERROR */}

                {reviewError && (

                  <div className="review-error">
                    {reviewError}
                  </div>

                )}


                {/* NEXT */}

                <button
                  type="button"
                  className="review-next-button"
                  onClick={
                    submitReview
                  }
                >
                  Next
                </button>

              </>

            )}

          </div>

        </div>

      )}

    </main>

  );

}
``