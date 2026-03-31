import {
  Monitor,
  Smartphone,
  PenTool,
  BarChart3,
  Cloud,
  Megaphone,
  Film,
  FileText,
  Headset,
  MessageSquare,
  TrendingUp,
  Calculator,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories: { name: string; icon: LucideIcon }[] = [
  { name: "Web Development", icon: Monitor },
  { name: "Mobile Development", icon: Smartphone },
  { name: "UI/UX Design", icon: PenTool },
  { name: "Data Science", icon: BarChart3 },
  { name: "DevOps & Cloud", icon: Cloud },
  { name: "Marketing", icon: Megaphone },
  { name: "Video Editing", icon: Film },
  { name: "Copywriting", icon: FileText },
  { name: "Virtual Assistant", icon: MessageSquare },
  { name: "Customer Support", icon: Headset },
  { name: "Sales", icon: TrendingUp },
  { name: "Accounting", icon: Calculator },
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
          {categories.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="border border-border rounded-lg px-4 py-5 text-sm font-medium text-foreground hover:bg-surface-elevated transition-colors cursor-pointer flex flex-col items-center gap-3 text-center"
            >
              <Icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
