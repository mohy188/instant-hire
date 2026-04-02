import { Check, X } from "lucide-react";

const rows = [
  { feature: "Real-time video interviews", us: true, them: false },
  { feature: "Instant matching", us: true, them: false },
  { feature: "No bidding wars", us: true, them: false },
  { feature: "No escrow or payment disputes", us: true, them: false },
  { feature: "Transparent flat pricing", us: true, them: false },
  { feature: "Start in under 60 seconds", us: true, them: false },
  { feature: "Platform fees on every transaction", us: false, them: true },
];

const ComparisonSection = () => {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Switch?</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Traditional freelance platforms are slow, expensive, and impersonal.
          </p>
        </div>

        <div className="border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-surface-elevated border-b border-border">
            <div className="p-4 text-sm font-medium text-muted-foreground">Feature</div>
            <div className="p-4 text-sm font-semibold text-foreground text-center">InstantHire</div>
            <div className="p-4 text-sm font-medium text-muted-foreground text-center">Traditional Platforms</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-border last:border-b-0">
              <div className="p-4 text-sm text-foreground">{row.feature}</div>
              <div className="p-4 flex justify-center">
                {row.us ? (
                  <Check className="w-5 h-5 text-foreground" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="p-4 flex justify-center">
                {row.them ? (
                  <Check className="w-5 h-5 text-foreground" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
