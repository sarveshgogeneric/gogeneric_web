import "./Deliverytype.css";

export default function DeliveryType({ value, onChange }) {
  return (
    <div className="delivery-type-card">
      <h4 className="section-title">Delivery Type</h4>

      <div className="delivery-options">
        <button
          className={`delivery-option ${value === "delivery" ? "active" : ""}`}
          onClick={() => onChange("delivery")}
        >
          <div className="radio" />
          <div>
            <p>Home Delivery</p>
            <span>Charge: ₹50</span>
          </div>
        </button>

        <button
          className={`delivery-option ${
            value === "take_away" ? "active" : ""
          }`}
          onClick={() => onChange("take_away")}
        >
          <div className="radio" />
          <div>
            <p>Take Away</p>
            <span>Free</span>
          </div>
        </button>
      </div>
    </div>
  );
}
