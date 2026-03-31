import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Freelancer",
    price: "$3",
    period: "/ month per category",
    description: "Get discovered by employers looking for your exact skills.",
    features: [
      "Unlimited video interviews",
      "Real-time instant matching",
      "Profile visibility in your categories",
      "In-room chat & screen sharing",
    ],
    cta: "Start as Freelancer",
    featured: false,
  },
  {
    name: "Employer",
    price: "$7",
    period: "/ month per category",
    description: "Find and interview talent in minutes, not weeks.",
    features: [
      "Unlimited video interviews",
      "Priority matching queue",
      "Access to all freelancers in category",
      "In-room chat & screen sharing",
      "Candidate bookmarking",
    ],
    cta: "Start Hiring",
    featured: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 px-6 bg-surface-elevated">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">No hidden fees. No commissions. Just a flat monthly rate.</p>
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
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
