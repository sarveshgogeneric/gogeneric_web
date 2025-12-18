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
        params: { limit: 10, offset: 0, type: "all" },
        headers: {
          zoneId: JSON.stringify([3]),
          moduleId: "2",
          Accept: "application/json",
        },
      });
      setStores(res.data?.stores || []);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="fs-container max-w-7xl mx-auto px-4">
      <div className="fs-header">
        <h2 className="fs-main-title">Featured Stores</h2>
        <button className="fs-see-all-btn" onClick={() => navigate("/stores")}>
          See All →
        </button>
      </div>

      {loading && <p className="fs-loading">Loading Stores...</p>}
      
      {!loading && stores.length > 0 && (
        <div className="fs-relative-wrapper">
          <button className="fs-scroll-btn fs-left" onClick={scrollLeft}>
            <ChevronLeft size={22} />
          </button>

          <div className="fs-wrapper" ref={scrollRef}>
            <div className="fs-scroll-content">
              {stores.map((store) => {
                const finalImage = cleanImageUrl(store.logo || store.image_full_url);
                const isOpen = store.open === 1 || store.is_open === 1;
                const distance = store.distance ? `${store.distance.toFixed(1)} km` : null;

                return (
                  <div
                    key={store.id}
                    className="fs-card"
                    onClick={() => navigate(`/store/${store.id}`)}
                  >
                    <div className="fs-img-container">
                       <img src={finalImage || "/no-image.jpg"} alt={store.name} />
                    </div>
                    
                    <h3 className="fs-name">{store.name}</h3>
                    <p className="fs-address">{store.address || "Address not available"}</p>
                    
                    <div className="fs-meta">
                      {distance && <span className="fs-distance">📍 {distance}</span>}
                      <span className={`fs-status ${isOpen ? "fs-open" : "fs-closed"}`}>
                        {isOpen ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="fs-scroll-btn fs-right" onClick={scrollRight}>
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}