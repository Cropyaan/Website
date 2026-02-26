import Navbar from "./Navbar";

export default function Services() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#121212] text-white py-20 px-6 lg:px-20">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-gray-400 max-w-2xl">
          Cropyaan offers drone surveillance, AI crop analytics,
          soil intelligence mapping, and real-time agricultural forecasting.
        </p>
      </section>
    </>
  );
}
