import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../api/axiosInstance";
import "./MedicineDetails.css";
import { cleanImageUrl } from "../../utils";
import { addToCart } from "../../utils/cartHelper";
import { toast } from "react-hot-toast";
import WishlistButton from "../WishlistButton";
export default function MedicineDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const passedPrice = location.state?.price || null;
  const passedStoreId = location.state?.store_id || null;

  useEffect(() => {
    fetchMedicineDetails();
  }, [id]);

  const fetchMedicineDetails = async () => {
    try {
      const res = await api.get(`/api/v1/items/details/${id}`, {
        headers: {
          zoneId: "[3]",
          moduleId: 2,
        },
      });

      console.log("Medicine API Response:", res.data);
      setMedicine(res.data);
    } catch (err) {
      console.error("Medicine fetch error:", err);
      toast.error("Failed to load medicine details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="medicine-loader">Loading...</div>;
  if (!medicine) return <p>Medicine not found</p>;
  const price =
    passedPrice ||
    medicine.price ||
    medicine.unit_price ||
    medicine?.variations?.[0]?.price ||
    null;

  const handleAddToCart = () => {
    if (!medicine) return;

    const price =
      medicine.price || medicine.unit_price || medicine?.variations?.[0]?.price;

    if (!price) {
      toast.error("Price not available");
      return;
    }

    addToCart({
      item: {
        id: medicine.id,
        name: medicine.name,
        price: price,
        image: medicine.image_full_url || medicine.image,
      },
    });
  };

  return (
    <div className="medicine-page">
      <div className="medicine-card">
        <div className="medicine-image">
          <div className="medicine-wishlist">
            <WishlistButton item={medicine} />
          </div>
          <img
            src={cleanImageUrl(medicine.image_full_url || medicine.image)}
            alt={medicine.name}
          />
        </div>

        <div className="medicine-info">
          <div>
            <h1>{medicine.name}</h1>

            {price ? (
              <p className="medicine-price">₹{price}</p>
            ) : (
              <p className="medicine-price unavailable">Price unavailable</p>
            )}

            {medicine.description && (
              <p className="medicine-desc">{medicine.description}</p>
            )}
          </div>

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
