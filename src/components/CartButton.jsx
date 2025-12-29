import { ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart } from "../utils/cartHelper";
import { useRef } from "react";
import "./CartButton.css";

export default function AddToCartButton({ item }) {
  const navigate = useNavigate();
  const location = useLocation();
  const btnRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    if (btnRef.current) {
      btnRef.current.classList.add("clicked");
      setTimeout(() => {
        if (btnRef.current) {
          btnRef.current.classList.remove("clicked");
        }
      }, 200);
    }

    addToCart({
      item,
      navigate,
      location,
    });
  };

  return (
    <button
      ref={btnRef}
      className="premium-add-btn"
      aria-label="Add to cart"
      onClick={handleClick}
    >
      <div className="btn-icon-wrapper">
        <ShoppingBag size={18} strokeWidth={2.5} />
      </div>
      <span className="btn-tooltip">Add</span>
    </button>
  );
}
