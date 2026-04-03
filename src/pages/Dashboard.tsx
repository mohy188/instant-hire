import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import EmployerDashboard from "@/pages/EmployerDashboard";
import FreelancerDashboard from "@/pages/FreelancerDashboard";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "employer") {
    return <EmployerDashboard />;
  }

  if (role === "freelancer") {
    return <FreelancerDashboard />;
  }

  // Fallback if no role assigned yet
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-foreground mb-2">Setting up your account...</h1>
        <p className="text-sm text-muted-foreground mb-4">Your role hasn't been assigned yet. Please try logging out and back in.</p>
        <Button variant="outline" className="rounded-[7px]" asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
