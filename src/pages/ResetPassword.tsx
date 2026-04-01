import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (hashParams.get("type") === "recovery") {
      setIsRecovery(true);
    }

    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated successfully" });
      navigate("/auth?mode=login");
    }
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Invalid Link</h1>
          <p className="text-muted-foreground text-sm mb-4">This password reset link is invalid or expired.</p>
          <Button asChild><Link to="/auth?mode=login">Back to Login</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <Link to="/" className="block text-center mb-10">
          <span className="text-lg font-bold tracking-tight text-foreground">OnlineChatWorkers.com</span>
        </Link>
        <div className="border border-border rounded-xl p-8 bg-background">
          <h1 className="text-2xl font-bold text-foreground text-center">Set New Password</h1>
          <p className="text-sm text-muted-foreground text-center mt-2 mb-8">Enter your new password below</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-[7px]" required />
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11 rounded-[7px]" required />
            <Button type="submit" className="w-full h-11 rounded-[7px] font-semibold" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
