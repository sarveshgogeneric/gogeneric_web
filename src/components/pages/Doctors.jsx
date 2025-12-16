import React from "react";
import "./Doctors.css";
import Footer from "../Footer";
import { FaStethoscope } from "react-icons/fa";
import HomeBanner from "../HomeBanner.jsx";
export default function Doctors() {
  const doctors = [
    {
      name: "Dr. Anjali Sharma",
      specialization: "General Physician",
      experience: "10+ Years Experience",
      img: "/doc.jpg",
      desc: "Expert in treating chronic diseases, lifestyle issues, and preventive care.",
    },
    {
      name: "Dr. Rohit Verma",
      specialization: "Cardiologist",
      experience: "12+ Years Experience",
      img: "/doctor2.jpg",
      desc: "Heart specialist with focus on heart care, ECG, cholesterol, and BP management.",
    },
    {
      name: "Dr. Neha Gupta",
      specialization: "Dermatologist",
      experience: "8+ Years Experience",
      img: "/doctor3.jpg",
      desc: "Skin care, hair care, acne, pigmentation & advanced dermatology treatments.",
    },
    {
      name: "Dr. Arvind Kumar",
      specialization: "Orthopedic Surgeon",
      experience: "15+ Years Experience",
      img: "/doctor4.jpg",
      desc: "Bone, joints, spine specialist with expertise in non-surgical treatments.",
    },
    {
      name: "Dr. Anjali Sharma",
      specialization: "General Physician",
      experience: "10+ Years Experience",
      img: "/doctor1.jpg",
      desc: "Expert in treating chronic diseases, lifestyle issues, and preventive care.",
    },
    {
      name: "Dr. Rohit Verma",
      specialization: "Cardiologist",
      experience: "12+ Years Experience",
      img: "/doctor2.jpg",
      desc: "Heart specialist with focus on heart care, ECG, cholesterol, and BP management.",
    },
  ];
  return (
    <>
      <div className="doctors-page max-w-7xl mx-auto px-4">
        <h1 className="doctors-title">
          <FaStethoscope className="st-icon" /> Our Certified Doctors
        </h1>
        <p className="doctors-subtitle">
          Meet our team of experienced medical professionals dedicated to providing the best healthcare.
        </p>
        <div className="doctors-grid">
          {doctors.map((doc, index) => (
            <div className="doctor-card" key={index}>
              <img src={doc.img} alt={doc.name} className="doctor-img" />
              <h3 className="doctor-name">{doc.name}</h3>
              <p className="specialization">{doc.specialization}</p>
              <p className="experience">{doc.experience}</p>
              <p className="desc">{doc.desc}</p>
              <button className="book-btn">Book Appointment</button>
            </div>
          ))}
        </div>
      </div>
      <HomeBanner />
      <Footer />
    </>
  );
}
