import "../cssPages/Home.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Separator = () => <div className="separator" />;

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

/* ── Pillar icons as inline SVGs (no emojis) ── */
const PILLAR_ICONS = {
  crop: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
      <path d="M12 8v8M8 12h8"/>
    </svg>
  ),
  weather: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  scheme: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  market: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
};

const PillarCard = ({ iconKey, label, desc, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.75s ease ${delay}s` }}>
      <div className="card text-center px-6 py-8 rounded-2xl cursor-default">
        <div className="pillar-icon-wrap mb-4">{PILLAR_ICONS[iconKey]}</div>
        <div className="font-semibold text-sm mb-2" style={{ color: "var(--color-text)", letterSpacing: "0.03em" }}>{label}</div>
        <div className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{desc}</div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, index }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `all 0.75s ease ${index * 0.1}s` }}>
      <div className="card h-full rounded-2xl p-8 cursor-default">
        <div className="feature-card-bar mb-6" />
        <h3 className="display-font feature-card-title text-xl font-bold mb-3">{title}</h3>
        <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{desc}</p>
      </div>
    </div>
  );
};

/* ── Service card with real image ── */
const ServiceCard = ({ image, alt, title, desc, delay }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `all 0.75s ease ${delay}s` }}>
      <div className="service-card rounded-2xl overflow-hidden cursor-default">
        <div className="service-img-wrap">
          <img src={image} alt={alt} className="service-img" loading="lazy" />
          <div className="service-img-overlay" />
        </div>
        <div className="service-body px-6 py-6">
          <div className="feature-card-bar mb-4" />
          <h3 className="display-font feature-card-title text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const bg = heroRef.current.querySelector(".hero-bg");
        if (bg) bg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="page-root overflow-x-hidden" style={{ background: "var(--bg-main)", color: "var(--color-text)" }}>

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative h-screen w-full flex flex-col overflow-hidden">
          <div
            className="hero-bg absolute inset-0 scale-110"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1980&q=80&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
            }}
            role="img"
            aria-label="Agricultural drone flying over a green crop field"
          />
          <div className="hero-overlay absolute inset-0" />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div style={{ animation: "fadeUp 0.9s ease 0.3s both" }}>
            </div>
            <div style={{ animation: "fadeUp 0.9s ease 0.5s both" }}>
              <h1
                className="display-font leading-tight mb-6"
                style={{ color: "var(--color-text)", fontSize: "clamp(2.4rem, 6vw, 5.2rem)", maxWidth: "820px" }}
              >
                {t("home.hero_title1")}<br />
                <span className="hero-brand">Cropyaan</span>
              </h1>
            </div>
            <div style={{ animation: "fadeUp 0.9s ease 0.7s both" }}>
              <p className="text-lg max-w-lg mb-10" style={{ color: "var(--color-text-muted)", fontWeight: 300, lineHeight: 1.8 }}>
                {t("home.hero_subtitle")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fadeUp 0.9s ease 0.9s both" }}>
              <button className="primary-btn px-8 py-4 rounded-xl font-semibold text-sm" onClick={() => navigate("/services")}>
                Explore Solutions
              </button>
              <button className="secondary-btn px-8 py-4 rounded-xl font-semibold text-sm" onClick={() => navigate("/how-it-works")}>
                Book Drone Services
              </button>
            </div>
          </div>

          <div className="relative z-10 flex justify-center pb-10" style={{ animation: "fadeUp 0.9s ease 1.1s both" }}>
            <div className="scroll-indicator" aria-hidden="true">
              <div className="scroll-line" />
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== KNOWLEDGE PILLARS ===== */}
       <section className="py-16 px-6 lg:px-20 relative overflow-hidden">
  <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
    
    {/* Card 1 - Crop Advisory */}
    <button 
      onClick={() => navigate("/crop-recommendation")}
      className="group bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 flex flex-col items-center text-center shadow-sm h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-white dark:hover:bg-white/10 hover:border-green-500/30 w-full"
    >
      <div className="mb-4 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
        <img src="/assets/pillar-crop.jpg" className="w-20 h-16 object-cover" alt="icon" />
      </div>
      <h3 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-green-600" style={{ color: "var(--color-text)" }}>
        {t("home.pillar1_label")}
      </h3>
      <p className="text-sm opacity-70 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {t("home.pillar1_desc")}
      </p>
    </button>

    {/* Card 2 - Weather Forecasts */}
    <button 
      onClick={() => navigate("/weather-advisory")}
      className="group bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 flex flex-col items-center text-center shadow-sm h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-white dark:hover:bg-white/10 hover:border-green-500/30 w-full"
    >
      <div className="mb-4 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
        <img src="/assets/pillar-weather.jpg" className="w-20 h-16 object-cover" alt="icon" />
      </div>
      <h3 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-green-600" style={{ color: "var(--color-text)" }}>
        {t("home.pillar2_label")}
      </h3>
      <p className="text-sm opacity-70 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {t("home.pillar2_desc")}
      </p>
    </button>

    {/* Card 3 - Govt Schemes */}
    <button 
      onClick={() => navigate("/schemes")}
      className="group bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 flex flex-col items-center text-center shadow-sm h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-white dark:hover:bg-white/10 hover:border-green-500/30 w-full"
    >
      <div className="mb-4 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
        <img src="/assets/pillar-market.jpg" className="w-20 h-16 object-cover" alt="icon" />
      </div>
      <h3 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-green-600" style={{ color: "var(--color-text)" }}>
        {t("home.pillar3_label")}
      </h3>
      <p className="text-sm opacity-70 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {t("home.pillar3_desc")}
      </p>
    </button>

    {/* Card 4 - Market Prices */}
    <button 
      onClick={() => navigate("/market-prices")}
      className="group bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 flex flex-col items-center text-center shadow-sm h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-white dark:hover:bg-white/10 hover:border-green-500/30 w-full"
    >
      <div className="mb-4 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
        <img src="/assets/pillar-plan.jpg" className="w-20 h-16 object-cover" alt="icon" />
      </div>
      <h3 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-green-600" style={{ color: "var(--color-text)" }}>
        {t("home.pillar4_label")}
      </h3>
      <p className="text-sm opacity-70 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {t("home.pillar4_desc")}
      </p>
    </button>

  </div>
</section>

        <Separator />

        {/* ===== SERVICES ===== */}
        <section className="py-24 px-6 lg:px-20 relative overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <FadeIn delay={0.05}>
      <p className="section-eyebrow text-center mb-3">What We Offer</p>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center">
        {t("home.modern_title1")} <span className="accent-text">{t("home.modern_title2")}</span>
      </h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="mb-14 text-center max-w-xl mx-auto" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
        {t("home.modern_subtitle")}
      </p>
    </FadeIn>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <ServiceCard
        image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&q=75&auto=format&fit=crop"
        alt="Agricultural drone monitoring crops from above"
        title="Drone Crop Monitoring"
        desc="Real-time aerial surveillance of your fields using high-resolution drone imaging to detect stress, disease, and growth patterns early."
        delay={0}
      />
      <ServiceCard
        image="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&h=400&q=75&auto=format&fit=crop"
        alt="Drone performing precision spraying over farmland"
        title="Precision Spraying"
        desc="GPS-guided variable-rate spraying that reduces chemical usage by up to 40% while improving coverage uniformity across every row."
        delay={0.08}
      />
      <ServiceCard
        image="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&q=75&auto=format&fit=crop"
        alt="Soil sampling and crop analysis in a field"
        title="Soil & Crop Analysis"
        desc="Detailed soil health reports and multi-spectral crop analysis delivered within 48 hours to guide fertilisation and irrigation decisions."
        delay={0.16}
      />
      <ServiceCard
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&q=75&auto=format&fit=crop"
        alt="Data dashboard showing agricultural insights"
        title="Agricultural Insights"
        desc="AI-driven recommendations on sowing schedules, pest risk, market timing, and yield forecasts tailored to your specific region and crop."
        delay={0.24}
      />
    </div>
  </div>
</section>

        <Separator />

        {/* ===== WEATHER ADVISORY BANNER ===== */}
        <section className="py-16 px-6 lg:px-20">
          <FadeIn>
            <div className="weather-banner max-w-5xl mx-auto rounded-2xl overflow-hidden">
              <div className="weather-banner-inner">
                <div className="weather-image-side">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=75&auto=format&fit=crop"
                    alt="Aerial view of farmland at sunrise"
                    className="weather-banner-img"
                    loading="lazy"
                  />
                  <div className="weather-banner-img-overlay" />
                </div>
                <div className="weather-content-side px-8 py-10">
  {/* Eyebrow removed */}
  
  <div className="mb-4">
    <h3 className="display-font text-2xl font-bold leading-tight" style={{ color: "var(--color-text)" }}>
      {t("home.weather_title1")}
    </h3>
    <p className="text-xl font-medium" style={{ color: "var(--color-text-muted)" }}>
      {t("home.weather_title2")}
    </p>
  </div>

  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
    {t("home.weather_desc")}
  </p>

 <button 
  className="weather-btn px-6 py-3 rounded-xl font-semibold text-sm" 
  onClick={() => navigate("/weather-advisory")} // Matches the route path exactly
>
  {t("home.weather_btn")}
  <svg className="inline-block ml-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
</button>
</div>
              </div>
            </div>
          </FadeIn>
        </section>

        <Separator />

        {/* ===== MODERN FARMING RESOURCES ===== */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeIn delay={0.05}>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="display-font text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {t("home.modern_title1")} <span className="accent-text">{t("home.modern_title2")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                  {t("home.modern_subtitle")}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-3">
                  {[
                    { labelKey: t("home.res1_label"), descKey: t("home.res1_desc"), href: "https://mkisan.gov.in" },
                    { labelKey: t("home.res2_label"), descKey: t("home.res2_desc"), href: "https://mausam.imd.gov.in" },
                    { labelKey: t("home.res3_label"), descKey: t("home.res3_desc"), href: "https://pmkisan.gov.in" },
                    { labelKey: t("home.res4_label"), descKey: t("home.res4_desc"), href: "https://agmarknet.gov.in" },
                    { labelKey: t("home.res5_label"), descKey: t("home.res5_desc"), href: "https://icar.org.in" },
                  ].map((item, i) => (
                    <FadeIn key={i} delay={0.35 + i * 0.07}>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="resource-link rounded-xl px-5 py-4">
                        <div className="dot" />
                        <div>
                          <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-text)" }}>
                            {item.labelKey}
                            <span className="ml-2 text-xs resource-arrow">↗</span>
                          </div>
                          <div className="text-xs" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{item.descKey}</div>
                        </div>
                      </a>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { titleKey: "home.card1_title", descKey: "home.card1_desc", href: "https://kisansuvidha.gov.in" },
                  { titleKey: "home.card2_title", descKey: "home.card2_desc", href: "https://enam.gov.in" },
                  { titleKey: "home.card3_title", descKey: "home.card3_desc", href: "https://pmfby.gov.in" },
                  { titleKey: "home.card4_title", descKey: "home.card4_desc", href: "https://upag.gov.in" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.09}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="card block rounded-xl p-6" style={{ textDecoration: "none" }}>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                        {t(item.titleKey)}
                        <span className="ml-1 text-xs resource-arrow">↗</span>
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{t(item.descKey)}</p>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== GUIDES & TUTORIALS ===== */}
        <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
          <div className="guides-bg-img absolute inset-0 pointer-events-none" />
          <div className="section-vignette absolute inset-0 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.05}>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center">
                {t("home.guides_title1")} <span className="accent-text">{t("home.guides_title2")}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-16 text-center max-w-xl mx-auto" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                {t("home.guides_subtitle")}
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: t("home.g1_title"), desc: t("home.g1_desc") },
                { title: t("home.g2_title"), desc: t("home.g2_desc") },
                { title: t("home.g3_title"), desc: t("home.g3_desc") },
                { title: t("home.g4_title"), desc: t("home.g4_desc") },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== GOVERNMENT SCHEMES ===== */}
        <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.05}>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center">
                {t("home.schemes_title1")} <span className="accent-text">{t("home.schemes_title2")}</span> {t("home.schemes_title3")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-16 text-center max-w-xl mx-auto" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                {t("home.schemes_subtitle")}
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: t("home.s1_title"), desc: t("home.s1_desc") },
                { title: t("home.s2_title"), desc: t("home.s2_desc") },
                { title: t("home.s3_title"), desc: t("home.s3_desc") },
                { title: t("home.s4_title"), desc: t("home.s4_desc") },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== CTA ===== */}
        <section className="relative py-32 px-6 text-center overflow-hidden">
          <div className="cta-bg-img absolute inset-0 pointer-events-none" />
          <div className="section-vignette absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn delay={0.05}>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font font-bold mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--color-text)" }}>
                {t("home.cta_title1")} <br />
                <span className="cta-accent-text">
                  {t("home.cta_title2")}
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "var(--color-text-muted)", fontWeight: 300, lineHeight: 1.8 }}>
                {t("home.cta_subtitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="cta-btn px-10 py-4 rounded-xl font-semibold text-sm" onClick={() => navigate("/services")}>
                  {t("home.cta_btn1")}
                </button>
                <button className="secondary-btn px-10 py-4 rounded-xl font-semibold text-sm" onClick={() => navigate("/about")}>
                  {t("home.cta_btn2")}
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </>
  );
}





























