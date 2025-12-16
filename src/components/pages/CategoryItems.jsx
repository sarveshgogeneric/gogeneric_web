import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { cleanImageUrl } from "../../utils";
import "./CategoryItems.css";
import { Plus } from "lucide-react";
import { addToCart } from "../../utils/cartHelper";
import Loader from "../Loader";

export default function CategoryItems() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState(
    location.state?.categoryName || "Category Products"
  );

  useEffect(() => {
    setLoading(true);
    fetchCategoryItems();
  }, [id]);

  const fetchCategoryItems = async () => {
    try {
      const res = await api.get(`/api/v1/categories/items/${id}`, {
        params: {
          limit: 20,
          offset: 1,
        },
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: 2,
        },
      });

      setItems(
        res.data?.items ||
        res.data?.products ||
        []
      );
    } catch (err) {
      console.error("Category items error:", err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading products..." />;
  }

  return (
    <div className="category-items-page">
      <h2 className="page-title">{categoryName}</h2>

      {items.length === 0 ? (
        <p className="empty-text">No products found</p>
      ) : (
        <div className="items-grid">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`item-card grad-${(index % 8) + 1}`}
            >
              {/* ➕ ADD TO CART */}
              <div
                className="add-cart-btn"
                onClick={() =>
                  addToCart({
                    item,
                    navigate,
                    location,
                  })
                }
              >
                <Plus size={18} />
              </div>

              <img
                src={cleanImageUrl(item.image_full_url)}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src = "/no-image.png";
                }}
              />

              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
