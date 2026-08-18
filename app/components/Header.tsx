import { useEffect, useState } from "react";
import { Link } from "react-router";
import { products } from "../data/products";
import "./Header.css";

const CART_STORAGE_KEY = "honky-tonky-cart";

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

type CartItem = {
  cartId?: string;
  productId?: number | string;
  quantity?: number;
};

export default function Header({
  mobileOpen,
  setMobileOpen,
}: HeaderProps) {
  /* =====================================================
     SEARCH STATE
  ===================================================== */

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchText, setSearchText] =
    useState("");

  /* =====================================================
     CART COUNT
  ===================================================== */

  const [cartCount, setCartCount] =
    useState(0);

  /* =====================================================
     UPDATE CART COUNT
  ===================================================== */

  const updateCartCount = () => {
    try {
      const savedCart =
        localStorage.getItem(
          CART_STORAGE_KEY
        );

      if (!savedCart) {
        setCartCount(0);
        return;
      }

      const parsed: CartItem[] =
        JSON.parse(savedCart);

      if (!Array.isArray(parsed)) {
        setCartCount(0);
        return;
      }

      const totalQuantity =
        parsed.reduce(
          (total, item) => {
            const quantity = Number(
              item?.quantity ?? 0
            );

            if (
              !Number.isFinite(quantity) ||
              quantity < 0
            ) {
              return total;
            }

            return total + quantity;
          },
          0
        );

      setCartCount(totalQuantity);
    } catch (error) {
      console.error(
        "Cart count error:",
        error
      );

      setCartCount(0);
    }
  };

  /* =====================================================
     CART LISTENERS
  ===================================================== */

  useEffect(() => {
    updateCartCount();

    const handleCartUpdate = () => {
      updateCartCount();
    };

    const handleStorage = (
      event: StorageEvent
    ) => {
      if (
        event.key === CART_STORAGE_KEY
      ) {
        updateCartCount();
      }
    };

    window.addEventListener(
      "cart-updated",
      handleCartUpdate
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    /*
      Safety refresh.
      Isse agar Product page se event miss ho
      jaye to cart count phir bhi update ho jayega.
    */
    const interval = window.setInterval(
      updateCartCount,
      500
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );

      window.clearInterval(interval);
    };
  }, []);

  /* =====================================================
     SEARCH RESULTS
  ===================================================== */

  const searchResults =
    searchText.trim().length > 0
      ? products
          .filter((product) => {
            const search =
              searchText
                .toLowerCase()
                .trim();

            const name =
              product.name
                ?.toLowerCase() || "";

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

  /* =====================================================
     PRODUCT URL
  ===================================================== */

  const getProductUrl = (
    product: {
      id: number;
      slug?: string;
    }
  ) => {
    if (
      product.slug &&
      product.slug.trim() !== ""
    ) {
      return `/product/${product.slug}`;
    }

    return `/product/${product.id}`;
  };

  /* =====================================================
     OPEN SEARCH
  ===================================================== */

  const openSearch = () => {
    setSearchOpen(true);

    setTimeout(() => {
      const input =
        document.querySelector<HTMLInputElement>(
          ".header-search-input"
        );

      input?.focus();
    }, 50);
  };

  /* =====================================================
     CLOSE SEARCH
  ===================================================== */

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchText("");
  };

  /* =====================================================
     SEARCH KEYBOARD
  ===================================================== */

  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Escape") {
      closeSearch();
      return;
    }

    if (
      e.key === "Enter" &&
      searchResults.length > 0
    ) {
      const product =
        searchResults[0];

      window.location.href =
        getProductUrl(product);
    }
  };

  /* =====================================================
     MOBILE MENU CLOSE
  ===================================================== */

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
  };

  /* =====================================================
     CART BADGE
  ===================================================== */

  const cartBadge =
    cartCount > 99
      ? "99+"
      : String(cartCount);

  return (
    <header className="site-header">
      {/* =================================================
          HEADER INNER
      ================================================= */}

      <div className="header-inner">

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className={`mobile-menu-btn ${
            mobileOpen ? "active" : ""
          }`}
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          aria-label={
            mobileOpen
              ? "Close Menu"
              : "Open Menu"
          }
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="brand-logo"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          <span className="brand-name">
            LOGO
          </span>

          <span className="brand-line"></span>

          <span className="brand-tagline">
            TEXT....
          </span>
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

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

              <path d="M4.5 20C5.2 15.8 7.8 13.5 12 13.5C16.2 13.5 18.8 15.8 19.5 20" />
            </svg>
          </Link>

          {/* SEARCH */}

          <button
            type="button"
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
            className="header-icon cart-header-icon"
            aria-label={`Shopping Bag${
              cartCount > 0
                ? `, ${cartCount} items`
                : ""
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M5 8.5H19L20 21H4L5 8.5Z" />

              <path d="M8 8.5V6.5C8 4.57 9.79 3 12 3C14.21 3 16 4.57 16 6.5V8.5" />
            </svg>

            {cartCount > 0 && (
              <span className="cart-count-badge">
                {cartBadge}
              </span>
            )}
          </Link>
        </div>

        {/* =================================================
            MOBILE ACTIONS
        ================================================= */}

        <div className="mobile-header-actions">

          {/* MOBILE SEARCH */}

          <button
            type="button"
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
            className="mobile-header-icon cart-header-icon"
            aria-label={`Shopping Bag${
              cartCount > 0
                ? `, ${cartCount} items`
                : ""
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M5 8.5H19L20 21H4L5 8.5Z" />

              <path d="M8 8.5V6.5C8 4.57 9.79 3 12 3C14.21 3 16 4.57 16 6.5V8.5" />
            </svg>

            {cartCount > 0 && (
              <span className="cart-count-badge">
                {cartBadge}
              </span>
            )}
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
            onClick={
              handleMobileLinkClick
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

          {/* SEARCH BOX */}

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

              <path d="M15.5 15.5L21 21" />
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

            <button
              type="button"
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
                      to={getProductUrl(
                        product
                      )}
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
                            product.name ||
                            "Product"
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
                          {Number(
                            product.price || 0
                          ).toLocaleString(
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

          {/* =================================================
              POPULAR CATEGORIES
          ================================================= */}

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