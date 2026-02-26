import Navbar from "./Navbar";

export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#121212] text-white py-20 px-6 lg:px-20">
        <h1 className="text-4xl font-bold mb-6">How It Works</h1>
        <p className="text-gray-400 max-w-2xl">
          Our drones scan your land, AI analyzes crop health,
          and we deliver actionable insights directly to your dashboard.
        </p>
      </section>
    </>
  );
}
