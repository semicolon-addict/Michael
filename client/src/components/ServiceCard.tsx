import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
  isActive?: boolean;
}

export default function ServiceCard({ number, title, description, image, isActive }: ServiceCardProps) {
  return (
    <div className="min-w-[85vw] md:min-w-[400px] h-[500px] relative group overflow-hidden rounded-3xl mx-4 shadow-lg border border-white/10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <span className="text-4xl font-display font-bold opacity-30">{number}</span>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-3xl font-display font-bold mb-4">{title}</h3>
          <p className="text-white/70 line-clamp-3 group-hover:text-white transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
