import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAddress.css";

export default function AddAddress() {
  const navigate = useNavigate();

  const [label, setLabel] = useState("Home");
  const [form, setForm] = useState({
    house: "",
    street: "",
    landmark: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!form.house || !form.street || !form.city) {
      alert("Please fill required fields");
      return;
    }

    const fullAddress = `${form.house}, ${form.street}, ${
      form.landmark ? form.landmark + ", " : ""
    }${form.city} - ${form.pincode}`;

    const newAddress = {
      id: Date.now(),
      label,
      address: fullAddress,
    };

    // 🔹 Get existing addresses
    const saved =
      JSON.parse(localStorage.getItem("address_list")) || [];

    // 🔹 Add new one
    const updatedList = [...saved, newAddress];

    // 🔹 Save list + select this address
    localStorage.setItem(
      "address_list",
      JSON.stringify(updatedList)
    );
    localStorage.setItem(
      "selected_address",
      JSON.stringify(newAddress)
    );
    localStorage.setItem("userLocation", fullAddress);

    // 🔁 Go back to checkout
    navigate("/checkout");
  };

  return (
    <div className="add-address-page">

      {/* HEADER */}
      <header className="add-address-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>Add New Address</h3>
      </header>

      {/* FORM */}
      <div className="add-address-form">

        <label>Save As</label>
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        >
          <option>Home</option>
          <option>Office</option>
          <option>Other</option>
        </select>

        <input
          name="house"
          placeholder="House / Flat No *"
          value={form.house}
          onChange={handleChange}
        />

        <input
          name="street"
          placeholder="Street / Area *"
          value={form.street}
          onChange={handleChange}
        />

        <input
          name="landmark"
          placeholder="Landmark (optional)"
          value={form.landmark}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City *"
          value={form.city}
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <button
          className="save-address-btn"
          onClick={handleSave}
        >
          Save Address
        </button>
      </div>
    </div>
  );
}
