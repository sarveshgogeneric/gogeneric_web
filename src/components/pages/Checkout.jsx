import { useEffect, useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

import DeliveryType from "../../components/checkout/Deliverytype";
import DeliveryPreference from "../../components/checkout/DelieveryPrefrence";
import AddressSection from "../../components/checkout/AddressSection";
import PromoCode from "../checkout/_PromoCode";
import TipsSection from "../../components/checkout/TipsSection";
import BillDetails from "../../components/checkout/BillDetails";
import AddressModal from "../../components/checkout/AddressModal";
import PaymentModal from "../../components/checkout/PaymentModal";
import OrderSuccessModal from "../../components/checkout/OrderSuccessModal";

export default function Checkout() {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [deliveryTime, setDeliveryTime] = useState("ASAP");

  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  /* ---------------- FETCH CART ---------------- */
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest_id");

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
      console.error("❌ Fetch cart failed:", err);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
    window.addEventListener("cart-updated", fetchCart);
    return () => window.removeEventListener("cart-updated", fetchCart);
  }, []);

  /* ---------------- BILL ---------------- */
  const bill = {
    totalAmount: cart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    ),
  };

  /* ---------------- ADDRESS ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("selected_address");
    if (saved) setSelectedAddress(JSON.parse(saved));
  }, []);

  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr);
    localStorage.setItem("selected_address", JSON.stringify(addr));
    setShowAddressModal(false);
  };

  /* ---------------- PLACE ORDER ---------------- */
  const handlePlaceOrder = async () => {
    if (!selectedAddress || !cart.length) {
      alert("⚠️ Missing address or cart");
      return;
    }

    const token = localStorage.getItem("token");
    const guestId = localStorage.getItem("guest_id");
    const storeId = cart[0]?.item?.store_id;

    // 🔥 BASE PAYLOAD (same for all)
    const payload = {
      order_amount: bill.totalAmount,
      payment_method: "cash_on_delivery",
      order_type: "delivery",
      store_id: storeId,
      distance: Number(selectedAddress.distance) || 1,
      latitude: Number(selectedAddress.latitude) || 28.6139,
      longitude: Number(selectedAddress.longitude) || 77.209,
      address: selectedAddress.address,
      delivery_time_preference: deliveryTime,
      contact_person_name:
        selectedAddress.contact_person_name || "Customer",
      contact_person_number: selectedAddress.phone,
    };

    // ✅ IMPORTANT FIX
    // guest_id ONLY for guest users
    if (!token && guestId) {
      payload.guest_id = guestId;
    }

    try {
      const res = await api.post("/api/v1/customer/order/place", payload, {
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: "2",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setOrderId(res.data?.order_id);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("❌ Order failed", err);
      alert("Order failed");
    }
  };

  if (loadingCart) return <div>Loading checkout...</div>;

  return (
    <div className="checkout-page max-w-7xl mx-auto">
      <header className="checkout-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>Checkout</h3>
      </header>

      <DeliveryType />

      <DeliveryPreference
        value={deliveryTime}
        onChange={setDeliveryTime}
      />

      <AddressSection
        address={selectedAddress}
        onChange={() => setShowAddressModal(true)}
        onAddNew={() => navigate("/add-address")}
      />

      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onSelect={handleAddressSelect}
        />
      )}

      <PromoCode />
      <TipsSection />
      <BillDetails bill={bill} />

      <div className="checkout-footer">
        <button
          className="pay-using-btn"
          onClick={() => setShowPaymentModal(true)}
        >
          Pay Using • {paymentMethod}
        </button>

        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={!selectedAddress || !cart.length}
        >
          Place Order
        </button>
      </div>

      {showPaymentModal && (
        <PaymentModal
          selected={paymentMethod}
          onSelect={(m) => {
            setPaymentMethod(m);
            setShowPaymentModal(false);
          }}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {showSuccess && (
        <OrderSuccessModal
          orderId={orderId}
          onClose={() => navigate("/")}
        />
      )}
    </div>
  );
}
