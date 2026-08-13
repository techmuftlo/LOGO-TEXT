import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { products } from "../data/products";
import "./Category.css";

/* =====================================================
   CATEGORY CONFIG
===================================================== */

const categoryConfig: Record<
  string,
  {
    title: string;
    category: string;
  }
> = {
  "anarkali-suit": {
    title: "ANARKALI SUIT",
    category: "Anarkali",
  },

  "straight-kurta-set": {
    title: "STRAIGHT KURTA SET",
    category: "Straight Kurta Set",
  },

  "top-palazzo-dupatta-set": {
    title: "TOP PALAZZO DUPATTA SET",
    category: "Palazzo Set",
  },

  "top-sharara-dupatta-set": {
    title: "TOP SHARARA DUPATTA SET",
    category: "Sharara Set",
  },

  "a-line-kurta-set": {
    title: "A-LINE KURTA SET",
    category: "A-Line Kurta Set",
  },

  gown: {
    title: "GOWN",
    category: "Gown",
  },

  "western-wear": {
    title: "WESTERN WEAR",
    category: "Western Wear",
  },
};


/* =====================================================
   MAIN CATEGORY
===================================================== */

export default function Category() {
  const { slug } = useParams();

  /* =====================================================
     CATEGORY
  ===================================================== */

  const currentCategory =
    categoryConfig[slug || ""] ||
    {
      title: "SHOP",
      category: "",
    };


  /* =====================================================
     FILTER STATES
  ===================================================== */

  const [price, setPrice] =
    useState("ALL");

  const [color, setColor] =
    useState("ALL");

  const [size, setSize] =
    useState("ALL");

  const [tag, setTag] =
    useState("ALL");

  const [productType, setProductType] =
    useState("ALL");

  const [sort, setSort] =
    useState("FEATURED");


  /* =====================================================
     CATEGORY PRODUCTS
  ===================================================== */

  const categoryProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category.toLowerCase() ===
        currentCategory.category.toLowerCase()
    );
  }, [currentCategory.category]);


  /* =====================================================
     DYNAMIC COLORS
  ===================================================== */

  const availableColors = useMemo(() => {
    const colors = categoryProducts.flatMap(
      (product) => product.colors
    );

    return [
      ...new Set(colors),
    ].sort();
  }, [categoryProducts]);


  /* =====================================================
     DYNAMIC SIZES
  ===================================================== */

  const availableSizes = useMemo(() => {
    const sizes = categoryProducts.flatMap(
      (product) => product.sizes
    );

    return [
      ...new Set(sizes),
    ].sort();
  }, [categoryProducts]);


  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];


    /* =================================================
       PRICE
    ================================================= */

    if (price === "UNDER999") {
      result = result.filter(
        (product) =>
          product.price < 999
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
        (product) =>
          product.price >= 2000
      );
    }


    /* =================================================
       COLOR
    ================================================= */

    if (color !== "ALL") {
      result = result.filter(
        (product) =>
          product.colors.some(
            (productColor) =>
              productColor.toLowerCase() ===
              color.toLowerCase()
          )
      );
    }


    /* =================================================
       SIZE
    ================================================= */

    if (size !== "ALL") {
      result = result.filter(
        (product) =>
          product.sizes.includes(size)
      );
    }


    /* =================================================
       TAG
    ================================================= */

    if (tag === "SALE") {
      result = result.filter(
        (product) =>
          product.discount > 0
      );
    }

    if (tag === "TRENDING") {
      result = result.filter(
        (product) =>
          product.rating >= 4.7
      );
    }

    if (tag === "BESTSELLER") {
      result = result.filter(
        (product) =>
          product.reviews >= 100
      );
    }


    /* =================================================
       PRODUCT TYPE
    ================================================= */

    if (productType !== "ALL") {
      result = result.filter(
        (product) =>
          product.category ===
          productType
      );
    }


    /* =================================================
       SORT
    ================================================= */

    if (sort === "LOW") {
      result.sort(
        (a, b) =>
          a.price - b.price
      );
    }

    if (sort === "HIGH") {
      result.sort(
        (a, b) =>
          b.price - a.price
      );
    }

    if (sort === "DISCOUNT") {
      result.sort(
        (a, b) =>
          b.discount - a.discount
      );
    }

    if (sort === "RATING") {
      result.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    return result;
  }, [
    categoryProducts,
    price,
    color,
    size,
    tag,
    productType,
    sort,
  ]);


  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {
    setPrice("ALL");
    setColor("ALL");
    setSize("ALL");
    setTag("ALL");
    setProductType("ALL");
    setSort("FEATURED");
  };


  return (
    <main className="category-page">

      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="category-breadcrumb">

        <Link to="/">
          HOME
        </Link>

        <span>/</span>

        <span>
          SHOP
        </span>

        <span>/</span>

        <span>
          {currentCategory.title}
        </span>

      </div>


      {/* =================================================
          CATEGORY HEADING
      ================================================= */}

      <section className="category-heading">

        <h1>
          {currentCategory.title}
        </h1>

        <p>
          {currentCategory.title}
        </p>

      </section>


      {/* =================================================
          HORIZONTAL FILTER BAR
      ================================================= */}

      <div className="category-filter-wrapper">

        <div className="category-filter-bar">


          {/* ================= PRICE ================= */}

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


          {/* ================= COLOR ================= */}

          <select
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
          >

            <option value="ALL">
              COLOR
            </option>

            {availableColors.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>


          {/* ================= SIZE ================= */}

          <select
            value={size}
            onChange={(e) =>
              setSize(e.target.value)
            }
          >

            <option value="ALL">
              SIZE
            </option>

            {availableSizes.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>


          {/* ================= TAGS ================= */}

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


          {/* ================= PRODUCT TYPE ================= */}

          <select
            value={productType}
            onChange={(e) =>
              setProductType(e.target.value)
            }
          >

            <option value="ALL">
              PRODUCT TYPE
            </option>

            <option value={currentCategory.category}>
              {currentCategory.title}
            </option>

          </select>

        </div>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="category-toolbar">

        <span>
          {filteredProducts.length} PRODUCTS
        </span>


        <div className="category-toolbar-right">

          {/* RESET */}

          {(price !== "ALL" ||
            color !== "ALL" ||
            size !== "ALL" ||
            tag !== "ALL" ||
            productType !== "ALL") && (

            <button
              type="button"
              className="reset-filter"
              onClick={resetFilters}
            >
              RESET
            </button>

          )}


          {/* SORT */}

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="category-sort"
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
          PRODUCT GRID
      ================================================= */}

      <section className="category-product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(
            (product) => (

              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="category-product-card"
              >

                {/* ================= IMAGE ================= */}

                <div className="category-product-image">

                  {product.discount > 0 && (
                    <span className="sale-badge">
                      SAVE {product.discount}%
                    </span>
                  )}

                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                  />

                </div>


                {/* ================= INFO ================= */}

                <div className="category-product-info">

                  <p className="category-product-name">
                    {product.name}
                  </p>


                  <div className="category-product-price">

                    <span className="category-current-price">
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="category-old-price">
                      ₹
                      {product.oldPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>

              </Link>

            )
          )

        ) : (

          <div className="no-products">

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