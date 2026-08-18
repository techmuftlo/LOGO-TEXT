import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router";

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
   SORT OPTIONS
===================================================== */

const sortOptions = [
  {
    value: "FEATURED",
    label: "FEATURED",
  },
  {
    value: "LOW",
    label: "PRICE: LOW TO HIGH",
  },
  {
    value: "HIGH",
    label: "PRICE: HIGH TO LOW",
  },
  {
    value: "DISCOUNT",
    label: "BIGGEST DISCOUNT",
  },
  {
    value: "RATING",
    label: "TOP RATED",
  },
];


/* =====================================================
   MAIN CATEGORY
===================================================== */

export default function Category() {

  const { slug } = useParams();


  /* =====================================================
     CURRENT CATEGORY
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
     MOBILE POPUP STATES
  ===================================================== */

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  const [mobileSortOpen, setMobileSortOpen] =
    useState(false);


  /* =====================================================
     TEMP MOBILE FILTER STATES

     User can select multiple options inside popup
     and then press APPLY.
  ===================================================== */

  const [tempPrice, setTempPrice] =
    useState("ALL");

  const [tempColor, setTempColor] =
    useState("ALL");

  const [tempSize, setTempSize] =
    useState("ALL");

  const [tempTag, setTempTag] =
    useState("ALL");

  const [tempProductType, setTempProductType] =
    useState("ALL");


  /* =====================================================
     CATEGORY PRODUCTS
  ===================================================== */

  const categoryProducts = useMemo(() => {

    if (!currentCategory.category) {
      return [];
    }

    return products.filter(
      (product) =>
        String(product.category || "")
          .toLowerCase() ===
        currentCategory.category.toLowerCase()
    );

  }, [currentCategory.category]);


  /* =====================================================
     DYNAMIC COLORS
  ===================================================== */

  const availableColors = useMemo(() => {

    const colors = categoryProducts.flatMap(
      (product) =>
        Array.isArray(product.colors)
          ? product.colors
          : []
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
      (product) =>
        Array.isArray(product.sizes)
          ? product.sizes
          : []
    );

    return [
      ...new Set(sizes),
    ].sort();

  }, [categoryProducts]);


  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredProducts = useMemo(() => {

    let result = [...categoryProducts];


    /* =================================================
       PRICE FILTER
    ================================================= */

    if (price === "UNDER999") {

      result = result.filter(
        (product) =>
          Number(product.price) < 999
      );

    }

    else if (price === "999-1499") {

      result = result.filter(
        (product) =>
          Number(product.price) >= 999 &&
          Number(product.price) <= 1499
      );

    }

    else if (price === "1500-1999") {

      result = result.filter(
        (product) =>
          Number(product.price) >= 1500 &&
          Number(product.price) <= 1999
      );

    }

    else if (price === "2000PLUS") {

      result = result.filter(
        (product) =>
          Number(product.price) >= 2000
      );

    }


    /* =================================================
       COLOR FILTER
    ================================================= */

    if (color !== "ALL") {

      result = result.filter(
        (product) => {

          const productColors =
            Array.isArray(product.colors)
              ? product.colors
              : [];

          return productColors.some(
            (productColor) =>
              String(productColor)
                .toLowerCase()
                .trim() ===
              String(color)
                .toLowerCase()
                .trim()
          );

        }
      );

    }


    /* =================================================
       SIZE FILTER
    ================================================= */

    if (size !== "ALL") {

      result = result.filter(
        (product) => {

          const productSizes =
            Array.isArray(product.sizes)
              ? product.sizes
              : [];

          return productSizes.some(
            (productSize) =>
              String(productSize)
                .toLowerCase()
                .trim() ===
              String(size)
                .toLowerCase()
                .trim()
          );

        }
      );

    }


    /* =================================================
       TAG FILTER
    ================================================= */

    if (tag === "SALE") {

      result = result.filter(
        (product) =>
          Number(product.discount || 0) > 0
      );

    }

    else if (tag === "TRENDING") {

      result = result.filter(
        (product) =>
          Number(product.rating || 0) >= 4.7
      );

    }

    else if (tag === "BESTSELLER") {

      result = result.filter(
        (product) =>
          Number(product.reviews || 0) >= 100
      );

    }


    /* =================================================
       PRODUCT TYPE
    ================================================= */

    if (productType !== "ALL") {

      result = result.filter(
        (product) =>
          String(product.category || "")
            .toLowerCase()
            .trim() ===
          String(productType)
            .toLowerCase()
            .trim()
      );

    }


    /* =================================================
       SORT
    ================================================= */

    if (sort === "LOW") {

      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );

    }

    else if (sort === "HIGH") {

      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );

    }

    else if (sort === "DISCOUNT") {

      result.sort(
        (a, b) =>
          Number(b.discount || 0) -
          Number(a.discount || 0)
      );

    }

    else if (sort === "RATING") {

      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );

    }

    /*
      FEATURED:
      original products order remains unchanged.
    */

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
     ACTIVE FILTER COUNT
  ===================================================== */

  const activeFilterCount = [
    price !== "ALL",
    color !== "ALL",
    size !== "ALL",
    tag !== "ALL",
    productType !== "ALL",
  ].filter(Boolean).length;


  /* =====================================================
     OPEN FILTER POPUP
  ===================================================== */

  const openFilterPopup = () => {

    setTempPrice(price);
    setTempColor(color);
    setTempSize(size);
    setTempTag(tag);
    setTempProductType(productType);

    setMobileSortOpen(false);
    setMobileFilterOpen(true);

  };


  /* =====================================================
     OPEN SORT POPUP
  ===================================================== */

  const openSortPopup = () => {

    setMobileFilterOpen(false);
    setMobileSortOpen(true);

  };


  /* =====================================================
     CLOSE POPUPS
  ===================================================== */

  const closeMobilePopups = () => {

    setMobileFilterOpen(false);
    setMobileSortOpen(false);

  };


  /* =====================================================
     APPLY MOBILE FILTER
  ===================================================== */

  const applyMobileFilters = () => {

    setPrice(tempPrice);
    setColor(tempColor);
    setSize(tempSize);
    setTag(tempTag);
    setProductType(tempProductType);

    setMobileFilterOpen(false);

  };


  /* =====================================================
     CLEAR MOBILE TEMP FILTERS
  ===================================================== */

  const clearMobileFilters = () => {

    setTempPrice("ALL");
    setTempColor("ALL");
    setTempSize("ALL");
    setTempTag("ALL");
    setTempProductType("ALL");

  };


  /* =====================================================
     RESET ALL
  ===================================================== */

  const resetFilters = () => {

    setPrice("ALL");
    setColor("ALL");
    setSize("ALL");
    setTag("ALL");
    setProductType("ALL");
    setSort("FEATURED");

    setTempPrice("ALL");
    setTempColor("ALL");
    setTempSize("ALL");
    setTempTag("ALL");
    setTempProductType("ALL");

    setMobileFilterOpen(false);
    setMobileSortOpen(false);

  };


  /* =====================================================
     SORT SELECT
  ===================================================== */

  const handleSortChange = (
    value: string
  ) => {

    setSort(value);

    setMobileSortOpen(false);

  };


  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {

    const popupOpen =
      mobileFilterOpen ||
      mobileSortOpen;

    if (popupOpen) {

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

    }
    else {

      document.body.style.overflow = "";
      document.body.style.touchAction = "";

    }

    return () => {

      document.body.style.overflow = "";
      document.body.style.touchAction = "";

    };

  }, [
    mobileFilterOpen,
    mobileSortOpen,
  ]);


  /* =====================================================
     ESC KEY CLOSE
  ===================================================== */

  useEffect(() => {

    const handleEscape = (
      event: KeyboardEvent
    ) => {

      if (event.key === "Escape") {
        closeMobilePopups();
      }

    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, []);


  /* =====================================================
     CURRENT SORT LABEL
  ===================================================== */

  const currentSortLabel =
    sortOptions.find(
      (item) =>
        item.value === sort
    )?.label || "SORT BY";


  /* =====================================================
     RENDER
  ===================================================== */

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
          HEADING
      ================================================= */}

      <section className="category-heading">

        <h1>
          {currentCategory.title}
        </h1>

        <p>
          {filteredProducts.length} PRODUCTS
        </p>

      </section>


      {/* =================================================
          DESKTOP FILTER BAR
      ================================================= */}

      <div className="category-filter-wrapper">

        <div className="category-filter-bar">


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


          {/* PRODUCT TYPE */}

          <select
            value={productType}
            onChange={(e) =>
              setProductType(e.target.value)
            }
          >

            <option value="ALL">
              PRODUCT TYPE
            </option>

            <option
              value={currentCategory.category}
            >
              {currentCategory.title}
            </option>

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

      <div className="mobile-category-filter-bar">

        <button
          type="button"
          onClick={openFilterPopup}
        >

          <span>
            FILTER
          </span>

          {activeFilterCount > 0 && (

            <span className="mobile-filter-count">
              {activeFilterCount}
            </span>

          )}

        </button>


        <button
          type="button"
          onClick={openSortPopup}
        >

          <span>
            SORT BY
          </span>

          <span className="mobile-sort-arrow">
            ↓
          </span>

        </button>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="category-toolbar">

        <span>
          {filteredProducts.length} PRODUCTS
        </span>


        <div className="category-toolbar-right">

          {(price !== "ALL" ||
            color !== "ALL" ||
            size !== "ALL" ||
            tag !== "ALL" ||
            productType !== "ALL" ||
            sort !== "FEATURED") && (

            <button
              type="button"
              className="reset-filter"
              onClick={resetFilters}
            >
              RESET
            </button>

          )}

          <span className="desktop-current-sort">
            {currentSortLabel}
          </span>

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
                key={
                  product.slug ||
                  product.id
                }
                to={`/product/${
                  product.slug ||
                  product.id
                }`}
                className="category-product-card"
              >


                {/* IMAGE */}

                <div className="category-product-image">

                  {Number(product.discount || 0) > 0 && (

                    <span className="sale-badge">
                      SAVE {product.discount}%
                    </span>

                  )}

                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    loading="lazy"
                  />

                </div>


                {/* INFO */}

                <div className="category-product-info">

                  <p className="category-product-name">
                    {product.name}
                  </p>


                  <div className="category-product-price">

                    <span className="category-current-price">

                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}

                    </span>


                    {product.oldPrice && (

                      <span className="category-old-price">

                        ₹
                        {Number(
                          product.oldPrice
                        ).toLocaleString("en-IN")}

                      </span>

                    )}

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


      {/* =================================================
          MOBILE FILTER POPUP
      ================================================= */}

      {mobileFilterOpen && (

        <div
          className="mobile-category-overlay"
          onClick={closeMobilePopups}
        >

          <div
            className="mobile-category-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="mobile-popup-header">

              <div>

                <h2>
                  FILTER
                </h2>

                <p>
                  {activeFilterCount > 0
                    ? `${activeFilterCount} FILTERS SELECTED`
                    : "SELECT YOUR PREFERENCES"}
                </p>

              </div>


              <button
                type="button"
                className="mobile-popup-close"
                onClick={closeMobilePopups}
                aria-label="Close filter"
              >
                ×
              </button>

            </div>


            {/* CONTENT */}

            <div className="mobile-popup-content">


              {/* PRICE */}

              <div className="popup-filter-group">

                <label>
                  PRICE
                </label>

                <div className="popup-options">

                  <button
                    type="button"
                    className={
                      tempPrice === "ALL"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempPrice("ALL")
                    }
                  >
                    ALL
                  </button>

                  <button
                    type="button"
                    className={
                      tempPrice === "UNDER999"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempPrice("UNDER999")
                    }
                  >
                    UNDER ₹999
                  </button>

                  <button
                    type="button"
                    className={
                      tempPrice === "999-1499"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempPrice("999-1499")
                    }
                  >
                    ₹999 - ₹1,499
                  </button>

                  <button
                    type="button"
                    className={
                      tempPrice === "1500-1999"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempPrice("1500-1999")
                    }
                  >
                    ₹1,500 - ₹1,999
                  </button>

                  <button
                    type="button"
                    className={
                      tempPrice === "2000PLUS"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempPrice("2000PLUS")
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
                    type="button"
                    className={
                      tempColor === "ALL"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempColor("ALL")
                    }
                  >
                    ALL
                  </button>

                  {availableColors.map(
                    (item) => (

                      <button
                        type="button"
                        key={item}
                        className={
                          tempColor === item
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setTempColor(item)
                        }
                      >
                        {item}
                      </button>

                    )
                  )}

                </div>

              </div>


              {/* SIZE */}

              <div className="popup-filter-group">

                <label>
                  SIZE
                </label>

                <div className="popup-options">

                  <button
                    type="button"
                    className={
                      tempSize === "ALL"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempSize("ALL")
                    }
                  >
                    ALL
                  </button>

                  {availableSizes.map(
                    (item) => (

                      <button
                        type="button"
                        key={item}
                        className={
                          tempSize === item
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setTempSize(item)
                        }
                      >
                        {item}
                      </button>

                    )
                  )}

                </div>

              </div>


              {/* TAGS */}

              <div className="popup-filter-group">

                <label>
                  TAGS
                </label>

                <div className="popup-options">

                  <button
                    type="button"
                    className={
                      tempTag === "ALL"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempTag("ALL")
                    }
                  >
                    ALL
                  </button>

                  <button
                    type="button"
                    className={
                      tempTag === "SALE"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempTag("SALE")
                    }
                  >
                    SALE
                  </button>

                  <button
                    type="button"
                    className={
                      tempTag === "TRENDING"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempTag("TRENDING")
                    }
                  >
                    TRENDING
                  </button>

                  <button
                    type="button"
                    className={
                      tempTag === "BESTSELLER"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempTag("BESTSELLER")
                    }
                  >
                    BEST SELLER
                  </button>

                </div>

              </div>


              {/* PRODUCT TYPE */}

              <div className="popup-filter-group">

                <label>
                  PRODUCT TYPE
                </label>

                <div className="popup-options">

                  <button
                    type="button"
                    className={
                      tempProductType === "ALL"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempProductType("ALL")
                    }
                  >
                    ALL
                  </button>

                  <button
                    type="button"
                    className={
                      tempProductType ===
                      currentCategory.category
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTempProductType(
                        currentCategory.category
                      )
                    }
                  >
                    {currentCategory.title}
                  </button>

                </div>

              </div>


              {/* APPLY */}

              <button
                type="button"
                className="mobile-apply-button"
                onClick={applyMobileFilters}
              >
                SHOW {getFilterPreviewCount(
                  categoryProducts,
                  tempPrice,
                  tempColor,
                  tempSize,
                  tempTag,
                  tempProductType
                )} PRODUCTS
              </button>


              {/* CLEAR */}

              <button
                type="button"
                className="mobile-clear-button"
                onClick={clearMobileFilters}
              >
                CLEAR ALL FILTERS
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          MOBILE SORT POPUP
      ================================================= */}

      {mobileSortOpen && (

        <div
          className="mobile-category-overlay"
          onClick={closeMobilePopups}
        >

          <div
            className="mobile-category-popup mobile-sort-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="mobile-popup-header">

              <div>

                <h2>
                  SORT BY
                </h2>

                <p>
                  {currentSortLabel}
                </p>

              </div>


              <button
                type="button"
                className="mobile-popup-close"
                onClick={closeMobilePopups}
                aria-label="Close sort"
              >
                ×
              </button>

            </div>


            {/* SORT OPTIONS */}

            <div className="sort-mobile-options">

              {sortOptions.map(
                (option) => (

                  <button
                    type="button"
                    key={option.value}
                    className={
                      sort === option.value
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handleSortChange(
                        option.value
                      )
                    }
                  >

                    <span>
                      {option.label}
                    </span>

                    {sort === option.value && (

                      <b>
                        ✓
                      </b>

                    )}

                  </button>

                )
              )}

            </div>


            {/* SORT CLOSE */}

            <button
              type="button"
              className="mobile-sort-done"
              onClick={closeMobilePopups}
            >
              DONE
            </button>

          </div>

        </div>

      )}

    </main>

  );
}


