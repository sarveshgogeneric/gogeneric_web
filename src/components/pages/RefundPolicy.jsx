import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import "./RefundPolicy.css";

export default function RefundPolicy() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRefundPolicy();
  }, []);

  const fetchRefundPolicy = async () => {
    try {
      const res = await api.get("/api/v1/refund-policy", {
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: 2,
        },
      });

      // console.log("REFUND POLICY HTML 👉", res.data);
      setContent(res.data); // 🔥 IMPORTANT
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Refund Policy");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Refund Policy..." />;

  return (
    <div className="refund-page">
      <h1 className="refund-title">Refund Policy</h1>

      {content ? (
        <div
          className="refund-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}
