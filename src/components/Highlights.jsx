import { useEffect, useState, useRef } from "react";
import "./Highlights.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axiosInstance";

export default function Highlights() {
  const [highlights, setHighlights] = useState([]);
  const scrollRef = useRef(null);

 useEffect(() => {
  console.log("useEffect running...");
  fetchAdvertisements();
}, []);

const fetchAdvertisements = async () => {
  console.log("Function fetchAdvertisements() started");
  console.log("Token:", localStorage.getItem("token"));


  try {
  const response = await api.get("/api/v1/advertisement/list", {
  headers: {
  zoneId: JSON.stringify([1]),
  moduleId: "2",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},

});

    const ads = response.data;
 console.log(" highlight API Response:", response.data);
    const formattedAds = ads.map((ad) => ({
      id: ad.id,
      type: ad.type === "video" ? "video" : "image",
      src: ad.file_full_path || ad.video_link,
      title: ad.store?.name || "Advertisement",
    }));

    setHighlights(formattedAds);
  } catch (err) {
  console.log("API ERROR DETAILS:");
  console.log("Error Message:", err.message);
  console.log("Error Response:", err.response?.data);
  console.log("Status:", err.response?.status);
  console.log("Headers:", err.response?.headers);
}
};
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let speed = 1;

    const autoScroll = () => {
      slider.scrollLeft += speed;

      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }

      requestAnimationFrame(autoScroll);
    };

    autoScroll();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="highlight-section max-w-7xl mx-auto px-4">
      <h2 className="highlight-title">Highlights for You</h2>

      <button className="scroll-btn left" onClick={scrollLeft}>
        <ChevronLeft size={22} />
      </button>

      <div className="highlight-wrapper" ref={scrollRef}>
        <div className="highlight-scroll">
          {highlights.map((item) => (
            <div key={item.id} className="highlight-card">
              {/* IMAGE */}
              {item.type === "image" ? (
                <img src={item.src} alt={item.title} />
              ) : (
                // YOUTUBE VIDEO
                <iframe
                  src={
                    item.src.includes("youtube")
                      ? item.src
                      : `https://www.youtube.com/embed/${item.src}`
                  }
                  title={item.title}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <p className="highlight-name">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="scroll-btn right" onClick={scrollRight}>
        <ChevronRight size={22} />
      </button>

      <div className="health-quote">
        “Invest in your body — it’s the only place you have to live.”
      </div>
    </div>
  );
}
