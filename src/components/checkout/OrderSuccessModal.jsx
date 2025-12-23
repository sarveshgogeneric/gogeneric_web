import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
import { useEffect } from "react";
import "./OrderSuccessModal.css";

export default function OrderSuccessModal({ orderId, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-overlay">
      <Confetti numberOfPieces={180} recycle={false} />

      <div className="success-modal">
        <CheckCircle size={70} className="success-icon" />

        <h2>Order Placed!</h2>
        <p>Your order has been placed successfully.</p>

        <div className="order-id">
          Order ID: <strong>#{orderId}</strong>
        </div>
      </div>
    </div>
  );
}
