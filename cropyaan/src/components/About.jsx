import Navbar from "./Navbar";
import React from "react";

export default function About() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#121212] py-20 px-6 lg:px-20 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-zinc-800">
              <img
                src="/farmerwithdrone.jpg"
                alt="Farmer using drone in field"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Empowering the{" "}
              <span className="text-green-500">Modern Farmer</span>
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Cropyaan bridges the gap between traditional agriculture and
              next-generation technology. We believe farming should be driven
              by precision, powered by data, and supported by intelligent
              systems that help farmers make confident decisions.
            </p>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Through advanced drone deployments and AI-driven field analytics,
              we deliver real-time crop health insights, soil monitoring, and
              predictive yield forecasting.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-zinc-800">
              <div>
                <h3 className="text-2xl font-bold text-green-500">10k+</h3>
                <p className="text-gray-400 text-sm">Acres Scanned</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-green-500">50+</h3>
                <p className="text-gray-400 text-sm">Drone Models Deployed</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* WHAT WE DO */}
<section className="bg-[#0a0a0a] py-16 px-6 lg:px-20 text-white">
  <div className="max-w-6xl mx-auto bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-sm">

    <h3 className="text-4xl font-bold mb-16 text-center tracking-tight">
      What We <span className="text-green-500">Do</span>
    </h3>

    <div className="grid md:grid-cols-2 gap-16 items-start">
      {/* Left Side: Services with Custom Icons */}
      <div className="space-y-6">
        {[
          "Precision spraying of fertilizers and pesticides",
          "Crop health monitoring & disease detection",
          "Aerial field surveying and mapping",
          "Data-driven farm insights and analytics"
        ].map((item, index) => (
          <div key={index} className="flex items-start gap-4 group">
            <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </div>
            <p className="text-lg text-zinc-300 group-hover:text-white transition-colors">
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* Right Side: Mission Statement */}
      <div className="relative">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/5 blur-[80px]" />

        <div className="bg-zinc-800/40 p-8 rounded-2xl border-l-4 border-green-500">
          <p className="text-zinc-300 text-lg leading-relaxed">
            We are currently in the <span className="text-white font-medium">drone development phase</span>.
            Our goal is to combine intelligent drone hardware with a powerful digital
            platform that simplifies modern agriculture and makes advanced
            technology accessible to <span className="text-green-400">every farmer</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* PLATFORM OFFERINGS - Centered & Interactive */}
<section className="bg-[#121212] py-20 px-6 md:px-20 lg:px-40 text-white">
  <div className="max-w-5xl mx-auto">

    <h3 className="text-4xl font-bold mb-20 text-center">
      What Our Platform <span className="text-green-500">Will Offer</span>
    </h3>

    {/* Increased the gap and max-width to pull content toward the middle */}
    <div className="grid md:grid-cols-2 gap-x-24 gap-y-16 justify-center">

      {/* Offering 1 - Farming Statistics */}
<div className="flex flex-col items-start md:items-center">
  <div className="w-full max-w-xs">
    {/* Wrap both header and list in this group */}
    <div className="group cursor-default">

      <div className="flex items-center gap-3 mb-6">
        {/* Pill transition */}
        <div className="w-1 h-6 bg-green-500 rounded-full transition-all duration-300 group-hover:bg-green-400 group-hover:scale-y-110"></div>

        {/* Heading transition to green */}
        <h4 className="text-2xl font-semibold text-white group-hover:text-green-500 transition-colors duration-300">
          Farming Statistics (A to Z)
        </h4>
      </div>

      <ul className="space-y-4 pl-4">
        {[
          "Crop-wise production data",
          "Soil health insights",
          "Yield trends & regional analytics",
          "Market price trends"
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {/* Dot scales up when the whole group is hovered */}
            <span className="text-green-500 transition-transform duration-300 group-hover:scale-125">•</span>
            {/* Text turns white when the whole group is hovered */}
            <span className="text-zinc-400 group-hover:text-white transition-colors duration-300 text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  </div>
</div>

      {/* Offering 2 - Smart Techniques */}
<div className="flex flex-col items-start md:items-center">
  <div className="w-full max-w-xs">
    {/* The 'group' must wrap the heading AND the list to trigger everything at once */}
    <div className="group cursor-default">

      <div className="flex items-center gap-3 mb-6">
        {/* Pill transition */}
        <div className="w-1 h-6 bg-green-500 rounded-full transition-all duration-300 group-hover:bg-green-400 group-hover:scale-y-110"></div>

        {/* Heading transition */}
        <h4 className="text-2xl font-semibold text-white group-hover:text-green-500 transition-colors duration-300">
          Smart Techniques
        </h4>
      </div>

      <ul className="space-y-4 pl-4">
        {[
          "Precision agriculture techniques",
          "Smart irrigation methods",
          "Drone-based farming benefits",
          "Sustainable farming practices"
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-green-500 transition-transform duration-300 group-hover:scale-125">•</span>
            <span className="text-zinc-400 group-hover:text-white transition-colors duration-300 text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  </div>
</div>

      {/* Offering 3 - Guides & Tutorials */}
<div className="flex flex-col items-start md:items-center">
  <div className="w-full max-w-xs">
    {/* The 'group' now wraps everything: Header + List */}
    <div className="group cursor-default">

      <div className="flex items-center gap-3 mb-6">
        {/* Pill transition */}
        <div className="w-1 h-6 bg-green-500 rounded-full transition-all duration-300 group-hover:bg-green-400 group-hover:scale-y-110"></div>

        {/* Heading transition to green */}
        <h4 className="text-2xl font-semibold text-white group-hover:text-green-500 transition-colors duration-300">
          Guides & Tutorials
        </h4>
      </div>

      <ul className="space-y-4 pl-4">
        {[
          "Agricultural university resources",
          "Government department insights",
          "Research publications",
          "KVK materials & seasonal guides"
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {/* Dot scales when group is hovered */}
            <span className="text-green-500 transition-transform duration-300 group-hover:scale-125">•</span>
            {/* Text turns white when group is hovered */}
            <span className="text-zinc-400 group-hover:text-white transition-colors duration-300 text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  </div>
</div>

      {/* Offering 4 */}
      {/* Offering 4 - Government Schemes */}
<div className="flex flex-col items-start md:items-center">
  <div className="w-full max-w-xs">
    {/* The 'group' now correctly wraps BOTH the header and the ul list */}
    <div className="group cursor-default">

      <div className="flex items-center gap-3 mb-6">
        {/* Pill animation */}
        <div className="w-1 h-6 bg-green-500 rounded-full transition-all duration-300 group-hover:bg-green-400 group-hover:scale-y-110"></div>

        {/* Heading transition to green */}
        <h4 className="text-2xl font-semibold text-white group-hover:text-green-500 transition-colors duration-300">
          Government Schemes
        </h4>
      </div>

      <ul className="space-y-4 pl-4">
        {[
          "Central & state agriculture schemes",
          "Drone & equipment subsidies",
          "Crop insurance programs",
          "Application guidance & eligibility"
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {/* The bullet scales with the main group hover */}
            <span className="text-green-500 transition-transform duration-300 group-hover:scale-125">•</span>
            {/* The text brightens with the main group hover */}
            <span className="text-zinc-400 group-hover:text-white transition-colors duration-300 text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  </div>
</div>

    </div>
  </div>
</section>


{/* MISSION, VISION, VALUES - Seamless & Minimalist Style */}
<section className="bg-[#121212] py-24 px-6 lg:px-20 text-white">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 lg:gap-16">

    {/* Mission */}
    <div className="group text-center flex flex-col items-center">
      <div className="mb-6">
        {/* Decorative Green Line */}
        <div className="w-12 h-1 bg-green-500 rounded-full mx-auto group-hover:w-20 transition-all duration-500" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-500 transition-colors">
        Our Mission
      </h3>
      <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
        To empower farmers with intelligent tools that enhance productivity,
        reduce uncertainty, and promote sustainable agricultural growth.
      </p>
    </div>

    {/* Vision */}
    <div className="group text-center flex flex-col items-center">
      <div className="mb-6">
        <div className="w-12 h-1 bg-green-500 rounded-full mx-auto group-hover:w-20 transition-all duration-500" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-500 transition-colors">
        Our Vision
      </h3>
      <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
        To build a smart agricultural ecosystem where technology and data
        guide every farming decision.
      </p>
    </div>

    {/* Core Values */}
    <div className="group text-center flex flex-col items-center">
      <div className="mb-6">
        <div className="w-12 h-1 bg-green-500 rounded-full mx-auto group-hover:w-20 transition-all duration-500" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-500 transition-colors">
        Our Core Values
      </h3>
      <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
        Innovation, sustainability, transparency, and a farmer-first
        mindset shape everything we create.
      </p>
    </div>

  </div>
</section>

    </>
  );
}



