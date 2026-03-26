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

const GrainOverlay = () => <div className="grain-overlay" />;
const Separator = () => <div className="separator" />;

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

const PillarCard = ({ icon, label, desc, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.8s ease ${delay}s` }}>
      <div className="card text-center px-6 py-8 rounded-2xl cursor-default">
        <div className="text-3xl mb-4">{icon}</div>
        <div className="font-semibold text-sm mb-2" style={{ color: "var(--color-text)", letterSpacing: "0.02em" }}>{label}</div>
        <div className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{desc}</div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, index }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.8s ease ${index * 0.1}s` }}>
      <div className="card h-full rounded-2xl p-8 cursor-default">
        <div className="feature-card-bar mb-6" />
        <h3 className="display-font feature-card-title text-xl font-bold mb-3">
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
          {desc}
        </p>
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
        if (bg) bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GrainOverlay />
      <div className="page-root overflow-x-hidden" style={{ background: "var(--bg-main)", color: "var(--color-text)" }}>

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative h-screen w-full flex flex-col overflow-hidden">
          <div
            className="hero-bg absolute inset-0 scale-110"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.75,
            }}
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.06) 0%, transparent 65%)" }} />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div style={{ animation: "fadeUp 1s ease 0.45s both" }}>
              <h1
                className="display-font leading-tight mb-8"
                style={{ color: "var(--color-text)", fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
              >
                {t("home.hero_title1")} <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 60px rgba(34,197,94,0.4)" }}>
                  CROPYAAN
                </span>
              </h1>
            </div>
            <div style={{ animation: "fadeUp 1s ease 0.65s both" }}>
              <p className="text-lg max-w-xl mb-12" style={{ color: "var(--color-text-muted)", fontWeight: 400, lineHeight: 1.8 }}>
                {t("home.hero_subtitle")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fadeUp 1s ease 0.85s both" }}>
              <button className="primary-btn px-8 py-4 rounded-xl font-semibold text-sm" onClick={() => navigate("/services")}>
                {t("home.hero_btn1")}
              </button>
              <button className="secondary-btn px-8 py-4 rounded-xl font-semibold text-sm" onClick={() => navigate("/how-it-works")}>
                {t("home.hero_btn2")}
              </button>
            </div>
          </div>

          <div className="relative z-10 flex justify-center pb-10" style={{ animation: "fadeUp 1s ease 1.1s both" }}>
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-px h-12" style={{ background: "var(--color-text)", animation: "pulse 2s infinite" }} />
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== KNOWLEDGE PILLARS ===== */}
        <section className="py-16 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, var(--green-4) 0%, transparent 70%)" }} />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            <PillarCard icon="🌾" label={t("home.pillar1_label")} desc={t("home.pillar1_desc")} delay={0}   />
            <PillarCard icon="🌦️" label={t("home.pillar2_label")} desc={t("home.pillar2_desc")} delay={0.1} />
            <PillarCard icon="📋" label={t("home.pillar3_label")} desc={t("home.pillar3_desc")} delay={0.2} />
            <PillarCard icon="📈" label={t("home.pillar4_label")} desc={t("home.pillar4_desc")} delay={0.3} />
          </div>
        </section>

        <Separator />

        {/* ===== WEATHER ADVISORY BANNER ===== */}
        <section className="py-16 px-6 lg:px-20">
          <FadeIn>
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, var(--green-8) 0%, rgba(34,197,94,0.03) 100%)", border: "1px solid var(--green-20)" }}>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="px-10 py-12">
                  <p className="text-green-400 text-xs uppercase mb-4" style={{ letterSpacing: "0.2em" }}>
                    {t("home.weather_tag")}
                  </p>
                  <h2 className="display-font text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: "var(--color-text)" }}>
                    {t("home.weather_title1")} <br />
                    <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.35)" }}>
                      {t("home.weather_title2")}
                    </span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-muted)", fontWeight: 300, maxWidth: 380 }}>
                    {t("home.weather_desc")}
                  </p>
                  <button
                    className="weather-btn px-7 py-3.5 rounded-xl font-semibold text-sm"
                    onClick={() => navigate("/weather-advisory")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                    {t("home.weather_btn")}
                  </button>
                </div>

                <div className="px-10 py-12 flex flex-col justify-center gap-5" style={{ borderLeft: "1px solid rgba(34,197,94,0.12)" }}>
                  {[
                    { icon: "🌧️", title: t("home.weather_why1_title"), desc: t("home.weather_why1_desc") },
                    { icon: "🌡️", title: t("home.weather_why2_title"), desc: t("home.weather_why2_desc") },
                    { icon: "💨", title: t("home.weather_why3_title"), desc: t("home.weather_why3_desc") },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                      <div>
                        <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-text)" }}>{item.title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <Separator />

        {/* ===== FARMING STATISTICS ===== */}
        <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1800&q=50')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04 }} />
          <div className="section-vignette absolute inset-0 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center">
                {t("home.stats_title1")} <span style={{ color: "#22c55e" }}>{t("home.stats_title2")}</span> {t("home.stats_title3")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-16 text-center max-w-xl mx-auto" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                {t("home.stats_subtitle")}
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: t("home.stats_c1_title"), desc: t("home.stats_c1_desc") },
                { title: t("home.stats_c2_title"), desc: t("home.stats_c2_desc") },
                { title: t("home.stats_c3_title"), desc: t("home.stats_c3_desc") },
                { title: t("home.stats_c4_title"), desc: t("home.stats_c4_desc") },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== CHALLENGES ===== */}
        <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, var(--green-4) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center">
                {t("home.challenges_title1")} <span style={{ color: "#22c55e" }}>{t("home.challenges_title2")}</span> {t("home.challenges_title3")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-16 text-center max-w-xl mx-auto" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                {t("home.challenges_subtitle")}
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: t("home.ch1_title"), desc: t("home.ch1_desc") },
                { title: t("home.ch2_title"), desc: t("home.ch2_desc") },
                { title: t("home.ch3_title"), desc: t("home.ch3_desc") },
                { title: t("home.ch4_title"), desc: t("home.ch4_desc") },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== MODERN FARMING KNOWLEDGE ===== */}
        <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn delay={0.1}>
                <h2 className="display-font text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {t("home.modern_title1")} <span style={{ color: "#22c55e" }}>{t("home.modern_title2")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                  {t("home.modern_subtitle")}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-4">
                  {[
                    { labelKey: t("home.res1_label"), descKey: t("home.res1_desc"), href: "https://mkisan.gov.in" },
                    { labelKey: t("home.res2_label"), descKey: t("home.res2_desc"), href: "https://mausam.imd.gov.in" },
                    { labelKey: t("home.res3_label"), descKey: t("home.res3_desc"), href: "https://pmkisan.gov.in" },
                    { labelKey: t("home.res4_label"), descKey: t("home.res4_desc"), href: "https://agmarknet.gov.in" },
                    { labelKey: t("home.res5_label"), descKey: t("home.res5_desc"), href: "https://icar.org.in" },
                  ].map((item, i) => (
                    <FadeIn key={i} delay={0.35 + i * 0.08}>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="resource-link rounded-xl px-5 py-4">
                        <div className="dot" />
                        <div>
                          <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-text)" }}>
                            {item.labelKey}
                            <span className="ml-2 text-xs" style={{ color: "#22c55e", opacity: 0.7 }}>↗</span>
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
              <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 60% 40%, var(--green-8) 0%, transparent 70%)" }} />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { titleKey: "home.card1_title", descKey: "home.card1_desc", href: "https://kisansuvidha.gov.in" },
                  { titleKey: "home.card2_title", descKey: "home.card2_desc", href: "https://enam.gov.in" },  
                  { titleKey: "home.card3_title", descKey: "home.card3_desc", href: "https://pmfby.gov.in" },
                  { titleKey: "home.card4_title", descKey: "home.card4_desc", href: "https://upag.gov.in" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="card block rounded-xl p-6" style={{ textDecoration: "none" }}>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                        {t(item.titleKey)}
                        <span className="ml-1 text-xs" style={{ color: "#22c55e", opacity: 0.7 }}>↗</span>
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
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&q=50')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04 }} />
          <div className="section-vignette absolute inset-0 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center">
                {t("home.guides_title1")} <span style={{ color: "#22c55e" }}>{t("home.guides_title2")}</span>
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
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, var(--green-4) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center">
                {t("home.schemes_title1")} <span style={{ color: "#22c55e" }}>{t("home.schemes_title2")}</span> {t("home.schemes_title3")}
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
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }} />
          <div className="section-vignette absolute inset-0 pointer-events-none" />
          <div className="absolute pointer-events-none" style={{ width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, var(--green-8) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)" }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn delay={0.1}>
              <h2 className="display-font font-bold mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--color-text)" }}>
                {t("home.cta_title1")} <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)", fontStyle: "italic" }}>
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
