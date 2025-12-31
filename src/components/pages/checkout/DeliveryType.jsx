import "./DeliveryType.css";

export default function DeliveryType({ value, onChange }) {
  return (
    <div className="delivery-type-card">
      <h4 className="section-title">Delivery Type</h4>

      <div className="delivery-options">
        <button
          className={`delivery-option ${
            value === "delivery" ? "active" : ""
          }`}
          onClick={() => onChange("delivery")}
        >
          🚚 Home Delivery
        </button>

        <button
          className={`delivery-option ${
            value === "take_away" ? "active" : ""
          }`}
          onClick={() => onChange("take_away")}
        >
          🏪 Take Away
        </button>
      </div>
    </div>
  );
}
