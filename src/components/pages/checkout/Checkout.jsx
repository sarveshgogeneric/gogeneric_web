import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import "./Checkout.css";

// Components
import CartItems from "./CartItems";
import BillSummary from "./BillSummary";
import DeliveryType from "./DeliveryType";
import AddressSection from "./AddressSection";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);


  // 🔥 Delivery Type (persisted)
  const [deliveryType, setDeliveryType] = useState(
    localStorage.getItem("delivery_type") || "delivery"
  );

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const guestId = localStorage.getItem("guest_id");

  // ---------------- FETCH CART ----------------
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

      const items = res.data || [];
      setCartItems(items);

      // 🔁 Empty cart → back to cart page
      if (items.length === 0) {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Checkout cart fetch error", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELIVERY TYPE ----------------
  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
    localStorage.setItem("delivery_type", type);
  };

  // ---------------- PLACE ORDER ----------------
  const handlePlaceOrder = async () => {
    if (!deliveryType) {
      toast.error("Please select delivery type");
      return;
    }

    try {
      setPlacingOrder(true);

      const payload = {
        delivery_type: deliveryType, // 🔥 IMPORTANT
        payment_method: "cod", // example
        ...(deliveryType === "delivery"
          ? { address_id: 1 } // 🔴 replace later with selected address
          : {}),
      };

      const res = await api.post(
        "/api/v1/customer/order/place",
        payload,
        {
          headers: {
            zoneId: JSON.stringify([3]),
            moduleId: "2",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully 🎉");

      // cleanup
      localStorage.removeItem("delivery_type");

      navigate(`/order-success/${res.data?.order_id || ""}`);
    } catch (error) {
      console.error("Order placement failed", error);
      toast.error("Order placement failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading checkout...</p>;
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-layout">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          <CartItems cartItems={cartItems} />

          <DeliveryType
            value={deliveryType}
            onChange={handleDeliveryTypeChange}
          />
<AddressSection
  deliveryType={deliveryType}
  onSelect={(id) => setSelectedAddressId(id)}
/>


        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <BillSummary
            cartItems={cartItems}
            deliveryType={deliveryType}
          />
        </div>
      </div>

      {/* PLACE ORDER */}
      <button
        className="place-order-btn"
        disabled={placingOrder}
        onClick={handlePlaceOrder}
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
