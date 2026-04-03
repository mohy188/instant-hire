import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroAnimation from "@/components/HeroAnimation";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-foreground mb-5">
              Hire or Get Hired.<br />
              Instantly.<br />
              Face‑to‑Face.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
              InstantHire is the live video hiring marketplace — no job posts, no bidding, no escrow. Just real‑time 1‑on‑1 encrypted video sessions. Connect with the right person in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-[7px] font-semibold px-7" asChild>
                <Link to="/auth?mode=login">Login</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-[7px] font-semibold px-7" asChild>
                <Link to="/auth?mode=signup">Sign Up</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">No bidding competition · No escrow · No platform fees</p>
          </div>

          {/* Right — Animated Flow */}
          <div className="flex items-center justify-center lg:justify-end">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
