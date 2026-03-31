import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="text-lg font-bold tracking-tight text-foreground">
          OnlineChatWorkers
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</a>
          <Button size="sm" className="rounded-lg font-semibold">Start Matching</Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background px-6 pb-4 space-y-3">
          <a href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#categories" className="block text-sm text-muted-foreground hover:text-foreground">Categories</a>
          <Button size="sm" className="w-full rounded-lg font-semibold">Start Matching</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
