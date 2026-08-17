import { NavLink } from "react-router";
import "./MobileBottomNav.css";

type MobileBottomNavProps = {
  openCategoryMenu: () => void;
};

export default function MobileBottomNav({
  openCategoryMenu,
}: MobileBottomNavProps) {
  return (
    <nav className="mobile-bottom-nav">

      <div className="mobile-bottom-inner">

        {/* ================= HOME ================= */}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `mobile-bottom-item ${
              isActive ? "active" : ""
            }`
          }
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M3.5 10.5L12 3.5L20.5 10.5V20.5H3.5V10.5Z" />

            <path d="M9 20.5V14H15V20.5" />
          </svg>

          <span>Home</span>
        </NavLink>


        {/* ================= CATEGORY ================= */}

       <button
  type="button"
  className="mobile-bottom-item mobile-category-button"
  onClick={openCategoryMenu}
  aria-label="Open Category Menu"
>
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="4"
              y="4"
              width="6"
              height="6"
              rx="1"
            />

            <rect
              x="14"
              y="4"
              width="6"
              height="6"
              rx="1"
            />

            <rect
              x="4"
              y="14"
              width="6"
              height="6"
              rx="1"
            />

            <rect
              x="14"
              y="14"
              width="6"
              height="6"
              rx="1"
            />
          </svg>

          <span>Category</span>
        </button>


        {/* ================= SEARCH ================= */}

<button
  type="button"
  className="mobile-bottom-search"
  onClick={() => {
    const searchBtn = document.querySelector(
      '.mobile-header-icon[aria-label="Search"]'
    ) as HTMLButtonElement;

    searchBtn?.click();
  }}
>
  <span className="mobile-search-circle">
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15L20.5 20.5" />
    </svg>
  </span>

  <span className="mobile-search-label">
    Search
  </span>
</button>


        {/* ================= CART ================= */}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `mobile-bottom-item ${
              isActive ? "active" : ""
            }`
          }
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M4 8H20L19 20H5L4 8Z" />

            <path
              d="M8 8V6.5C8 4.57 9.79 3 12 3C14.21 3 16 4.57 16 6.5V8"
            />
          </svg>

          <span>Cart</span>
        </NavLink>


        {/* ================= REVIEWS ================= */}

        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `mobile-bottom-item ${
              isActive ? "active" : ""
            }`
          }
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 3.5L14.65 8.85L20.55 9.7L16.25 13.85L17.25 19.7L12 16.95L6.75 19.7L7.75 13.85L3.45 9.7L9.35 8.85L12 3.5Z"
            />
          </svg>

          <span>Reviews</span>
        </NavLink>

      </div>

    </nav>
  );
}