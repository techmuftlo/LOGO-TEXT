import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router";

import { reviews as staticReviews } from "../data/reviews";
import { products } from "../data/products";
import { dresses } from "../data/dresses";

import "./ReviewsSection.css";


/* =========================================================
   TYPES
========================================================= */

type ProductItem = {
  id: number;
  slug: string;
  name: string;

  image?: string;
  images?: string[];

  rating?: number;
  reviews?: number;
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


type DisplayReview = {
  id: string | number;

  productId: number;

  productSlug: string;

  customerName: string;

  customerInitial: string;

  customerImage?: string;

  productImage: string;

  rating: number;

  date: string;

  text: string;

  productName: string;

  verified: boolean;

  media?: ReviewMedia[];
};


/* =========================================================
   STORAGE
========================================================= */

const getReviewStorageKey = (
  productId: number
) => `product_reviews_${productId}`;


/* =========================================================
   GET ALL PRODUCT REVIEWS FROM LOCAL STORAGE
========================================================= */

const getLocalProductReviews = (
  allProducts: ProductItem[]
): DisplayReview[] => {

  if (typeof window === "undefined") {
    return [];
  }


  const result: DisplayReview[] = [];


  allProducts.forEach((product) => {

    try {

      const saved =
        localStorage.getItem(
          getReviewStorageKey(product.id)
        );


      if (!saved) {
        return;
      }


      const parsed =
        JSON.parse(saved);


      if (!Array.isArray(parsed)) {
        return;
      }


      parsed.forEach(
        (review: ProductReview) => {

          if (
            !review ||
            !review.id ||
            !review.rating ||
            !review.feedback
          ) {
            return;
          }


          const productImage =
            product.images?.[0] ||
            product.image ||
            "";


          result.push({

            id: review.id,

            productId:
              product.id,

            productSlug:
              product.slug,

            customerName:
              "You",

            customerInitial:
              "YO",

            productImage,

            rating:
              review.rating,

            date:
              new Date(
                review.createdAt
              ).toLocaleDateString(
                "en-IN"
              ),

            text:
              review.feedback,

            productName:
              product.name,

            verified:
              false,

            media:
              review.media || [],

          });

        }
      );

    } catch {

      /* Ignore invalid localStorage */

    }

  });


  return result;

};


/* =========================================================
   COMPONENT
========================================================= */

export default function ReviewsSection() {


  /* =======================================================
     ALL PRODUCTS
  ======================================================= */

  const allProducts =
    useMemo<ProductItem[]>(() => {

      return [
        ...(products as ProductItem[]),
        ...(dresses as ProductItem[]),
      ];

    }, []);


  /* =======================================================
     REVIEWS STATE
  ======================================================= */

  const [
    localReviews,
    setLocalReviews,
  ] = useState<DisplayReview[]>([]);


  /* =======================================================
     LOAD USER REVIEWS
  ======================================================= */

  const loadReviews = () => {

    const savedReviews =
      getLocalProductReviews(
        allProducts
      );


    setLocalReviews(
      savedReviews
    );

  };


  useEffect(() => {

    loadReviews();


    /* =============================================
       CUSTOM EVENT
    ============================================= */

    const handleReviewsUpdated =
      () => {

        loadReviews();

      };


    window.addEventListener(
      "reviews-updated",
      handleReviewsUpdated
    );


    /* =============================================
       STORAGE EVENT
       Works when localStorage changes
       from another browser tab
    ============================================= */

    const handleStorage =
      () => {

        loadReviews();

      };


    window.addEventListener(
      "storage",
      handleStorage
    );


    /* =============================================
       SMALL REFRESH
       Helps same-tab localStorage updates
    ============================================= */

    const interval =
      window.setInterval(() => {

        loadReviews();

      }, 1500);


    return () => {

      window.removeEventListener(
        "reviews-updated",
        handleReviewsUpdated
      );


      window.removeEventListener(
        "storage",
        handleStorage
      );


      window.clearInterval(
        interval
      );

    };

  }, [allProducts]);


  /* =======================================================
     CONVERT STATIC REVIEWS
  ======================================================= */

  const convertedStaticReviews =
    useMemo<DisplayReview[]>(() => {

      return staticReviews
        .map((review) => {

          const product =
            allProducts.find(
              (item) =>
                Number(item.id) ===
                Number(review.productId)
            );


          if (!product) {
            return null;
          }


          const productImage =
            product.images?.[0] ||
            product.image ||
            review.productImage ||
            "";


          return {

            id:
              `static-${review.id}`,

            productId:
              review.productId,

            productSlug:
              product.slug,

            customerName:
              review.customerName,

            customerInitial:
              review.customerInitial,

            customerImage:
              review.customerImage,

            productImage,

            rating:
              review.rating,

            date:
              review.date,

            text:
              review.text,

            productName:
              product.name ||
              review.productName,

            verified:
              review.verified,

          };

        })
        .filter(
          (
            review
          ): review is DisplayReview =>
            review !== null
        );

    }, [allProducts]);


  /* =======================================================
     FINAL REVIEWS
  ======================================================= */

  const allReviews =
    useMemo<DisplayReview[]>(() => {

      return [
        ...convertedStaticReviews,
        ...localReviews,
      ];

    }, [
      convertedStaticReviews,
      localReviews,
    ]);


  /* =================================================
     SLIDER REFS
  ================================================= */

  const topSliderRef =
    useRef<HTMLDivElement>(null);


  const bottomSliderRef =
    useRef<HTMLDivElement>(null);


  /* =================================================
     SLIDER PAUSE
  ================================================= */

  const pausedRef =
    useRef(false);


  const resumeTimerRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);


  /* =================================================
     SELECTED REVIEW
  ================================================= */

  const [
    selectedReview,
    setSelectedReview,
  ] =
    useState<DisplayReview | null>(
      null
    );


  /* =================================================
     PAUSE SLIDER
  ================================================= */

  const pauseSlider = () => {

    pausedRef.current = true;


    if (
      resumeTimerRef.current
    ) {

      clearTimeout(
        resumeTimerRef.current
      );

    }

  };


  /* =================================================
     RESUME SLIDER
  ================================================= */

  const resumeSlider = () => {

    pausedRef.current = false;

  };


  /* =================================================
     TOUCH RESUME
  ================================================= */

  const resumeAfterTouch = () => {

    if (
      resumeTimerRef.current
    ) {

      clearTimeout(
        resumeTimerRef.current
      );

    }


    resumeTimerRef.current =
      setTimeout(() => {

        pausedRef.current = false;

      }, 1200);

  };


  /* =================================================
     OPEN REVIEW
  ================================================= */

  const openReview = (
    review: DisplayReview
  ) => {

    pauseSlider();

    setSelectedReview(
      review
    );

  };


  /* =================================================
     CLOSE REVIEW
  ================================================= */

  const closeReview = () => {

    setSelectedReview(
      null
    );

    resumeSlider();

  };


  /* =================================================
     NEXT REVIEW
  ================================================= */

  const nextReview = () => {

    if (!selectedReview) {
      return;
    }


    const currentIndex =
      allReviews.findIndex(
        (review) =>
          String(review.id) ===
          String(
            selectedReview.id
          )
      );


    if (
      currentIndex === -1 ||
      allReviews.length === 0
    ) {
      return;
    }


    const nextIndex =
      currentIndex >=
      allReviews.length - 1
        ? 0
        : currentIndex + 1;


    setSelectedReview(
      allReviews[nextIndex]
    );

  };


  /* =================================================
     PREVIOUS REVIEW
  ================================================= */

  const previousReview = () => {

    if (!selectedReview) {
      return;
    }


    const currentIndex =
      allReviews.findIndex(
        (review) =>
          String(review.id) ===
          String(
            selectedReview.id
          )
      );


    if (
      currentIndex === -1 ||
      allReviews.length === 0
    ) {
      return;
    }


    const previousIndex =
      currentIndex <= 0
        ? allReviews.length - 1
        : currentIndex - 1;


    setSelectedReview(
      allReviews[
        previousIndex
      ]
    );

  };


  /* =================================================
     ESC + ARROW KEYS
  ================================================= */

  useEffect(() => {

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {


      if (
        event.key === "Escape"
      ) {

        closeReview();

      }


      if (
        selectedReview &&
        event.key === "ArrowRight"
      ) {

        nextReview();

      }


      if (
        selectedReview &&
        event.key === "ArrowLeft"
      ) {

        previousReview();

      }

    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    selectedReview,
    allReviews,
  ]);


  /* =================================================
     AUTO SLIDER
  ================================================= */

  useEffect(() => {

    const topSlider =
      topSliderRef.current;


    const bottomSlider =
      bottomSliderRef.current;


    if (
      !topSlider ||
      !bottomSlider
    ) {

      return;

    }


    let animationFrame: number;


    /* =============================================
       BOTTOM START FROM RIGHT
    ============================================= */

    const setInitialPosition =
      () => {

        bottomSlider.scrollLeft =
          Math.max(
            0,
            bottomSlider.scrollWidth -
              bottomSlider.clientWidth
          );

      };


    setInitialPosition();


    /* =============================================
       AUTO MOVE
    ============================================= */

    const moveSliders = () => {

      if (
        !pausedRef.current
      ) {


        /* =========================================
           TOP → LEFT
        ========================================= */

        topSlider.scrollLeft +=
          0.45;


        if (
          topSlider.scrollLeft +
            topSlider.clientWidth >=
          topSlider.scrollWidth - 2
        ) {

          topSlider.scrollLeft =
            0;

        }


        /* =========================================
           BOTTOM → RIGHT
        ========================================= */

        bottomSlider.scrollLeft -=
          0.45;


        if (
          bottomSlider.scrollLeft <=
          0
        ) {

          bottomSlider.scrollLeft =
            Math.max(
              0,
              bottomSlider.scrollWidth -
                bottomSlider.clientWidth
            );

        }

      }


      animationFrame =
        requestAnimationFrame(
          moveSliders
        );

    };


    animationFrame =
      requestAnimationFrame(
        moveSliders
      );


    /* =============================================
       RESIZE
    ============================================= */

    const handleResize = () => {

      setInitialPosition();

    };


    window.addEventListener(
      "resize",
      handleResize
    );


    /* =============================================
       CLEANUP
    ============================================= */

    return () => {

      cancelAnimationFrame(
        animationFrame
      );


      window.removeEventListener(
        "resize",
        handleResize
      );


      if (
        resumeTimerRef.current
      ) {

        clearTimeout(
          resumeTimerRef.current
        );

      }

    };

  }, [allReviews.length]);


  /* =================================================
     TWO ROWS
  ================================================= */

  const topReviews =
    allReviews.filter(
      (_, index) =>
        index % 2 === 0
    );


  const bottomReviews =
    allReviews.filter(
      (_, index) =>
        index % 2 !== 0
    );


  /* =================================================
     REVIEW CARD
  ================================================= */

  const ReviewCard = ({
    review,
  }: {
    review: DisplayReview;
  }) => {

    return (

      <article
        className="review-card"
        onClick={() =>
          openReview(review)
        }
      >


        {/* =========================================
            PRODUCT IMAGE
        ========================================= */}

        <div className="review-image-wrap">

          <img
            src={
              review.productImage
            }
            alt={
              review.productName
            }
            className="review-product-image"
            loading="lazy"
          />

        </div>


        {/* =========================================
            REVIEW CONTENT
        ========================================= */}

        <div className="review-content">


          {/* =======================================
              CUSTOMER
          ======================================= */}

          <div className="review-customer">

            <div className="customer-avatar">

              {review.customerImage ? (

                <img
                  src={
                    review.customerImage
                  }
                  alt={
                    review.customerName
                  }
                  loading="lazy"
                />

              ) : (

                <span>

                  {
                    review.customerInitial
                  }

                </span>

              )}

            </div>


            <div className="customer-details">

              <div className="customer-name">

                {
                  review.customerName
                }


                {review.verified && (

                  <span className="verified-badge">
                    ✓
                  </span>

                )}

              </div>


              <div className="review-meta">

                <span className="review-stars">

                  {"★".repeat(
                    review.rating
                  )}

                  {"☆".repeat(
                    5 -
                      review.rating
                  )}

                </span>


                <span className="review-date">

                  {
                    review.date
                  }

                </span>

              </div>

            </div>

          </div>


          {/* =======================================
              REVIEW TEXT
          ======================================= */}

          <p className="review-text">

            {
              review.text
            }

          </p>


          {/* =======================================
              PRODUCT
          ======================================= */}

          <Link
            to={`/product/${review.productSlug}`}
            className="review-product"
            onClick={(event) => {

              event.stopPropagation();

            }}
          >

            <div className="review-product-thumb">

              <img
                src={
                  review.productImage
                }
                alt=""
                loading="lazy"
              />

            </div>


            <span>

              {
                review.productName
              }

            </span>

          </Link>

        </div>

      </article>

    );

  };


  /* =================================================
     RETURN
  ================================================= */

  return (

    <section className="reviews-section">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="reviews-header">

        <div>

          <h2>
            ALL REVIEWS
          </h2>


          <p>
            What our customers say
          </p>

        </div>


        <Link
          to="/reviews"
          className="reviews-view-all"
        >
          VIEW ALL REVIEWS
        </Link>

      </div>


      {/* =================================================
          TOP ROW
          LEFT MOVEMENT
      ================================================= */}

      <div
        ref={topSliderRef}
        className="
          reviews-slider
          reviews-slider-top
        "
        onMouseEnter={
          pauseSlider
        }
        onMouseLeave={
          resumeSlider
        }
        onTouchStart={
          pauseSlider
        }
        onTouchEnd={
          resumeAfterTouch
        }
      >

        {topReviews.map(
          (review) => (

            <ReviewCard
              key={
                String(
                  review.id
                )
              }
              review={
                review
              }
            />

          )
        )}

      </div>


      {/* =================================================
          BOTTOM ROW
          RIGHT MOVEMENT
      ================================================= */}

      <div
        ref={bottomSliderRef}
        className="
          reviews-slider
          reviews-slider-bottom
        "
        onMouseEnter={
          pauseSlider
        }
        onMouseLeave={
          resumeSlider
        }
        onTouchStart={
          pauseSlider
        }
        onTouchEnd={
          resumeAfterTouch
        }
      >

        {bottomReviews.map(
          (review) => (

            <ReviewCard
              key={
                String(
                  review.id
                )
              }
              review={
                review
              }
            />

          )
        )}

      </div>


      {/* =================================================
          VIEW ALL
      ================================================= */}

      <div className="reviews-bottom">

        <Link
          to="/reviews"
          className="reviews-button"
        >
          VIEW ALL REVIEWS
        </Link>

      </div>


      {/* =================================================
          REVIEW POPUP
      ================================================= */}

      {selectedReview && (

        <div
          className="review-modal-overlay"
          onClick={
            closeReview
          }
        >

          <div
            className="review-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* =========================================
                LEFT IMAGE
            ========================================= */}

            <div className="review-modal-image-area">


              <img
                src={
                  selectedReview.productImage
                }
                alt={
                  selectedReview.productName
                }
                className="review-modal-image"
              />


              {/* =====================================
                  LEFT ARROW
              ===================================== */}

              <button
                type="button"
                className="
                  review-modal-arrow
                  review-modal-arrow-left
                "
                onClick={
                  previousReview
                }
                aria-label="Previous review"
              >
                ←
              </button>


              {/* =====================================
                  RIGHT ARROW
              ===================================== */}

              <button
                type="button"
                className="
                  review-modal-arrow
                  review-modal-arrow-right
                "
                onClick={
                  nextReview
                }
                aria-label="Next review"
              >
                →
              </button>

            </div>


            {/* =========================================
                RIGHT SIDE
            ========================================= */}

            <div className="review-modal-content">


              {/* =====================================
                  CLOSE
              ===================================== */}

              <button
                type="button"
                className="review-modal-close"
                onClick={
                  closeReview
                }
                aria-label="Close review"
              >
                ×
              </button>


              {/* =====================================
                  CUSTOMER
              ===================================== */}

              <div className="review-modal-customer">


                <div className="review-modal-avatar">

                  {selectedReview.customerImage ? (

                    <img
                      src={
                        selectedReview.customerImage
                      }
                      alt={
                        selectedReview.customerName
                      }
                    />

                  ) : (

                    <span>

                      {
                        selectedReview.customerInitial
                      }

                    </span>

                  )}

                </div>


                <div>

                  <div className="review-modal-name">

                    {
                      selectedReview.customerName
                    }


                    {selectedReview.verified && (

                      <span className="review-modal-verified">
                        ✓
                      </span>

                    )}

                  </div>


                  <div className="review-modal-date">

                    {
                      selectedReview.date
                    }

                  </div>

                </div>

              </div>


              {/* =====================================
                  STARS
              ===================================== */}

              <div className="review-modal-rating">

                {"★".repeat(
                  selectedReview.rating
                )}

                {"☆".repeat(
                  5 -
                    selectedReview.rating
                )}

              </div>


              {/* =====================================
                  REVIEW TEXT
              ===================================== */}

              <p className="review-modal-text">

                {
                  selectedReview.text
                }

              </p>


              {/* =====================================
                  PRODUCT BOTTOM
              ===================================== */}

              <div className="review-modal-product">


                <div className="review-modal-product-info">


                  <img
                    src={
                      selectedReview.productImage
                    }
                    alt=""
                    className="
                      review-modal-product-thumb
                    "
                  />


                  <span>

                    {
                      selectedReview.productName
                    }

                  </span>

                </div>


                <Link
                  to={`/product/${selectedReview.productSlug}`}
                  className="review-modal-shop"
                  onClick={() => {

                    setSelectedReview(
                      null
                    );

                  }}
                >
                  Shop now
                </Link>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>

  );

}