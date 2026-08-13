import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* ================= NEWSLETTER ================= */}

        <div className="footer-column footer-newsletter">

          <h3>
            NEWSLETTER
          </h3>

          <p>
            Sign up to our newsletter to receive exclusive
            offers.
          </p>

          <form className="newsletter-form">

            <input
              type="email"
              placeholder="E-mail"
              aria-label="Email"
            />

            <button type="submit">
              SUBSCRIBE
            </button>

          </form>


          {/* INSTAGRAM */}

          <a
            href="#"
            className="footer-instagram"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
              />

              <circle
                cx="12"
                cy="12"
                r="4"
              />

              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>

        </div>


        {/* ================= ABOUT US ================= */}

        <div className="footer-column">

          <h3>
            ABOUT US
          </h3>

          <a href="#">
            About Us
          </a>

          <a href="#">
            Contact Us
          </a>

        </div>


        {/* ================= POLICY ================= */}

        <div className="footer-column">

          <h3>
            OUR POLICY
          </h3>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Return & Exchange policy
          </a>

          <a href="#">
            Shipping Policy
          </a>

          <a href="#">
            Terms & Conditions
          </a>

          <a href="#">
            Cancellation
          </a>

        </div>


        {/* ================= ABOUT ================= */}

        <div className="footer-column footer-about">

          <h3>
            ABOUT
          </h3>

          <p>
            Welcome to LOGO – where fashion meets
            your vibe and empowers your style game! We're
            not just a fashion brand; we're a movement, a
            squad, and a celebration of every young
            woman's distinctive style.
          </p>

          <p>
            LOGO is Entity of SHIVAY STYLE.
          </p>

        </div>

      </div>


      {/* ================= BOTTOM ================= */}

      <div className="footer-bottom">

        <p>
          © 2026 - LOGO | Designed & Developed by <a href="https://muftlo.com" target="_blank" rel="noopener noreferrer">Muftlo</a>
        </p>

      </div>

    </footer>
  );
}