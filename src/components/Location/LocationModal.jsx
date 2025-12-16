import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "./LocationModal.css";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
});

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

export default function LocationModal({ onClose, onPickLocation }) {
  const [position, setPosition] = useState({ lat: 28.6692, lng: 77.4538 });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Reverse Geocoding
  async function fetchAddress(lat, lng) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      const res = await fetch(url, { headers: { "User-Agent": "GoGeneric-App" } });
      const data = await res.json();
      return data.display_name || "Address not found";
    } catch {
      return "Unable to fetch address";
    }
  }

  // Fetch search suggestions
  async function searchAddress(text) {
    if (!text) {
      setSuggestions([]);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${text}&format=json&addressdetails=1&limit=5`;

    const res = await fetch(url, {
      headers: { "User-Agent": "GoGeneric-App" },
    });
    const data = await res.json();

    setSuggestions(data);
  }

  return (
    <div className="loc-overlay">
      <div className="loc-modal">

        {/* Header */}
        <div className="loc-header">
          <p className="title">Search or pick your location from map</p>
          <span className="close-btn" onClick={onClose}>✕</span>
        </div>

        {/* SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Type to search address..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              searchAddress(e.target.value);
            }}
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    const newPos = { lat: parseFloat(item.lat), lng: parseFloat(item.lon) };
                    setPosition(newPos);
                    setQuery(item.display_name);
                    setSuggestions([]);
                  }}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* MAP */}
        <div className="map-box">
          <MapContainer center={position} zoom={16} scrollWheelZoom className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={markerIcon} />
            <LocationMarker setPosition={setPosition} />
          </MapContainer>
        </div>

        {/* Pick Button */}
        <button
          className="pick-btn"
          onClick={async () => {
            setLoading(true);
            const fullAddress = await fetchAddress(position.lat, position.lng);
            setLoading(false);
            onPickLocation(fullAddress);
            onClose();
          }}
        >
          {loading ? "Getting Address..." : "Pick Location"}
        </button>

      </div>
    </div>
  );
}
