import { useState } from "react";
import api from "../../api/axiosInstance";
import { toast } from "react-hot-toast";

export default function PrescriptionOrder({ storeId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    address: "",
    latitude: "",
    longitude: "",
    distance: "",
    contact_person_name: "",
    contact_person_number: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error("Please upload prescription");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest_id");

      const formData = new FormData();

      formData.append("store_id", storeId);
      formData.append("order_type", "delivery");
      formData.append("distance", form.distance);
      formData.append("address", form.address);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);
      formData.append("contact_person_name", form.contact_person_name);
      formData.append("contact_person_number", form.contact_person_number);

      if (!token) {
        formData.append("guest_id", guestId);
      }

      files.forEach((file) => {
        formData.append("order_attachment[]", file);
      });

      const res = await api.post(
        "/api/v1/customer/order/prescription/place",
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Prescription order placed successfully 🩺");
      console.log("Order Response:", res.data);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.errors?.[0]?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prescription-order">
      <h3>Upload Prescription</h3>

      <input type="file" multiple accept="image/*" onChange={handleFileChange} />

      <input
        name="contact_person_name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        name="contact_person_number"
        placeholder="Phone"
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Delivery Address"
        onChange={handleChange}
      />
      <input
        name="latitude"
        placeholder="Latitude"
        onChange={handleChange}
      />
      <input
        name="longitude"
        placeholder="Longitude"
        onChange={handleChange}
      />
      <input
        name="distance"
        placeholder="Distance (km)"
        onChange={handleChange}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Placing Order..." : "Place Prescription Order"}
      </button>
    </div>
  );
}
