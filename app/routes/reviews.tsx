import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router";

import { reviews as staticReviews } from "../data/reviews";
import { products } from "../data/products";
import { dresses } from "../data/dresses";

import "./ReviewsPage.css";


/* =========================================================
   TYPES
========================================================= */

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

type ProductData = {
  id: number;
  slug: string;
  name: string;

  image?: string;
  images?: string[];

  rating?: number;
  reviews?: number;
};


/* =========================================================
   STATIC REVIEW TYPE
========================================================= */

type StaticReview = (typeof staticReviews)[number];


/* =========================================================
   ALL REVIEW TYPE
========================================================= */

type AllReview = {
  id: string | number;

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

  isUserReview: boolean;

  createdAt?: string;

  media?: ReviewMedia[];
};


/* =========================================================
   LOCAL STORAGE KEY
========================================================= */

const getReviewStorageKey = (
  productId: number
) => {
  return `product_reviews_${productId}`;
};


/* =========================================================
   COMPONENT
========================================================= */

export default function ReviewsPage() {


  /* =======================================================
     STATES
  ======================================================= */

  const [
    selectedReview,
    setSelectedReview,
  ] = useState<AllReview | null>(null);


  const [
    userReviews,
    setUserReviews,
  ] = useState<ProductReview[]>([]);


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    ratingFilter,
    setRatingFilter,
  ] = useState(0);


  const [
    sortBy,
    setSortBy,
  ] = useState("latest");


  /* =======================================================
     ALL PRODUCTS
  ======================================================= */

  const allProducts =
    useMemo<ProductData[]>(() => {

      return [
        ...(products as ProductData[]),
        ...(dresses as ProductData[]),
      ];

    }, []);


  /* =======================================================
     FIND PRODUCT
  ======================================================= */

  const findProduct = (
    productId: number
  ) => {

    return allProducts.find(
      (product) =>
        Number(product.id) ===
        Number(productId)
    );

  };


  /* =======================================================
     LOAD USER REVIEWS
  ======================================================= */

  useEffect(() => {

    const loadedReviews: ProductReview[] = [];


    allProducts.forEach(
      (product) => {

        try {

          const saved =
            localStorage.getItem(
              getReviewStorageKey(
                product.id
              )
            );


          if (!saved) {
            return;
          }


          const parsed =
            JSON.parse(saved);


          if (
            Array.isArray(parsed)
          ) {

            parsed.forEach(
              (review) => {

                if (
                  review &&
                  typeof review ===
                    "object" &&
                  Number(
                    review.productId
                  ) ===
                    Number(product.id)
                ) {

                  loadedReviews.push(
                    review
                  );

                }

              }
            );

          }

        } catch {

          /* Ignore invalid localStorage */

        }

      }
    );


    setUserReviews(
      loadedReviews
    );

  }, [allProducts]);


  /* =======================================================
     CONVERT STATIC REVIEWS
  ======================================================= */

  const convertedStaticReviews =
    useMemo<AllReview[]>(() => {

      return staticReviews.map(
        (review: StaticReview) => {

          const product =
            findProduct(
              review.productId
            );


          return {

            id:
              review.id,

            productId:
              review.productId,

            customerName:
              review.customerName,

            customerInitial:
              review.customerInitial,

            customerImage:
              review.customerImage,

            productImage:
              product?.images?.[0] ||
              product?.image ||
              review.productImage ||
              "",

            rating:
              review.rating,

            date:
              review.date,

            text:
              review.text,

            productName:
              product?.name ||
              review.productName,

            verified:
              review.verified,

            isUserReview:
              false,

          };

        }
      );

    }, [allProducts]);


  /* =======================================================
     CONVERT USER REVIEWS
  ======================================================= */

  const convertedUserReviews =
    useMemo<AllReview[]>(() => {

      return userReviews.map(
        (review) => {

          const product =
            findProduct(
              review.productId
            );


          return {

            id:
              review.id,

            productId:
              review.productId,

            customerName:
              "Customer",

            customerInitial:
              "CU",

            customerImage:
              undefined,

            productImage:
              product?.images?.[0] ||
              product?.image ||
              "",

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
              product?.name ||
              "Product",

            verified:
              false,

            isUserReview:
              true,

            createdAt:
              review.createdAt,

            media:
              review.media || [],

          };

        }
      );

    }, [userReviews, allProducts]);


  /* =======================================================
     COMBINE ALL REVIEWS
  ======================================================= */

  const allReviews =
    useMemo<AllReview[]>(() => {

      return [
        ...convertedStaticReviews,
        ...convertedUserReviews,
      ];

    }, [
      convertedStaticReviews,
      convertedUserReviews,
    ]);


  /* =======================================================
     FILTER + SEARCH + SORT
  ======================================================= */

  const filteredReviews =
    useMemo(() => {

      let data =
        [...allReviews];


      /* SEARCH */

      if (
        search.trim()
      ) {

        const query =
          search
            .trim()
            .toLowerCase();


        data =
          data.filter(
            (review) => {

              return (

                review.customerName
                  .toLowerCase()
                  .includes(query)

                ||

                review.productName
                  .toLowerCase()
                  .includes(query)

                ||

                review.text
                  .toLowerCase()
                  .includes(query)

              );

            }
          );

      }


      /* RATING */

      if (
        ratingFilter > 0
      ) {

        data =
          data.filter(
            (review) =>
              review.rating ===
              ratingFilter
          );

      }


      /* SORT */

      if (
        sortBy ===
        "highest"
      ) {

        data.sort(
          (a, b) =>
            b.rating -
            a.rating
        );

      }


      if (
        sortBy ===
        "lowest"
      ) {

        data.sort(
          (a, b) =>
            a.rating -
            b.rating
        );

      }


      if (
        sortBy ===
        "latest"
      ) {

        data.sort(
          (a, b) => {

            const dateA =
              a.createdAt
                ? new Date(
                    a.createdAt
                  ).getTime()
                : 0;


            const dateB =
              b.createdAt
                ? new Date(
                    b.createdAt
                  ).getTime()
                : 0;


            return (
              dateB -
              dateA
            );

          }
        );

      }


      return data;

    }, [
      allReviews,
      search,
      ratingFilter,
      sortBy,
    ]);


  /* =======================================================
     PRODUCT URL
  ======================================================= */

  const getProductUrl = (
    productId: number
  ) => {

    const product =
      findProduct(
        productId
      );


    if (!product) {

      return "/";

    }


    return `/product/${product.slug}`;

  };


  /* =======================================================
     CLOSE POPUP
  ======================================================= */

  const closePopup = () => {

    setSelectedReview(
      null
    );

  };


  /* =======================================================
     RETURN
  ======================================================= */

  return (

    <main className="reviews-page">


      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="reviews-page-breadcrumb">

        HOME / REVIEWS

      </div>


      {/* =================================================
          HEADING
      ================================================= */}

      <section className="reviews-page-heading">

        <h1>
          ALL REVIEWS
        </h1>

        <p>
          What our customers say
        </p>

      </section>


      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="reviews-toolbar">


        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          className="reviews-search"
        />


        {/* RATING FILTER */}

        <select
          value={ratingFilter}
          onChange={(event) =>
            setRatingFilter(
              Number(
                event.target.value
              )
            )
          }
          className="reviews-select"
        >

          <option value={0}>
            All Ratings
          </option>

          <option value={5}>
            5 Stars
          </option>

          <option value={4}>
            4 Stars
          </option>

          <option value={3}>
            3 Stars
          </option>

          <option value={2}>
            2 Stars
          </option>

          <option value={1}>
            1 Star
          </option>

        </select>


        {/* SORT */}

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(
              event.target.value
            )
          }
          className="reviews-select"
        >

          <option value="latest">
            Latest
          </option>

          <option value="highest">
            Highest Rated
          </option>

          <option value="lowest">
            Lowest Rated
          </option>

        </select>

      </div>


      {/* =================================================
          COUNT
      ================================================= */}

      <div className="reviews-page-count">

        {filteredReviews.length}

        {" CUSTOMER REVIEWS"}

      </div>


      {/* =================================================
          REVIEWS GRID
      ================================================= */}

      {filteredReviews.length > 0 ? (

        <section className="reviews-page-grid">

          {filteredReviews.map(
            (review) => (

              <article
                key={`${review.isUserReview ? "user" : "static"}-${review.id}`}
                className="reviews-page-card"
                onClick={() =>
                  setSelectedReview(
                    review
                  )
                }
              >


                {/* PRODUCT IMAGE */}

                <div className="reviews-page-image">

                  {review.productImage ? (

                    <img
                      src={
                        review.productImage
                      }
                      alt={
                        review.productName
                      }
                      loading="lazy"
                    />

                  ) : (

                    <div>
                      Product
                    </div>

                  )}

                </div>


                {/* CONTENT */}

                <div className="reviews-page-content">


                  {/* CUSTOMER */}

                  <div className="reviews-page-customer">


                    {/* AVATAR */}

                    <div className="reviews-page-avatar">

                      {review.customerImage ? (

                        <img
                          src={
                            review.customerImage
                          }
                          alt={
                            review.customerName
                          }
                        />

                      ) : (

                        <span>
                          {
                            review.customerInitial
                          }
                        </span>

                      )}

                    </div>


                    {/* CUSTOMER INFO */}

                    <div className="reviews-page-customer-info">


                      {/* NAME */}

                      <div className="reviews-page-name">

                        {
                          review.customerName
                        }


                        {review.verified && (

                          <span className="reviews-page-verified">

                            ✓

                          </span>

                        )}

                      </div>


                      {/* RATING + DATE */}

                      <div className="reviews-page-meta">


                        <span className="reviews-page-stars">

                          {"★".repeat(
                            review.rating
                          )}

                          {"☆".repeat(
                            Math.max(
                              0,
                              5 -
                                review.rating
                            )
                          )}

                        </span>


                        <span className="reviews-page-date">

                          {
                            review.date
                          }

                        </span>

                      </div>

                    </div>

                  </div>


                  {/* REVIEW TEXT */}

                  <p className="reviews-page-text">

                    {
                      review.text
                    }

                  </p>


                  {/* USER REVIEW MEDIA */}

                  {review.isUserReview &&
                    review.media &&
                    review.media.length >
                      0 && (

                      <div className="reviews-page-media">

                        {review.media
                          .slice(0, 3)
                          .map(
                            (
                              media,
                              index
                            ) => (

                              media.type.startsWith(
                                "video/"
                              ) ? (

                                <video
                                  key={`${media.name}-${index}`}
                                  src={
                                    media.data
                                  }
                                  muted
                                  preload="metadata"
                                />

                              ) : (

                                <img
                                  key={`${media.name}-${index}`}
                                  src={
                                    media.data
                                  }
                                  alt="Customer review"
                                />

                              )

                            )
                          )}

                      </div>

                    )}


                  {/* PRODUCT LINK */}

                  <Link
                    to={getProductUrl(
                      review.productId
                    )}
                    className="reviews-page-product"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >


                    <div className="reviews-page-product-image">

                      {review.productImage ? (

                        <img
                          src={
                            review.productImage
                          }
                          alt=""
                          loading="lazy"
                        />

                      ) : (

                        <div />

                      )}

                    </div>


                    <span>

                      {
                        review.productName
                      }

                    </span>

                  </Link>

                </div>

              </article>

            )
          )}

        </section>

      ) : (

        /* =================================================
           NO REVIEWS
        ================================================= */

        <div className="reviews-page-empty">

          <h3>
            No reviews found
          </h3>

          <p>
            Try changing your search
            or rating filter.
          </p>

        </div>

      )}


      {/* =================================================
          REVIEW POPUP
      ================================================= */}

      {selectedReview && (

        <div
          className="review-popup-overlay"
          onClick={
            closePopup
          }
        >

          <div
            className="review-popup"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* CLOSE */}

            <button
              type="button"
              className="review-popup-close"
              onClick={
                closePopup
              }
              aria-label="Close review"
            >
              ×
            </button>


            {/* PRODUCT IMAGE */}

            {selectedReview.productImage && (

              <img
                src={
                  selectedReview.productImage
                }
                alt={
                  selectedReview.productName
                }
                className="review-popup-image"
              />

            )}


            {/* PRODUCT NAME */}

            <h3>

              {
                selectedReview.productName
              }

            </h3>


            {/* STARS */}

            <div className="review-popup-stars">

              {"★".repeat(
                selectedReview.rating
              )}

              {"☆".repeat(
                Math.max(
                  0,
                  5 -
                    selectedReview.rating
                )
              )}

            </div>


            {/* REVIEW */}

            <p>

              {
                selectedReview.text
              }

            </p>


            {/* CUSTOMER */}

            <strong>

              {
                selectedReview.customerName
              }

            </strong>


            {/* OPEN PRODUCT */}

            <Link
              to={getProductUrl(
                selectedReview.productId
              )}
              className="review-popup-product-button"
              onClick={
                closePopup
              }
            >

              VIEW PRODUCT

            </Link>

          </div>

        </div>

      )}

    </main>

  );

}