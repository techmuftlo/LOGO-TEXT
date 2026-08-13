import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { products } from "../data/products";
import "./ProductVideoSlider.css";

export default function ProductVideoSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const pausedRef = useRef(false);

  /* =====================================================
     AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let animationFrame: number;

    const moveSlider = () => {
      if (!pausedRef.current) {
        slider.scrollLeft += 0.45;

        /*
          End par pahunchne ke baad
          smoothly beginning par continue
        */

        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 2
        ) {
          slider.scrollLeft = 0;
        }
      }

      animationFrame =
        requestAnimationFrame(moveSlider);
    };

    animationFrame =
      requestAnimationFrame(moveSlider);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);


  /* =====================================================
     PAUSE
  ===================================================== */

  const pauseSlider = () => {
    pausedRef.current = true;
  };


  /* =====================================================
     RESUME
  ===================================================== */

  const resumeSlider = () => {
    pausedRef.current = false;
  };


  /* =====================================================
     LEFT ARROW
  ===================================================== */

  const scrollLeft = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    pausedRef.current = true;

    slider.scrollBy({
      left: -500,
      behavior: "smooth",
    });

    setTimeout(() => {
      pausedRef.current = false;
    }, 1000);
  };


  /* =====================================================
     RIGHT ARROW
  ===================================================== */

  const scrollRight = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    pausedRef.current = true;

    /*
      Agar end par hai to beginning par
      smoothly le jao
    */

    if (
      slider.scrollLeft + slider.clientWidth >=
      slider.scrollWidth - 10
    ) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      pausedRef.current = false;
    }, 1000);
  };


  return (
    <section className="product-video-section">

      {/* =================================================
          TITLE
      ================================================= */}

      <h2 className="product-video-title">
        SHOP THE LATEST
      </h2>


      {/* =================================================
          SLIDER WRAPPER
      ================================================= */}

      <div
        className="product-video-slider-wrapper"
        onMouseEnter={pauseSlider}
        onMouseLeave={resumeSlider}
      >

        {/* ===============================================
            LEFT ARROW
        =============================================== */}

        <button
          type="button"
          className="product-slider-arrow product-slider-arrow-left"
          onClick={scrollLeft}
          aria-label="Previous products"
        >
          ‹
        </button>


        {/* ===============================================
            PRODUCTS
        =============================================== */}

        <div
          ref={sliderRef}
          className="product-video-container"

          onTouchStart={pauseSlider}

          onTouchEnd={() => {
            setTimeout(() => {
              pausedRef.current = false;
            }, 1000);
          }}
        >

          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-video-card"
            >

              {/* VIDEO */}

              <div className="product-video-wrapper">

                <video
                  className="product-video"
                  src={product.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />

              </div>


              {/* PRODUCT INFO */}

              <div className="product-video-info">

                <p className="product-video-name">
                  {product.name}
                </p>


                <div className="product-video-price">

                  <span className="old-price">
                    ₹
                    {product.oldPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="current-price">
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>


        {/* ===============================================
            RIGHT ARROW
        =============================================== */}

        <button
          type="button"
          className="product-slider-arrow product-slider-arrow-right"
          onClick={scrollRight}
          aria-label="Next products"
        >
          ›
        </button>

      </div>

    </section>
  );
}