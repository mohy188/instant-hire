import { Button } from "@/components/ui/button";
import { User, Video, Mic, MicOff, VideoOff, Send } from "lucide-react";

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
            <Button variant="hero" className="min-w-[200px]">
              I Want Work
              <span className="ml-2 text-xs font-normal opacity-70">Freelancer</span>
            </Button>
            <Button variant="hero" className="min-w-[200px]">
              I Want to Hire
              <span className="ml-2 text-xs font-normal opacity-70">Employer</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Free to join · No credit card required</p>
        </div>

        {/* Refined split-screen UI mockup */}
        <div className="max-w-4xl mx-auto">
          <div className="border border-border rounded-xl overflow-hidden bg-background shadow-sm">
            {/* Browser chrome */}
            <div className="border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <span className="text-xs text-muted-foreground ml-3">onlinechatworkers.com/room/interview</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 min-h-[340px]">
              {/* Video panel */}
              <div className="md:col-span-3 border-r border-border p-8 flex flex-col items-center justify-center bg-surface-elevated relative">
                {/* Professional avatar */}
                <div className="w-28 h-28 rounded-full border-2 border-border mb-5 flex items-center justify-center bg-background">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="text-foreground">
                    <circle cx="28" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M8 50c0-11 8.95-20 20-20s20 9 20 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="24" cy="18" r="1.2" fill="currentColor" />
                    <circle cx="32" cy="18" r="1.2" fill="currentColor" />
                    <path d="M24.5 23c1.5 2 5.5 2 7 0" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="h-2.5 w-28 bg-border rounded mb-1.5" />
                <div className="text-[10px] text-muted-foreground mb-6">Senior Developer · Online</div>

                {/* Video controls */}
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                    <Mic className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
                    <Video className="w-5 h-5 text-background" />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                    <VideoOff className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* "LIVE" indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                  <span className="text-[10px] font-semibold text-foreground tracking-widest uppercase">Live</span>
                </div>
              </div>

              {/* Chat panel */}
              <div className="md:col-span-2 p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Incoming message */}
                  <div className="flex gap-2 items-end">
                    <div className="w-6 h-6 rounded-full bg-border shrink-0 flex items-center justify-center">
                      <User className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-1">Sarah M.</div>
                      <div className="bg-surface-elevated rounded-lg rounded-bl-none px-3 py-2">
                        <p className="text-xs text-foreground">Hi! Tell me about your experience with React and Node.js</p>
                      </div>
                    </div>
                  </div>

                  {/* Outgoing message */}
                  <div className="flex gap-2 items-end justify-end">
                    <div>
                      <div className="bg-foreground rounded-lg rounded-br-none px-3 py-2">
                        <p className="text-xs text-background">5 years full-stack. I'd love to walk you through my portfolio live.</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-foreground shrink-0 flex items-center justify-center">
                      <User className="w-3 h-3 text-background" />
                    </div>
                  </div>

                  {/* Another incoming */}
                  <div className="flex gap-2 items-end">
                    <div className="w-6 h-6 rounded-full bg-border shrink-0 flex items-center justify-center">
                      <User className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="bg-surface-elevated rounded-lg rounded-bl-none px-3 py-2">
                        <p className="text-xs text-foreground">That sounds great. Let's do it!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat input */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 h-9 rounded-lg border border-border bg-background px-3 flex items-center">
                    <span className="text-xs text-muted-foreground">Type a message…</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
                    <Send className="w-3.5 h-3.5 text-background" />
                  </div>
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
