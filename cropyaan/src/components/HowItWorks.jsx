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
//     <div style={{ background: "linear-gradient(90deg, transparent 0%, #22c55e44 30%, #22c55e88 50%, #22c55e44 70%, transparent 100%)", height: "1px" }} />
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

// const steps = [
//   {
//     number: "01",
//     title: "Field Registration",
//     desc: "Farmers register their land details including crop type, acreage, and growth stage to create a digital farm profile.",
//     image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=75",
//     tag: "Onboarding",
//   },
//   {
//     number: "02",
//     title: "Drone Deployment",
//     desc: "Advanced drones scan fields for crop health, soil moisture, and precision spraying while capturing high-resolution aerial data.",
//     image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=900&q=75",
//     tag: "Hardware",
//   },
//   {
//     number: "03",
//     title: "AI Data Processing",
//     desc: "Collected drone data is analyzed using AI models to detect crop stress, predict yield, and assess soil conditions.",
//     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75",
//     tag: "Intelligence",
//   },
//   {
//     number: "04",
//     title: "Insights Dashboard",
//     desc: "Farmers access a visual dashboard showing crop health scores, yield forecasts, and actionable alerts.",
//     image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=75",
//     tag: "Platform",
//   },
//   {
//     number: "05",
//     title: "Smart Action & Optimization",
//     desc: "Based on insights, farmers optimize irrigation, fertilizer usage, and spraying strategies to increase productivity.",
//     image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=75",
//     tag: "Outcomes",
//   },
// ];

// const StepCard = ({ step, index }) => {
//   const [ref, inView] = useInView(0.12);
//   const isEven = index % 2 === 0;
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       ref={ref}
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? "translateY(0)" : "translateY(36px)",
//         transition: `opacity 0.9s ease ${index * 0.12}s, transform 0.9s ease ${index * 0.12}s`,
//       }}
//     >
//       <div
//         className="relative w-full grid lg:grid-cols-2 rounded-2xl overflow-hidden"
//         style={{
//           border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
//           boxShadow: hovered ? "0 0 0 1px rgba(34,197,94,0.1), 0 16px 64px rgba(34,197,94,0.08)" : "0 8px 40px rgba(0,0,0,0.4)",
//           transition: "border-color 0.4s, box-shadow 0.4s",
//           background: "#0d0d0d",
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         {/* Image half */}
//         <div className={`relative overflow-hidden ${isEven ? "" : "lg:order-2"}`} style={{ minHeight: 260 }}>
//           <div
//             className="absolute inset-0 scale-105"
//             style={{
//               backgroundImage: `url('${step.image}')`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               transition: "transform 0.6s ease",
//               transform: hovered ? "scale(1.08)" : "scale(1.05)",
//             }}
//           />
//           <div
//             className="absolute inset-0"
//             style={{
//               background: isEven
//                 ? "linear-gradient(to right, transparent 0%, #0d0d0d 100%)"
//                 : "linear-gradient(to left, transparent 0%, #0d0d0d 100%)",
//             }}
//           />
//           <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.42)" }} />
//           <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

//           {/* Step number watermark */}
//           <div
//             className="absolute display-font font-bold select-none pointer-events-none"
//             style={{
//               fontSize: "clamp(80px, 14vw, 140px)",
//               color: "rgba(34,197,94,0.07)",
//               bottom: "-12px",
//               left: isEven ? "12px" : "auto",
//               right: isEven ? "auto" : "12px",
//               lineHeight: 1,
//               fontFamily: "'Playfair Display', serif",
//             }}
//           >
//             {step.number}
//           </div>
//         </div>

//         {/* Content half */}
//         <div className={`relative flex flex-col justify-center px-8 lg:px-12 py-12 ${isEven ? "" : "lg:order-1"}`}>
//           <div
//             className="absolute pointer-events-none"
//             style={{
//               width: 280, height: 280, borderRadius: "50%",
//               background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
//               top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)",
//               opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s",
//             }}
//           />
//           <div className="relative z-10">
//             <div className="flex items-center gap-3 mb-5">
//               <span
//                 className="display-font text-xs font-bold tracking-widest"
//                 style={{ color: "#22c55e", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}
//               >
//                 {step.number}
//               </span>
//               <div style={{ width: 1, height: 16, background: "rgba(34,197,94,0.3)" }} />
//               <span
//                 className="text-xs tracking-widest uppercase"
//                 style={{ color: "rgba(34,197,94,0.7)", letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
//               >
//                 {step.tag}
//               </span>
//             </div>

