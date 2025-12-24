import { X, CheckCircle } from "lucide-react";
import "./PaymentModal.css";

const options = [
  {
    id: "cod",
    title: "Cash on Delivery",
    desc: "Pay when order arrives",
  },
  {
    id: "wallet",
    title: "Wallet",
    desc: "Use wallet balance",
  },
  {
    id: "digital",
    title: "Digital Payment",
    desc: "UPI, Cards, Net Banking",
  },
];

export default function PaymentModal({ selected, onSelect, onClose }) {
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h4>Select Payment Method</h4>
          <X onClick={onClose} />
        </div>

        <div className="payment-modal-body">
          {options.map((o) => (
            <div
              key={o.id}
              className={`payment-row ${selected === o.id ? "active" : ""}`}
              onClick={() => onSelect(o.id)}
            >
              <div>
                <p className="title">{o.title}</p>
                <p className="desc">{o.desc}</p>
              </div>

              {selected === o.id && (
                <CheckCircle size={18} className="check" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
