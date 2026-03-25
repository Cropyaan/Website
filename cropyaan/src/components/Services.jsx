import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../cssPages/Services.css"; 

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const useParallax = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const bg = el.querySelector(".parallax-bg");
      if (bg) bg.style.transform = `translateY(${center * 0.18}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
};

const GrainOverlay = () => <div className="grain-overlay" />;

const Separator = () => (
  <div className="separator-wrapper">
    <div className="separator-line" />
  </div>
);

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

const AgriSplit = ({ imageUrl, reverse = false, children }) => {
  const parallaxRef = useParallax();
  return (
    <div ref={parallaxRef} className="agri-split-container">
      <div className={`agri-split-image-side ${reverse ? "lg:order-2" : ""}`}>
        <div className="parallax-bg" style={{ backgroundImage: `url('${imageUrl}')` }} />
        <div className={`agri-split-fade ${reverse ? "fade-left" : "fade-right"}`} />
        <div className="agri-split-tint" />
        <div className="agri-split-glow" />
      </div>
      <div className={`agri-split-content-side ${reverse ? "lg:order-1" : ""}`}>
        <div className={`content-side-fade ${reverse ? "fade-to-right" : "fade-to-left"}`} />
        <div className={`content-side-spotlight ${reverse ? "spotlight-right" : "spotlight-left"}`} />
        <div className="content-side-inner">{children}</div>
      </div>
    </div>
  );
};

const BulletList = ({ items }) => (
  <div className="bullet-list-container">
    {items.map((item, i) => (
      <div key={i} className="service-bullet group">
        <div className="bullet-dot-wrapper">
          <div className="bullet-dot-inner" />
        </div>
        <p className="service-bullet-text">{item}</p>
      </div>
    ))}
  </div>
);

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="services-root-container">
      <GrainOverlay />
      <div className="services-main-wrapper">

        {/* PAGE HERO */}
        <section className="services-hero-section">
          <div className="hero-bg-image" />
          <div className="hero-vignette" />
          <div className="hero-central-glow" />
          <div className="hero-content-box">
            <FadeIn><p className="hero-tagline">{t("services.hero_tag")}</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font hero-main-title">
                {t("services.hero_title1")} <span className="text-glow-green">{t("services.hero_title2")}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}><p className="hero-subtitle">{t("services.hero_subtitle")}</p></FadeIn>
          </div>
        </section>

        <Separator />

        {/* 1. FARMING STATISTICS */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80">
          <FadeIn><p className="section-label">{t("services.s1_label")}</p></FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font section-title">{t("services.s1_title1")} <span className="green-text">{t("services.s1_title2")}</span></h3>
            <p className="section-description">{t("services.s1_desc")}</p>
          </FadeIn>
          <FadeIn delay={0.2}><BulletList items={[t("services.s1_b1"), t("services.s1_b2"), t("services.s1_b3"), t("services.s1_b4")]} /></FadeIn>
        </AgriSplit>

        <Separator />

        {/* 2. MODERN FARMING TECHNIQUES */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&q=80" reverse>
          <FadeIn><p className="section-label">{t("services.s2_label")}</p></FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font section-title">{t("services.s2_title1")} <span className="green-text">{t("services.s2_title2")}</span></h3>
            <p className="section-description">{t("services.s2_desc")}</p>
          </FadeIn>
          <FadeIn delay={0.2}><BulletList items={[t("services.s2_b1"), t("services.s2_b2"), t("services.s2_b3"), t("services.s2_b4")]} /></FadeIn>
        </AgriSplit>

        <Separator />

        {/* 3. GUIDES & TUTORIALS */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80">
          <FadeIn><p className="section-label">{t("services.s3_label")}</p></FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font section-title">{t("services.s3_title1")} <span className="green-text">{t("services.s3_title2")}</span></h3>
            <p className="section-description">{t("services.s3_desc")}</p>
          </FadeIn>
          <FadeIn delay={0.2}><BulletList items={[t("services.s3_b1"), t("services.s3_b2"), t("services.s3_b3"), t("services.s3_b4")]} /></FadeIn>
        </AgriSplit>

        <Separator />

        {/* 4. GOVERNMENT SCHEMES */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" reverse>
          <FadeIn><p className="section-label">{t("services.s4_label")}</p></FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font section-title">{t("services.s4_title1")} <span className="green-text">{t("services.s4_title2")}</span></h3>
            <p className="section-description">{t("services.s4_desc")}</p>
          </FadeIn>
          <FadeIn delay={0.2}><BulletList items={[t("services.s4_b1"), t("services.s4_b2"), t("services.s4_b3"), t("services.s4_b4")]} /></FadeIn>
        </AgriSplit>

        <Separator />

        {/* CLOSING CTA */}
        <section className="cta-section">
          <div className="cta-glow" />
          <div className="cta-content-wrapper">
            <FadeIn><p className="cta-tagline">{t("services.cta_tag")}</p></FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="display-font cta-title">
                {t("services.cta_title1")} <span className="cta-title-highlight">{t("services.cta_title2")}</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}><p className="cta-description">{t("services.cta_subtitle")}</p></FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </div>
  );
}