import Navbar from "./Navbar";
import React, { useEffect, useRef, useState } from "react";

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
    <div style={{ background: "linear-gradient(90deg, transparent 0%, #22c55e44 30%, #22c55e88 50%, #22c55e44 70%, transparent 100%)", height: "1px" }} />
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
      }}
    >
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
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: reverse
              ? "linear-gradient(to left, #0a0a0a 0%, #0a0a0acc 18%, #0a0a0a88 40%, transparent 100%)"
              : "linear-gradient(to right, #0a0a0a 0%, #0a0a0acc 18%, #0a0a0a88 40%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.38)" }} />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 60% 80%, rgba(34,197,94,0.07) 0%, transparent 70%)",
          }}
        />
      </div>
      <div
        className={`relative flex items-center ${reverse ? "lg:order-1" : ""}`}
        style={{ background: "#0a0a0a" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: reverse
              ? "linear-gradient(to right, transparent 0%, #0a0a0a 100%)"
              : "linear-gradient(to left, transparent 0%, #0a0a0a 100%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 70%)",
            top: "50%", left: reverse ? "auto" : "10%", right: reverse ? "10%" : "auto",
            transform: "translateY(-50%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10 w-full px-8 lg:px-14 py-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .about-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
        .glow-card:hover { box-shadow: 0 0 0 1px rgba(34,197,94,0.25), 0 8px 48px rgba(34,197,94,0.1); }
        .bullet-row:hover .bullet-dot { box-shadow: 0 0 12px rgba(34,197,94,0.9); transform: scale(1.3); }
        .bullet-row:hover .bullet-text { color: #fff; }
      `}</style>
      <GrainOverlay />
      <div className="about-root bg-[#0a0a0a]">
        <Navbar />

        {/* HERO SECTION */}
        <AgriSplit imageUrl="/farmerwithdrone.jpg" imageAlt="Farmer using drone in field">
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              Agricultural Intelligence
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="display-font text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Empowering the{" "}
              <span style={{ color: "#22c55e", textShadow: "0 0 32px rgba(34,197,94,0.35)" }}>
                Modern Farmer
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-zinc-400 mb-5 leading-relaxed text-base" style={{ fontWeight: 300 }}>
              Cropyaan bridges the gap between traditional agriculture and next-generation technology. We believe farming should be driven by precision, powered by data, and supported by intelligent systems.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed text-base" style={{ fontWeight: 300 }}>
              Through advanced drone deployments and AI-driven field analytics, we deliver real-time crop health insights, soil monitoring, and predictive yield forecasting.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 gap-8 pt-8" style={{ borderTop: "1px solid rgba(34,197,94,0.18)" }}>
              <div>
                <h3 className="display-font text-3xl font-bold" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.4)" }}>10k+</h3>
                <p className="text-zinc-500 text-sm mt-1 tracking-wide">Acres Scanned</p>
              </div>
              <div>
                <h3 className="display-font text-3xl font-bold" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.4)" }}>50+</h3>
                <p className="text-zinc-500 text-sm mt-1 tracking-wide">Drone Models Deployed</p>
              </div>
            </div>
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* WHAT WE DO */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80" imageAlt="Crop field aerial" reverse>
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              Our Services
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-10 text-white">
              What We <span style={{ color: "#22c55e" }}>Do</span>
            </h3>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-5 mb-10">
              {[
                "Precision spraying of fertilizers and pesticides",
                "Crop health monitoring & disease detection",
                "Aerial field surveying and mapping",
                "Data-driven farm insights and analytics",
              ].map((item, i) => (
                <div key={i} className="bullet-row flex items-start gap-4 cursor-default" style={{ transition: "all 0.3s" }}>
                  <div className="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                    <div className="bullet-dot w-2 h-2 rounded-full bg-green-500" style={{ transition: "all 0.3s" }} />
                  </div>
                  <p className="bullet-text text-zinc-300 text-base" style={{ transition: "color 0.3s", fontWeight: 400 }}>{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div
              className="rounded-xl p-6"
              style={{ background: "rgba(34,197,94,0.05)", borderLeft: "3px solid #22c55e", border: "1px solid rgba(34,197,94,0.15)" }}
            >
              <p className="text-zinc-300 text-sm leading-relaxed">
                We are in the <span className="text-white font-semibold">drone development phase</span> — combining intelligent hardware with a powerful platform that makes advanced technology accessible to{" "}
                <span style={{ color: "#22c55e" }}>every farmer</span>.
              </p>
            </div>
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* PLATFORM OFFERINGS */}
        <section className="bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white relative overflow-hidden">
          <div
            className="absolute pointer-events-none"
            style={{
              width: 600, height: 600, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              filter: "blur(60px)",
            }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-4 text-center font-medium" style={{ letterSpacing: "0.22em" }}>
                Platform
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-20 text-center">
                What Our Platform <span style={{ color: "#22c55e" }}>Will Offer</span>
              </h3>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Farming Statistics (A to Z)",
                  items: ["Crop-wise production data", "Soil health insights", "Yield trends & regional analytics", "Market price trends"],
                },
                {
                  title: "Smart Techniques",
                  items: ["Precision agriculture techniques", "Smart irrigation methods", "Drone-based farming benefits", "Sustainable farming practices"],
                },
                {
                  title: "Guides & Tutorials",
                  items: ["Agricultural university resources", "Government department insights", "Research publications", "KVK materials & seasonal guides"],
                },
                {
                  title: "Government Schemes",
                  items: ["Central & state agriculture schemes", "Drone & equipment subsidies", "Crop insurance programs", "Application guidance & eligibility"],
                },
              ].map((card, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    className="glow-card rounded-2xl p-8 h-full cursor-default group"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      transition: "box-shadow 0.4s, border-color 0.4s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                  >
                    <div className="flex items-center gap-3 mb-7">
                      <div className="w-1 h-7 rounded-full bg-green-500 group-hover:h-9 group-hover:shadow-lg" style={{ boxShadow: "0 0 12px rgba(34,197,94,0.5)", transition: "height 0.3s" }} />
                      <h4 className="text-xl font-semibold text-white group-hover:text-green-400" style={{ transition: "color 0.3s", letterSpacing: "-0.01em" }}>
                        {card.title}
                      </h4>
                    </div>
                    <ul className="space-y-3 pl-2">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-green-500 mt-0.5 text-sm group-hover:scale-110 inline-block" style={{ transition: "transform 0.3s" }}>▸</span>
                          <span className="text-zinc-400 group-hover:text-zinc-200 text-sm leading-relaxed" style={{ transition: "color 0.3s" }}>{item}</span>
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

        {/* MISSION, VISION, VALUES */}
        <section className="bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=60')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.04,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-4 text-center font-medium" style={{ letterSpacing: "0.22em" }}>
                Our Foundation
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-20 text-center text-white">
                Built on <span style={{ color: "#22c55e" }}>Conviction</span>
              </h3>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  label: "Our Mission",
                  text: "To empower farmers with intelligent tools that enhance productivity, reduce uncertainty, and promote sustainable agricultural growth.",
                },
                {
                  label: "Our Vision",
                  text: "To build a smart agricultural ecosystem where technology and data guide every farming decision — from seed to harvest.",
                },
                {
                  label: "Core Values",
                  text: "Innovation, sustainability, transparency, and a farmer-first mindset shape everything we create and every partnership we build.",
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div
                    className="group text-center flex flex-col items-center cursor-default py-10 px-6 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.4s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(34,197,94,0.04)";
                      e.currentTarget.style.borderColor = "rgba(34,197,94,0.2)";
                      e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.07)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="mb-8 relative">
                      <div
                        className="w-14 h-0.5 mx-auto rounded-full bg-green-500 group-hover:w-20"
                        style={{ boxShadow: "0 0 12px rgba(34,197,94,0.5)", transition: "width 0.5s" }}
                      />
                    </div>
                    <h3
                      className="display-font text-2xl font-bold mb-5 text-white group-hover:text-green-400"
                      style={{ transition: "color 0.3s", letterSpacing: "-0.01em" }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-zinc-400 text-base leading-relaxed group-hover:text-zinc-200"
                      style={{ transition: "color 0.35s", fontWeight: 300 }}
                    >
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