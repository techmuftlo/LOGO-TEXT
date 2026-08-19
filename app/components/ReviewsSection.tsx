import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router";

import { reviews } from "../data/reviews";

import "./ReviewsSection.css";


export default function ReviewsSection() {

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
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );


  /* =================================================
     SELECTED REVIEW
  ================================================= */

  const [selectedReview, setSelectedReview] =
    useState<(typeof reviews)[number] | null>(
      null
    );


  /* =================================================
     PAUSE SLIDER
  ================================================= */

  const pauseSlider = () => {

    pausedRef.current = true;

    if (resumeTimerRef.current) {
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

    if (resumeTimerRef.current) {
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
    review: (typeof reviews)[number]
  ) => {

    pauseSlider();

    setSelectedReview(review);

    document.body.style.overflow = "hidden";

  };


  /* =================================================
     CLOSE REVIEW
  ================================================= */

  const closeReview = () => {

    setSelectedReview(null);

    resumeSlider();

    document.body.style.overflow = "";

  };


  /* =================================================
     NEXT REVIEW
  ================================================= */

  const nextReview = () => {

    if (!selectedReview) return;

    const currentIndex =
      reviews.findIndex(
        (review) =>
          review.id ===
          selectedReview.id
      );

    const nextIndex =
      currentIndex >= reviews.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedReview(
      reviews[nextIndex]
    );

  };


  /* =================================================
     PREVIOUS REVIEW
  ================================================= */

  const previousReview = () => {

    if (!selectedReview) return;

    const currentIndex =
      reviews.findIndex(
        (review) =>
          review.id ===
          selectedReview.id
      );

    const previousIndex =
      currentIndex <= 0
        ? reviews.length - 1
        : currentIndex - 1;

    setSelectedReview(
      reviews[previousIndex]
    );

  };


  /* =================================================
     KEYBOARD
  ================================================= */

  useEffect(() => {

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      if (!selectedReview) return;

      if (event.key === "Escape") {
        closeReview();
      }

      if (event.key === "ArrowRight") {
        nextReview();
      }

      if (event.key === "ArrowLeft") {
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

  }, [selectedReview]);


  /* =================================================
     BODY SCROLL CLEANUP
  ================================================= */

  useEffect(() => {

    return () => {

      document.body.style.overflow = "";

    };

  }, []);


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


    /* =================================================
       BOTTOM START FROM RIGHT
    ================================================= */

    const setInitialPosition = () => {

      bottomSlider.scrollLeft =
        bottomSlider.scrollWidth -
        bottomSlider.clientWidth;

    };


    setInitialPosition();


    /* =================================================
       AUTO MOVE
    ================================================= */

    const moveSliders = () => {

      if (!pausedRef.current) {

        /* =========================================
           TOP → LEFT
        ========================================= */

        topSlider.scrollLeft += 0.45;


        if (
          topSlider.scrollLeft +
            topSlider.clientWidth >=
          topSlider.scrollWidth - 2
        ) {

          topSlider.scrollLeft = 0;

        }


        /* =========================================
           BOTTOM → RIGHT
        ========================================= */

        bottomSlider.scrollLeft -= 0.45;


        if (
          bottomSlider.scrollLeft <= 0
        ) {

          bottomSlider.scrollLeft =
            bottomSlider.scrollWidth -
            bottomSlider.clientWidth;

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


    /* =================================================
       RESIZE
    ================================================= */

    const handleResize = () => {

      setInitialPosition();

    };


    window.addEventListener(
      "resize",
      handleResize
    );


    /* =================================================
       CLEANUP
    ================================================= */

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

  }, []);


  /* =================================================
     TWO ROWS
  ================================================= */

  const topReviews =
    reviews.filter(
      (_, index) =>
        index % 2 === 0
    );


  const bottomReviews =
    reviews.filter(
      (_, index) =>
        index % 2 !== 0
    );


  /* =================================================
     REVIEW CARD
  ================================================= */

  const ReviewCard = ({
    review,
  }: {
    review: (typeof reviews)[number];
  }) => {

    return (

      <article
        className="review-card"
        onClick={() =>
          openReview(review)
        }
      >

        {/* =================================================
           PRODUCT IMAGE
        ================================================= */}

        <div className="review-image-wrap">

          <img
            src={review.productImage}
            alt={review.productName}
            className="review-product-image"
            loading="lazy"
          />

        </div>


        {/* =================================================
           CONTENT
        ================================================= */}

        <div className="review-content">


          {/* =================================================
             CUSTOMER
          ================================================= */}

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
                    5 - review.rating
                  )}

                </span>


                <span className="review-date">

                  {review.date}

                </span>

              </div>

            </div>

          </div>


          {/* =================================================
             REVIEW TEXT
          ================================================= */}

          <p className="review-text">

            {review.text}

          </p>


          {/* =================================================
             PRODUCT
          ================================================= */}

          <Link
            to={`/product/${review.productId}`}
            className="review-product"

            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            <div className="review-product-thumb">

              <img
                src={review.productImage}
                alt=""
                loading="lazy"
              />

            </div>


            <span>

              {review.productName}

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
              key={review.id}
              review={review}
            />

          )
        )}

      </div>


      {/* =================================================
         BOTTOM ROW
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
              key={review.id}
              review={review}
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


            {/* =================================================
               IMAGE AREA
            ================================================= */}

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


              {/* LEFT */}

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


              {/* RIGHT */}

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


            {/* =================================================
               CONTENT
            ================================================= */}

            <div className="review-modal-content">


              {/* CLOSE */}

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


              {/* CUSTOMER */}

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


              {/* STARS */}

              <div className="review-modal-rating">

                {"★".repeat(
                  selectedReview.rating
                )}

                {"☆".repeat(
                  5 -
                    selectedReview.rating
                )}

              </div>


              {/* REVIEW */}

              <p className="review-modal-text">

                {
                  selectedReview.text
                }

              </p>


              {/* PRODUCT */}

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
                  to={`/product/${selectedReview.productId}`}
                  className="review-modal-shop"

                  onClick={() => {

                    setSelectedReview(
                      null
                    );

                    document.body.style.overflow =
                      "";

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