import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const GrainOverlay = () => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.032,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: "128px 128px" }} />
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

const StepCard = ({ step, index }) => {
  const [ref, inView] = useInView(0.12);
  const isEven = index % 2 === 0;
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.9s ease ${index * 0.12}s, transform 0.9s ease ${index * 0.12}s` }}>
      <div
        className="relative w-full grid lg:grid-cols-2 rounded-2xl overflow-hidden"
        style={{
          border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: hovered ? "0 0 0 1px rgba(34,197,94,0.1), 0 16px 64px rgba(34,197,94,0.08)" : "0 8px 40px rgba(0,0,0,0.4)",
          transition: "border-color 0.4s, box-shadow 0.4s",
          background: "var(--bg-main)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image half */}
        <div className={`relative overflow-hidden ${isEven ? "" : "lg:order-2"}`} style={{ minHeight: 260 }}>
          <div
            className="absolute inset-0 scale-105"
            style={{
              backgroundImage: `url('${step.image}')`,
              backgroundSize: "cover", backgroundPosition: "center",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.08)" : "scale(1.05)",
            }}
          />
          <div className="absolute inset-0" style={{ background: isEven ? "linear-gradient(to right, transparent 0%, var(--bg-main) 100%)" : "linear-gradient(to left, transparent 0%, var(--bg-main) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "var(--hero-overlay-1)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />
          <div
            className="absolute font-bold select-none pointer-events-none"
            style={{ fontSize: "clamp(80px, 14vw, 140px)", color: "rgba(34,197,94,0.07)", bottom: "-12px", left: isEven ? "12px" : "auto", right: isEven ? "auto" : "12px", lineHeight: 1, fontFamily: "'Playfair Display', serif" }}
          >
            {step.number}
          </div>
        </div>

        {/* Content half */}
        <div className={`relative flex flex-col justify-center px-8 lg:px-12 py-12 ${isEven ? "" : "lg:order-1"}`}>
          <div className="absolute pointer-events-none" style={{ width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)", opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s" }} />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold tracking-widest" style={{ color: "#22c55e", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}>{step.number}</span>
              <div style={{ width: 1, height: 16, background: "var(--green-30)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.7)", letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{step.tag}</span>
            </div>
            <h3
              className="text-3xl font-bold mb-4 leading-tight"
              style={{ color: hovered ? "#22c55e" : "var(--color-text)", fontFamily: "'Playfair Display', serif", transition: "color 0.35s", textShadow: hovered ? "0 0 24px rgba(34,197,94,0.25)" : "none" }}
            >
              {step.title}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: hovered ? "rgba(255,255,255,0.85)" : "var(--color-text-muted)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, transition: "color 0.35s" }}>
              {step.desc}
            </p>
            <div className="mt-8 h-0.5 rounded-full" style={{ background: "linear-gradient(to right, #22c55e, transparent)", width: hovered ? "80px" : "40px", transition: "width 0.5s ease", boxShadow: "0 0 8px rgba(34,197,94,0.4)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // forces re-render on language change

  const steps = [
    { number: "01", title: t("hiw.step1_title"), tag: t("hiw.step1_tag"), desc: t("hiw.step1_desc"), image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=75" },
    { number: "02", title: t("hiw.step2_title"), tag: t("hiw.step2_tag"), desc: t("hiw.step2_desc"), image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=900&q=75" },
    { number: "03", title: t("hiw.step3_title"), tag: t("hiw.step3_tag"), desc: t("hiw.step3_desc"), image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75" },
    { number: "04", title: t("hiw.step4_title"), tag: t("hiw.step4_tag"), desc: t("hiw.step4_desc"), image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=75" },
    { number: "05", title: t("hiw.step5_title"), tag: t("hiw.step5_tag"), desc: t("hiw.step5_desc"), image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=75" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .hiw-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
      `}</style>
      <GrainOverlay />
      <div className="hiw-root dark:bg-[var(--bg-main)]">

        {/* HERO */}
        <section className="relative dark:bg-[var(--bg-main)] py-28 px-6 text-slate-900 dark:text-white text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-main) 0%, transparent 40%, transparent 60%, var(--bg-main) 100%)" }} />
          <div className="absolute pointer-events-none" style={{ width: 700, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)" }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
                {t("hiw.hero_tag")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("hiw.hero_title1")}{" "}
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>{t("hiw.hero_title2")}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 text-lg" style={{ fontWeight: 300 }}>
                {t("hiw.hero_subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* STEPS */}
        <section className="dark:bg-[var(--bg-main)] py-20 px-6 lg:px-20 text-slate-900 dark:text-white relative">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.013) 80px, rgba(34,197,94,0.013) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.013) 80px, rgba(34,197,94,0.013) 81px)" }} />
          <div className="max-w-6xl mx-auto relative z-10 space-y-8">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </section>

        <Separator />

        {/* CLOSING */}
        <section className="dark:bg-[var(--bg-main)] py-24 px-6 text-slate-900 dark:text-white text-center relative overflow-hidden">
          <div className="absolute pointer-events-none" style={{ width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(50px)" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
                {t("hiw.closing_tag")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("hiw.closing_title1")} <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>{t("hiw.closing_title2")}</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 text-base leading-relaxed" style={{ fontWeight: 300 }}>
                {t("hiw.closing_subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </>
  );
}