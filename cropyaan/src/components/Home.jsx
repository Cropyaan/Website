function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">


          <div className="flex flex-1 items-center justify-center px-6 text-center">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
              Cultivating the Future <br /> Farming
            </h1>
          </div>
        </div>
      </section>

      { /* ================ FARMING STATS================= */}
      <section className="py-20 bg-neutral-950 text-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-serif mb-4">
      Farming Statistics & Analytics
    </h2>
    <p className="text-gray-300 mb-12">
      Data-driven insights for smarter agricultural decisions.
    </p>

    <div className="grid md:grid-cols-2 gap-8">

      <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl ">
        <h3 className="text-2xl font-semibold mb-3">
          Crop-wise Production Data
        </h3>
        <p className="text-gray-300 mb-4">
          Analyze production volumes across crops and regions.
        </p>
      </div>

      <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl ">
        <h3 className="text-2xl font-semibold mb-3">
          Soil Health Insights
        </h3>
        <p className="text-gray-300 mb-4">
          Nutrient analysis and soil condition reports.
        </p>
      </div>

      <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl ">
        <h3 className="text-2xl font-semibold mb-3">
          Yield Trends & Regional Analytics
        </h3>
        <p className="text-gray-300 mb-4">
          Track seasonal yield patterns across regions.
        </p>
      </div>

      <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl ">
        <h3 className="text-2xl font-semibold mb-3">
          Market Price Trends
        </h3>
        <p className="text-gray-300 mb-4">
          Monitor historical and current crop prices.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* ================= CHALLENGES SECTION ================= */}
      <section className="py-20 bg-neutral-950 text-white">
  <div className="max-w-6xl mx-auto px-6 text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-serif mb-4">
      Challenges Modern Farmers Face
    </h2>
    <p className="text-gray-300 max-w-2xl mx-auto">
      Agriculture today is more unpredictable than ever. Farmers need smarter tools to stay ahead.
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
    {[
      {
        title: "Unpredictable Weather",
        desc: "Climate change is making traditional farming knowledge less reliable.",
      },
      {
        title: "Declining Yields",
        desc: "Soil degradation and pest resistance are affecting crop productivity.",
      },
      {
        title: "Market Volatility",
        desc: "Price fluctuations make it difficult to plan confidently.",
      },
      {
        title: "Rising Input Costs",
        desc: "Increasing costs of seeds and fertilizers reduce farmer margins.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-black/10 backdrop-blur-md p-8 rounded-2xl"
      >
        <h3 className="text-2xl font-semibold mb-3">
          {item.title}
        </h3>
        <p className="text-gray-300">{item.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/*=================MODERN FARMING INSIGHTS=====================*/}
      <section className="py-20 bg-neutral-950 text-white">
  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-4xl md:text-5xl font-serif mb-4">
      Modern Farming Insights
    </h2>

    <p className="text-gray-400 mb-14">
      Empowering farmers with next-generation agricultural techniques.
    </p>

    <div className="grid md:grid-cols-2 gap-10 text-left">

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">
          Precision Agriculture
        </h3>
        <p className="text-gray-400">
          Data-driven crop monitoring using sensors and satellite insights to optimize productivity.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">
          Smart Irrigation
        </h3>
        <p className="text-gray-400">
          Efficient water management using climate data and automated irrigation systems.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">
          Drone-Based Monitoring
        </h3>
        <p className="text-gray-400">
          Aerial crop analysis to detect stress, pests, and nutrient deficiencies early.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">
          Sustainable Practices
        </h3>
        <p className="text-gray-400">
          Environment-friendly farming methods that improve long-term soil and yield health.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* ================= GUIDES & TUTORIALS ================= */}
<section className="py-20 bg-neutral-950 text-white">
  <div className="max-w-6xl mx-auto px-6 text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-serif mb-4">
      Guides & Tutorials
    </h2>
    <p className="text-gray-300 max-w-2xl mx-auto">
      Curated agricultural knowledge from trusted institutions and research bodies.
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Agricultural Universities
      </h3>
      <p className="text-gray-300">
        Research-backed crop practices and seasonal farming guides.
      </p>
    </div>

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Government Departments
      </h3>
      <p className="text-gray-300">
        Official advisories, schemes, and policy updates.
      </p>
    </div>

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Research Institutions
      </h3>
      <p className="text-gray-300">
        Scientific studies and innovations in modern agriculture.
      </p>
    </div>

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Krishi Vigyan Kendras (KVKs)
      </h3>
      <p className="text-gray-300">
        Regional farming guidance and practical field-level support.
      </p>
    </div>

  </div>
</section>


      {/* ================= GOVERNMENT SCHEMES ================= */}
<section className="py-20 bg-neutral-950 text-white">
  <div className="max-w-6xl mx-auto px-6 text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-serif mb-4">
      Government Schemes & Support
    </h2>
    <p className="text-gray-300 max-w-2xl mx-auto">
      Stay informed about central and state agricultural initiatives, subsidies, and farmer welfare programs.
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Central & State Schemes
      </h3>
      <p className="text-gray-300">
        Explore ongoing agriculture development programs across India.
      </p>
    </div>

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Equipment & Drone Subsidies
      </h3>
      <p className="text-gray-300">
        Information on financial assistance for modern farming equipment.
      </p>
    </div>

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Crop Insurance Programs
      </h3>
      <p className="text-gray-300">
        Protection schemes designed to safeguard farmers against losses.
      </p>
    </div>

    <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold mb-3">
        Application Guidance
      </h3>
      <p className="text-gray-300">
        Step-by-step support for eligibility checks and application processes.
      </p>
    </div>

  </div>
</section>

      {/* ================= CALL TO ACTION SECTION ================= */}
      <section className="bg-neutral-950 py-24 px-6 lg:px-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>

          <p className="text-gray-400 mb-8">
            Join Cropyaan today and unlock the power of AI-driven agriculture insights.
          </p>

          <button className="bg-white text-zinc-900 hover:bg-gray-200 px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg">
            Sign Up Now
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;

