import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../cssPages/Services.css";
import weather from "../assets/images/weather.jpg";
import crop from "../assets/images/crop.jpg";
import insights from "../assets/images/insights.jpg";
import chatbot from "../assets/images/chatbot.jpg";

/* ─── Fade-in on scroll ─── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`${className} fade-in-element ${inView ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const GrainOverlay = () => <div className="grain-overlay" />;

/* ─── Badge ─── */
const Badge = ({ label }) => (
  <span style={{
    display: "inline-block",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#fff",
    background: "#2e7d32",
    borderRadius: "999px",
    padding: "4px 14px",
    marginBottom: "14px",
  }}>
    {label}
  </span>
);

/* ─── Bullet list ─── */
const BulletList = ({ items }) => (
  <div className="bullet-list-container">
    {items.map((item, i) => (
      <div key={i} className="service-bullet group">
        <div className="bullet-dot-wrapper">
          <div className="bullet-dot-inner" />
        </div>
        <p className="service-bullet-text" style={{ color: "var(--color-text)" }}>
          {item}
        </p>
      </div>
    ))}
  </div>
);

/* ─── BIG CARD ─── */
const BigCard = ({
  imageUrl,
  imagePos = "left",
  badge,
  label,
  title,
  titleAccent,
  description,
  bullets,
}) => {
  const imgOnLeft = imagePos === "left";

  return (
    <FadeIn>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "500px",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
        background: "var(--color-bg)",
      }}>

        {/* IMAGE */}
        <div style={{
          order: imgOnLeft ? 0 : 1,
          position: "relative",
          overflow: "hidden",
        }}>
          <img
            src={imageUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* CONTENT */}
        <div style={{
          order: imgOnLeft ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          padding: "48px 52px",
          background: "var(--color-bg)",
        }}>
          {badge && <Badge label={badge} />}

          <p style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "#2e7d32",
            marginBottom: "12px",
          }}>
            {label}
          </p>

          <h3 style={{
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "16px",
          }}>
            {title}{" "}
            <span style={{ color: "var(--color-text)" }}>
              {titleAccent}
            </span>
          </h3>

          <p style={{
            fontSize: "0.95rem",
            color: "var(--color-text)",
            lineHeight: 1.75,
            marginBottom: "26px",
          }}>
            {description}
          </p>

          <BulletList items={bullets} />
        </div>

      </div>
    </FadeIn>
  );
};

/* ───────── MAIN ───────── */
export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="services-root-container">
      <GrainOverlay />
      <div className="services-main-wrapper">

        {/* HERO */}
        <section className="services-hero-section">
          <div className="hero-content-box">
            <FadeIn>
              <p className="hero-tagline" style={{ color: "var(--color-text)" }}>
                {t("services.hero_tag")}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="display-font hero-main-title" style={{ color: "var(--color-text)" }}>
                {t("services.hero_title1")}{" "}
                <span style={{ color: "var(--color-text)" }}>
                  {t("services.hero_title2")}
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="hero-subtitle" style={{ color: "var(--color-text)" }}>
                {t("services.hero_subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* CARDS */}
        <div style={{
          padding: "64px 40px 80px",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}>

          <BigCard
            imageUrl={weather}
            label={t("services.weather_label")}
            title={t("services.weather_title1")}
            titleAccent={t("services.weather_title2")}
            description={t("services.weather_desc")}
            bullets={[
              t("services.weather_b1"),
              t("services.weather_b2"),
              t("services.weather_b3"),
              t("services.weather_b4"),
            ]}
          />

          <BigCard
            imageUrl={crop}
            imagePos="right"
            label={t("services.crop_label")}
            title={t("services.crop_title1")}
            titleAccent={t("services.crop_title2")}
            description={t("services.crop_desc")}
            bullets={[
              t("services.crop_b1"),
              t("services.crop_b2"),
              t("services.crop_b3"),
              t("services.crop_b4"),
            ]}
          />

          <BigCard
            imageUrl={insights}
            badge={t("services.coming_soon")}
            label={t("services.insights_label")}
            title={t("services.insights_title1")}
            titleAccent={t("services.insights_title2")}
            description={t("services.insights_desc")}
            bullets={[
              t("services.insights_b1"),
              t("services.insights_b2"),
              t("services.insights_b3"),
              t("services.insights_b4"),
            ]}
          />

          <BigCard
            imageUrl={chatbot}
            imagePos="right"
            badge={t("services.coming_soon")}
            label={t("services.chatbot_label")}
            title={t("services.chatbot_title1")}
            titleAccent={t("services.chatbot_title2")}
            description={t("services.chatbot_desc")}
            bullets={[
              t("services.chatbot_b1"),
              t("services.chatbot_b2"),
              t("services.chatbot_b3"),
              t("services.chatbot_b4"),
            ]}
          />

        </div>

      </div>
    </div>
  );
}