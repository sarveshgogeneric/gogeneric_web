import { MapPin, Plus } from "lucide-react";
import "./AddressSection.css";

export default function AddressSection({
  address,
  onChange,
  onAddNew,
}) {
  return (
    <div className="address-card">

      {/* HEADER */}
      <div className="address-header">
        <h4>Deliver To</h4>

        <button
          className="change-btn"
          onClick={onChange}
        >
          Change
        </button>
      </div>

      {/* SELECTED ADDRESS */}
      {address && (
        <div
          className="address-box"
          onClick={onChange}
        >
          <MapPin size={18} className="address-icon" />

          <div className="address-info">
            <p className="address-title">
              {address.label || "Selected Address"}
            </p>

            <p className="address-text">
              {address.address}
            </p>
          </div>
        </div>
      )}

      {/* ADD NEW ADDRESS */}
      <button
        className="add-address-btn"
        onClick={onAddNew}
      >
        <Plus size={16} />
        Add New Address
      </button>
    </div>
  );
}
