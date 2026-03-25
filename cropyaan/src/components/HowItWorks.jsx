import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../cssPages/HowItWorks.css";
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

const GrainOverlay = () => <div className="grain-overlay" />;

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

  const cardStyle = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 0.9s ease ${index * 0.12}s, transform 0.9s ease ${index * 0.12}s`
  };

  return (
    <div ref={ref} style={cardStyle}>
      <div
        className="step-card-container relative w-full grid lg:grid-cols-2 rounded-2xl overflow-hidden"
        style={{
          border: hovered ? "1px solid var(--green-25)" : "1px solid var(--overlay-6)",
          boxShadow: hovered ? "0 0 0 1px rgba(34,197,94,0.1), 0 16px 64px var(--green-8)" : "0 8px 40px var(--overlay-10)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image side */}
        <div className={`step-image-wrapper relative overflow-hidden ${isEven ? "" : "lg:order-2"}`}>
          <div
            className="step-bg-image absolute inset-0"
            style={{
              backgroundImage: `url('${step.image}')`,
              transform: hovered ? "scale(1.08)" : "scale(1.05)",
            }}
          />
          <div className="absolute inset-0" style={{ background: isEven ? "linear-gradient(to right, transparent 0%, var(--surface-bg) 100%)" : "linear-gradient(to left, transparent 0%, var(--surface-bg) 100%)" }} />
          <div className="absolute inset-0 bg-[var(--image-overlay)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(34,197,94,0.06)_0%,transparent_70%)]" />
          <div className={`step-number-watermark absolute font-bold select-none pointer-events-none ${isEven ? "left-[12px]" : "right-[12px]"}`}>
            {step.number}
          </div>
        </div>

        {/* Content side */}
        <div className={`relative flex flex-col justify-center px-8 lg:px-12 py-12 ${isEven ? "" : "lg:order-1"}`}>
          <div className="glow-orb absolute pointer-events-none" style={{ opacity: hovered ? 1 : 0.5 }} />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold tracking-[0.2em] text-[#22c55e]">{step.number}</span>
              <div className="w-px h-4 bg-[var(--green-30)]" />
              <span className="text-xs tracking-[0.18em] uppercase font-medium text-green-500/70">{step.tag}</span>
            </div>
            <h3
              className="display-font text-3xl font-bold mb-4 leading-tight transition-all duration-350"
              style={{ 
                color: hovered ? "#22c55e" : "var(--color-text)", 
                textShadow: hovered ? "0 0 24px var(--green-25)" : "none" 
              }}
            >
              {step.title}
            </h3>
            <p className="text-base leading-relaxed font-light text-[var(--color-text-muted)] transition-colors duration-350">
              {step.desc}
            </p>
            <div className="step-line-indicator mt-8 h-0.5 rounded-full" style={{ width: hovered ? "80px" : "40px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { number: "01", title: t("hiw.step1_title"), tag: t("hiw.step1_tag"), desc: t("hiw.step1_desc"), image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=75" },
    { number: "02", title: t("hiw.step2_title"), tag: t("hiw.step2_tag"), desc: t("hiw.step2_desc"), image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=900&q=75" },
    { number: "03", title: t("hiw.step3_title"), tag: t("hiw.step3_tag"), desc: t("hiw.step3_desc"), image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75" },
    { number: "04", title: t("hiw.step4_title"), tag: t("hiw.step4_tag"), desc: t("hiw.step4_desc"), image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=75" },
    { number: "05", title: t("hiw.step5_title"), tag: t("hiw.step5_tag"), desc: t("hiw.step5_desc"), image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=75" },
  ];

  return (
    <>
      <GrainOverlay />
      <div className="hiw-root dark:bg-[var(--bg-main)]">

        {/* HERO */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')` }} />
          <div className="hero-vignette absolute inset-0 pointer-events-none" />
          <div className="absolute pointer-events-none w-[700px] h-[300px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(34,197,94,0.07)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[40px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-[0.22em] text-xs uppercase mb-5 font-medium">{t("hiw.hero_tag")}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                {t("hiw.hero_title1")}{" "}
                <span className="text-[#22c55e] [text-shadow:0_0_40px_rgba(34,197,94,0.35)]">{t("hiw.hero_title2")}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 text-lg font-light">{t("hiw.hero_subtitle")}</p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* STEPS */}
        <section className="py-20 px-6 lg:px-20 relative">
          <div className="grid-overlay absolute inset-0 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10 space-y-8">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </section>

        <Separator />

        {/* CLOSING */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
          <div className="absolute pointer-events-none w-[600px] h-[300px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(34,197,94,0.07)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[50px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-[0.22em] text-xs uppercase mb-5 font-medium">{t("hiw.closing_tag")}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                {t("hiw.closing_title1")} <span className="text-[#22c55e] [text-shadow:0_0_30px_var(--green-30)]">{t("hiw.closing_title2")}</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 text-base leading-relaxed font-light">{t("hiw.closing_subtitle")}</p>
            </FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </>
  );
}