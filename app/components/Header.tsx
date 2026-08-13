import { useState } from "react";
import { Link } from "react-router";
import { products } from "../data/products";
import "./Header.css";

const menuItems = [
  {
    name: "ANARKALI SUIT",
    slug: "anarkali-suit",
  },
  {
    name: "STRAIGHT KURTA SET",
    slug: "straight-kurta-set",
  },
  {
    name: "TOP PALAZZO DUPATTA SET",
    slug: "top-palazzo-dupatta-set",
  },
  {
    name: "TOP SHARARA DUPATTA SET",
    slug: "top-sharara-dupatta-set",
  },
  {
    name: "A-LINE KURTA SET",
    slug: "a-line-kurta-set",
  },
  {
    name: "GOWN",
    slug: "gown",
  },
  {
    name: "WESTERN WEAR",
    slug: "western-wear",
  },
];

type HeaderProps = {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function Header({
  mobileOpen,
  setMobileOpen,
}: HeaderProps) {

  /* ================= SEARCH ================= */

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchText, setSearchText] =
    useState("");


  /* ================= SEARCH RESULTS ================= */

  const searchResults =
    searchText.trim().length > 0
      ? products
          .filter((product) => {

            const search =
              searchText
                .toLowerCase()
                .trim();

            const name =
              product.name?.toLowerCase() || "";

            const category =
              product.category
                ?.toLowerCase() || "";

            return (
              name.includes(search) ||
              category.includes(search)
            );
          })
          .slice(0, 8)
      : [];


  /* ================= OPEN SEARCH ================= */

  const openSearch = () => {
    setSearchOpen(true);

    setTimeout(() => {
      document
        .querySelector<HTMLInputElement>(
          ".header-search-input"
        )
        ?.focus();
    }, 50);
  };


  /* ================= CLOSE SEARCH ================= */

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchText("");
  };


  /* ================= SEARCH ENTER ================= */

  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (e.key === "Escape") {
      closeSearch();
    }

    if (
      e.key === "Enter" &&
      searchResults.length > 0
    ) {
      window.location.href =
        `/product/${searchResults[0].id}`;
    }
  };


  return (
    <header className="site-header">

      {/* =================================================
          HEADER INNER
      ================================================= */}

      <div className="header-inner">


        {/* ================= MOBILE MENU ================= */}

        <button
          className={`mobile-menu-btn ${
            mobileOpen ? "active" : ""
          }`}
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          aria-label="Open Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="brand-logo"
        >
          <span className="brand-name">
            LOGO
          </span>

          <span className="brand-line"></span>

          <span className="brand-tagline">
            TEXT....
          </span>
        </Link>


        {/* ================= DESKTOP MENU ================= */}

        <nav className="desktop-nav">

          <div className="nav-row nav-row-one">

            {menuItems
              .slice(0, 4)
              .map((item) => (

                <Link
                  to={`/category/${item.slug}`}
                  key={item.slug}
                  className="nav-link"
                >
                  {item.name}
                </Link>

              ))}

          </div>


          <div className="nav-row nav-row-two">

            {menuItems
              .slice(4)
              .map((item) => (

                <Link
                  to={`/category/${item.slug}`}
                  key={item.slug}
                  className="nav-link"
                >
                  {item.name}
                </Link>

              ))}

          </div>

        </nav>


        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="header-actions">


          {/* LOGIN */}

          <Link
            to="/login"
            className="header-icon"
            aria-label="Login"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="7.5"
                r="3.3"
              />

              <path
                d="M4.5 20C5.2 15.8 7.8 13.5 12 13.5C16.2 13.5 18.8 15.8 19.5 20"
              />
            </svg>
          </Link>


          {/* SEARCH */}

          <button
            className="header-icon"
            aria-label="Search"
            onClick={openSearch}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
              />

              <path d="M15.5 15.5L21 21" />
            </svg>
          </button>


          {/* CART */}

          <Link
            to="/cart"
            className="header-icon"
            aria-label="Shopping Bag"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 8.5H19L20 21H4L5 8.5Z"
              />

              <path
                d="M8 8.5V6.5C8 4.57 9.79 3 12 3C14.21 3 16 4.57 16 6.5V8.5"
              />
            </svg>
          </Link>

        </div>


        {/* =================================================
            MOBILE ACTIONS
        ================================================= */}

        <div className="mobile-header-actions">


          {/* MOBILE SEARCH */}

          <button
            className="mobile-header-icon"
            aria-label="Search"
            onClick={openSearch}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
              />

              <path d="M15.5 15.5L21 21" />
            </svg>
          </button>


          {/* MOBILE CART */}

          <Link
            to="/cart"
            className="mobile-header-icon"
            aria-label="Shopping Bag"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 8.5H19L20 21H4L5 8.5Z"
              />

              <path
                d="M8 8.5V6.5C8 4.57 9.79 3 12 3C14.21 3 16 4.57 16 6.5V8.5"
              />
            </svg>
          </Link>

        </div>

      </div>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <div
        className={`mobile-nav ${
          mobileOpen ? "open" : ""
        }`}
      >

        {menuItems.map((item) => (

          <Link
            to={`/category/${item.slug}`}
            key={item.slug}
            className="mobile-nav-link"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            {item.name}
          </Link>

        ))}

      </div>


      {/* =================================================
          SEARCH PANEL
      ================================================= */}

      {searchOpen && (

        <div className="header-search-panel">

          {/* SEARCH INPUT */}

          <div className="header-search-box">

            <svg
              className="header-search-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
              />

              <path
                d="M15.5 15.5L21 21"
              />
            </svg>


            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
              onKeyDown={
                handleSearchKeyDown
              }
              placeholder="SEARCH FOR..."
              className="header-search-input"
              autoComplete="off"
            />


            {/* CLOSE */}

            <button
              className="header-search-close"
              onClick={closeSearch}
              aria-label="Close Search"
            >
              ×
            </button>

          </div>


          {/* =================================================
              SEARCH RESULTS
          ================================================= */}

          {searchText.trim() !== "" && (

            <div className="header-search-results">

              {searchResults.length > 0 ? (

                searchResults.map(
                  (product) => (

                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="header-search-result"
                      onClick={closeSearch}
                    >

                      <div className="header-search-result-image">

                        <img
                          src={
                            product.images?.[0] ||
                            ""
                          }
                          alt={
                            product.name
                          }
                        />

                      </div>


                      <div className="header-search-result-info">

                        <span className="header-search-result-name">
                          {product.name}
                        </span>

                        <span className="header-search-result-category">
                          {product.category}
                        </span>

                        <span className="header-search-result-price">
                          ₹
                          {product.price?.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                    </Link>

                  )
                )

              ) : (

                <div className="header-no-results">
                  NO PRODUCTS FOUND
                </div>

              )}

            </div>

          )}


          {/* ================= POPULAR CATEGORIES ================= */}

          {searchText.trim() === "" && (

            <div className="header-popular-search">

              <span>
                POPULAR CATEGORIES
              </span>

              <div>

                {menuItems.map(
                  (item) => (

                    <Link
                      key={item.slug}
                      to={`/category/${item.slug}`}
                      onClick={closeSearch}
                    >
                      {item.name}
                    </Link>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      )}

    </header>
  );
}