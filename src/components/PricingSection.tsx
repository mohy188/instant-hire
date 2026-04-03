import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Freelancer",
    price: "$3",
    period: "/ month per category",
    description: "Get matched with employers in your paid category for the whole month.",
    features: [
      "15-minute 1-on-1 live video session",
      "End-to-end encrypted in-room chat",
      "Equal matching access with employers",
      "Share contact info to move forward",
      "Only get matched in paid category for whole month",
    ],
    cta: "Join as Freelancer",
    featured: false,
  },
  {
    name: "Employer",
    price: "$7",
    period: "/ month per category",
    description: "Get matched with freelancers in your paid category for the whole month.",
    features: [
      "15-minute 1-on-1 live video session",
      "End-to-end encrypted in-room chat",
      "Equal matching access with freelancers",
      "Share contact info to move forward",
      "Only get matched in paid category for whole month",
    ],
    cta: "Join as Employer",
    featured: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 px-6 bg-surface-elevated">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">InstantHire Pricing — Simple & Transparent</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">No hidden fees. No commissions. No escrow. Just a flat monthly rate per category.</p>
        </div>

        <div className="text-center mb-12">
          <div className="inline-block border border-border rounded-lg px-5 py-3 bg-background">
            <p className="text-sm text-muted-foreground">
              Each InstantHire session is <span className="text-foreground font-semibold">15 minutes</span>. Want to continue? Share contact info and take it forward — end to end.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 border ${
                plan.featured
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border"
              }`}
            >
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${plan.featured ? "text-background/70" : "text-muted-foreground"}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-8 ${plan.featured ? "text-background/70" : "text-muted-foreground"}`}>{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 shrink-0 ${plan.featured ? "text-background" : "text-foreground"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full rounded-lg font-semibold h-11"
                variant={plan.featured ? "secondary" : "default"}
                asChild
              >
                <Link to="/auth?mode=signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
