import { useEffect, useRef } from "react";
import { Link } from "react-router";
import "./CategorySection.css";

const categories = [
  {
    name: "Palazzo Set",
    slug: "top-palazzo-dupatta-set",
    image: "/images/categories/palazzo.jpg",
  },
  {
    name: "Gown",
    slug: "gown",
    image: "/images/categories/gown.jpg",
  },
  {
    name: "A-Line Kurta",
    slug: "a-line-kurta-set",
    image: "/images/categories/aline.jpg",
  },
  {
    name: "Anarkali",
    slug: "anarkali-suit",
    image: "/images/categories/anarkali.jpg",
  },
  {
    name: "Sharara Set",
    slug: "top-sharara-dupatta-set",
    image: "/images/categories/sharara.jpg",
  },
  {
    name: "Straight Kurta",
    slug: "straight-kurta-set",
    image: "/images/categories/straight-kurta.jpg",
  },
  {
    name: "Western",
    slug: "western-wear",
    image: "/images/categories/western.jpg",
  },
];

export default function CategorySection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isPaused = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let animationFrame: number;

    const moveSlider = () => {

      /* ==============================
         MOBILE AUTO SLIDER
      ============================== */

      if (
        window.innerWidth <= 850 &&
        !isPaused.current
      ) {
        slider.scrollLeft += 0.45;

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


  /* ==============================
     PAUSE
  ============================== */

  const pauseSlider = () => {
    isPaused.current = true;
  };


  /* ==============================
     RESUME
  ============================== */

  const resumeSlider = () => {
    isPaused.current = false;
  };


  return (
    <section className="category-section">

      <div
        ref={sliderRef}
        className="category-container"

        onMouseEnter={pauseSlider}
        onMouseLeave={resumeSlider}

        onTouchStart={pauseSlider}

        onTouchEnd={() => {
          setTimeout(() => {
            isPaused.current = false;
          }, 1200);
        }}

        onClick={() => {
          isPaused.current = true;

          setTimeout(() => {
            isPaused.current = false;
          }, 1500);
        }}
      >

        {categories.map((category) => (

          <Link
            to={`/category/${category.slug}`}
            className="category-item"
            key={category.name}
          >

            <div className="category-image-wrap">

              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />

            </div>


            <h3 className="category-name">
              {category.name}
            </h3>

          </Link>

        ))}

      </div>

    </section>
  );
}