import { useEffect, useState } from "react";
import "./HomeBanner.css";
import api from "../api/axiosInstance";
import { cleanImageUrl } from "../utils";
import Loader from "./Loader"; // ✅ reusable loader

export default function HomeBanner() {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true); // ✅ loader state

  const getBannerUrl = (banner) => {
    if (!banner) return "/no-image.jpg";

    const rawImage =
      banner.image_full_url ||
      banner.image ||
      banner.image_url ||
      banner.photo;

    if (!rawImage) return "/no-image.jpg";

    let normalizedPath = rawImage;

    if (!rawImage.includes("/")) {
      normalizedPath = `/storage/banner/${rawImage}`;
    }

    return cleanImageUrl(normalizedPath) || "/no-image.jpg";
  };

  useEffect(() => {
    setLoading(true);

    api
      .get("/api/v1/banners", {
        headers: {
          zoneId: "[1]",
          moduleId: "2",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setBanners(res.data?.banners || []);
      })
      .catch((err) => {
        console.error("Banner fetch error:", err);
      })
      .finally(() => {
        setLoading(false); // ✅ stop loader
      });
  }, []);

  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="banner-container max-w-7xl mx-auto px-4 py-2">
      {loading ? (
        <Loader text="Loading banners..." />
      ) : banners.length > 0 ? (
        <img
          key={index}
          src={getBannerUrl(banners[index])}
          alt="banner"
          className="banner-image fade"
          onError={(e) => {
            e.currentTarget.src = "/no-image.jpg";
          }}
        />
      ) : (
        <p className="empty-text">No banners available</p>
      )}
    </div>
  );
}
