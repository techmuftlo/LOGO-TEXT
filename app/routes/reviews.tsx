import { Link } from "react-router";
import { reviews } from "../data/reviews";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  return (
    <main className="reviews-page">

      {/* ==============================
          BREADCRUMB
      ============================== */}

      <div className="reviews-page-breadcrumb">
        HOME&nbsp;&nbsp; / &nbsp;&nbsp;REVIEWS
      </div>


      {/* ==============================
          HEADING
      ============================== */}

      <section className="reviews-page-heading">

        <h1>
          ALL REVIEWS
        </h1>

        <p>
          What our customers say
        </p>

      </section>


      {/* ==============================
          REVIEW COUNT
      ============================== */}

      <div className="reviews-page-count">
        {reviews.length} CUSTOMER REVIEWS
      </div>


      {/* ==============================
          REVIEWS GRID
      ============================== */}

      <section className="reviews-page-grid">

        {reviews.map((review) => (

          <article
            className="reviews-page-card"
            key={review.id}
          >

            {/* PRODUCT IMAGE */}

            <div className="reviews-page-image">

              <img
                src={review.productImage}
                alt={review.productName}
              />

            </div>


            {/* CONTENT */}

            <div className="reviews-page-content">

              {/* CUSTOMER */}

              <div className="reviews-page-customer">

                <div className="reviews-page-avatar">

                  {review.customerImage ? (

                    <img
                      src={review.customerImage}
                      alt={review.customerName}
                    />

                  ) : (

                    <span>
                      {review.customerInitial}
                    </span>

                  )}

                </div>


                <div className="reviews-page-customer-info">

                  <div className="reviews-page-name">

                    {review.customerName}

                    {review.verified && (
                      <span className="reviews-page-verified">
                        ✓
                      </span>
                    )}

                  </div>


                  <div className="reviews-page-meta">

                    <span className="reviews-page-stars">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(
                        5 - review.rating
                      )}
                    </span>

                    <span className="reviews-page-date">
                      {review.date}
                    </span>

                  </div>

                </div>

              </div>


              {/* REVIEW */}

              <p className="reviews-page-text">
                {review.text}
              </p>


              {/* PRODUCT */}

              <Link
                to={`/product/${review.productId}`}
                className="reviews-page-product"
              >

                <div className="reviews-page-product-image">

                  <img
                    src={review.productImage}
                    alt=""
                  />

                </div>

                <span>
                  {review.productName}
                </span>

              </Link>

            </div>

          </article>

        ))}

      </section>

    </main>
  );
}