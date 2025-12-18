import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../api/axiosInstance";
import "./MedicineDetails.css";
import { cleanImageUrl } from "../../utils";
import { addToCart } from "../../utils/cartHelper";
import { toast } from "react-hot-toast";
import WishlistButton from "../WishlistButton";
import Loader from "../Loader";

export default function MedicineDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  const passedPrice = location.state?.price || null;

  useEffect(() => {
    fetchMedicineDetails();
  }, [id]);

  const fetchMedicineDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/v1/items/details/${id}`, {
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: 2,
        },
      });

      setMedicine(res.data);
    } catch (err) {
      console.error("Medicine fetch error:", err);
      toast.error("Failed to load medicine details");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="medicine-loader">
        <Loader />
      </div>
    );
  }

  if (!medicine) return <p className="text-center">Medicine not found</p>;

  const price =
    passedPrice ||
    medicine.price ||
    medicine.unit_price ||
    medicine?.variations?.[0]?.price ||
    null;

  const handleAddToCart = () => {
    if (!price) {
      toast.error("Price not available");
      return;
    }

    addToCart({
      item: {
        id: medicine.id,
        name: medicine.name,
        price,
        image:
          medicine.image_full_url ||
          medicine.image ||
          "/no-image.jpg",
      },
    });
  };

  return (
    <div className="medicine-page">
      <div className="medicine-card">
        {/* ===== IMAGE ===== */}
        <div className="medicine-image">
          <div className="medicine-wishlist">
            <WishlistButton item={medicine} />
          </div>

          <img
            src={cleanImageUrl(
              medicine.image_full_url || medicine.image
            )}
            alt={medicine.name}
            onError={(e) => {
              e.currentTarget.src = "/no-image.jpg";
            }}
          />
        </div>

        {/* ===== INFO ===== */}
        <div className="medicine-info">
          <h1>{medicine.name}</h1>

          {price ? (
            <p className="medicine-price">₹{price}</p>
          ) : (
            <p className="medicine-price unavailable">
              Price unavailable
            </p>
          )}

          {medicine.description && (
            <p className="medicine-desc">
              {medicine.description}
            </p>
          )}

          <div className="medicine-actions">
            <button
              className="add-cart-btn1"
              onClick={handleAddToCart}
              disabled={!price}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