//             <h3
//               className="display-font text-3xl font-bold mb-4 leading-tight"
//               style={{
//                 color: hovered ? "#22c55e" : "#fff",
//                 fontFamily: "'Playfair Display', serif",
//                 transition: "color 0.35s",
//                 textShadow: hovered ? "0 0 24px rgba(34,197,94,0.25)" : "none",
//               }}
//             >
//               {step.title}
//             </h3>

//             <p
//               className="text-base leading-relaxed"
//               style={{
//                 color: hovered ? "rgba(255,255,255,0.85)" : "rgba(161,161,170,1)",
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontWeight: 300,
//                 transition: "color 0.35s",
//               }}
//             >
//               {step.desc}
//             </p>

//             <div
//               className="mt-8 h-0.5 rounded-full"
//               style={{
//                 background: "linear-gradient(to right, #22c55e, transparent)",
//                 width: hovered ? "80px" : "40px",
//                 transition: "width 0.5s ease",
//                 boxShadow: "0 0 8px rgba(34,197,94,0.4)",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function HowItWorks() {
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//         .hiw-root { font-family: 'DM Sans', sans-serif; }
//         .display-font { font-family: 'Playfair Display', serif; }
//       `}</style>
//       <GrainOverlay />
//       <div className="hiw-root bg-[#0a0a0a]">
//         <Navbar />

