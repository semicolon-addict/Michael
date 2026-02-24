import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle2, ChevronRight, Star } from "lucide-react";

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api } from "@shared/routes";
import { useContactSubmission } from "@/hooks/use-contact";

// Schema matching shared routes
const formSchema = api.contact.submit.input;

type Service = {
  title: string;
  slug: string;
  desc: string;
  image: string;
};

const services: Service[] = [
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    desc: "Data-driven strategies to amplify your brand presence and drive real conversions across all digital channels.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", // Office analytics
  },
  {
    title: "Brand Management",
    slug: "brand-management",
    desc: "Crafting cohesive identities that resonate with your audience and stand the test of time.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", // Strategy meeting
  },
  {
  title: "Financial Professional Services",
  slug: "financial-professional-services",
  desc: "Strategic financial advisory, compliance, and investment solutions for sustainable growth.",
  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
},
  {
    title: "Web Development",
    slug: "web-development",
    desc: "Building blazing fast, secure, and scalable web applications using modern technologies.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", // Coding
  },
  {
  title: "Car Rentals",
  slug: "car-rentals",
  desc: "Premium and reliable car rental solutions for individuals and businesses.",
  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", // Car rental
  },
  {
    title: "Creative Direction",
    slug: "creative-direction",
    desc: "Visual storytelling that captures imagination and communicates your core values effectively.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80", // Creative studio
  },
  {
    title: "Education & Training",
    slug: "education-training",
    desc: "Empowering your team with the skills and knowledge needed to maintain digital excellence.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", // Workshop
  },
];

const stats = [
  { value: "250+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Industry Awards" },
  { value: "24/7", label: "Dedicated Support" },
];

const testimonials = [
  {
    quote: "Gabulouz LLC transformed our digital presence completely. Their attention to detail and creative vision is unmatched.",
    author: "Sarah Johnson",
    role: "CEO, TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    quote: "Working with this team was seamless. They understood our brand voice immediately and delivered beyond expectations.",
    author: "Michael Chen",
    role: "Director, ArtSpace",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
  {
    quote: "The ROI we've seen since launching the new campaign has been incredible. Truly a partnership that drives results.",
    author: "Elena Rodriguez",
    role: "CMO, VentureGroup",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
  },
];

export default function Home() {
  const contactMutation = useContactSubmission();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    contactMutation.mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  // Scroll animations
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0B1120]">
        {/* Abstract animated background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-primary rounded-full mix-blend-multiply filter blur-[128px] animate-blob" />
          <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-secondary rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-40 left-20 w-[500px] h-[500px] bg-accent rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-primary mb-6 backdrop-blur-md">
              Trust Winning Digital Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1]"
          >
            We Build. We Grow.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              We Deliver.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/60 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Gabulouz LLC delivers expert{" "}
            
            <span className="relative inline-block group cursor-default">
            <span className="text-white relative z-10">
              consulting
            </span>
            <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500 group-hover:w-full"></span>
          </span>
            , performance-driven{" "}
            <span className="relative inline-block group cursor-default">
              <span className="text-white relative z-10">
                brand marketing
              </span>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500 group-hover:w-full"></span>
            </span>
            , and long-term{" "}
            <span className="relative inline-block group cursor-default">
              <span className="text-white relative z-10">
                brand management strategies
              </span>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500 group-hover:w-full"></span>
            </span>{" "}
            designed to position businesses for sustainable growth and market authority.
          </motion.p>

          <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() =>
              document.querySelector("#services")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="rounded-full text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-white"
          >
            View Our Work
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="rounded-full text-lg h-14 px-8 border-white/20 text-white hover:bg-white/10"
          >
            Contact Us
          </Button>
        </motion.div>
        </div>
      </section>

      {/* --- SERVICES HORIZONTAL SCROLL --- */}
      <section id="services" className="py-24 md:py-32 overflow-hidden bg-background">
        <div className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Comprehensive digital solutions tailored to your unique business needs.
            </p>
          </motion.div>
        </div>

        <div className="flex overflow-x-auto pb-12 px-6 md:px-0 scrollbar-hide snap-x snap-mandatory">
          <div className="flex space-x-6 md:space-x-8 md:pl-32 pr-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="snap-center"
              >
                <Link href={`/services/${service.slug}`}>
                <a className="block cursor-pointer">
                  <ServiceCard
                    number={`0${idx + 1}`}
                    title={service.title}
                    description={service.desc}
                    image={service.image}
                  />
                </a>
              </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 p-8 bg-background rounded-2xl shadow-xl border border-border hidden md:block">
                <p className="font-display font-bold text-4xl text-primary mb-2">10+</p>
                <p className="text-muted-foreground">Years of excellence in digital innovation</p>
              </div>
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold mb-8"
              >
                We are more than just an agency. We are your partners in growth.
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-lg text-muted-foreground"
              >
                <p>
                  Founded in 2011, Gabulouz LLC has grown from a small design studio to a full-service digital powerhouse. 
                  Our philosophy is simple: create work that matters.
                </p>
                <p>
                  We believe in the power of collaboration. By working closely with our clients, we uncover unique insights 
                  that lead to breakthrough creative solutions.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOUNDERS NOTE --- */}
      {/* --- FOUNDER'S NOTE --- */}
