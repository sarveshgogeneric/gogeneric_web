import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./About.css";
import Footer from "../Footer";

const statsData = [
  { number: "500", label: "Verified Stores" },
  { number: "50k", label: "Happy Customers" },
  { number: "100%", label: "Quality Assurance" },
  { number: "24/7", label: "Support" },
];

const features = [
  "Affordable Generic Medicines",
  "Verified & Licensed Partner Stores",
  "Fast & Safe Delivery",
  "Trusted Quality Products",
  "User-Friendly Platform",
];

const About = () => {
  return (
    <>
 <section class="about-section">
  <h2 class="about-title">ABOUT GOGENERIC</h2>
  <h3 class="subtitle">A Comprehensive Directory For Your Health Care</h3>

  <p class="about-text">
    Go Generic Pharma, an initiative by Singhaniya Med Private Limited,
    is a pioneering digital healthcare platform dedicated to making
    medicines affordable, accessible, and trustworthy for every household
    in India. In a country where millions of people struggle to buy
    expensive branded medicines, we bring a simple yet powerful solution –
    connecting consumers directly with trusted local pharmacies that
    provide quality generic medicines at a fraction of the price.
  </p>

  <p class="about-text">
    Our Promise: Go Generic is not just about delivering medicines; it's
    about delivering trust, care, and relief. Every medicine listed on our
    platform is verified, every partner pharmacy is licensed, and every
    delivery is handled with utmost care.
  </p>

  <div class="stats-container">
    <div class="stat-box">
      <h3>100+</h3>
      <p>Total Cities</p>
    </div>
    <div class="stat-box">
      <h3>529+</h3>
      <p>Total Experts</p>
    </div>
    <div class="stat-box">
      <h3>310+</h3>
      <p>Total Awards</p>
    </div>
  </div>

  <div class="features">
    <div class="feature-item">
      <span>✔</span> Enjoy Many Discounts In Fees
    </div>
    <div class="feature-item">
      <span>✔</span> Growing Listings Of Clinics
    </div>
  </div>
</section>
<Footer />
</>


  );
};

export default About;
