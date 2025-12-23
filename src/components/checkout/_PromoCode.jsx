import { Tag, Gift } from "lucide-react";
import "./PromoCode.css";

export default function PromoCode() {
  return (
    <div className="promo-wrapper">

      {/* PROMO CODE */}
      <div className="promo-card">
        <div className="promo-left">
          <div className="promo-icon">
            <Tag size={18} />
          </div>
          <div>
            <p className="promo-title">Apply Promo Code</p>
            <p className="promo-subtitle">
              Save more with available offers
            </p>
          </div>
        </div>

        <button className="promo-apply-btn">Apply</button>
      </div>

      {/* ADD VOUCHER */}
      <div className="voucher-card">
        <div className="promo-left">
          <div className="voucher-icon">
            <Gift size={18} />
          </div>
          <div>
            <p className="promo-title">Add Voucher</p>
            <p className="promo-subtitle">
              Use gift card or voucher
            </p>
          </div>
        </div>

        <button className="voucher-btn">Add</button>
      </div>

    </div>
  );
}
