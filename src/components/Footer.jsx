import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="ak-footer-section">
      <div className="ak-container">
        <div className="ak-footer-content">

          {/* LEFT : About */}
          <div className="ak-footer-col">
            <img src="/gogenlogo.png" alt="Go Generic" className="ak-footer-logo-img" />

            <p className="ak-footer-text">
              Go Generic is an informational platform focused on spreading
              awareness about generic medicines and healthcare. We do not sell
              medicines.
            </p>

            <div className="ak-footer-social-icon">
              <a href="https://www.facebook.com/profile.php?id=61575015842306&mibextid=ZbWKwL" target="_blank"><FaFacebookF /></a>
              <a href="https://x.com/GoGenericPharma" target="_blank"><FaTwitter /></a>
              <a href="https://www.instagram.com/gogenericpharma/?igsh=Z3RmbmVjaHlubHg2#" target="_blank"><FaInstagram /></a>
              <a href="https://www.youtube.com/@go_generic" target="_blank"><FaYoutube /></a>
            </div>
          </div>

          {/* MIDDLE : Links */}
          <div className="ak-footer-col">
            <h3 className="ak-footer-widget-heading">Company</h3>
            <ul className="ak-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/labs">Labs</Link></li>
              <li><Link to="/doctors">Doctors</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contactus">Support</Link></li>
            </ul>
          </div>

          {/* RIGHT : App Download */}
          <div className="ak-footer-col">
            <h3 className="ak-footer-widget-heading">Download Our App</h3>
            <p className="ak-footer-text">
              Get medicine awareness, doctors & labs at your fingertips.
            </p>

           <div className="app-buttons">
  <a href="https://play.google.com/store/apps/details?id=com.gogeneric.user" target="_blank" rel="noreferrer">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      alt="Get it on Google Play"
    />
  </a>
</div>
          </div>
        </div>
      </div>

      <div className="ak-copyright-area">
        © {new Date().getFullYear()} Go Generic. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
