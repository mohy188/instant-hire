import { UserPlus, Video, Handshake } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Set Your Role",
    description: "Choose freelancer or employer. Pick your categories. You're live in under 60 seconds.",
  },
  {
    icon: Video,
    title: "Get Matched Instantly",
    description: "Our system pairs you with a relevant match and drops you both into a private video room.",
  },
  {
    icon: Handshake,
    title: "Hire on the Spot",
    description: "Interview, negotiate, and close the deal — all in one real-time conversation.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 bg-surface-elevated">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Three steps. No friction. Real results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
