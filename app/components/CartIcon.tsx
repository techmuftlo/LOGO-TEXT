import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiShoppingBag } from "react-icons/fi";

const CART_STORAGE_KEY = "honky-tonky-cart";

type CartItem = {
  quantity?: number;
};

const getCartCount = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);

    if (!saved) {
      return 0;
    }

    const cart: CartItem[] = JSON.parse(saved);

    if (!Array.isArray(cart)) {
      return 0;
    }

    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  } catch {
    return 0;
  }
};

export default function CartIcon() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    const updateCount = () => {
      setCount(getCartCount());
    };

    // Initial
    updateCount();

    // Product page se cart add hone par
    window.addEventListener(
      "cart-updated",
      updateCount
    );

    // Dusre tab/window se cart update
    window.addEventListener(
      "storage",
      updateCount
    );

    return () => {

      window.removeEventListener(
        "cart-updated",
        updateCount
      );

      window.removeEventListener(
        "storage",
        updateCount
      );

    };

  }, []);

  return (
    <Link
      to="/cart"
      className="header-cart-icon"
      aria-label={`Cart ${count} items`}
    >

      <FiShoppingBag />

      {count > 0 && (
        <span className="header-cart-count">
          {count > 99 ? "99+" : count}
        </span>
      )}

    </Link>
  );
}