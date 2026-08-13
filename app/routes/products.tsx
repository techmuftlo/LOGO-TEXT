import { useMemo, useState } from "react";
import { Link } from "react-router";
import { products } from "../data/products";
import "./Products.css";

export default function Products() {
  const [price, setPrice] = useState("ALL");
  const [color, setColor] = useState("ALL");
  const [size, setSize] = useState("ALL");
  const [tag, setTag] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("FEATURED");

  /* ==============================
     DYNAMIC CATEGORIES
  ============================== */

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map((product) => product.category)
      ),
    ].sort();
  }, []);

  /* ==============================
     DYNAMIC COLORS
  ============================== */

  const colors = useMemo(() => {
    return [
      ...new Set(
        products.flatMap((product) => product.colors)
      ),
    ].sort();
  }, []);

  /* ==============================
     DYNAMIC SIZES
  ============================== */

  const sizes = useMemo(() => {
    return [
      ...new Set(
        products.flatMap((product) => product.sizes)
      ),
    ].sort();
  }, []);

  /* ==============================
     FILTER + SORT
  ============================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* PRICE */

    if (price === "UNDER999") {
      result = result.filter(
        (product) => product.price < 999
      );
    }

    if (price === "999-1499") {
      result = result.filter(
        (product) =>
          product.price >= 999 &&
          product.price <= 1499
      );
    }

    if (price === "1500-1999") {
      result = result.filter(
        (product) =>
          product.price >= 1500 &&
          product.price <= 1999
      );
    }

    if (price === "2000PLUS") {
      result = result.filter(
        (product) => product.price >= 2000
      );
    }

    /* COLOR */

    if (color !== "ALL") {
      result = result.filter(
        (product) =>
          product.colors.some(
            (item) =>
              item.toLowerCase() ===
              color.toLowerCase()
          )
      );
    }

    /* SIZE */

    if (size !== "ALL") {
      result = result.filter(
        (product) =>
          product.sizes.includes(size)
      );
    }

    /* TAG */

    if (tag === "SALE") {
      result = result.filter(
        (product) => product.discount > 0
      );
    }

    if (tag === "TRENDING") {
      result = result.filter(
        (product) => product.rating >= 4.7
      );
    }

    if (tag === "BESTSELLER") {
      result = result.filter(
        (product) => product.reviews >= 100
      );
    }

    /* CATEGORY */

    if (category !== "ALL") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    /* SORT */

    if (sort === "LOW") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "HIGH") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "DISCOUNT") {
      result.sort(
        (a, b) => b.discount - a.discount
      );
    }

    if (sort === "RATING") {
      result.sort(
        (a, b) => b.rating - a.rating
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

  /* ==============================
     RESET
  ============================== */

  const resetFilters = () => {
    setPrice("ALL");
    setColor("ALL");
    setSize("ALL");
    setTag("ALL");
    setCategory("ALL");
    setSort("FEATURED");
  };

  return (
    <main className="all-products-page">

      {/* ==============================
          BREADCRUMB
      ============================== */}

      <div className="all-products-breadcrumb">

        <Link to="/">
          HOME
        </Link>

        <span>/</span>

        <span>
          ALL PRODUCTS
        </span>

      </div>


      {/* ==============================
          TITLE
      ============================== */}

      <section className="all-products-heading">

        <h1>
          ALL PRODUCTS
        </h1>

        <p>
          {filteredProducts.length} PRODUCTS
        </p>

      </section>


      {/* ==============================
          HORIZONTAL FILTER BAR
      ============================== */}

      <div className="all-products-filter-wrapper">

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


      {/* ==============================
          TOOLBAR
      ============================== */}

      <div className="all-products-toolbar">

        <span>
          {filteredProducts.length} PRODUCTS
        </span>

        {(price !== "ALL" ||
          color !== "ALL" ||
          size !== "ALL" ||
          tag !== "ALL" ||
          category !== "ALL") && (

          <button
            type="button"
            onClick={resetFilters}
          >
            RESET FILTERS
          </button>

        )}

      </div>


      {/* ==============================
          PRODUCT GRID
      ============================== */}

      <section className="all-products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="all-product-card"
            >

              <div className="all-product-image">

                {product.discount > 0 && (
                  <span className="all-product-sale">
                    SAVE {product.discount}%
                  </span>
                )}

                <img
                  src={product.images[0]}
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
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="all-old-price">
                    ₹
                    {product.oldPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

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

    </main>
  );
}