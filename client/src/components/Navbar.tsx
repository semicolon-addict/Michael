import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Why Us", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const textColor = isScrolled ? "text-foreground" : "text-white";
  const linkColor = isScrolled
    ? "text-foreground/80 hover:text-primary"
    : "text-white/80 hover:text-white";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-black/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO (Scroll to Hero) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#hero")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className={`flex items-center gap-3 text-2xl font-display font-bold ${textColor}`}
          >
            <img
              src="/favicon.png"
              alt="Gabulouz Logo"
              className="w-8 h-8 object-contain"
            />
            Gabulouz LLC
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium transition-colors ${linkColor}`}
              >
                {link.name}
              </a>
            ))}

            <Button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`rounded-full px-6 ${
                isScrolled
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-muted"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-3xl font-display font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <Button
                size="lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-8 w-full max-w-xs text-lg rounded-full"
              >
                Start a Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
