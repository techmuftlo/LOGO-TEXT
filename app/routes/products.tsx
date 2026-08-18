import { useMemo, useState } from "react";
import { Link } from "react-router";
import { products } from "../data/products";
import "./Products.css";

type PopupType = "FILTER" | "SORT" | null;

export default function Products() {
  /* =====================================================
     FILTER STATES
  ===================================================== */

  const [price, setPrice] = useState("ALL");
  const [color, setColor] = useState("ALL");
  const [size, setSize] = useState("ALL");
  const [tag, setTag] = useState("ALL");
  const [category, setCategory] = useState("ALL");

  /* =====================================================
     SORT
  ===================================================== */

  const [sort, setSort] = useState("FEATURED");

  /* =====================================================
     MOBILE POPUP
  ===================================================== */

  const [popup, setPopup] = useState<PopupType>(null);

  /* =====================================================
     DYNAMIC CATEGORIES
  ===================================================== */

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ].sort();
  }, []);

  /* =====================================================
     DYNAMIC COLORS
  ===================================================== */

  const colors = useMemo(() => {
    return [
      ...new Set(
        products.flatMap((product) =>
          Array.isArray(product.colors)
            ? product.colors
            : []
        )
      ),
    ].sort();
  }, []);

  /* =====================================================
     DYNAMIC SIZES
  ===================================================== */

  const sizes = useMemo(() => {
    return [
      ...new Set(
        products.flatMap((product) =>
          Array.isArray(product.sizes)
            ? product.sizes
            : []
        )
      ),
    ].sort();
  }, []);

  /* =====================================================
     ACTIVE FILTER COUNT
  ===================================================== */

  const activeFilterCount = [
    price !== "ALL",
    color !== "ALL",
    size !== "ALL",
    tag !== "ALL",
    category !== "ALL",
  ].filter(Boolean).length;

  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* =================================================
       PRICE
    ================================================= */

    if (price === "UNDER999") {
      result = result.filter(
        (product) => Number(product.price) < 999
      );
    }

    if (price === "999-1499") {
      result = result.filter(
        (product) =>
          Number(product.price) >= 999 &&
          Number(product.price) <= 1499
      );
    }

    if (price === "1500-1999") {
      result = result.filter(
        (product) =>
          Number(product.price) >= 1500 &&
          Number(product.price) <= 1999
      );
    }

    if (price === "2000PLUS") {
      result = result.filter(
        (product) => Number(product.price) >= 2000
      );
    }

    /* =================================================
       COLOR
    ================================================= */

    if (color !== "ALL") {
      result = result.filter((product) =>
        Array.isArray(product.colors)
          ? product.colors.some(
              (item) =>
                String(item).toLowerCase() ===
                color.toLowerCase()
            )
          : false
      );
    }

    /* =================================================
       SIZE
    ================================================= */

    if (size !== "ALL") {
      result = result.filter((product) =>
        Array.isArray(product.sizes)
          ? product.sizes.some(
              (item) => String(item) === size
            )
          : false
      );
    }

    /* =================================================
       TAG
    ================================================= */

    if (tag === "SALE") {
      result = result.filter(
        (product) => Number(product.discount || 0) > 0
      );
    }

    if (tag === "TRENDING") {
      result = result.filter(
        (product) => Number(product.rating || 0) >= 4.7
      );
    }

    if (tag === "BESTSELLER") {
      result = result.filter(
        (product) => Number(product.reviews || 0) >= 100
      );
    }

    /* =================================================
       CATEGORY
    ================================================= */

    if (category !== "ALL") {
      result = result.filter(
        (product) =>
          String(product.category).toLowerCase() ===
          category.toLowerCase()
      );
    }

    /* =================================================
       SORT
    ================================================= */

    if (sort === "LOW") {
      result.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sort === "HIGH") {
      result.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    if (sort === "DISCOUNT") {
      result.sort(
        (a, b) =>
          Number(b.discount || 0) -
          Number(a.discount || 0)
      );
    }

    if (sort === "RATING") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [
    price,
    color,
    size,
    tag,
    category,
    sort,
  ]);

  /* =====================================================
     RESET
  ===================================================== */

  const resetFilters = () => {
    setPrice("ALL");
    setColor("ALL");
    setSize("ALL");
    setTag("ALL");
    setCategory("ALL");
    setSort("FEATURED");
    setPopup(null);
  };

  /* =====================================================
     CLOSE POPUP
  ===================================================== */

  const closePopup = () => {
    setPopup(null);
  };

  /* =====================================================
     SORT LABEL
  ===================================================== */

  const sortLabel = {
    FEATURED: "FEATURED",
    LOW: "PRICE: LOW TO HIGH",
    HIGH: "PRICE: HIGH TO LOW",
    DISCOUNT: "BIGGEST DISCOUNT",
    RATING: "TOP RATED",
  }[sort];

  return (
    <main className="all-products-page">

      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="all-products-breadcrumb">
        <Link to="/">HOME</Link>

        <span>/</span>

        <span>ALL PRODUCTS</span>
      </div>


      {/* =================================================
          TITLE
      ================================================= */}

      <section className="all-products-heading">
        <h1>ALL PRODUCTS</h1>

        <p>
          {filteredProducts.length} PRODUCTS
        </p>
      </section>


      {/* =================================================
          DESKTOP FILTER BAR
      ================================================= */}

      <div className="desktop-filter-wrapper">

        <div className="all-products-filter-bar">

          {/* PRICE */}

          <select
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          >
            <option value="ALL">
              PRICE
            </option>

            <option value="UNDER999">
              Under ₹999
            </option>

            <option value="999-1499">
              ₹999 - ₹1,499
            </option>

            <option value="1500-1999">
              ₹1,500 - ₹1,999
            </option>

            <option value="2000PLUS">
              ₹2,000+
            </option>
          </select>


          {/* COLOR */}

          <select
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
          >
            <option value="ALL">
              COLOR
            </option>

            {colors.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>


          {/* SIZE */}

          <select
            value={size}
            onChange={(e) =>
              setSize(e.target.value)
            }
          >
            <option value="ALL">
              SIZE
            </option>

            {sizes.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>


          {/* TAGS */}

          <select
            value={tag}
            onChange={(e) =>
              setTag(e.target.value)
            }
          >
            <option value="ALL">
              TAGS
            </option>

            <option value="SALE">
              SALE
            </option>

            <option value="TRENDING">
              TRENDING
            </option>

            <option value="BESTSELLER">
              BEST SELLER
            </option>
          </select>


          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="ALL">
              CATEGORY
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>


          {/* SORT */}

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="FEATURED">
              SORT BY
            </option>

            <option value="LOW">
              PRICE: LOW TO HIGH
            </option>

            <option value="HIGH">
              PRICE: HIGH TO LOW
            </option>

            <option value="DISCOUNT">
              BIGGEST DISCOUNT
            </option>

            <option value="RATING">
              TOP RATED
            </option>
          </select>

        </div>

      </div>


      {/* =================================================
          MOBILE FILTER BAR
      ================================================= */}

      <div className="mobile-filter-bar">

        <button
          type="button"
          onClick={() => setPopup("FILTER")}
        >
          <span>FILTER</span>

          {activeFilterCount > 0 && (
            <span className="mobile-filter-count">
              {activeFilterCount}
            </span>
          )}
        </button>


        <button
          type="button"
          onClick={() => setPopup("SORT")}
        >
          <span>SORT BY</span>

          <span className="sort-arrow">
            ↓
          </span>
        </button>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="all-products-toolbar">

        <span>
          {filteredProducts.length} PRODUCTS
        </span>

        {(price !== "ALL" ||
          color !== "ALL" ||
          size !== "ALL" ||
          tag !== "ALL" ||
          category !== "ALL" ||
          sort !== "FEATURED") && (

          <button
            type="button"
            onClick={resetFilters}
          >
            RESET FILTERS
          </button>

        )}

      </div>


      {/* =================================================
          PRODUCT GRID
      ================================================= */}

      <section className="all-products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <Link
              key={product.slug || product.id}
              to={`/product/${product.slug || product.id}`}
              className="all-product-card"
            >

              <div className="all-product-image">

                {Number(product.discount || 0) > 0 && (
                  <span className="all-product-sale">
                    SAVE {product.discount}%
                  </span>
                )}

                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  loading="lazy"
                />

              </div>


              <div className="all-product-info">

                <p className="all-product-name">
                  {product.name}
                </p>


                <div className="all-product-price">

                  <span className="all-current-price">
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString("en-IN")}
                  </span>

                  {Number(product.oldPrice || 0) > 0 && (
                    <span className="all-old-price">
                      ₹
                      {Number(
                        product.oldPrice
                      ).toLocaleString("en-IN")}
                    </span>
                  )}

                </div>

              </div>

            </Link>

          ))

        ) : (

          <div className="all-products-empty">

            <p>
              No products found.
            </p>

            <button
              type="button"
              onClick={resetFilters}
            >
              CLEAR FILTERS
            </button>

          </div>

        )}

      </section>


      {/* =================================================
          MOBILE POPUP
      ================================================= */}

      {popup && (

        <div
          className="mobile-filter-overlay"
          onClick={closePopup}
        >

          <div
            className="mobile-filter-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* =================================================
                POPUP HEADER
            ================================================= */}

            <div className="mobile-popup-header">

              <h2>
                {popup === "FILTER"
                  ? "FILTER"
                  : "SORT BY"}
              </h2>

              <button
                type="button"
                onClick={closePopup}
                aria-label="Close"
              >
                ×
              </button>

            </div>


            {/* =================================================
                FILTER POPUP
            ================================================= */}

            {popup === "FILTER" && (

              <div className="mobile-popup-content">

                {/* PRICE */}

                <div className="popup-filter-group">

                  <label>
                    PRICE
                  </label>

                  <div className="popup-options">

                    <button
                      className={
                        price === "ALL"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setPrice("ALL")
                      }
                    >
                      ALL
                    </button>

                    <button
                      className={
                        price === "UNDER999"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setPrice("UNDER999")
                      }
                    >
                      UNDER ₹999
                    </button>

                    <button
                      className={
                        price === "999-1499"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setPrice("999-1499")
                      }
                    >
                      ₹999 - ₹1,499
                    </button>

                    <button
                      className={
                        price === "1500-1999"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setPrice("1500-1999")
                      }
                    >
                      ₹1,500 - ₹1,999
                    </button>

                    <button
                      className={
                        price === "2000PLUS"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setPrice("2000PLUS")
                      }
                    >
                      ₹2,000+
                    </button>

                  </div>

                </div>


                {/* COLOR */}

                <div className="popup-filter-group">

                  <label>
                    COLOR
                  </label>

                  <div className="popup-options">

                    <button
                      className={
                        color === "ALL"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setColor("ALL")
                      }
                    >
                      ALL
                    </button>

                    {colors.map((item) => (

                      <button
                        key={item}
                        className={
                          color === item
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setColor(item)
                        }
                      >
                        {item}
                      </button>

                    ))}

                  </div>

                </div>


                {/* SIZE */}

                <div className="popup-filter-group">

                  <label>
                    SIZE
                  </label>

                  <div className="popup-options">

                    <button
                      className={
                        size === "ALL"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSize("ALL")
                      }
                    >
                      ALL
                    </button>

                    {sizes.map((item) => (

                      <button
                        key={item}
                        className={
                          size === item
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setSize(item)
                        }
                      >
                        {item}
                      </button>

                    ))}

                  </div>

                </div>


                {/* TAGS */}

                <div className="popup-filter-group">

                  <label>
                    TAGS
                  </label>

                  <div className="popup-options">

                    <button
                      className={
                        tag === "ALL"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setTag("ALL")
                      }
                    >
                      ALL
                    </button>

                    <button
                      className={
                        tag === "SALE"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setTag("SALE")
                      }
                    >
                      SALE
                    </button>

                    <button
                      className={
                        tag === "TRENDING"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setTag("TRENDING")
                      }
                    >
                      TRENDING
                    </button>

                    <button
                      className={
                        tag === "BESTSELLER"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setTag("BESTSELLER")
                      }
                    >
                      BEST SELLER
                    </button>

                  </div>

                </div>


                {/* CATEGORY */}

                <div className="popup-filter-group">

                  <label>
                    CATEGORY
                  </label>

                  <div className="popup-options">

                    <button
                      className={
                        category === "ALL"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setCategory("ALL")
                      }
                    >
                      ALL
                    </button>

                    {categories.map((item) => (

                      <button
                        key={item}
                        className={
                          category === item
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setCategory(item)
                        }
                      >
                        {item}
                      </button>

                    ))}

                  </div>

                </div>


                {/* APPLY */}

                <button
                  type="button"
                  className="mobile-apply-button"
                  onClick={closePopup}
                >
                  SHOW {filteredProducts.length} PRODUCTS
                </button>


                {/* CLEAR */}

                <button
                  type="button"
                  className="mobile-clear-button"
                  onClick={resetFilters}
                >
                  CLEAR ALL FILTERS
                </button>

              </div>

            )}


            {/* =================================================
                SORT POPUP
            ================================================= */}

            {popup === "SORT" && (

              <div className="sort-popup">

                <div className="sort-mobile-options">

                  <button
                    type="button"
                    className={
                      sort === "FEATURED"
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setSort("FEATURED");
                      setPopup(null);
                    }}
                  >
                    <span>
                      FEATURED
                    </span>

                    {sort === "FEATURED" && (
                      <b>✓</b>
                    )}
                  </button>


                  <button
                    type="button"
                    className={
                      sort === "LOW"
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setSort("LOW");
                      setPopup(null);
                    }}
                  >
                    <span>
                      PRICE: LOW TO HIGH
                    </span>

                    {sort === "LOW" && (
                      <b>✓</b>
                    )}
                  </button>


                  <button
                    type="button"
                    className={
                      sort === "HIGH"
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setSort("HIGH");
                      setPopup(null);
                    }}
                  >
                    <span>
                      PRICE: HIGH TO LOW
                    </span>

                    {sort === "HIGH" && (
                      <b>✓</b>
                    )}
                  </button>


                  <button
                    type="button"
                    className={
                      sort === "DISCOUNT"
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setSort("DISCOUNT");
                      setPopup(null);
                    }}
                  >
                    <span>
                      BIGGEST DISCOUNT
                    </span>

                    {sort === "DISCOUNT" && (
                      <b>✓</b>
                    )}
                  </button>


                  <button
                    type="button"
                    className={
                      sort === "RATING"
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setSort("RATING");
                      setPopup(null);
                    }}
                  >
                    <span>
                      TOP RATED
                    </span>

                    {sort === "RATING" && (
                      <b>✓</b>
                    )}
                  </button>

                </div>


                <button
                  type="button"
                  className="mobile-clear-button"
                  onClick={() => {
                    setSort("FEATURED");
                    setPopup(null);
                  }}
                >
                  RESET SORT
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </main>
  );
}