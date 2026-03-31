import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-6">
            Hire or Get Hired.<br />
            Instantly. Face-to-Face.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            No job posts. No bidding. No escrow. Just real-time 1-on-1 live video hiring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">Start Matching</Button>
            <Button variant="hero-outline">See How It Works</Button>
          </div>
        </div>

        {/* Wireframe UI Mockup */}
        <div className="max-w-4xl mx-auto">
          <div className="border border-border rounded-xl overflow-hidden bg-background shadow-sm">
            <div className="border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <span className="text-xs text-muted-foreground ml-3">onlinechatworkers.com/room/interview</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 min-h-[320px]">
              {/* Video panel */}
              <div className="md:col-span-3 border-r border-border p-6 flex flex-col items-center justify-center bg-surface-elevated">
                <div className="w-24 h-24 rounded-full border-2 border-border mb-4 flex items-center justify-center">
                  <div className="w-12 h-6 border border-border rounded" />
                </div>
                <div className="h-2 w-32 bg-border rounded mb-2" />
                <div className="h-2 w-20 bg-border rounded mb-6" />
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-border" />
                  <div className="w-10 h-10 rounded-full bg-foreground" />
                  <div className="w-10 h-10 rounded-full bg-border" />
                </div>
              </div>
              {/* Chat panel */}
              <div className="md:col-span-2 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-border shrink-0" />
                    <div className="bg-surface-elevated rounded-lg px-3 py-2 space-y-1">
                      <div className="h-2 w-28 bg-border rounded" />
                      <div className="h-2 w-20 bg-border rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2 items-start justify-end">
                    <div className="bg-foreground rounded-lg px-3 py-2 space-y-1">
                      <div className="h-2 w-24 bg-muted-foreground rounded" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-foreground shrink-0" />
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-border shrink-0" />
                    <div className="bg-surface-elevated rounded-lg px-3 py-2 space-y-1">
                      <div className="h-2 w-36 bg-border rounded" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 h-10 rounded-lg border border-border bg-background" />
                  <div className="w-10 h-10 rounded-lg bg-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
