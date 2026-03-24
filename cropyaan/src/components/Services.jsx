// import Navbar from "./Navbar";
// import React, { useEffect, useRef, useState } from "react";

// const useInView = (threshold = 0.15) => {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// };

// const useParallax = () => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const onScroll = () => {
//       const rect = el.getBoundingClientRect();
//       const center = rect.top + rect.height / 2 - window.innerHeight / 2;
//       const bg = el.querySelector(".parallax-bg");
//       if (bg) bg.style.transform = `translateY(${center * 0.18}px)`;
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
//   return ref;
// };

// const GrainOverlay = () => (
//   <div
//     style={{
//       position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.032,
//       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//       backgroundSize: "128px 128px",
//     }}
//   />
// );

// const Separator = () => (
//   <div className="relative h-px w-full overflow-hidden">
//     <div style={{ background: "var(--sep-grad)", height: "1px" }} />
//   </div>
// );

// const FadeIn = ({ children, delay = 0, className = "" }) => {
//   const [ref, inView] = useInView();
//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? "translateY(0)" : "translateY(28px)",
//         transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// const AgriSplit = ({ imageUrl, reverse = false, children }) => {
//   const parallaxRef = useParallax();
//   return (
//     <div ref={parallaxRef} className="relative w-full grid lg:grid-cols-2 min-h-[480px]">
//       <div className={`relative overflow-hidden ${reverse ? "lg:order-2" : ""}`} style={{ minHeight: 280 }}>
//         <div
//           className="parallax-bg absolute inset-0 scale-110"
//           style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}
//         />
//         <div
//           className="absolute inset-0"
//           style={{
//             background: reverse
//               ? "linear-gradient(to left, var(--bg-main) 0%, var(--bg-main-cc) 18%, var(--bg-main-88) 40%, transparent 100%)"
//               : "linear-gradient(to right, var(--bg-main) 0%, var(--bg-main-cc) 18%, var(--bg-main-88) 40%, transparent 100%)",
//           }}
//         />
//         <div className="absolute inset-0" style={{ background: "var(--hero-overlay-2)" }} />
//         <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 80%, rgba(34,197,94,0.07) 0%, transparent 70%)" }} />
//       </div>
//       <div className={`relative flex items-center ${reverse ? "lg:order-1" : ""}`} style={{ background: "var(--bg-main)" }}>
//         <div
//           className="absolute inset-0"
//           style={{
//             background: reverse
//               ? "linear-gradient(to right, transparent 0%, var(--bg-main) 100%)"
//               : "linear-gradient(to left, transparent 0%, var(--bg-main) 100%)",
//           }}
//         />
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             width: 320, height: 320, borderRadius: "50%",
//             background: "radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 70%)",
//             top: "50%", left: reverse ? "auto" : "10%", right: reverse ? "10%" : "auto",
//             transform: "translateY(-50%)", filter: "blur(40px)",
//           }}
//         />
//         <div className="relative z-10 w-full px-8 lg:px-14 py-14">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// const BulletList = ({ items }) => (
//   <div className="space-y-4">
//     {items.map((item, i) => (
//       <div
//         key={i}
//         className="service-bullet flex items-start gap-4 cursor-default group"
//         style={{ transition: "all 0.3s" }}
//       >
//         <div
//           className="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full flex items-center justify-center"
//           style={{ background: "var(--green-8)", border: "1px solid rgba(34,197,94,0.2)", transition: "all 0.3s" }}
//         >
//           <div
//             className="w-2 h-2 rounded-full bg-green-500"
//             style={{ transition: "all 0.3s", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
//           />
//         </div>
//         <p className="text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:text-white text-base" style={{ transition: "color 0.3s", fontWeight: 300 }}>
//           {item}
//         </p>
//       </div>
//     ))}
//   </div>
// );

// export default function Services() {
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//         .services-root { font-family: 'DM Sans', sans-serif; }
//         .display-font { font-family: 'Playfair Display', serif; }
//       `}</style>
//       <GrainOverlay />
//       <div className="services-root dark:bg-[var(--bg-main)]">
//         <Navbar />

