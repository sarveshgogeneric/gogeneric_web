import React from "react";
import "./Footer.css"
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="ak-footer-section">
      <div className="ak-container">
        <div className="ak-footer-content">
          <div className="ak-footer-col">
            <div className="ak-footer-logo">
              <img src="/gogenlogo.png" alt="Logo" />
            </div>
            <p className="ak-footer-text">
              Go Generic is an informational platform dedicated to spreading
              awareness about generic medicines and healthcare. We do not sell
              medicines — we only share knowledge.
            </p>
            <div className="ak-footer-social-icon">
              <span>Follow us</span>
              <a
                href="https://www.facebook.com/profile.php?id=61575015842306&mibextid=ZbWKwL"
                className="ak-facebook-bg"
                target="_blank"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/GoGenericPharma"
                target="_blank"
                className="ak-twitter-bg"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/gogenericpharma?igsh=Z3RmbmVjaHlubHg2"
                target="_blank"
                className="ak-google-bg"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com/@go_generic?si=VHoumOyIDEtEWDMI"
                target="_blank"
                className="ak-youtube-bg"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="ak-footer-col">
            <h3 className="ak-footer-widget-heading">Useful Links</h3>
            <ul className="ak-footer-links">
  <li>
    <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
  </li>

  <li>
    <Link to="/about" style={{ textDecoration: "none", color: "white" }}>About</Link>
  </li>

  <li>
    <Link to="/doctors" style={{ textDecoration: "none", color: "white" }}>Doctors</Link>
  </li>

  <li>
    <Link to="/labs" style={{ textDecoration: "none", color: "white" }}>Labs</Link>
  </li>

  <li>
    <Link to="/blog" style={{ textDecoration: "none", color: "white" }}>Blog</Link>
  </li>

  <li>
    <Link to="/support" style={{ textDecoration: "none", color: "white" }}>Support</Link>
  </li>
</ul>

          </div>

          <div className="ak-footer-col">
            <h3 className="ak-footer-widget-heading">Subscribe</h3>
            <p className="ak-footer-text">
              Stay updated with the latest news and health awareness tips.
            </p>
            <form className="ak-subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="ak-copyright-area">
        <p className="ak-copyright-text">
          © {new Date().getFullYear()} Go Generic | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;