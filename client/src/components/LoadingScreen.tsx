import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after page loads
    const handleLoad = () => {
      setTimeout(() => setIsVisible(false), 800);
    };

    if (document.readyState === "complete") {
      setTimeout(() => setIsVisible(false), 800);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background z-[9999] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 animate-pulse"></div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Logo container with animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin"></div>

            {/* Middle pulsing ring */}
            <div className="absolute inset-2 border-2 border-primary/30 rounded-full animate-pulse"></div>

            {/* Inner logo circle */}
            <div className="absolute inset-4 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50">
              <span className="text-white font-bold text-4xl">●</span>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="font-poppins font-bold text-2xl text-foreground mb-2">
          Brampton Detail Co.
        </h2>
        <p className="text-foreground/60 text-sm tracking-widest uppercase">
          Loading...
        </p>

        {/* Animated dots */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      {/* Fade out animation */}
      <style>{`
        @keyframes fadeOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        
        .fade-out-up {
          animation: fadeOutUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
