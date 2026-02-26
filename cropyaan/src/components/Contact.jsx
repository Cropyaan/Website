import Navbar from "./Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#121212] text-white py-20 px-6 lg:px-20">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl">
          Reach out to our team for partnerships, support, or deployment inquiries.
        </p>
      </section>
    </>
  );
}
