const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "DevOps & Cloud",
  "Marketing",
  "Video Editing",
  "Copywriting",
  "Virtual Assistant",
  "Customer Support",
  "Sales",
  "Accounting",
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 md:py-28 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse Categories</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Find talent or opportunities across dozens of professional categories.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div
              key={cat}
              className="border border-border rounded-lg px-4 py-4 text-sm font-medium text-foreground hover:bg-surface-elevated transition-colors cursor-pointer text-center"
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