/* =====================================================
   MOBILE FILTER PREVIEW COUNT

   This is only used for the "SHOW X PRODUCTS"
   button inside popup.
===================================================== */

function getFilterPreviewCount(
  categoryProducts: typeof products,
  price: string,
  color: string,
  size: string,
  tag: string,
  productType: string
) {

  let result = [...categoryProducts];


  /* PRICE */

  if (price === "UNDER999") {

    result = result.filter(
      (product) =>
        Number(product.price) < 999
    );

  }

  else if (price === "999-1499") {

    result = result.filter(
      (product) =>
        Number(product.price) >= 999 &&
        Number(product.price) <= 1499
    );

  }

  else if (price === "1500-1999") {

    result = result.filter(
      (product) =>
        Number(product.price) >= 1500 &&
        Number(product.price) <= 1999
    );

  }

  else if (price === "2000PLUS") {

    result = result.filter(
      (product) =>
        Number(product.price) >= 2000
    );

  }


  /* COLOR */

  if (color !== "ALL") {

    result = result.filter(
      (product) => {

        const colors =
          Array.isArray(product.colors)
            ? product.colors
            : [];

        return colors.some(
          (item) =>
            String(item)
              .toLowerCase()
              .trim() ===
            color
              .toLowerCase()
              .trim()
        );

      }
    );

  }


  /* SIZE */

  if (size !== "ALL") {

    result = result.filter(
      (product) => {

        const sizes =
          Array.isArray(product.sizes)
            ? product.sizes
            : [];

        return sizes.some(
          (item) =>
            String(item)
              .toLowerCase()
              .trim() ===
            size
              .toLowerCase()
              .trim()
        );

      }
    );

  }


  /* TAG */

  if (tag === "SALE") {

    result = result.filter(
      (product) =>
        Number(product.discount || 0) > 0
    );

  }

  else if (tag === "TRENDING") {

    result = result.filter(
      (product) =>
        Number(product.rating || 0) >= 4.7
    );

  }

  else if (tag === "BESTSELLER") {

    result = result.filter(
      (product) =>
        Number(product.reviews || 0) >= 100
    );

  }


  /* PRODUCT TYPE */

  if (productType !== "ALL") {

    result = result.filter(
      (product) =>
        String(product.category || "")
          .toLowerCase()
          .trim() ===
        productType
          .toLowerCase()
          .trim()
    );

  }


  return result.length;
}