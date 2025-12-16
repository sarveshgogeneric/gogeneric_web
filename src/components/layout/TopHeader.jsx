import { useEffect, useState, useRef } from "react";
import { MdLocationOn, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./TopHeader.css";
import LocationModal from "../Location/LocationModal";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function TopHeader() {
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [location, setLocation] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const langRef = useRef(null);
  const profileRef = useRef(null);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
      document.body.classList.add("dark-mode");
    }
  }, []);
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return (
    <div className={`topheader w-full ${dark ? "dark-header" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">

        {/* LOCATION */}
        <div
          className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md hover:bg-green-50 transition"
          onClick={() => setOpenLocationModal(true)}
        >
          <MdLocationOn size={22} className="text-blue-600" />

          <div className="flex flex-row gap-1 leading-tight">
            <span className="text-[15px] font-medium text-gray-800 dark-text">
              Your Location:
            </span>
            <span className="text-[15px] font-semibold text-black dark-text-bold">
              {location}
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {/* LANGUAGE */}
          <div className="relative" ref={langRef}>
            <div
              onClick={() => setOpen(!open)}
              className={`lang-selected ${dark ? "dark-box" : ""}`}
            >
              <img
                src={
                  language === "English"
                    ? "https://flagsapi.com/US/flat/24.png"
                    : "https://flagsapi.com/IN/flat/24.png"
                }
                alt="flag"
                className="flag-icon"
              />
              <span className={`${dark ? "dark-text" : ""}`}>{language}</span>
              <IoMdArrowDropdown className={`arrow ${dark ? "dark-text" : ""}`} />
            </div>

            {open && (
              <div className={`lang-dropdown ${dark ? "dark-dropdown" : ""}`}>
                <div
                  className="lang-option"
                  onClick={() => {
                    setLanguage("English");
                    setOpen(false);
                  }}
                >
                  <img src="https://flagsapi.com/US/flat/24.png" className="flag-icon" />
                  English
                </div>

                <div
                  className="lang-option"
                  onClick={() => {
                    setLanguage("हिन्दी");
                    setOpen(false);
                  }}
                >
                  <img src="https://flagsapi.com/IN/flat/24.png" className="flag-icon" />
                  हिन्दी
                </div>
              </div>
            )}
          </div>

<div className="relative" ref={profileRef}>
  {/* PROFILE BUTTON */}
  <div
    className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 transition"
    onClick={(e) => {
  e.stopPropagation();

  if (user) {
    navigate("/profile");
    setProfileOpen(false);
  } else {
    setProfileOpen((prev) => !prev);
  }
}}

  >
    <CgProfile
      size={22}
      className={`${dark ? "dark-text" : "text-gray-700"}`}
    />
    <span className={`font-medium ${dark ? "dark-text" : ""}`}>
      {user ? `Hello, ${user.name}` : "Profile"}
    </span>
  </div>

  {/* DROPDOWN */}
  {profileOpen && (
    <div className="profile-dropdown">
      {user ? (
        <>
          <p className="welcome-text">
            Hello, {user.name}
          </p>

         <button
  className="login-btn"
  onClick={(e) => {
    e.stopPropagation();
    logout();                 // context logout
    setProfileOpen(false);    // dropdown close
    navigate("/");            // optional redirect
  }}
>
  Logout
</button>

        </>
      ) : (
        <>
          <p className="welcome-text">Welcome</p>
          <p className="sub-text">
            To access your healthcare profile and track orders
          </p>

          <button
            className="login-btn"
            onClick={(e) => {
              e.stopPropagation(); 
              setProfileOpen(false);
              setOpenLoginModal(true);
            }}
          >
            Login / Signup
          </button>
        </>
      )}
    </div>
  )}
</div>
          {/* DARK MODE TOGGLE */}
          <button
            className="flex items-center gap-1 theme-btn"
            onClick={() => setDark(!dark)}
          >
            {dark ? (
              <>
                <MdLightMode className="text-yellow-500" />
                <span>Light</span>
              </>
            ) : (
              <>
                <MdDarkMode className="text-gray-700" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* MODALS */}
      {openLocationModal && (
        <LocationModal
          onClose={() => setOpenLocationModal(false)}
          onPickLocation={(addr) => {
            setLocation(addr);
            setOpenLocationModal(false);
          }}
        />
      )}
      {openLoginModal && (
        <LoginModal onClose={() => setOpenLoginModal(false)} />
      )}
    </div>
  );
}
