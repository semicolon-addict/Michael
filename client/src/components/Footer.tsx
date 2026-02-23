import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-display font-bold mb-6">
              Gabulouz LLC<span className="text-primary">.</span>
            </h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              We build digital experiences that drive growth, engage users, and elevate brands. 
              Let's create something extraordinary together.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>info@gabulouz.com</li>
              <li>+1 (833) 315 2102</li>
              <li>2121 N broad st, #1019
                Philadelphia pa 19132,
                United States.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gabulouz LLC Agency. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
