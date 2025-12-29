import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import "./Terms.css";

export default function Terms() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const res = await api.get("/api/v1/terms-and-conditions", {
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: 2,
        },
      });
      console.log("Terms data", res.data);
      // Content ko set karte waqt hum ensure karenge ki ye string hai
      setContent(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Terms & Conditions");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Helper function to clean the API content.
   * 1. Yeh "----" jaise bikhre hue dashes ko elegant <hr> lines mein badal deta hai.
   * 2. Extra empty lines ko trim karta hai.
   */
  const getFormattedContent = (rawHtml) => {
    if (!rawHtml) return "";
    
    // Regex: 3 ya usse zyada dashes (---) ko <hr class="divider-line"> se replace karega
    let processed = rawHtml.replace(/[-]{3,}/g, '<hr class="divider-line" />');
    
    // Regex: Same logic underscores (___) ke liye agar API mein wo bhi aa rahe ho
    processed = processed.replace(/[_]{3,}/g, '<hr class="divider-line" />');
    
    return processed;
  };

  if (loading) return <Loader text="Loading Terms & Conditions..." />;

  return (
    <div className="terms-page">
      <header className="terms-header">
        <h1 className="terms-title">Terms & Conditions</h1>
        <p className="terms-subtitle">Please read our legal policy carefully</p>
      </header>

      {content ? (
        <div className="terms-card">
          <div
            className="terms-content"
            dangerouslySetInnerHTML={{ __html: getFormattedContent(content) }}
          />
        </div>
      ) : (
        <div className="empty-terms">
          <p>No terms and conditions have been published yet.</p>
        </div>
      )}
    </div>
  );
}