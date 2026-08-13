import { useEffect, useRef, useState } from "react";
import "./HeroSlider.css";

const slides = [
  {
    image: "/images/hero/hero-1.jpg",
    smallTitle: "LOGO",
    title: "Timeless",
    title2: "Ethnic",
    highlight: "Elegance",
    description: "Crafted for every moment.",
    description2: "Made for every woman.",
    button: "SHOP COLLECTION",
  },

  {
    image: "/images/hero/hero-2.jpg",
    smallTitle: "LOGO",
    title: "Modern",
    title2: "Indian",
    highlight: "Grace",
    description: "Designed to make every occasion special.",
    description2: "Style that speaks for you.",
    button: "EXPLORE COLLECTION",
  },

  {
    image: "/images/hero/hero-3.jpg",
    smallTitle: "LOGO",
    title: "Festive",
    title2: "Looks",
    highlight: "Beautifully Crafted",
    description: "Elegant silhouettes for every celebration.",
    description2: "Made with love and detail.",
    button: "SHOP FESTIVE",
  },

  {
    image: "/images/hero/hero-4.jpg",
    smallTitle: "LOGO",
    title: "Classic",
    title2: "Silhouettes",
    highlight: "New Season",
    description: "Discover effortless ethnic fashion.",
    description2: "Timeless styles, modern attitude.",
    button: "VIEW COLLECTION",
  },

  {
    image: "/images/hero/hero-5.jpg",
    smallTitle: "LOGO",
    title: "Everyday",
    title2: "Elegance",
    highlight: "Made For You",
    description: "Comfort meets contemporary fashion.",
    description2: "Your style, your statement.",
    button: "SHOP NOW",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const pausedRef = useRef(false);

  const touchStartX = useRef(0);

  const touchEndX = useRef(0);


  /* ==========================================
     NEXT SLIDE
  ========================================== */

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1
        ? 0
        : prev + 1
    );
  };


  /* ==========================================
     PREVIOUS SLIDE
  ========================================== */

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };


  /* ==========================================
     AUTO SLIDER
  ========================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        nextSlide();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  /* ==========================================
     TOUCH SWIPE
  ========================================== */

  const handleTouchStart = (
    e: React.TouchEvent
  ) => {
    touchStartX.current =
      e.touches[0].clientX;

    pausedRef.current = true;
  };


  const handleTouchMove = (
    e: React.TouchEvent
  ) => {
    touchEndX.current =
      e.touches[0].clientX;
  };


  const handleTouchEnd = () => {
    const difference =
      touchStartX.current -
      touchEndX.current;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTimeout(() => {
      pausedRef.current = false;
    }, 1200);
  };


  return (
    <section
      className="hero-slider"

      ref={sliderRef}

      onMouseEnter={() => {
        pausedRef.current = true;
      }}

      onMouseLeave={() => {
        pausedRef.current = false;
      }}

      onTouchStart={handleTouchStart}

      onTouchMove={handleTouchMove}

      onTouchEnd={handleTouchEnd}
    >

      {/* ======================================
          SLIDES
      ====================================== */}

      <div
        className="hero-track"
        style={{
          transform: `translateX(-${
            currentSlide * 100
          }%)`,
        }}
      >

        {slides.map((slide, index) => (
          <div
            className="hero-slide"
            key={index}
          >

            {/* BACKGROUND IMAGE */}

            <img
              src={slide.image}
              alt={slide.title}
              className="hero-image"
            />


            {/* DARK / LIGHT OVERLAY */}

            <div className="hero-overlay"></div>


            {/* CONTENT */}

            <div className="hero-content">

              <div className="hero-small-title">
                {slide.smallTitle}
              </div>

              <div className="hero-decoration">
                <span></span>
                <span>◇</span>
                <span></span>
              </div>

              <h1>
                {slide.title}
                <br />

                {slide.title2}

                <em>
                  {slide.highlight}
                </em>
              </h1>


              <p>
                {slide.description}
                <br />
                {slide.description2}
              </p>


              <button className="hero-button">
                {slide.button}

                <span>→</span>
              </button>

            </div>

          </div>
        ))}

      </div>


      {/* ======================================
          LEFT ARROW
      ====================================== */}

      <button
        className="hero-arrow hero-arrow-left"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <span>‹</span>
      </button>


      {/* ======================================
          RIGHT ARROW
      ====================================== */}

      <button
        className="hero-arrow hero-arrow-right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span>›</span>
      </button>


      {/* ======================================
          DOTS
      ====================================== */}

      <div className="hero-dots">

        {slides.map((_, index) => (
          <button
            key={index}
            className={
              currentSlide === index
                ? "hero-dot active"
                : "hero-dot"
            }
            onClick={() => {
              setCurrentSlide(index);
              pausedRef.current = true;

              setTimeout(() => {
                pausedRef.current = false;
              }, 1200);
            }}
            aria-label={`Go to slide ${
              index + 1
            }`}
          />
        ))}

      </div>

    </section>
  );
}