import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../cssPages/About.css";
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
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

const GrainOverlay = () => (
  <div style={{
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.032,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: "128px 128px",
  }} />
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

const AgriSplit = ({ imageUrl, imageAlt, reverse = false, children }) => {
  const parallaxRef = useParallax();
  return (
    <div ref={parallaxRef} className="relative w-full grid lg:grid-cols-2 min-h-[520px]">
      <div className={`relative overflow-hidden ${reverse ? "lg:order-2" : ""}`} style={{ minHeight: 320 }}>
        <div
          className="parallax-bg absolute inset-0 scale-110"
          style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0" style={{
          background: reverse
            ? "linear-gradient(to left, var(--surface-bg) 0%, var(--surface-bg-cc) 10%, var(--surface-bg-88) 22%, transparent 100%)"
            : "linear-gradient(to right, var(--surface-bg) 0%, var(--surface-bg-cc) 10%, var(--surface-bg-88) 22%, transparent 100%)"
        }} />
        <div className="absolute inset-0" style={{ background: "var(--image-overlay)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 80%, rgba(34,197,94,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className={`relative flex items-center ${reverse ? "lg:order-1" : ""}`} style={{ background: "var(--surface-bg)" }}>
        <div className="absolute inset-0" style={{
          background: reverse
            ? "linear-gradient(to right, transparent 0%, var(--surface-bg) 100%)"
            : "linear-gradient(to left, transparent 0%, var(--surface-bg) 100%)"
        }} />
        <div className="absolute pointer-events-none" style={{
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 70%)",
          top: "50%", left: reverse ? "auto" : "10%", right: reverse ? "10%" : "auto",
          transform: "translateY(-50%)", filter: "blur(40px)",
        }} />
        <div className="relative z-10 w-full px-8 lg:px-14 py-14">{children}</div>
      </div>
    </div>
  );
};

export default function About() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const pillars = [
    { label: t("about.pillar1_label"), desc: t("about.pillar1_desc") },
    { label: t("about.pillar2_label"), desc: t("about.pillar2_desc") },
    { label: t("about.pillar3_label"), desc: t("about.pillar3_desc") },
    { label: t("about.pillar4_label"), desc: t("about.pillar4_desc") },
  ];

  const shareItems = [
    t("about.share_b1"), t("about.share_b2"), t("about.share_b3"),
    t("about.share_b4"), t("about.share_b5"),
  ];

  const offerCards = [
    { title: t("about.card1_title"), items: [t("about.card1_i1"), t("about.card1_i2"), t("about.card1_i3"), t("about.card1_i4")] },
    { title: t("about.card2_title"), items: [t("about.card2_i1"), t("about.card2_i2"), t("about.card2_i3"), t("about.card2_i4")] },
    { title: t("about.card3_title"), items: [t("about.card3_i1"), t("about.card3_i2"), t("about.card3_i3"), t("about.card3_i4")] },
    { title: t("about.card4_title"), items: [t("about.card4_i1"), t("about.card4_i2"), t("about.card4_i3"), t("about.card4_i4")] },
  ];

  const convictionCards = [
    { label: t("about.mission_label"), text: t("about.mission_text") },
    { label: t("about.vision_label"),  text: t("about.vision_text")  },
    { label: t("about.values_label"),  text: t("about.values_text")  },
  ];

  return (
    <>
      <GrainOverlay />

      <div className="page-root dark:bg-[var(--bg-main)]">

        {/* ===== HERO ===== */}
        <AgriSplit
          imageUrl="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2000&auto=format&fit=crop"
          imageAlt="Farmer in a field"
        >
          <FadeIn delay={0.1}>
            <h2 className="display-font text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--color-text)" }}>
              {t("about.hero_title1")}{" "}
              <span style={{ color: "#22c55e", textShadow: "0 0 32px rgba(34,197,94,0.35)" }}>
                {t("about.hero_title2")}
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mb-5 leading-relaxed text-base" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{t("about.hero_p1")}</p>
            <p className="mb-10 leading-relaxed text-base" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{t("about.hero_p2")}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 gap-6 pt-8" style={{ borderTop: "1px solid rgba(34,197,94,0.18)" }}>
              {pillars.map((item, i) => (
                <div key={i}>
                  <p className="font-semibold text-sm mb-1" style={{ color: "var(--color-text)" }}>{item.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* ===== WHAT WE SHARE ===== */}
        <AgriSplit
          imageUrl="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80"
          imageAlt="Crop field aerial"
          reverse
        >
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-10" style={{ color: "var(--color-text)" }}>
              {t("about.share_title1")} <span style={{ color: "#22c55e" }}>{t("about.share_title2")}</span>
            </h3>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-5">
              {shareItems.map((item, i) => (
                <div key={i} className="bullet-row flex items-start gap-4 cursor-default">
                  <div className="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-8)", border: "1px solid var(--green-20)" }}>
                    <div className="bullet-dot w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <p className="bullet-text text-base" style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* ===== PLATFORM OFFERINGS ===== */}
        <section className="py-24 px-6 lg:px-20 relative overflow-hidden" style={{ background: "var(--bg-main)" }}>
          <div className="absolute pointer-events-none" style={{
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, var(--green-4) 0%, transparent 70%)",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)",
          }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-20 text-center" style={{ color: "var(--color-text)" }}>
                {t("about.offers_title1")} <span style={{ color: "#22c55e" }}>{t("about.offers_title2")}</span>
              </h3>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {offerCards.map((card, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="offer-card rounded-2xl p-8 h-full cursor-default">
                    <div className="flex items-center gap-3 mb-7">
                      <div className="offer-card-bar" />
                      <h4 className="offer-card-title text-xl font-semibold" style={{ color: "var(--color-text)", letterSpacing: "-0.01em", transition: "color 0.3s" }}>
                        {card.title}
                      </h4>
                    </div>
                    <ul className="space-y-3 pl-2">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="offer-card-arrow text-green-500 mt-0.5 text-sm">▸</span>
                          <span className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)", transition: "color 0.3s" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== MISSION, VISION, VALUES ===== */}
        <section className="py-24 px-6 lg:px-20 relative overflow-hidden" style={{ background: "var(--bg-main)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=60')`,
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04,
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to bottom, var(--surface-bg) 0%, transparent 30%, transparent 70%, var(--surface-bg) 100%)",
          }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.05}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-20 text-center" style={{ color: "var(--color-text)" }}>
                {t("about.conviction_title1")} <span style={{ color: "#22c55e" }}>{t("about.conviction_title2")}</span>
              </h3>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {convictionCards.map((item, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className="conviction-card group text-center flex flex-col items-center cursor-default py-10 px-6 rounded-2xl">
                    <div className="mb-8">
                      <div className="conviction-bar" />
                    </div>
                    <h3 className="conviction-card-title display-font text-2xl font-bold mb-5" style={{ color: "var(--color-text)", letterSpacing: "-0.01em", transition: "color 0.3s" }}>
                      {item.label}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <Separator />

      </div>
    </>
  );
}