<section className="mt-24">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    
    {/* Founder Image */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="/micheal.jpeg"
          alt="Founder"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute -bottom-6 -left-3 bg-background border border-border shadow-xl rounded-2xl px-6 py-4 hidden md:block">
        <p className="text-sm text-muted-foreground">CEO & Creative Director</p>
      </div>
    </motion.div>

    {/* Founder Text */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
        Founder’s Note
      </h2>

      <div className="space-y-6 text-lg text-muted-foreground">
        <p>The company was founded by <b>Mr. Gabriel Ejiagu</b>, my Father who passed away , 
          and now it’s my goal to continue his vision
        </p>

        <p>
          When I started Gabulouz LLC, the vision was simple - build an agency that
          doesn’t just deliver services, but creates impact. Every brand has a
          story, and our job is to amplify it with clarity, creativity, and purpose.
        </p>

        <p>
          Over the years, we’ve grown into a team of thinkers, creators, and
          technologists who believe innovation should always serve strategy.
          We don’t chase trends - we build sustainable digital ecosystems that
          scale with your ambition.
        </p>

        <p>
          Thank you for trusting us with your vision.
          We look forward to building something remarkable together.
        </p>
      </div>

      <div className="mt-8">
        <p className="font-display font-bold text-xl text-foreground">
          - Michael Ejiagu
        </p>
        <p className="text-sm text-muted-foreground">
          CEO, Gabulouz LLC
        </p>
      </div>
    </motion.div>

  </div>
</section>


      {/* --- WHY US --- */}
      <section id="why-us" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Why Choose Gabulouz LLC</h2>
            <p className="text-muted-foreground text-lg">
              We bring a unique blend of creativity and technical expertise to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Strategic Approach", desc: "We don't just design; we solve business problems with strategic thinking." },
              { title: "Innovative Tech", desc: "Using the latest technologies to build future-proof solutions." },
              { title: "Results Driven", desc: "Our focus is always on delivering measurable ROI for your business." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 bg-[#0B1120] text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
            Client Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl"
              >
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg text-white/80 mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold">{t.author}</p>
                    <p className="text-sm text-white/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's Talk</h2>
              <p className="text-muted-foreground text-lg mb-12">
                Ready to start your next project? 
                <br></br>Fill out the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">2121 N broad st, #1019 Philadelphia pa 19132, United States.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">info@gabulouz.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Talk with Us</h3>
                    <p className="text-muted-foreground">+1 (833) 315 2102</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-white border-none h-12 rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-white border-none h-12 rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project..." 
                            className="bg-white border-none min-h-[150px] rounded-xl resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full h-12 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
