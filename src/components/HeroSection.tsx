import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const categories = [
  "Web Development",
  "UI/UX",
  "Finance",
  "Sales",
  "Marketing",
  "Support",
];

const HeroSection = () => {
  const [mode, setMode] = useState<"hire" | "work">("hire");

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center px-6">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 container max-w-3xl mx-auto text-center py-32">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-background mb-5">
          Hire or Get Hired.<br />Instantly.
        </h1>
        <p className="text-base md:text-lg text-background/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Live 1-on-1 video hiring. No posts. No bidding. No escrow.
        </p>

        {/* Toggle */}
        <div className="inline-flex rounded-full border border-background/20 p-1 mb-8">
          <button
            onClick={() => setMode("hire")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              mode === "hire"
                ? "bg-background text-foreground"
                : "text-background/70 hover:text-background"
            }`}
          >
            I Want to Hire
          </button>
          <button
            onClick={() => setMode("work")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              mode === "work"
                ? "bg-background text-foreground"
                : "text-background/70 hover:text-background"
            }`}
          >
            I Want Work
          </button>
        </div>

        {/* Search input */}
        <div className="max-w-lg mx-auto mb-6">
          <div className="flex rounded-full overflow-hidden bg-background shadow-lg">
            <div className="flex-1 flex items-center px-5">
              <Search className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Choose your category…"
                className="w-full h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <Button variant="hero" className="rounded-none rounded-r-full h-12 px-7">
              Start Matching
            </Button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full border border-background/20 text-xs font-medium text-background/70 hover:bg-background/10 transition-colors cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
