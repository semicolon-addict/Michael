import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";

export default function ServicePage() {
  const [, params] = useRoute("/services/:slug");
  const [open, setOpen] = useState(false);

  const service = params
    ? services[params.slug as keyof typeof services]
    : null;

  // Always open page at top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${service.heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* ================= CONTENT SECTIONS ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-32">

          {service.sections.map((section, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                {/* IMAGE */}
                <div className={isReversed ? "md:order-2" : ""}>
                  <img
                    src={section.image}
                    alt={section.heading}
                    className="w-full h-[420px] object-cover rounded-3xl shadow-2xl"
                  />
                </div>

                {/* TEXT */}
                <div className={isReversed ? "md:order-1" : ""}>
                  <h2 className="text-4xl font-bold mb-6">
                    {section.heading}
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA BUTTON */}
          <div className="text-center pt-16">
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="rounded-full px-10 py-6 text-lg"
            >
              Start Your Project
            </Button>
          </div>

        </div>
      </section>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-10 relative shadow-2xl">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-6 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-8">
              Start Your Project
            </h2>

            <ContactForm />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}