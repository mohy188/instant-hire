import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-foreground text-background">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Stop Waiting. Start Meeting.
        </h2>
        <p className="text-lg text-background/60 mb-10 max-w-xl mx-auto leading-relaxed">
          Join thousands of freelancers and employers already hiring face-to-face in real time with end-to-end encrypted sessions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" className="rounded-lg font-semibold h-12 px-8 text-base">
            Start Matching — It's Free to Try
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
