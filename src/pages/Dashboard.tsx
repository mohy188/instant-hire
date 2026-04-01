import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user, role, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="text-lg font-bold tracking-tight text-foreground">OnlineChatWorkers</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground capitalize">{role}</span>
            <Button variant="outline" size="sm" className="rounded-[7px]" onClick={handleSignOut}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="container max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {profile?.display_name || "User"}</h1>
        <p className="text-muted-foreground mb-8">You're signed in as <span className="font-medium text-foreground capitalize">{role}</span></p>

        {role === "employer" && (
          <div className="space-y-4">
            <div className="border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">Employer Dashboard</h2>
              <p className="text-sm text-muted-foreground">Post requirements, start matching, and hire freelancers via live video.</p>
            </div>
          </div>
        )}

        {role === "freelancer" && (
          <div className="space-y-4">
            <div className="border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">Freelancer Dashboard</h2>
              <p className="text-sm text-muted-foreground">Create your profile, set categories, and join matching rooms.</p>
            </div>
          </div>
        )}

        {role === "admin" && (
          <div className="space-y-4">
            <Button asChild className="rounded-[7px]">
              <Link to="/admin">Go to Admin Panel</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
