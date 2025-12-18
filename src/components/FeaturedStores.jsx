import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedStores.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axiosInstance";
import { cleanImageUrl } from "../utils";

export default function FeaturedStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchStores();
  }, []);
  const fetchStores = async () => {
    try {
      const res = await api.get("/api/v1/stores/recommended", {
        params: {
          limit: 10,
          offset: 0,
          type: "all",
        },
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: "2",
          Accept: "application/json",
        },
      });
      console.log("RECOMMENDED STORES API:", res.data);
      setStores(res.data?.stores || []);
    } catch (error) {
      console.group(" RECOMMENDED STORES ERROR");
      console.log("Message:", error.message);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Headers Sent:", error.config?.headers);
      console.groupEnd();
    } finally {
      setLoading(false);
    }
  };
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  return (
    <div className="store-section max-w-7xl mx-auto px-4">
      <div className="store-header">
        <h2 className="featured-title">Featured Stores</h2>
        <button className="see-all-btn" onClick={() => navigate("/stores")}>
          See All →
        </button>
      </div>
      {loading && <p className="loader-text">Loading Stores...</p>}
      {!loading && stores.length === 0 && (
        <p className="no-data">No stores available</p>
      )}
      {stores.length > 0 && (
        <>
          <button className="scroll-btn left" onClick={scrollLeft}>
            <ChevronLeft size={22} />
          </button>
          <div className="store-wrapper" ref={scrollRef}>
            <div className="store-scroll">
              {stores.map((store) => {
                const rawImage =
                  store.logo ||
                  store.cover_photo ||
                  store.image ||
                  store.image_full_url;
                const imagePath =
                  rawImage && !rawImage.includes("/")
                    ? `/storage/store/${rawImage}`
                    : rawImage;
                const finalImage = cleanImageUrl(imagePath);
                const isOpen = store.open === 1 || store.is_open === 1;
                const distance = store.distance
                  ? `${store.distance.toFixed(1)} km`
                  : null;
                const address =
                  store.address || store.location || "Address not available";
                return (
                  <div
                    key={store.id}
                    className="store-card"
                    onClick={() => navigate(`/store/${store.id}`)}
                  >
                    {/* IMAGE */}
                    <img
                      src={finalImage || "/no-image.jpg"}
                      alt={store.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.jpg";
                      }}
                    />
                    {/* NAME */}
                    <h3 className="store-name">{store.name}</h3>
                    {/* ADDRESS */}
                    <p className="store-address">{address}</p>
                    {/* META */}
                    <div className="store-meta">
                      {distance && (
                        <span className="distance">📍 {distance}</span>
                      )}
                      <span className={`status ${isOpen ? "open" : "closed"}`}>
                        {isOpen ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
}
