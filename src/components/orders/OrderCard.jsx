import { useNavigate } from "react-router-dom";
import "./OrderCard.css";

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <div
      className="order-card"
      onClick={() => navigate(`/orders/${order.id}`)}
    >
      <div className="order-header">
        <span>Order #{order.id}</span>
        <span className={`status ${order.status}`}>
          {order.status}
        </span>
      </div>

      <div className="order-body">
        <p>{order.store_name}</p>
        <p>{order.item_count} items</p>
        <p>₹{order.order_amount}</p>
      </div>

      <div className="order-footer">
        <span>{order.created_at}</span>
        <span className="view-details">View Details →</span>
      </div>
    </div>
  );
}
