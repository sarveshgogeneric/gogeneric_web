import { useState } from "react";
import api from "../../api/axiosInstance";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import "./CancelOrder.css";

export default function CancelOrder({ order, onClose, onSuccess }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancelOrder = async () => {
    if (!reason.trim()) {
      toast.error("Please provide cancellation reason");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest_id");

      await api.put(
        "/api/v1/customer/order/cancel",
        {
          order_id: order.id,
          reason,
          ...(token ? {} : { guest_id: guestId }),
        },
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      toast.success("Order cancelled successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("❌ Cancel order failed:", error);

      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          "You cannot cancel this order now"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cancel-modal-backdrop" onClick={onClose}>
      <div
        className="cancel-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="cancel-modal-header">
          <h3>Cancel Order #{order.id}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <textarea
          placeholder="Please tell us why you want to cancel this order..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
        />

        {/* FOOTER */}
        <div className="modal-actions">

          <button
            className="danger"
            onClick={handleCancelOrder}
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Cancel Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
