import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppChat.css";

export default function WhatsAppChat() {
  return (
    <a
      href="https://wa.me/919211510600?text=Hello%20GoGeneric%20Pharma"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
