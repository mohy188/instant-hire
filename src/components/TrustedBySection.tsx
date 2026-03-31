const logos = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Stark Industries",
  "Wayne Ent.",
];

const TrustedBySection = () => {
  return (
    <section className="py-16 md:py-20 px-6 bg-background">
      <div className="container max-w-5xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-10">
          Trusted by clients across the world
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((name) => (
            <div
              key={name}
              className="h-8 px-5 flex items-center justify-center rounded border border-border"
            >
              <span className="text-xs font-semibold tracking-wide text-muted-foreground/50 uppercase">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
