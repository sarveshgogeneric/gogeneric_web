import { Heart } from "lucide-react";
import { useState } from "react";
import "./TipsSection.css";

export default function TipsSection() {
  const [selectedTip, setSelectedTip] = useState(null);

  const tips = [10, 20, 30, 50];

  return (
    <div className="tips-card">
      <div className="tips-header">
        <div className="tips-icon">
          <Heart size={18} />
        </div>
        <div>
          <p className="tips-title">Delivery Partner Tip</p>
          <p className="tips-subtitle">
            Thank your delivery partner for their service
          </p>
        </div>
      </div>

      <div className="tips-options">
        {tips.map((amount) => (
          <button
            key={amount}
            className={`tip-btn ${selectedTip === amount ? "active" : ""}`}
            onClick={() => setSelectedTip(amount)}
          >
            ₹{amount}
          </button>
        ))}

        <button className="tip-btn custom">Custom</button>
      </div>
    </div>
  );
}
