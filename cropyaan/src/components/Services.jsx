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

const AgriSplit = ({ imageUrl, reverse = false, children }) => {
  const parallaxRef = useParallax();
  return (
    <div ref={parallaxRef} className="relative w-full grid lg:grid-cols-2 min-h-[480px]">
      <div className={`relative overflow-hidden ${reverse ? "lg:order-2" : ""}`} style={{ minHeight: 280 }}>
        <div
          className="parallax-bg absolute inset-0 scale-110"
          style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}
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
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 80%, rgba(34,197,94,0.07) 0%, transparent 70%)" }} />
      </div>
      <div className={`relative flex items-center ${reverse ? "lg:order-1" : ""}`} style={{ background: "#0a0a0a" }}>
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
            transform: "translateY(-50%)", filter: "blur(40px)",
          }}
        />
        <div className="relative z-10 w-full px-8 lg:px-14 py-14">
          {children}
        </div>
      </div>
    </div>
  );
};

const BulletList = ({ items }) => (
  <div className="space-y-4">
    {items.map((item, i) => (
      <div
        key={i}
        className="service-bullet flex items-start gap-4 cursor-default group"
        style={{ transition: "all 0.3s" }}
      >
        <div
          className="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", transition: "all 0.3s" }}
        >
          <div
            className="w-2 h-2 rounded-full bg-green-500"
            style={{ transition: "all 0.3s", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
          />
        </div>
        <p className="text-zinc-300 group-hover:text-white text-base" style={{ transition: "color 0.3s", fontWeight: 300 }}>
          {item}
        </p>
      </div>
    ))}
  </div>
);

export default function Services() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .services-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
      `}</style>
      <GrainOverlay />
      <div className="services-root bg-[#0a0a0a]">
        <Navbar />

        {/* PAGE HERO */}
        <section className="relative bg-[#0a0a0a] py-28 px-6 text-white text-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`,
              backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 40%, transparent 60%, #0a0a0a 100%)" }} />
          <div
            className="absolute pointer-events-none"
            style={{
              width: 700, height: 300, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
                What We Offer
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Our <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>Services</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 text-lg" style={{ fontWeight: 300 }}>
                Empowering agriculture with data, intelligence, and innovation.
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* 1. FARMING STATISTICS */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80">
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              01 — Data
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-white leading-tight">
              Farming <span style={{ color: "#22c55e" }}>Statistics</span>
            </h3>
            <p className="text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
              Comprehensive agricultural data from field to market.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              "Crop-wise production data",
              "Soil health insights",
              "Yield trends & regional analytics",
              "Market price trend analysis",
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* 2. MODERN FARMING INSIGHTS */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&q=80" reverse>
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              02 — Intelligence
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-white leading-tight">
              Modern Farming <span style={{ color: "#22c55e" }}>Insights</span>
            </h3>
            <p className="text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
              Next-generation techniques for precision agriculture.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              "Precision agriculture techniques",
              "Smart irrigation systems",
              "Drone-based farming advantages",
              "Sustainable & eco-friendly practices",
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* 3. GUIDES & TUTORIALS */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80">
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              03 — Knowledge
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-white leading-tight">
              Guides & <span style={{ color: "#22c55e" }}>Tutorials</span>
            </h3>
            <p className="text-zinc-500 text-sm mb-6" style={{ fontWeight: 300 }}>
              Curated resources from agricultural universities, government departments, research institutions, and Krishi Vigyan Kendras (KVKs).
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              "Step-by-step farming tutorials",
              "Seasonal crop planning guides",
              "Best practice recommendations",
              "Technology adoption manuals",
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* 4. GOVERNMENT SCHEMES */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" reverse>
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              04 — Policy
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-white leading-tight">
              Government <span style={{ color: "#22c55e" }}>Schemes</span>
            </h3>
            <p className="text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
              Navigate subsidies, insurance programs, and state support with ease.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              "Central & state-level agriculture schemes",
              "Drone & equipment subsidies",
              "Crop insurance programs",
              "Application guidance & eligibility details",
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* CLOSING CTA STRIP */}
        <section className="bg-[#0a0a0a] py-24 px-6 text-white text-center relative overflow-hidden">
          <div
            className="absolute pointer-events-none"
            style={{
              width: 600, height: 300, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(50px)",
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
                Coming Soon
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                The Future of <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>Smart Farming</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 text-base leading-relaxed" style={{ fontWeight: 300 }}>
                We are actively building the platform and drone systems. Every service listed here will be live — designed for the farmer who deserves better tools.
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </>
  );
}