//         {/* HERO */}
//         <section className="relative bg-[#0a0a0a] py-28 px-6 text-white text-center overflow-hidden">
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`,
//               backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05,
//             }}
//           />
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 40%, transparent 60%, #0a0a0a 100%)" }} />
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
//                 The Process
//               </p>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h2
//                 className="display-font text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//               >
//                 How It <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>Works</span>
//               </h2>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 text-lg" style={{ fontWeight: 300 }}>
//                 From drone deployment to intelligent farm decisions — Cropyaan transforms raw field data into actionable insights.
//               </p>
//             </FadeIn>
//           </div>
//         </section>

//         <Separator />

//         {/* STEPS */}
//         <section className="bg-[#0a0a0a] py-20 px-6 lg:px-20 text-white relative">
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.013) 80px, rgba(34,197,94,0.013) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.013) 80px, rgba(34,197,94,0.013) 81px)",
//             }}
//           />
//           <div className="max-w-6xl mx-auto relative z-10 space-y-8">
//             {steps.map((step, i) => (
//               <StepCard key={i} step={step} index={i} />
//             ))}
//           </div>
//         </section>

//         <Separator />

//         {/* CLOSING */}
//         <section className="bg-[#0a0a0a] py-24 px-6 text-white text-center relative overflow-hidden">
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
//                 End to End
//               </p>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h3
//                 className="display-font text-4xl md:text-5xl font-bold mb-6 text-white leading-tight"
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//               >
//                 From Soil to <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>Decision</span>
//               </h3>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 text-base leading-relaxed" style={{ fontWeight: 300 }}>
//                 Every step in the Cropyaan pipeline is designed to reduce guesswork and give farmers the confidence of precision — in every season, every field, every crop.
//               </p>
//             </FadeIn>
//           </div>
//         </section>

//         <Separator />
//       </div>
//     </>
//   );
// }


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

const steps = [
  {
    number: "01",
    title: "Explore Farming Knowledge",
    desc: "Farmers browse crop-specific guides, seasonal farming practices, and agricultural resources curated from universities, KVKs, and research institutions.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=75",
    tag: "Knowledge",
  },
  {
    number: "02",
    title: "Check Weather Updates",
    desc: "Farmers view localised weather forecasts to plan sowing schedules, irrigation cycles, and harvesting windows with greater confidence.",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=900&q=75",
    tag: "Weather",
  },
  {
    number: "03",
    title: "Discover Government Schemes",
    desc: "Farmers learn about central and state subsidies, crop insurance programs, and welfare initiatives — with step-by-step guidance on how to apply.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75",
    tag: "Schemes",
  },
  {
    number: "04",
    title: "Track Market Prices",
    desc: "Farmers monitor live and historical mandi prices across regions to decide the best time and location to sell their produce for maximum returns.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=75",
    tag: "Market",
  },
  {
    number: "05",
    title: "Make Better Farming Decisions",
    desc: "With reliable knowledge from CropYaan, farmers improve crop planning, reduce losses, and build more productive and sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=75",
    tag: "Outcomes",
  },
];

const StepCard = ({ step, index }) => {
  const [ref, inView] = useInView(0.12);
  const isEven = index % 2 === 0;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.9s ease ${index * 0.12}s, transform 0.9s ease ${index * 0.12}s`,
      }}
    >
      <div
        className="relative w-full grid lg:grid-cols-2 rounded-2xl overflow-hidden"
        style={{
          border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: hovered ? "0 0 0 1px rgba(34,197,94,0.1), 0 16px 64px rgba(34,197,94,0.08)" : "0 8px 40px rgba(0,0,0,0.4)",
          transition: "border-color 0.4s, box-shadow 0.4s",
          background: "#0d0d0d",
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
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.08)" : "scale(1.05)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? "linear-gradient(to right, transparent 0%, #0d0d0d 100%)"
                : "linear-gradient(to left, transparent 0%, #0d0d0d 100%)",
            }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.42)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

          {/* Step number watermark */}
          <div
            className="absolute display-font font-bold select-none pointer-events-none"
            style={{
              fontSize: "clamp(80px, 14vw, 140px)",
              color: "rgba(34,197,94,0.07)",
              bottom: "-12px",
              left: isEven ? "12px" : "auto",
              right: isEven ? "auto" : "12px",
              lineHeight: 1,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {step.number}
          </div>
        </div>

        {/* Content half */}
        <div className={`relative flex flex-col justify-center px-8 lg:px-12 py-12 ${isEven ? "" : "lg:order-1"}`}>
          <div
            className="absolute pointer-events-none"
            style={{
              width: 280, height: 280, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)",
              opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="display-font text-xs font-bold tracking-widest"
                style={{ color: "#22c55e", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.number}
              </span>
              <div style={{ width: 1, height: 16, background: "rgba(34,197,94,0.3)" }} />
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(34,197,94,0.7)", letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
              >
                {step.tag}
              </span>
            </div>

            <h3
              className="display-font text-3xl font-bold mb-4 leading-tight"
              style={{
                color: hovered ? "#22c55e" : "#fff",
                fontFamily: "'Playfair Display', serif",
                transition: "color 0.35s",
                textShadow: hovered ? "0 0 24px rgba(34,197,94,0.25)" : "none",
              }}
            >
              {step.title}
            </h3>

            <p
              className="text-base leading-relaxed"
              style={{
                color: hovered ? "rgba(255,255,255,0.85)" : "rgba(161,161,170,1)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                transition: "color 0.35s",
              }}
            >
              {step.desc}
            </p>

            <div
              className="mt-8 h-0.5 rounded-full"
              style={{
                background: "linear-gradient(to right, #22c55e, transparent)",
                width: hovered ? "80px" : "40px",
                transition: "width 0.5s ease",
                boxShadow: "0 0 8px rgba(34,197,94,0.4)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .hiw-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
      `}</style>
      <GrainOverlay />
      <div className="hiw-root bg-[#0a0a0a]">
        <Navbar />

        {/* HERO */}
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
                How CropYaan Helps Farmers
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                className="display-font text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                From Knowledge to{" "}
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>Better Farming</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 text-lg" style={{ fontWeight: 300 }}>
                CropYaan puts reliable agricultural knowledge in every farmer's hands — from crop guidance and weather updates to government schemes and market prices.
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* STEPS */}
        <section className="bg-[#0a0a0a] py-20 px-6 lg:px-20 text-white relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.013) 80px, rgba(34,197,94,0.013) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.013) 80px, rgba(34,197,94,0.013) 81px)",
            }}
          />
          <div className="max-w-6xl mx-auto relative z-10 space-y-8">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </section>

        <Separator />

        {/* CLOSING */}
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
                Knowledge to Action
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3
                className="display-font text-4xl md:text-5xl font-bold mb-6 text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Informed Farmers, <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>Better Harvests</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 text-base leading-relaxed" style={{ fontWeight: 300 }}>
                Every resource on CropYaan is chosen to reduce uncertainty and give farmers the confidence to plan smarter — across every season, every crop, and every region.
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </>
  );
}