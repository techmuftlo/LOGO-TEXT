import { useMemo, useState } from "react";
import { Link } from "react-router";
import { reviews } from "../data/reviews";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] =
    useState<(typeof reviews)[number] | null>(null);

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState("latest");

  const filteredReviews = useMemo(() => {
    let data = [...reviews];

    if (search.trim()) {
      data = data.filter(
        (review) =>
          review.customerName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          review.productName
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (ratingFilter > 0) {
      data = data.filter(
        (review) => review.rating === ratingFilter
      );
    }

    if (sortBy === "highest") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "lowest") {
      data.sort((a, b) => a.rating - b.rating);
    }

    return data;
  }, [search, ratingFilter, sortBy]);

  return (
    <main className="reviews-page">

      <div className="reviews-page-breadcrumb">
        HOME / REVIEWS
      </div>

      <section className="reviews-page-heading">
        <h1>ALL REVIEWS</h1>
        <p>What our customers say</p>
      </section>

      {/* FILTERS */}

      <div className="reviews-toolbar">

        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="reviews-search"
        />

        <select
          value={ratingFilter}
          onChange={(e) =>
            setRatingFilter(
              Number(e.target.value)
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

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
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

      <div className="reviews-page-count">
        {filteredReviews.length} CUSTOMER REVIEWS
      </div>

      <section className="reviews-page-grid">

        {filteredReviews.map((review) => (

          <article
            key={review.id}
            className="reviews-page-card"
            onClick={() =>
              setSelectedReview(review)
            }
          >
            <div className="reviews-page-image">
              <img
                src={review.productImage}
                alt={review.productName}
              />
            </div>

            <div className="reviews-page-content">

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
                      {"★".repeat(
                        review.rating
                      )}
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

              <p className="reviews-page-text">
                {review.text}
              </p>

              <Link
                to={`/product/${review.productId}`}
                className="reviews-page-product"
                onClick={(e) =>
                  e.stopPropagation()
                }
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

      {/* POPUP */}

      {selectedReview && (

        <div
          className="review-popup-overlay"
          onClick={() =>
            setSelectedReview(null)
          }
        >

          <div
            className="review-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="review-popup-close"
              onClick={() =>
                setSelectedReview(null)
              }
            >
              ×
            </button>

            <img
              src={
                selectedReview.productImage
              }
              alt=""
              className="review-popup-image"
            />

            <h3>
              {
                selectedReview.productName
              }
            </h3>

            <div className="review-popup-stars">
              {"★".repeat(
                selectedReview.rating
              )}
            </div>

            <p>
              {selectedReview.text}
            </p>

            <strong>
              {
                selectedReview.customerName
              }
            </strong>

          </div>

        </div>

      )}

    </main>
  );
}