import { Link } from "react-router";
import { dresses } from "../data/dresses";
import "./DressesSection.css";

export default function DressesSection() {
  return (
    <section className="dresses-section">
      {/* TITLE */}
      <div className="dresses-heading">
        <h2 className="dresses-title">DRESSES</h2>

        <Link
          to="/products"
          className="dresses-top-view-all"
        >
          VIEW ALL
        </Link>
      </div>

      {/* PRODUCTS */}
      <div className="dresses-grid">
        {dresses.map((dress) => (
          <Link
            key={dress.id}
            to={`/product/${dress.id}`}
            className="dress-card"
          >
            {/* IMAGE */}
            <div className="dress-image-wrap">
              {dress.discount && dress.discount > 0 && (
                <span className="dress-sale-badge">
                  SAVE {dress.discount}%
                </span>
              )}

              <img
                src={dress.image}
                alt={dress.name}
                className="dress-image"
                loading="lazy"
              />
            </div>

            {/* DATA */}
            <div className="dress-info">
              <p className="dress-name">
                {dress.name}
              </p>

              <div className="dress-price">
                <span className="dress-current-price">
                  ₹{dress.price.toLocaleString("en-IN")}
                </span>

                {dress.oldPrice && dress.oldPrice > dress.price && (
                  <span className="dress-old-price">
                    ₹{dress.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* RATING */}
              <div className="dress-rating">
                <span className="dress-stars">
                  {"★".repeat(Math.round(dress.rating || 0))}
                </span>

                <span className="dress-review-count">
                  ({dress.reviews || 0})
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="dresses-view-all">
        <Link
          to="/products"
          className="dresses-view-button"
        >
          VIEW ALL DRESSES
        </Link>
      </div>
    </section>
  );
}