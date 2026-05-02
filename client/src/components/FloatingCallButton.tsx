import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after 3 seconds of page load
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="tel:+19052265301"
      className="fixed bottom-6 right-6 z-40 md:hidden"
      aria-label="Call Brampton Detail Co."
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-75"></div>
        <button className="relative w-16 h-16 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95">
          <Phone size={28} />
        </button>
      </div>
      <div className="absolute bottom-full right-0 mb-3 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-lg pointer-events-none">
        Call Now
        <div className="absolute top-full right-2 w-2 h-2 bg-primary transform rotate-45"></div>
      </div>
    </a>
  );
}
