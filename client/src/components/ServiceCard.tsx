import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  price: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function ServiceCard({
  icon,
  name,
  description,
  price,
  href = "/services",
  onClick,
  className = "",
}: ServiceCardProps) {
  return (
    <a href={href} className="block no-underline">
      <Card
        className={`relative p-6 bg-card border-border/50 overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 cursor-pointer h-full ${className}`}
      >
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Animated border glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon with scale animation */}
          <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          {/* Name */}
          <h3 className="font-poppins font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
            {name}
          </h3>

          {/* Description */}
          <p className="text-foreground/70 text-sm mb-4 transition-colors duration-300 group-hover:text-foreground/80 flex-grow">
            {description}
          </p>

          {/* Price */}
          <p className="text-primary font-bold text-lg mb-4 transition-all duration-300 group-hover:text-primary group-hover:scale-105 origin-left">
            {price}
          </p>

          {/* CTA Text */}
          <div className="flex items-center justify-center gap-2 text-primary font-bold transition-all duration-300 group-hover:text-white group-hover:bg-primary/10 p-3 rounded-lg">
            <span>View Details</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/0 group-hover:bg-primary/5 rounded-bl-full transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
      </Card>
    </a>
  );
}
