import React from "react";
import { useTranslation } from "react-i18next";
import "../cssPages/Contact.css"; 

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="contact-page-section">
      <div className="contact-container">

        {/* Heading */}
        <h1 className="contact-title">
          {t("contact.title")}
        </h1>

        {/* Subtitle */}
        <p className="contact-subtitle">
          {t("contact.subtitle")}
        </p>

        {/* The Refined Glass Card */}
        <div className="contact-glass-card">
          <div className="contact-card-content">
            
            {/* Email Section */}
            <div className="contact-email-wrapper">
              <p className="contact-label">
                {t("contact.email_label")}
              </p>
              
              <a
                href="mailto:connect@cropyaan.com"
                className="contact-email-link"
              >
                connect@cropyaan.com
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}