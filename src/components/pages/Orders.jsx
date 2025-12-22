import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import OrderCard from "../../components/orders/OrderCard";
import Loader from "../../components/Loader";
import LoginModal from "../../components/auth/LoginModal";
import "./Orders.css";

const TABS = {
  RUNNING: "running",
  HISTORY: "history",
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState(TABS.RUNNING);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url =
        activeTab === TABS.RUNNING
          ? "/api/v1/customer/order/running-orders"
          : "/api/v1/customer/order/list";

      const { data } = await api.get(url);
      setOrders(data?.orders || []);
    } catch (error) {
      if (error?.response?.status === 401) {
        setShowLogin(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {/* Tabs */}
      <div className="orders-tabs">
        <button
          className={activeTab === TABS.RUNNING ? "active" : ""}
          onClick={() => setActiveTab(TABS.RUNNING)}
        >
          Running Orders
        </button>
        <button
          className={activeTab === TABS.HISTORY ? "active" : ""}
          onClick={() => setActiveTab(TABS.HISTORY)}
        >
          Order History
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className="empty-text">No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
