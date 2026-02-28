import Navbar from "./Navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useInView = (threshold = 0.12) => {
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
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

const StatCard = ({ number, label, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.8s ease ${delay}s` }}>
      <div
        className="text-center px-8 py-10 rounded-2xl group cursor-default"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.4s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.07)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div className="display-font text-5xl font-bold mb-2" style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.4)", fontFamily: "'Playfair Display', serif" }}>{number}</div>
        <div className="text-zinc-400 text-sm tracking-widest uppercase" style={{ letterSpacing: "0.15em", fontWeight: 400 }}>{label}</div>
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
          background: hovered ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)",
          border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered ? "0 0 40px rgba(34,197,94,0.07)" : "none",
          transition: "all 0.4s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-10 h-0.5 rounded-full mb-6" style={{ background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.5)", width: hovered ? 56 : 40, transition: "width 0.4s" }} />
        <h3
          className="display-font text-xl font-bold mb-3"
          style={{ color: hovered ? "#22c55e" : "#fff", fontFamily: "'Playfair Display', serif", transition: "color 0.3s" }}
        >
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: hovered ? "rgba(255,255,255,0.8)" : "rgba(161,161,170,1)", fontWeight: 300, transition: "color 0.3s" }}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
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
      `}</style>
      <GrainOverlay />
      <div className="home-root bg-[#0a0a0a] overflow-x-hidden">
        <Navbar />

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative h-screen w-full flex flex-col overflow-hidden">
          <div
            className="hero-bg absolute inset-0 scale-110"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
              backgroundSize: "cover", backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, #0a0a0a 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.06) 0%, transparent 65%)" }} />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div
              style={{ opacity: 1, animation: "fadeUp 1s ease 0.2s both" }}
            >

            </div>
            <div style={{ animation: "fadeUp 1s ease 0.45s both" }}>
              <h1
                className="display-font text-white leading-tight mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                }}
              >
                Cultivating the Future <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 60px rgba(34,197,94,0.4)", fontStyle: "italic" }}>
                  of Farming
                </span>
              </h1>
            </div>
            <div style={{ animation: "fadeUp 1s ease 0.65s both" }}>
              <p className="text-zinc-300 text-lg max-w-xl mb-12" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Drone intelligence and AI-driven analytics that turn raw field data into confident farming decisions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fadeUp 1s ease 0.85s both" }}>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide"
                style={{
                  background: "#22c55e", color: "#000",
                  boxShadow: "0 0 32px rgba(34,197,94,0.4)",
                  letterSpacing: "0.05em", transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 48px rgba(34,197,94,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 32px rgba(34,197,94,0.4)"; }}
                onClick={() => navigate("/services")}
              >
                Get Started
              </button>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide text-white"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.05em", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "rgba(34,197,94,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                onClick={() => navigate("/how-it-works")}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="relative z-10 flex justify-center pb-10" style={{ animation: "fadeUp 1s ease 1.1s both" }}>
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-px h-12 bg-white" style={{ animation: "pulse 2s infinite" }} />
            </div>
          </div>
        </section>

        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>

        <Separator />

        {/* ===== STATS STRIP ===== */}
        <section className="bg-[#0a0a0a] py-16 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)" }} />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            <StatCard number="10k+" label="Acres Scanned" delay={0} />
            <StatCard number="50+" label="Drone Models" delay={0.1} />
            <StatCard number="5k+" label="Farmers Served" delay={0.2} />
            <StatCard number="98%" label="Data Accuracy" delay={0.3} />
          </div>
        </section>

        <Separator />

        {/* ===== FARMING STATISTICS ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1800&q=50')`,
              backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent 30%, transparent 70%, #0a0a0a)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Farming <span style={{ color: "#22c55e" }}>Statistics</span> & Analytics
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Data-driven insights for smarter agricultural decisions.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Crop-wise Production Data", desc: "Analyze production volumes across crops and regions with granular breakdowns." },
                { title: "Soil Health Insights", desc: "Nutrient analysis and soil condition reports to guide precise interventions." },
                { title: "Yield Trends & Regional Analytics", desc: "Track seasonal yield patterns and benchmark performance across regions." },
                { title: "Market Price Trends", desc: "Monitor historical and current crop prices to sell at the right time." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== CHALLENGES ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Challenges Modern <span style={{ color: "#22c55e" }}>Farmers</span> Face
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Agriculture today is more unpredictable than ever. Farmers need smarter tools to stay ahead.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Unpredictable Weather", desc: "Climate change is making traditional farming knowledge less reliable, demanding adaptive strategies." },
                { title: "Declining Yields", desc: "Soil degradation and pest resistance are steadily eroding crop productivity across regions." },
                { title: "Market Volatility", desc: "Unpredictable price fluctuations make it difficult for farmers to plan and profit confidently." },
                { title: "Rising Input Costs", desc: "Increasing costs of seeds, fertilizers, and labor are squeezing already thin farmer margins." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== MODERN FARMING INSIGHTS — SPLIT LAYOUT ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="display-font text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Modern Farming <span style={{ color: "#22c55e" }}>Insights</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-zinc-400 text-base leading-relaxed mb-10" style={{ fontWeight: 300 }}>
                  Empowering farmers with next-generation agricultural techniques backed by satellite data, AI models, and real-time field sensors.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-6">
                  {[
                    { label: "Precision Agriculture", pct: 92 },
                    { label: "Smart Irrigation", pct: 87 },
                    { label: "Drone-Based Monitoring", pct: 95 },
                    { label: "Sustainable Practices", pct: 80 },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-300" style={{ fontWeight: 400 }}>{bar.label}</span>
                        <span style={{ color: "#22c55e" }}>{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${bar.pct}%`, background: "linear-gradient(to right, #16a34a, #22c55e)", boxShadow: "0 0 10px rgba(34,197,94,0.4)", transition: "width 1.2s ease" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 60% 40%, rgba(34,197,94,0.08) 0%, transparent 70%)" }} />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Precision Agriculture", desc: "Data-driven crop monitoring using sensors and satellite insights." },
                  { title: "Smart Irrigation", desc: "Efficient water management using climate data and automation." },
                  { title: "Drone Monitoring", desc: "Aerial analysis to detect stress, pests, and deficiencies early." },
                  { title: "Sustainable Practices", desc: "Eco-friendly methods that improve long-term soil and yield health." },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div
                      className="rounded-xl p-6 cursor-default group"
                      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.4s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)"; e.currentTarget.style.background = "rgba(34,197,94,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
                    >
                      <h4 className="text-sm font-semibold mb-2 group-hover:text-green-400" style={{ transition: "color 0.3s" }}>{item.title}</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-300" style={{ fontWeight: 300, transition: "color 0.3s" }}>{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== GUIDES & TUTORIALS ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&q=50')`,
              backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent 25%, transparent 75%, #0a0a0a)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Guides & <span style={{ color: "#22c55e" }}>Tutorials</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Curated agricultural knowledge from trusted institutions and research bodies.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Agricultural Universities", desc: "Research-backed crop practices and seasonal farming guides from leading institutions." },
                { title: "Government Departments", desc: "Official advisories, schemes, and policy updates directly from the source." },
                { title: "Research Institutions", desc: "Scientific studies and innovations pushing the boundaries of modern agriculture." },
                { title: "Krishi Vigyan Kendras (KVKs)", desc: "Regional farming guidance and practical field-level support tailored to local crops." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== GOVERNMENT SCHEMES ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Government <span style={{ color: "#22c55e" }}>Schemes</span> & Support
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Stay informed about central and state agricultural initiatives, subsidies, and farmer welfare programs.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Central & State Schemes", desc: "Explore ongoing agriculture development programs and welfare initiatives across India." },
                { title: "Equipment & Drone Subsidies", desc: "Information on financial assistance available for modern farming equipment and drones." },
                { title: "Crop Insurance Programs", desc: "Protection schemes designed to safeguard farmers against crop failure and losses." },
                { title: "Application Guidance", desc: "Step-by-step support for eligibility checks and completing application processes." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== CTA ===== */}
        <section className="relative bg-[#0a0a0a] py-32 px-6 text-white text-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`,
              backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)" }} />
          <div
            className="absolute pointer-events-none"
            style={{
              width: 800, height: 400, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-6" style={{ letterSpacing: "0.25em" }}>
                Join Cropyaan
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                className="display-font font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}
              >
                Ready to Transform <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)", fontStyle: "italic" }}>
                  Your Farming?
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Join Cropyaan today and unlock the power of AI-driven agriculture — from your first field scan to your best harvest.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-10 py-4 rounded-xl font-semibold text-sm"
                  style={{
                    background: "#22c55e", color: "#000",
                    boxShadow: "0 0 40px rgba(34,197,94,0.4)",
                    letterSpacing: "0.06em", transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 60px rgba(34,197,94,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.4)"; }}
                >
                  Sign Up Now
                </button>
                <button
                  className="px-10 py-4 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.06em", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "rgba(34,197,94,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                >
                  View Services
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