import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="text-lg tracking-tight text-foreground font-heading"><span className="font-normal">Instant</span><span className="font-bold">Hire</span></a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</a>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="outline" size="sm" className="rounded-[7px] font-medium" asChild>
                  <Link to={role === "admin" ? "/admin" : "/dashboard"}>Dashboard</Link>
                </Button>
                <Button size="sm" className="rounded-[7px] font-semibold" onClick={handleSignOut}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="rounded-[7px] font-medium" asChild>
                  <Link to="/auth?mode=login">Login</Link>
                </Button>
                <Button size="sm" className="rounded-[7px] font-semibold" asChild>
                  <Link to="/auth?mode=signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background px-6 pb-4 space-y-3">
          <a href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#categories" className="block text-sm text-muted-foreground hover:text-foreground">Categories</a>
          <div className="flex gap-3 pt-1">
            {user ? (
              <>
                <Button variant="outline" size="sm" className="flex-1 rounded-[7px] font-medium" asChild>
                  <Link to={role === "admin" ? "/admin" : "/dashboard"}>Dashboard</Link>
                </Button>
                <Button size="sm" className="flex-1 rounded-[7px] font-semibold" onClick={handleSignOut}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1 rounded-[7px] font-medium" asChild>
                  <Link to="/auth?mode=login">Login</Link>
                </Button>
                <Button size="sm" className="flex-1 rounded-[7px] font-semibold" asChild>
                  <Link to="/auth?mode=signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
