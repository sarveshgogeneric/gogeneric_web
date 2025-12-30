import { Info, FileText } from "lucide-react";
import "./BillDetails.css";

export default function BillDetails({ bill, deliveryType }) {
  return (
    <>
      <div className="bill-card">
        <div className="bill-header">
          <p className="bill-title">Bill Details</p>
          <Info size={16} className="bill-info" />
        </div>

        <div className="bill-row">
          <span>Item Total</span>
          <span>₹{bill.itemTotal}</span>
        </div>

        {/* ✅ Delivery Fee only for delivery */}
        {deliveryType === "delivery" && (
          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>
              {bill.deliveryCharge === 0
                ? "Free"
                : `₹${bill.deliveryCharge}`}
            </span>
          </div>
        )}

        <div className="bill-row">
          <span>Platform Fee</span>
          <span>₹{bill.platformFee}</span>
        </div>

        {bill.discount > 0 && (
          <div className="bill-row discount">
            <span>Promo Discount</span>
            <span>-₹{bill.discount}</span>
          </div>
        )}

        <div className="bill-row">
          <span>Taxes & Charges</span>
          <span>₹{bill.tax}</span>
        </div>

        <div className="bill-divider" />

        <div className="bill-row total">
          <span>To Pay</span>
          <span>₹{bill.toPay}</span>
        </div>
      </div>

      {/* NOTE */}
      <div className="note-card">
        <div className="note-header">
          <FileText size={16} />
          <p>Additional Note</p>
        </div>

        <textarea
          className="note-input"
          placeholder="Any instructions for delivery partner or store?"
        />
      </div>
    </>
  );
}
