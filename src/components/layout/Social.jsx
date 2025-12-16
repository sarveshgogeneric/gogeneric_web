import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Social.css";

const Social = () => {
  return (
    <div className="social-links">
      <a
        href="https://www.instagram.com/gogenericpharma/?igsh=Z3RmbmVjaHlubHg2#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61575015842306&mibextid=ZbWKwL"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://x.com/GoGenericPharma"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter />
      </a>
      <a
        href="https://www.youtube.com/@go_generic"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube />
      </a>
    </div>
  );
};

export default Social;
