import { useState, useEffect } from "react";

export default function Gallery() {
  const [expandedPair, setExpandedPair] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Car Detailing Before & After | Brampton Detail Co. Results";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'See real before and after photos from our car detailing jobs in Brampton and the GTA. Interior and exterior transformations for sedans, SUVs, and trucks.');
    }
  }, []);

  const beforeAfterPairs = [
    {
      title: "Sedan Exterior Polish",
      before:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663601325356/KZThWK4nYA5fPQhkRbxLyL/detail-before-1-dirty-sedan-CfHgHgwtfXtpnvwySTUdKo.webp",
      after:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663601325356/KZThWK4nYA5fPQhkRbxLyL/detail-after-1-clean-sedan-U3GVozggWby66YqTTRWgFo.webp",
    },
    {
      title: "SUV Interior Restoration",
      before:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663601325356/KZThWK4nYA5fPQhkRbxLyL/detail-before-2-dirty-suv-interior-6S5bbbQ3VBzcW7Yr4GSnmu.webp",
      after:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663601325356/KZThWK4nYA5fPQhkRbxLyL/detail-after-2-clean-suv-interior-Fxc9wzUrH5wYkH3fKj6PDG.webp",
    },
    {
      title: "Truck Deep Clean",
      before:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663601325356/KZThWK4nYA5fPQhkRbxLyL/detail-before-3-dirty-truck-nLK8dvc8i2jk9dPExhLX4n.webp",
      after:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663601325356/KZThWK4nYA5fPQhkRbxLyL/detail-after-3-clean-truck-J7yuEkNN4sZQuKLCEkz7Ak.webp",
    },
  ];

  return (
    <div className="w-full">
      <section className="py-16 bg-card border-b border-border/50">
        <div className="container">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">
            Our Work
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl">
            See the transformation. Before and after gallery showcasing our
            professional detailing results.
          </p>
          <p className="text-primary font-semibold text-sm mt-3">
            Real results from our customers in Brampton & the GTA.
          </p>
        </div>
      </section>

      <section className="py-16 container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beforeAfterPairs.map((pair, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
              onClick={() => setExpandedPair(expandedPair === idx ? null : idx)}
            >
              <div className="relative overflow-hidden rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="relative w-full aspect-square">
                  <img
                    src={pair.after}
                    alt="After"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 overflow-hidden transition-all duration-300 ${
                      expandedPair === idx ? "w-1/2" : "w-0"
                    }`}
                  >
                    <img
                      src={pair.before}
                      alt="Before"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      {expandedPair === idx ? "Drag to compare" : "Click to compare"}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{pair.title}</h3>
                  <p className="text-sm text-foreground/70">
                    Click to see before & after
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border/50">
        <div className="container max-w-3xl text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
            Your Vehicle Deserves Better
          </h2>
          <p className="text-foreground/80 text-lg mb-8">
            Every car that comes through our doors gets the premium treatment.
            From dusty exteriors to neglected interiors, we transform vehicles
            back to showroom condition.
          </p>
          <a
            href="/book"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Book Your Detail Today
          </a>
        </div>
      </section>
    </div>
  );
}
