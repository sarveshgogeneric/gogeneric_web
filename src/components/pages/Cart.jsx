import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Minus, Plus, Trash2 } from "lucide-react";
import "./Cart.css";
import { cleanImageUrl } from "../../utils";
import LoginModal from "../auth/LoginModal";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAddMoreItems = () => {
    navigate("/"); // or "/categories"
  };

  const handleCheckout = () => {
    if (!token) {
      setShowLogin(true);
    } else {
      window.location.href = "/checkout";
    }
  };
  let guestId = localStorage.getItem("guest_id");
  if (!token && !guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guest_id", guestId);
  }
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/api/v1/customer/cart/list", {
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: "2",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        params: !token ? { guest_id: guestId } : {},
      });

      setCart(res.data || []);
    } catch (err) {
      console.error("Cart fetch error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (item, qty) => {
    if (qty < 1) return;

    try {
      await api.post(
        "/api/v1/customer/cart/update",
        {
          cart_id: item.id,
          price: item.price,
          quantity: qty,
          ...(token ? {} : { guest_id: guestId }),
        },
        {
          headers: {
            zoneId: JSON.stringify([3]),
            moduleId: "2",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Update error:", err?.response?.data);
    }
  };
  const removeItem = async (item) => {
    setCart((prev) => prev.filter((c) => c.id !== item.id));

    try {
      await api.delete("/api/v1/customer/cart/remove-item", {
        data: {
          cart_id: item.id,
          ...(token ? {} : { guest_id: guestId }),
        },
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: "2",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Remove error:", err?.response?.data || err.message);
      fetchCart();
    }
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  if (loading) return <p className="cart-loading">Loading cart...</p>;

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((c) => (
              <div key={c.id} className="cart-item">
                <img
                  src={cleanImageUrl(c.item?.image_full_url || c.item?.image)}
                  alt={c.item?.name}
                  className="cart-img"
                  onError={(e) => {
                    e.currentTarget.src = "/no-image.png";
                  }}
                />

                <div className="item-info">
                  <h4>{c.item?.name}</h4>
                  <p>₹{c.price}</p>
                </div>

                <div className="qty-control">
                  <button onClick={() => updateQty(c, c.quantity - 1)}>
                    <Minus size={16} />
                  </button>
                  <span>{c.quantity}</span>
                  <button onClick={() => updateQty(c, c.quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>

                <div className="item-total">₹{c.price * c.quantity}</div>

                <Trash2 className="delete" onClick={() => removeItem(c)} />
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Confirm Delivery Details
            </button>
          </div>
          {showLogin && (
            <LoginModal
              onClose={() => {
                setShowLogin(false);
                fetchCart();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