//         {/* PAGE HERO */}
//         <section className="relative dark:bg-[var(--bg-main)] py-28 px-6 text-slate-900 dark:text-white text-center overflow-hidden">
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`,
//               backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05,
//             }}
//           />
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-main) 0%, transparent 40%, transparent 60%, var(--bg-main) 100%)" }} />
//           <div
//             className="absolute pointer-events-none"
//             style={{
//               width: 700, height: 300, borderRadius: "50%",
//               background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)",
//               top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)",
//             }}
//           />
//           <div className="relative z-10 max-w-3xl mx-auto">
//             <FadeIn>
//               <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
//                 Farmer Knowledge Hub
//               </p>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h2 className="display-font text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
//                 Agricultural <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>Resources</span>
//               </h2>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 text-lg" style={{ fontWeight: 300 }}>
//                 Reliable knowledge and information to help every farmer grow with confidence.
//               </p>
//             </FadeIn>
//           </div>
//         </section>

//         <Separator />

//         {/* 1. FARMING STATISTICS */}
//         <AgriSplit imageUrl="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80">
//           <FadeIn>
//             <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
//               01 — Data
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.1}>
//             <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
//               Agricultural <span style={{ color: "#22c55e" }}>Data Insights</span>
//             </h3>
//             <p className="text-slate-600 dark:text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
//               Understand crop production, soil health, and market trends through accessible agricultural data.
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.2}>
//             <BulletList items={[
//               "Exploring crop-wise production data across India",
//               "Understanding soil health and nutrient information",
//               "Reading yield trends and regional farming patterns",
//               "Tracking market price movements for informed selling",
//             ]} />
//           </FadeIn>
//         </AgriSplit>

//         <Separator />

//         {/* 2. MODERN FARMING TECHNIQUES */}
//         <AgriSplit imageUrl="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&q=80" reverse>
//           <FadeIn>
//             <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
//               02 — Techniques
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.1}>
//             <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
//               Modern Farming <span style={{ color: "#22c55e" }}>Techniques</span>
//             </h3>
//             <p className="text-slate-600 dark:text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
//               Learn about contemporary farming methods that improve productivity and promote sustainability.
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.2}>
//             <BulletList items={[
//               "Understanding precision agriculture and its benefits",
//               "How smart irrigation techniques conserve water",
//               "How drones are used in modern agriculture",
//               "Adopting sustainable and eco-friendly farming practices",
//             ]} />
//           </FadeIn>
//         </AgriSplit>

//         <Separator />

//         {/* 3. GUIDES & TUTORIALS */}
//         <AgriSplit imageUrl="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80">
//           <FadeIn>
//             <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
//               03 — Knowledge
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.1}>
//             <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
//               Guides & <span style={{ color: "#22c55e" }}>Learning Resources</span>
//             </h3>
//             <p className="text-slate-600 dark:text-zinc-500 text-sm mb-6" style={{ fontWeight: 300 }}>
//               Curated learning materials from agricultural universities, government departments, research institutions, and Krishi Vigyan Kendras (KVKs).
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.2}>
//             <BulletList items={[
//               "Step-by-step farming guides for every season",
//               "Seasonal crop planning and advisory resources",
//               "Best practice recommendations from trusted institutions",
//               "Research publications and field study findings",
//             ]} />
//           </FadeIn>
//         </AgriSplit>

//         <Separator />

//         {/* 4. GOVERNMENT SCHEMES */}
//         <AgriSplit imageUrl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" reverse>
//           <FadeIn>
//             <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
//               04 — Policy
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.1}>
//             <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
//               Farmer Support <span style={{ color: "#22c55e" }}>Programs</span>
//             </h3>
//             <p className="text-slate-600 dark:text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
//               Stay informed about government initiatives, welfare programs, and financial support available to farmers across India.
//             </p>
//           </FadeIn>
//           <FadeIn delay={0.2}>
//             <BulletList items={[
//               "Exploring central and state-level agriculture schemes",
//               "Understanding subsidies available for farming equipment",
//               "Learning about crop insurance and loss protection programs",
//               "Guidance on eligibility checks and how to apply",
//             ]} />
//           </FadeIn>
//         </AgriSplit>

//         <Separator />

//         {/* CLOSING CTA STRIP */}
//         <section className="dark:bg-[var(--bg-main)] py-24 px-6 text-slate-900 dark:text-white text-center relative overflow-hidden">
//           <div
//             className="absolute pointer-events-none"
//             style={{
//               width: 600, height: 300, borderRadius: "50%",
//               background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)",
//               top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(50px)",
//             }}
//           />
//           <div className="relative z-10 max-w-2xl mx-auto">
//             <FadeIn>
//               <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
//                 Always Growing
//               </p>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h3 className="display-font text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
//                 More Knowledge, <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>Always Free</span>
//               </h3>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-slate-500 dark:text-zinc-400 text-base leading-relaxed" style={{ fontWeight: 300 }}>
//                 We are continuously expanding CropYaan's knowledge hub — adding new guides, scheme updates, weather resources, and crop advisories so that every farmer always has access to reliable, up-to-date information.
//               </p>
//             </FadeIn>
//           </div>
//         </section>

//         <Separator />
//       </div>
//     </>
//   );
// }
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

const AgriSplit = ({ imageUrl, reverse = false, children }) => {
  const parallaxRef = useParallax();
  return (
    <div ref={parallaxRef} className="relative w-full grid lg:grid-cols-2 min-h-[480px]">
      <div className={`relative overflow-hidden ${reverse ? "lg:order-2" : ""}`} style={{ minHeight: 280 }}>
        <div className="parallax-bg absolute inset-0 scale-110" style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0" style={{ background: reverse ? "linear-gradient(to left, var(--bg-main) 0%, var(--bg-main-cc) 18%, var(--bg-main-88) 40%, transparent 100%)" : "linear-gradient(to right, var(--bg-main) 0%, var(--bg-main-cc) 18%, var(--bg-main-88) 40%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay-2)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 80%, rgba(34,197,94,0.07) 0%, transparent 70%)" }} />
      </div>
      <div className={`relative flex items-center ${reverse ? "lg:order-1" : ""}`} style={{ background: "var(--bg-main)" }}>
        <div className="absolute inset-0" style={{ background: reverse ? "linear-gradient(to right, transparent 0%, var(--bg-main) 100%)" : "linear-gradient(to left, transparent 0%, var(--bg-main) 100%)" }} />
        <div className="absolute pointer-events-none" style={{ width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 70%)", top: "50%", left: reverse ? "auto" : "10%", right: reverse ? "10%" : "auto", transform: "translateY(-50%)", filter: "blur(40px)" }} />
        <div className="relative z-10 w-full px-8 lg:px-14 py-14">{children}</div>
      </div>
    </div>
  );
};

const BulletList = ({ items }) => (
  <div className="space-y-4">
    {items.map((item, i) => (
      <div key={i} className="service-bullet flex items-start gap-4 cursor-default group" style={{ transition: "all 0.3s" }}>
        <div className="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--green-8)", border: "1px solid rgba(34,197,94,0.2)", transition: "all 0.3s" }}>
          <div className="w-2 h-2 rounded-full bg-green-500" style={{ transition: "all 0.3s", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
        </div>
        <p className="text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:text-white text-base" style={{ transition: "color 0.3s", fontWeight: 300 }}>{item}</p>
      </div>
    ))}
  </div>
);

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .services-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
      `}</style>
      <GrainOverlay />
      <div className="services-root dark:bg-[var(--bg-main)]">

        {/* PAGE HERO */}
        <section className="relative dark:bg-[var(--bg-main)] py-28 px-6 text-slate-900 dark:text-white text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-main) 0%, transparent 40%, transparent 60%, var(--bg-main) 100%)" }} />
          <div className="absolute pointer-events-none" style={{ width: 700, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)" }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
                {t("services.hero_tag")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-font text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                {t("services.hero_title1")} <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>{t("services.hero_title2")}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 text-lg" style={{ fontWeight: 300 }}>
                {t("services.hero_subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* 1. FARMING STATISTICS */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80">
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              {t("services.s1_label")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
              {t("services.s1_title1")} <span style={{ color: "#22c55e" }}>{t("services.s1_title2")}</span>
            </h3>
            <p className="text-slate-600 dark:text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
              {t("services.s1_desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              t("services.s1_b1"),
              t("services.s1_b2"),
              t("services.s1_b3"),
              t("services.s1_b4"),
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* 2. MODERN FARMING TECHNIQUES */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&q=80" reverse>
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              {t("services.s2_label")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
              {t("services.s2_title1")} <span style={{ color: "#22c55e" }}>{t("services.s2_title2")}</span>
            </h3>
            <p className="text-slate-600 dark:text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
              {t("services.s2_desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              t("services.s2_b1"),
              t("services.s2_b2"),
              t("services.s2_b3"),
              t("services.s2_b4"),
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* 3. GUIDES & TUTORIALS */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80">
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              {t("services.s3_label")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
              {t("services.s3_title1")} <span style={{ color: "#22c55e" }}>{t("services.s3_title2")}</span>
            </h3>
            <p className="text-slate-600 dark:text-zinc-500 text-sm mb-6" style={{ fontWeight: 300 }}>
              {t("services.s3_desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              t("services.s3_b1"),
              t("services.s3_b2"),
              t("services.s3_b3"),
              t("services.s3_b4"),
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* 4. GOVERNMENT SCHEMES */}
        <AgriSplit imageUrl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" reverse>
          <FadeIn>
            <p className="text-green-400 tracking-widest text-xs uppercase mb-4 font-medium" style={{ letterSpacing: "0.22em" }}>
              {t("services.s4_label")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="display-font text-4xl font-bold mb-3 text-slate-900 dark:text-white leading-tight">
              {t("services.s4_title1")} <span style={{ color: "#22c55e" }}>{t("services.s4_title2")}</span>
            </h3>
            <p className="text-slate-600 dark:text-zinc-500 text-sm mb-8" style={{ fontWeight: 300 }}>
              {t("services.s4_desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BulletList items={[
              t("services.s4_b1"),
              t("services.s4_b2"),
              t("services.s4_b3"),
              t("services.s4_b4"),
            ]} />
          </FadeIn>
        </AgriSplit>

        <Separator />

        {/* CLOSING CTA */}
        <section className="dark:bg-[var(--bg-main)] py-24 px-6 text-slate-900 dark:text-white text-center relative overflow-hidden">
          <div className="absolute pointer-events-none" style={{ width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(50px)" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <FadeIn>
              <p className="text-green-400 tracking-widest text-xs uppercase mb-5 font-medium" style={{ letterSpacing: "0.22em" }}>
                {t("services.cta_tag")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="display-font text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                {t("services.cta_title1")} <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>{t("services.cta_title2")}</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-500 dark:text-zinc-400 text-base leading-relaxed" style={{ fontWeight: 300 }}>
                {t("services.cta_subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </>
  );
}