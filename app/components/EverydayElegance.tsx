import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./EverydayElegance.css";

type Collection = {
  id: number;
  name: string;
  mobileName: string;
  image: string;
  link: string;
};

const collections: Collection[] = [
  {
    id: 1,
    name: "ANARKALI SUIT",
    mobileName: "Anarkali",
    image: "/images/everyday/anarkali.jpg",
    link: "/category/anarkali-suit",
  },

  {
    id: 2,
    name: "STRAIGHT KURTA SET",
    mobileName: "Straight Kurta",
    image: "/images/everyday/straight-kurta.jpg",
    link: "/category/straight-kurta-set",
  },

  {
    id: 3,
    name: "TOP PALAZZO DUPATTA SET",
    mobileName: "Palazzo Set",
    image: "/images/everyday/palazzo.jpg",
    link: "/category/top-palazzo-dupatta-set",
  },

  {
    id: 4,
    name: "TOP SHARARA DUPATTA SET",
    mobileName: "Sharara Set",
    image: "/images/everyday/sharara.jpg",
    link: "/category/top-sharara-dupatta-set",
  },

  {
    id: 5,
    name: "A-LINE KURTA SET",
    mobileName: "A-Line Kurta",
    image: "/images/everyday/aline.jpg",
    link: "/category/a-line-kurta-set",
  },

  {
    id: 6,
    name: "GOWN",
    mobileName: "Gown",
    image: "/images/everyday/gown.jpg",
    link: "/category/gown",
  },

  {
    id: 7,
    name: "WESTERN WEAR",
    mobileName: "Dresses",
    image: "/images/everyday/western.jpg",
    link: "/category/western-wear",
  },
];

export default function EverydayElegance() {

  /* =================================================
     DESKTOP = 4
     MOBILE = 4
  ================================================= */

  const [visibleCount, setVisibleCount] = useState(4);


  /* =================================================
     CURRENT CATEGORY OF EACH CARD
  ================================================= */

  const [cardIndexes, setCardIndexes] = useState<number[]>([
    2, // Palazzo
    5, // Gown
    0, // Anarkali
    6, // Dresses
  ]);


  /* =================================================
     FLIPPING CARD
  ================================================= */

  const [flipping, setFlipping] = useState<number[]>([]);


  /* =================================================
     HOVERED CARDS

     Example:
     [true, false, false, false]

     means first card paused.
  ================================================= */

  const hoveredRef = useRef<boolean[]>([
    false,
    false,
    false,
    false,
  ]);


  /* =================================================
     RESPONSIVE
  ================================================= */

  useEffect(() => {

    const updateScreen = () => {

      if (window.innerWidth <= 600) {

        setVisibleCount(4);

      } else {

        setVisibleCount(4);

      }

    };


    updateScreen();


    window.addEventListener(
      "resize",
      updateScreen
    );


    return () => {

      window.removeEventListener(
        "resize",
        updateScreen
      );

    };

  }, []);


  /* =================================================
     AUTO FLIP

     Har card independently change hoga.
  ================================================= */

  useEffect(() => {

    if (visibleCount === 0) return;


    const timers: ReturnType<
      typeof setTimeout
    >[] = [];


    const startCardFlip = (
      position: number
    ) => {

      /* =============================================
         AGAR MOUSE CARD PAR HAI
         TO CARD CHANGE NAHI HOGA
      ============================================= */

      if (
        hoveredRef.current[position]
      ) {

        return;

      }


      /* =============================================
         FLIP START
      ============================================= */

      setFlipping((old) => {

        if (old.includes(position)) {
          return old;
        }

        return [
          ...old,
          position,
        ];

      });


      /* =============================================
         FLIP KE BEECH ME DATA CHANGE
      ============================================= */

      const changeTimer =
        setTimeout(() => {

          if (
            hoveredRef.current[position]
          ) {

            setFlipping((old) =>
              old.filter(
                (item) =>
                  item !== position
              )
            );

            return;

          }


          setCardIndexes(
            (oldIndexes) => {

              const newIndexes =
                [...oldIndexes];

              const current =
                newIndexes[position] ?? 0;


              newIndexes[position] =
                (
                  current + 1
                ) %
                collections.length;


              return newIndexes;

            }
          );

        }, 300);


      timers.push(changeTimer);


      /* =============================================
         FLIP COMPLETE
      ============================================= */

      const finishTimer =
        setTimeout(() => {

          setFlipping((old) =>
            old.filter(
              (item) =>
                item !== position
            )
          );

        }, 620);


      timers.push(finishTimer);

    };


    /* =============================================
       EACH CARD KA ALAG TIMER
    ============================================= */

    const intervals =
      Array.from(
        {
          length: visibleCount,
        },
        (_, position) => {

          return setInterval(
            () => {

              startCardFlip(
                position
              );

            },

            /* 
              Har card ka timing thoda
              different rakha hai.
            */

            4500 +
              position * 650
          );

        }
      );


    return () => {

      intervals.forEach(
        (timer) =>
          clearInterval(timer)
      );


      timers.forEach(
        (timer) =>
          clearTimeout(timer)
      );

    };

  }, [visibleCount]);


  /* =================================================
     HOVER START
  ================================================= */

  const handleMouseEnter = (
    position: number
  ) => {

    hoveredRef.current[position] =
      true;


    /* Agar flip already chal raha hai
       to usko complete hone do */

  };


  /* =================================================
     HOVER END
  ================================================= */

  const handleMouseLeave = (
    position: number
  ) => {

    hoveredRef.current[position] =
      false;

  };


  /* =================================================
     CARD
  ================================================= */

  const renderCard = (
    collectionIndex: number,
    position: number
  ) => {

    const item =
      collections[
        collectionIndex %
        collections.length
      ];


    const isFlipping =
      flipping.includes(position);


    return (

      <div
        className={`
          everyday-flip-card
          ${isFlipping ? "is-flipping" : ""}
        `}
        key={position}

        onMouseEnter={() =>
          handleMouseEnter(
            position
          )
        }

        onMouseLeave={() =>
          handleMouseLeave(
            position
          )
        }
      >

        <Link
          to={item.link}
          className="everyday-card"
        >

          {/* =====================================
              IMAGE
          ===================================== */}

          <img
            src={item.image}
            alt={item.name}
            className="everyday-image"
            loading="lazy"
          />


          {/* =====================================
              OVERLAY
          ===================================== */}

          <div className="everyday-overlay"></div>


          {/* =====================================
              CONTENT
          ===================================== */}

          <div className="everyday-card-content">

            {/* DESKTOP NAME */}

            <span className="everyday-name desktop-name">
              {item.name}
            </span>


            {/* MOBILE NAME */}

            <span className="everyday-name mobile-name">
              {item.mobileName}
            </span>


            {/* ARROW */}

            <span className="everyday-arrow">
              ›
            </span>

          </div>

        </Link>

      </div>

    );

  };


  /* =================================================
     RETURN
  ================================================= */

  return (

    <section className="everyday-section">

      {/* =============================================
          TITLE
      ============================================= */}

      <h2 className="everyday-title">
        EVERYDAY ELEGANCE
      </h2>


      {/* =============================================
          CARDS
      ============================================= */}

      <div className="everyday-container">

        {cardIndexes
          .slice(0, visibleCount)
          .map(
            (
              collectionIndex,
              position
            ) =>
              renderCard(
                collectionIndex,
                position
              )
          )}

      </div>

    </section>

  );
}