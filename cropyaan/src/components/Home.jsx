import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const GrainOverlay = () => (
  <div
    style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.032,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }}
  />
);

const Separator = () => (
  <div className="relative h-px w-full overflow-hidden">
    <div style={{ background: "var(--sep-grad)", height: "1px" }} />
  </div>
);

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
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.8s ease ${delay}s` }}>
      <div
        className="text-center px-6 py-8 rounded-2xl cursor-default"
        style={{
          background: hovered ? "var(--green-4)" : "var(--bg-main)",
          border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid var(--overlay-10)",
          boxShadow: hovered ? "0 0 40px rgba(34,197,94,0.07)" : "0 8px 40px rgba(0,0,0,0.03)",
          transition: "all 0.4s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="text-3xl mb-4">{icon}</div>
        <div className="font-semibold text-slate-900 dark:text-white text-sm mb-2" style={{ letterSpacing: "0.02em" }}>{label}</div>
        <div className="text-slate-600 dark:text-zinc-500 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{desc}</div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, index }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.8s ease ${index * 0.1}s` }}
    >
      <div
        className="h-full rounded-2xl p-8 cursor-default"
        style={{
          background: hovered ? "var(--green-4)" : "var(--bg-main)",
          border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid var(--overlay-10)",
          boxShadow: hovered ? "0 0 40px rgba(34,197,94,0.07)" : "0 8px 40px rgba(0,0,0,0.03)",
          transition: "all 0.4s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-10 h-0.5 rounded-full mb-6" style={{ background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.5)", width: hovered ? 56 : 40, transition: "width 0.4s" }} />
        <h3
          className="display-font text-xl font-bold mb-3"
          style={{ color: hovered ? "#22c55e" : "var(--color-text)", fontFamily: "'Playfair Display', serif", transition: "color 0.3s" }}
        >
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: hovered ? "var(--color-text)" : "var(--color-text-muted)", fontWeight: 300, transition: "color 0.3s" }}>
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .home-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes weatherPulse { 0%, 100% { box-shadow: 0 0 32px rgba(34,197,94,0.35); } 50% { box-shadow: 0 0 56px rgba(34,197,94,0.6); } }
      `}</style>
      <GrainOverlay />
      <div className="home-root dark:bg-[var(--bg-main)] text-slate-900 dark:text-white overflow-x-hidden">

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative h-screen w-full flex flex-col overflow-hidden">
          <div
            className="hero-bg absolute inset-0 scale-110"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
              backgroundSize: "cover", backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--hero-overlay-1) 0%, var(--hero-overlay-2) 50%, var(--bg-main) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.06) 0%, transparent 65%)" }} />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div style={{ animation: "fadeUp 1s ease 0.45s both" }}>
              <h1
                className="display-font text-white leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 7vw, 6rem)", textShadow: "0 2px 40px var(--hero-overlay-2)" }}
              >
                {t("home.hero_title1")} <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 60px rgba(34,197,94,0.4)", fontStyle: "normal" }}>
                  CROPYAAN
                </span>
              </h1>
            </div>
            <div style={{ animation: "fadeUp 1s ease 0.65s both" }}>
              <p className="text-zinc-300 text-lg max-w-xl mb-12" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                {t("home.hero_subtitle")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fadeUp 1s ease 0.85s both" }}>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide"
                style={{ background: "#22c55e", color: "#000", boxShadow: "0 0 32px rgba(34,197,94,0.4)", letterSpacing: "0.05em", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 48px rgba(34,197,94,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 32px rgba(34,197,94,0.4)"; }}
                onClick={() => navigate("/services")}
              >
                {t("home.hero_btn1")}
              </button>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide text-white"
                style={{ background: "var(--overlay-7)", border: "1px solid var(--overlay-15)", letterSpacing: "0.05em", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "var(--green-8)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--overlay-15)"; e.currentTarget.style.background = "var(--overlay-7)"; }}
                onClick={() => navigate("/how-it-works")}
              >
                {t("home.hero_btn2")}
              </button>
            </div>
          </div>

          <div className="relative z-10 flex justify-center pb-10" style={{ animation: "fadeUp 1s ease 1.1s both" }}>
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-px h-12 bg-white" style={{ animation: "pulse 2s infinite" }} />
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== KNOWLEDGE PILLARS ===== */}
        <section className="dark:bg-[var(--bg-main)] py-16 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)" }} />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            <PillarCard icon="🌾" label={t("home.pillar1_label")} desc={t("home.pillar1_desc")} delay={0}   />
            <PillarCard icon="🌦️" label={t("home.pillar2_label")} desc={t("home.pillar2_desc")} delay={0.1} />
            <PillarCard icon="📋" label={t("home.pillar3_label")} desc={t("home.pillar3_desc")} delay={0.2} />
            <PillarCard icon="📈" label={t("home.pillar4_label")} desc={t("home.pillar4_desc")} delay={0.3} />
          </div>
        </section>

        <Separator />

        {/* ===== WEATHER ADVISORY BANNER ===== */}
        <section className="dark:bg-[var(--bg-main)] py-16 px-6 lg:px-20">
          <FadeIn>
            <div
              className="max-w-5xl mx-auto rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.03) 100%)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left text */}
                <div className="px-10 py-12">
                  <p className="text-green-400 text-xs uppercase tracking-widest mb-4" style={{ letterSpacing: "0.2em" }}>
                    {t("home.weather_tag")}
                  </p>
                  <h2 className="display-font text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t("home.weather_title1")} <br />
                    <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.35)" }}>
                      {t("home.weather_title2")}
                    </span>
                  </h2>
                  <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed mb-8" style={{ fontWeight: 300, maxWidth: 380 }}>
                    {t("home.weather_desc")}
                  </p>
                  <button
                    className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm"
                    style={{ background: "#22c55e", color: "#000", letterSpacing: "0.05em", animation: "weatherPulse 3s ease-in-out infinite", transition: "background 0.3s", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.animation = "none"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.animation = "weatherPulse 3s ease-in-out infinite"; }}
                    onClick={() => navigate("/weather-advisory")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                    {t("home.weather_btn")}
                  </button>
                </div>

                {/* Right — why it matters */}
                <div className="px-10 py-12 flex flex-col justify-center gap-5" style={{ borderLeft: "1px solid rgba(34,197,94,0.12)" }}>
                  {[
                    { icon: "🌧️", title: t("home.weather_why1_title"), desc: t("home.weather_why1_desc") },
                    { icon: "🌡️", title: t("home.weather_why2_title"), desc: t("home.weather_why2_desc") },
                    { icon: "💨", title: t("home.weather_why3_title"), desc: t("home.weather_why3_desc") },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                      <div>
                        <p className="text-slate-900 dark:text-white text-sm font-semibold mb-0.5">{item.title}</p>
                        <p className="text-slate-600 dark:text-zinc-500 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
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
        <section className="relative dark:bg-[var(--bg-main)] py-24 px-6 lg:px-20 text-slate-900 dark:text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1800&q=50')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-main), transparent 30%, transparent 70%, var(--bg-main))" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("home.stats_title1")} <span style={{ color: "#22c55e" }}>{t("home.stats_title2")}</span> {t("home.stats_title3")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
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
        <section className="relative dark:bg-[var(--bg-main)] py-24 px-6 lg:px-20 text-slate-900 dark:text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("home.challenges_title1")} <span style={{ color: "#22c55e" }}>{t("home.challenges_title2")}</span> {t("home.challenges_title3")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
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
        <section className="relative dark:bg-[var(--bg-main)] py-24 px-6 lg:px-20 text-slate-900 dark:text-white overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Resource List */}
            <div>
              <FadeIn delay={0.1}>
                <h2 className="display-font text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t("home.modern_title1")} <span style={{ color: "#22c55e" }}>{t("home.modern_title2")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-slate-500 dark:text-zinc-400 text-base leading-relaxed mb-10" style={{ fontWeight: 300 }}>
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
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 rounded-xl px-5 py-4"
                        style={{ background: "var(--bg-main)", border: "1px solid var(--overlay-10)", textDecoration: "none", transition: "all 0.35s", display: "flex" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-30)"; e.currentTarget.style.background = "var(--green-5)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--overlay-7)"; e.currentTarget.style.background = "var(--overlay-25)"; }}
                      >
                        <div style={{ marginTop: 6, flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
                        <div>
                          <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-text)" }}>
                            {t(item.labelKey)}
                            <span className="ml-2 text-xs" style={{ color: "#22c55e", opacity: 0.7 }}>↗</span>
                          </div>
                          <div className="text-xs" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{t(item.descKey)}</div>
                        </div>
                      </a>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* RIGHT — Info Cards */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 60% 40%, rgba(34,197,94,0.08) 0%, transparent 70%)" }} />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { titleKey: "home.card1_title", descKey: "home.card1_desc", href: "https://mkisan.gov.in" },
                  { titleKey: "home.card2_title", descKey: "home.card2_desc", href: "https://mausam.imd.gov.in" },
                  { titleKey: "home.card3_title", descKey: "home.card3_desc", href: "https://agmarknet.gov.in" },
                  { titleKey: "home.card4_title", descKey: "home.card4_desc", href: "https://icar.org.in" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl p-6"
                      style={{ background: "var(--bg-main)", border: "1px solid var(--overlay-10)", textDecoration: "none", transition: "all 0.4s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-25)"; e.currentTarget.style.background = "var(--green-4)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--overlay-7)"; e.currentTarget.style.background = "var(--overlay-25)"; }}
                    >
                      <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                        {t(item.titleKey)}
                        <span className="ml-1 text-xs" style={{ color: "#22c55e", opacity: 0.7 }}>↗</span>
                      </h4>
                      <p className="text-slate-600 dark:text-zinc-500 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{t(item.descKey)}</p>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== GUIDES & TUTORIALS ===== */}
        <section className="relative dark:bg-[var(--bg-main)] py-24 px-6 lg:px-20 text-slate-900 dark:text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&q=50')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-main), transparent 25%, transparent 75%, var(--bg-main))" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("home.guides_title1")} <span style={{ color: "#22c55e" }}>{t("home.guides_title2")}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
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
        <section className="relative dark:bg-[var(--bg-main)] py-24 px-6 lg:px-20 text-slate-900 dark:text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("home.schemes_title1")} <span style={{ color: "#22c55e" }}>{t("home.schemes_title2")}</span> {t("home.schemes_title3")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
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
        <section className="relative dark:bg-[var(--bg-main)] py-32 px-6 text-slate-900 dark:text-white text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-main) 0%, transparent 30%, transparent 70%, var(--bg-main) 100%)" }} />
          <div className="absolute pointer-events-none" style={{ width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)" }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn delay={0.1}>
              <h2
                className="display-font font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--color-text)" }}
              >
                {t("home.cta_title1")} <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)", fontStyle: "italic" }}>
                  {t("home.cta_title2")}
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 text-lg mb-12 max-w-xl mx-auto" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                {t("home.cta_subtitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-10 py-4 rounded-xl font-semibold text-sm"
                  style={{ background: "#22c55e", color: "#000", boxShadow: "0 0 40px rgba(34,197,94,0.4)", letterSpacing: "0.06em", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 60px rgba(34,197,94,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.4)"; }}
                  onClick={() => navigate("/services")}
                >
                  {t("home.cta_btn1")}
                </button>
                <button
                  className="px-10 py-4 rounded-xl font-semibold text-sm text-slate-900 dark:text-white"
                  style={{ background: "var(--overlay-7)", border: "1px solid var(--overlay-15)", letterSpacing: "0.06em", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "var(--green-8)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--overlay-15)"; e.currentTarget.style.background = "var(--overlay-7)"; }}
                  onClick={() => navigate("/about")}
                >
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