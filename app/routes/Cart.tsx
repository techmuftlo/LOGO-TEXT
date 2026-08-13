import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import {
  FiX,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTruck,
  FiRefreshCcw,
  FiArrowRight,
  FiTrash2,
  FiTag,
  FiShield,
} from "react-icons/fi";

import "./Cart.css";


/* =====================================================
   CART TYPE
===================================================== */

export type CartItem = {
  cartId: string;

  productId: number;

  name: string;

  image: string;

  price: number;

  oldPrice?: number;

  color: string;

  size: string;

  quantity: number;
};


/* =====================================================
   STORAGE
===================================================== */

export const CART_STORAGE_KEY =
  "honky-tonky-cart";


/* =====================================================
   LOAD CART
===================================================== */

const getCartFromStorage = (): CartItem[] => {
  try {
    const saved =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
};


/* =====================================================
   SAVE CART
===================================================== */

const saveCartToStorage = (
  cart: CartItem[]
) => {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );

  /*
    Product page / Header / Cart ko update
    karne ke liye custom event.
  */

  window.dispatchEvent(
    new Event("cart-updated")
  );
};


/* =====================================================
   CART
===================================================== */

export default function Cart() {

  const navigate = useNavigate();


  /* =================================================
     STATE
  ================================================= */

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [couponCode, setCouponCode] =
    useState("");

  const [couponApplied, setCouponApplied] =
    useState(false);

  const [couponMessage, setCouponMessage] =
    useState("");

  const [orderPlaced, setOrderPlaced] =
    useState(false);


  /* =================================================
     LOAD
  ================================================= */

  useEffect(() => {

    const load = () => {
      setCart(
        getCartFromStorage()
      );
    };

    load();

    /*
      Same browser me agar Product page
      se cart change ho to update.
    */

    window.addEventListener(
      "cart-updated",
      load
    );

    window.addEventListener(
      "storage",
      load
    );

    return () => {

      window.removeEventListener(
        "cart-updated",
        load
      );

      window.removeEventListener(
        "storage",
        load
      );

    };

  }, []);


  /* =================================================
     CLOSE CART
  ================================================= */

  const closeCart = () => {

    /*
      Agar /cart route se open hai
      to previous page par wapas.
    */

    navigate(-1);

  };


  /* =================================================
     TOTAL ITEMS
  ================================================= */

  const totalItems = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }, [cart]);


  /* =================================================
     SUBTOTAL
  ================================================= */

  const subtotal = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

  }, [cart]);


  /* =================================================
     COUPON
  ================================================= */

  const discountAmount =
    couponApplied
      ? Math.round(
          subtotal * 0.05
        )
      : 0;


  /* =================================================
     SHIPPING
  ================================================= */

  const shipping =
    subtotal === 0 ||
    subtotal >= 999
      ? 0
      : 49;


  /* =================================================
     FINAL TOTAL
  ================================================= */

  const total =
    subtotal -
    discountAmount +
    shipping;


  /* =================================================
     UPDATE CART STORAGE
  ================================================= */

  const updateCart = (
    updatedCart: CartItem[]
  ) => {

    setCart(updatedCart);

    saveCartToStorage(
      updatedCart
    );

  };


  /* =================================================
     PLUS / MINUS
  ================================================= */

  const updateQuantity = (
    cartId: string,
    change: number
  ) => {

    const updated =
      cart.map((item) => {

        if (
          item.cartId !== cartId
        ) {
          return item;
        }

        const newQuantity =
          item.quantity + change;

        return {
          ...item,

          quantity:
            newQuantity < 1
              ? 1
              : newQuantity,
        };

      });

    updateCart(updated);

  };


  /* =================================================
     REMOVE
  ================================================= */

  const removeItem = (
    cartId: string
  ) => {

    const updated =
      cart.filter(
        (item) =>
          item.cartId !== cartId
      );

    updateCart(updated);

  };


  /* =================================================
     CLEAR
  ================================================= */

  const clearCart = () => {

    updateCart([]);

    setCouponApplied(false);

    setCouponCode("");

    setCouponMessage("");

  };


  /* =================================================
     APPLY COUPON
  ================================================= */

  const applyCoupon = () => {

    const code =
      couponCode
        .trim()
        .toUpperCase();

    if (
      code === "HONKY5" ||
      code === "SAVE5"
    ) {

      setCouponApplied(true);

      setCouponMessage(
        "5% discount applied successfully."
      );

      return;
    }

    setCouponApplied(false);

    setCouponMessage(
      "Invalid coupon code."
    );

  };


  /* =================================================
     BUY NOW
  ================================================= */

  const handleBuyNow = () => {

    if (!cart.length) {
      return;
    }

    setOrderPlaced(true);

  };


  /* =================================================
     CONTINUE SHOPPING
  ================================================= */

  const continueShopping = () => {

    navigate("/");

  };


  /* =================================================
     EMPTY CART
  ================================================= */

  if (cart.length === 0) {

    return (
      <div className="cart-drawer-overlay">

        <aside className="cart-drawer cart-drawer-empty">

          {/* CLOSE */}

          <button
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <FiX />
          </button>


          {/* HEADER */}

          <div className="cart-header">

            <h2>
              Cart
            </h2>

          </div>


          {/* EMPTY */}

          <div className="cart-empty">

            <div className="cart-empty-icon">
              <FiShoppingBag />
            </div>

            <h3>
              Your Cart Is Empty
            </h3>

            <p>
              Looks like you haven't
              added anything to your
              cart yet.
            </p>

            <button
              type="button"
              className="cart-shop-button"
              onClick={
                continueShopping
              }
            >
              CONTINUE SHOPPING

              <FiArrowRight />
            </button>

          </div>

        </aside>

      </div>
    );

  }


  /* =================================================
     MAIN
  ================================================= */

  return (

    <div
      className="cart-drawer-overlay"
      onClick={closeCart}
    >

      <aside
        className="cart-drawer"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="cart-header">

          <div>

            <h2>
              Cart
            </h2>

            <span>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </span>

          </div>


          <button
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <FiX />
          </button>

        </header>


        {/* =================================================
            ORDER BAR
        ================================================= */}

        <div className="cart-order-bar">

          <div className="cart-order-left">

            <FiTruck />

            <span>
              Order Now
            </span>

          </div>

          <strong>
            Order before 3 PM · Ships Today
          </strong>

        </div>


        {/* =================================================
            DELIVERY TRACKER
        ================================================= */}

        <div className="cart-tracker">

          <div className="cart-track-line"></div>


          <div className="cart-track-step active">

            <div className="cart-track-icon">
              <FiShoppingBag />
            </div>

            <strong>
              Purchased
            </strong>

            <span>
              Today
            </span>

          </div>


          <div className="cart-track-step">

            <div className="cart-track-icon">
              <FiRefreshCcw />
            </div>

            <strong>
              Processing
            </strong>

            <span>
              1–2 Days
            </span>

          </div>


          <div className="cart-track-step">

            <div className="cart-track-icon">
              <FiTruck />
            </div>

            <strong>
              Delivered
            </strong>

            <span>
              3–5 Days
            </span>

          </div>

        </div>


        {/* =================================================
            CART ITEMS
        ================================================= */}

        <div className="cart-scroll">

          <section className="cart-items">

            {cart.map((item) => (

              <article
                className="cart-item"
                key={item.cartId}
              >

                {/* IMAGE */}

                <Link
                  to={`/product/${item.productId}`}
                  className="cart-item-image"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </Link>


                {/* INFORMATION */}

                <div className="cart-item-info">

                  <Link
                    to={`/product/${item.productId}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>


                  <strong className="cart-item-price">

                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}

                  </strong>


                  <div className="cart-item-options">

                    {item.color && (
                      <span>
                        {item.color}
                      </span>
                    )}

                    {item.size && (
                      <span>
                        {item.size}
                      </span>
                    )}

                  </div>


                  {/* ACTIONS */}

                  <div className="cart-item-bottom">

                    <div className="cart-quantity">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            -1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>


                      <span>
                        {item.quantity}
                      </span>


                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>

                    </div>


                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() =>
                        removeItem(
                          item.cartId
                        )
                      }
                    >
                      <FiTrash2 />

                      Remove
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </section>


          {/* =================================================
              BENEFITS
          ================================================= */}

          <section className="cart-benefits">

            <div className="cart-benefit">

              <FiRefreshCcw />

              <strong>
                7 Days Easy Return
              </strong>

              <span>
                Easy return & exchange
              </span>

            </div>


            <div className="cart-benefit">

              <FiTruck />

              <strong>
                Free Shipping
              </strong>

              <span>
                On prepaid orders
              </span>

            </div>


            <div className="cart-benefit">

              <FiShield />

              <strong>
                Secure Shopping
              </strong>

              <span>
                Safe & secure checkout
              </span>

            </div>

          </section>


          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="cart-summary">

            <h3>
              Order Summary
            </h3>


            {/* COUPON */}

            <div className="cart-coupon">

              <label>
                <FiTag />

                Discount Code
              </label>


              <div className="coupon-input">

                <input
                  type="text"
                  value={couponCode}
                  onChange={(event) => {

                    setCouponCode(
                      event.target.value
                    );

                    setCouponMessage("");

                  }}
                  placeholder="Enter code"
                />


                <button
                  type="button"
                  onClick={applyCoupon}
                >
                  APPLY
                </button>

              </div>


              <small>
                Try HONKY5 for 5% OFF
              </small>


              {couponMessage && (

                <p
                  className={
                    couponApplied
                      ? "coupon-success"
                      : "coupon-error"
                  }
                >
                  {couponMessage}
                </p>

              )}

            </div>


            {/* PRICE */}

            <div className="cart-summary-lines">

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div>

                <span>
                  Shipping
                </span>

                <strong>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}
                </strong>

              </div>


              {couponApplied && (

                <div className="cart-discount-row">

                  <span>
                    Discount
                  </span>

                  <strong>
                    -₹
                    {discountAmount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              )}

            </div>


            {/* TOTAL */}

            <div className="cart-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            {/* BUY */}

            <button
              type="button"
              className="cart-buy-button"
              onClick={handleBuyNow}
            >
              BUY NOW

              <FiArrowRight />

            </button>


            {/* CONTINUE */}

            <button
              type="button"
              className="cart-continue"
              onClick={
                continueShopping
              }
            >
              CONTINUE SHOPPING
            </button>


            {/* PAYMENT */}

            <div className="cart-payment-note">

              <FiShield />

              <div>

                <strong>
                  Secure checkout
                </strong>

                <span>
                  Your payment information
                  is protected.
                </span>

              </div>

            </div>


            {/* CLEAR */}

            <button
              type="button"
              className="cart-clear"
              onClick={clearCart}
            >
              CLEAR CART
            </button>

          </section>

        </div>


        {/* =================================================
            SUCCESS
        ================================================= */}

        {orderPlaced && (

          <div
            className="cart-success-overlay"
            onClick={() =>
              setOrderPlaced(false)
            }
          >

            <div
              className="cart-success"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                type="button"
                className="cart-success-close"
                onClick={() =>
                  setOrderPlaced(false)
                }
              >
                <FiX />
              </button>


              <div className="cart-success-icon">
                ✓
              </div>


              <h3>
                Order Ready
              </h3>


              <p>
                Your order has been
                prepared successfully.
              </p>


              <strong>
                Total: ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>


              <button
                type="button"
                onClick={() => {
                  setOrderPlaced(false);
                  navigate("/");
                }}
              >
                CONTINUE
              </button>

            </div>

          </div>

        )}

      </aside>

    </div>

  );

}