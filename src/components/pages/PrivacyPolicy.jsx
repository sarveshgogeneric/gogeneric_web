import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Privacy Policy</h1>

      <PolicySection title="1. Introduction">
        <p>
          This Privacy Notice explains how <strong>Singhania Med Pvt Ltd</strong> collects,
          uses, shares, and protects your information when you access our stores, website,
          or mobile application.
        </p>
      </PolicySection>

      <PolicySection title="2. Data We Collect">
        <ul>
          <li>Contact information</li>
          <li>Financial & transaction details</li>
          <li>Technical & device information</li>
          <li>Health-related data & prescriptions</li>
          <li>Personal and loyalty program information</li>
        </ul>
      </PolicySection>

      <PolicySection title="3. How We Collect Data">
        <ul>
          <li>Information you provide directly</li>
          <li>Cookies & automated technologies</li>
          <li>Email interactions</li>
          <li>Third-party sources</li>
        </ul>
      </PolicySection>

      <PolicySection title="4. Use of Data">
        <p>
          We use your data to provide services, process transactions, personalize
          experiences, improve our platform, prevent fraud, and comply with legal
          obligations.
        </p>
      </PolicySection>

      <PolicySection title="5. Sharing of Data">
        <p>
          Data may be shared with service providers, partners, group companies, or legal
          authorities as required.
        </p>
      </PolicySection>

      <PolicySection title="6. Data Security">
        <p>
          We use appropriate technical and organizational measures to safeguard your data.
        </p>
      </PolicySection>

      <PolicySection title="7. Your Rights">
        <ul>
          <li>Right to access & review</li>
          <li>Right to correction</li>
          <li>Right to withdraw consent</li>
        </ul>
      </PolicySection>

      <PolicySection title="8. Minors">
        <p>
          Our services are not intended for users under 18 without parental involvement.
        </p>
      </PolicySection>

      <PolicySection title="9. Contact Information">
        <p>Email: support@gogenericpharma.com</p>
      </PolicySection>

      <PolicySection title="10. Grievance Officer">
        <p><strong>Name:</strong> Rahul Kumar Singh</p>
        <p><strong>Email:</strong> coo@gogenericpharma.com</p>
        <p>
          <strong>Address:</strong> GF-8/8, Industrial Area Site-4, Sahibabad, Ghaziabad,
          UP – 201010
        </p>
      </PolicySection>
    </div>
  );
};

export default PrivacyPolicy;

/* Reusable section */
const PolicySection = ({ title, children }) => {
  return (
    <section className="policy-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};
