import { useEffect, useState } from "react";

const HeroAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl relative select-none" aria-hidden="true">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {["Sign Up", "Choose Category", "Instant Hire"].map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-700 ${
                  step === i
                    ? "border-foreground bg-foreground text-background scale-110"
                    : "border-border text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-[11px] font-medium transition-colors duration-500 ${
                  step === i ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className="w-8 h-px bg-border mb-5" />
            )}
          </div>
        ))}
      </div>

      {/* Animation container */}
      <div className="relative border border-border rounded-xl bg-card overflow-hidden" style={{ height: 320 }}>
        {/* Step 0: Sign Up */}
        <div
          className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-700"
          style={{
            opacity: step === 0 ? 1 : 0,
            transform: step === 0 ? "translateX(0)" : step > 0 ? "translateX(-40px)" : "translateX(40px)",
          }}
        >
          <div className="w-full max-w-[260px] space-y-4">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full border-2 border-foreground mx-auto mb-3 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-foreground">Create Account</p>
            </div>
            {["Full Name", "Email", "Password"].map((field, i) => (
              <div
                key={field}
                className="transition-all duration-500"
                style={{
                  opacity: step === 0 ? 1 : 0,
                  transform: step === 0 ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="text-[10px] text-muted-foreground mb-1 font-medium">{field}</div>
                <div className="h-8 rounded-md border border-border bg-background flex items-center px-3">
                  <div
                    className="h-1.5 rounded-full bg-muted-foreground/30"
                    style={{ width: field === "Email" ? "65%" : field === "Password" ? "40%" : "55%" }}
                  />
                </div>
              </div>
            ))}
            <div
              className="h-9 rounded-md bg-foreground flex items-center justify-center transition-all duration-500"
              style={{
                opacity: step === 0 ? 1 : 0,
                transitionDelay: "360ms",
              }}
            >
              <span className="text-background text-xs font-semibold">Sign Up</span>
            </div>
          </div>
        </div>

        {/* Step 1: Choose Category */}
        <div
          className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-700"
          style={{
            opacity: step === 1 ? 1 : 0,
            transform: step === 1 ? "translateX(0)" : step > 1 ? "translateX(-40px)" : "translateX(40px)",
          }}
        >
          <div className="w-full max-w-[280px]">
            <p className="text-sm font-semibold text-foreground text-center mb-4">Select Your Category</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Web Dev", icon: "M4 6h16M4 12h16M4 18h7" },
                { name: "UI/UX", icon: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" },
                { name: "Marketing", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
                { name: "Data Science", icon: "M18 20V10M12 20V4M6 20v-6" },
                { name: "DevOps", icon: "M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z" },
                { name: "Support", icon: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" },
              ].map(({ name, icon }, i) => (
                <div
                  key={name}
                  className={`border rounded-lg px-3 py-3 flex items-center gap-2 cursor-pointer transition-all duration-500 ${
                    step === 1 && i === 0
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                  style={{
                    opacity: step === 1 ? 1 : 0,
                    transform: step === 1 ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground shrink-0"
                  >
                    <path d={icon} />
                  </svg>
                  <span className="text-[11px] font-medium text-foreground">{name}</span>
                </div>
              ))}
            </div>
            <div
              className="h-9 rounded-md bg-foreground flex items-center justify-center mt-4 transition-all duration-500"
              style={{
                opacity: step === 1 ? 1 : 0,
                transitionDelay: "480ms",
              }}
            >
              <span className="text-background text-xs font-semibold">Continue</span>
            </div>
          </div>
        </div>

        {/* Step 2: Instant Hire – Video Call */}
        <div
          className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-700"
          style={{
            opacity: step === 2 ? 1 : 0,
            transform: step === 2 ? "translateX(0)" : "translateX(40px)",
          }}
        >
          <div className="w-full max-w-[320px]">
            <p className="text-sm font-semibold text-foreground text-center mb-4">Live Video Interview</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Person 1 */}
              <div
                className="border border-border rounded-lg aspect-[4/3] flex flex-col items-center justify-center bg-background transition-all duration-600"
                style={{
                  opacity: step === 2 ? 1 : 0,
                  transform: step === 2 ? "scale(1)" : "scale(0.9)",
                  transitionDelay: "200ms",
                }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-foreground/20 bg-muted flex items-center justify-center mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">Employer</span>
                <div className="flex gap-1.5 mt-2">
                  <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/></svg>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><path d="m16 2 2 2-2 2M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/></svg>
                  </div>
                </div>
              </div>
              {/* Person 2 */}
              <div
                className="border border-border rounded-lg aspect-[4/3] flex flex-col items-center justify-center bg-background transition-all duration-600"
                style={{
                  opacity: step === 2 ? 1 : 0,
                  transform: step === 2 ? "scale(1)" : "scale(0.9)",
                  transitionDelay: "400ms",
                }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-foreground/20 bg-muted flex items-center justify-center mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">Freelancer</span>
                <div className="flex gap-1.5 mt-2">
                  <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/></svg>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><path d="m16 2 2 2-2 2M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/></svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Connected status */}
            <div
              className="flex items-center justify-center gap-2 mt-4 transition-all duration-500"
              style={{
                opacity: step === 2 ? 1 : 0,
                transitionDelay: "600ms",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
              <span className="text-[11px] font-medium text-foreground">Connected · Live · End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;
