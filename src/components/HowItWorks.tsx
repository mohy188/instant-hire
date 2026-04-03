import { useEffect, useRef, useState } from "react";
import { Clock, Zap, Shield, Globe, MessageSquare, Users } from "lucide-react";

const stats = [
  { value: "60", suffix: "s", label: "To go live", icon: Clock },
  { value: "0", suffix: "%", label: "Platform fees on hire", icon: Zap },
  { value: "1:1", suffix: "", label: "Private video rooms", icon: Shield },
  { value: "24/7", suffix: "", label: "Global availability", icon: Globe },
];

const features = [
  {
    icon: Users,
    title: "Real People, Real Time",
    description: "No bots, no algorithms deciding for you. You meet the actual person you'll work with — face to face, before any commitment.",
  },
  {
    icon: MessageSquare,
    title: "Skip the Back-and-Forth",
    description: "Forget weeks of proposals, interviews, and email threads. One live conversation replaces dozens of messages.",
  },
  {
    icon: Zap,
    title: "Decide in Minutes",
    description: "See their skills, hear their pitch, ask your questions — then hire or move on. No wasted time for either side.",
  },
];

const HowItWorks = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 bg-surface-elevated" ref={ref}>
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why InstantHire Works</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Built for speed, trust, and real human connection — no middlemen.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="border border-border rounded-xl p-5 text-center bg-card transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <stat.icon className="w-5 h-5 text-muted-foreground mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {stat.value}<span className="text-muted-foreground">{stat.suffix}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Feature cards with left border accent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="relative border border-border rounded-xl p-6 bg-card transition-all duration-700 hover:border-foreground/20 group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${400 + i * 120}ms`,
              }}
            >
              <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-foreground/10 rounded-full group-hover:bg-foreground/40 transition-colors duration-300" />
              <div className="pl-4">
                <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-background" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
