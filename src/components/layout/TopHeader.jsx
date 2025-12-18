import { useEffect, useState, useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./TopHeader.css";
import LocationModal from "../Location/LocationModal";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [location, setLocation] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const langRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile"); // ✅ logged in → profile page
    } else {
      setOpenLoginModal(true); // ❌ not logged in → login modal
    }
  };

  return (
    <>
      <nav className="topheader-wrapper w-full">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* 📍 LOCATION */}
          <div
            className="location-trigger group"
            onClick={() => setOpenLocationModal(true)}
          >
            <MdLocationOn size={20} className="text-orange-500" />
            <div className="ml-2">
              <span className="text-xs text-gray-400">Your Location</span>
              <div className="text-sm font-semibold">
                {location || "Select Location"}
              </div>
            </div>
            <IoMdArrowDropdown />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-8">

            {/* DOWNLOAD */}
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              className="download-pill"
            >
              Download App
            </a>

            {/* LANGUAGE */}
            <div className="relative" ref={langRef}>
              <div
                className="lang-selector-premium"
                onClick={() => setOpen(!open)}
              >
                <span>{language}</span>
                <IoMdArrowDropdown />
              </div>

              {open && (
                <div className="dropdown-animate absolute right-0 mt-2 bg-white shadow rounded">
                  <div onClick={() => { setLanguage("English"); setOpen(false); }}>
                    English
                  </div>
                  <div onClick={() => { setLanguage("हिन्दी"); setOpen(false); }}>
                    हिन्दी
                  </div>
                </div>
              )}
            </div>

            {/* 👤 PROFILE */}
            <div
              className="profile-trigger-premium cursor-pointer"
              onClick={handleProfileClick}
            >
              <CgProfile size={20} />
              <span className="font-semibold">
                {user ? user.name?.split(" ")[0] : "Login"}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* LOGIN MODAL */}
      {openLoginModal && (
        <LoginModal onClose={() => setOpenLoginModal(false)} />
      )}

      {/* LOCATION MODAL */}
      {openLocationModal && (
        <LocationModal
          onClose={() => setOpenLocationModal(false)}
          setLocation={setLocation}
        />
      )}
    </>
  );
}
