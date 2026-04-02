import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedRole, setSelectedRole] = useState<"employer" | "freelancer">("freelancer");

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
    setIsForgot(false);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      setLoading(false);
      toast({ title: error.message, variant: "destructive" });
      return;
    }

    // Assign role
    if (data.user) {
      await supabase.from("user_roles").insert({ user_id: data.user.id, role: selectedRole });
    }

    setLoading(false);
    toast({ title: "Account created! Check your email to verify." });
    setIsLogin(true);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password reset email sent! Check your inbox." });
      setIsForgot(false);
    }
  };

  if (isForgot) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[420px]">
          <Link to="/" className="block text-center mb-10">
            <span className="text-lg tracking-tight text-foreground font-heading"><span className="font-normal">Instant</span><span className="font-bold">Hire</span></span>
          </Link>
          <div className="border border-border rounded-xl p-8 bg-background">
            <h1 className="text-2xl font-bold text-foreground text-center">Reset Password</h1>
            <p className="text-sm text-muted-foreground text-center mt-2 mb-8">Enter your email to receive a reset link</p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-[7px]" required />
              <Button type="submit" className="w-full h-11 rounded-[7px] font-semibold" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              <button onClick={() => setIsForgot(false)} className="text-foreground font-medium hover:underline">Back to Login</button>
            </p>
          </div>
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
          <h1 className="text-2xl font-bold text-foreground text-center">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-2 mb-8">
            {isLogin ? "Sign in to continue to your account" : "Get started with OnlineChatWorkers"}
          </p>

          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
            {!isLogin && (
              <>
                <Input type="text" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="h-11 rounded-[7px]" required />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("freelancer")}
                      className={`h-11 rounded-[7px] border text-sm font-medium transition-colors ${
                        selectedRole === "freelancer"
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      Freelancer
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("employer")}
                      className={`h-11 rounded-[7px] border text-sm font-medium transition-colors ${
                        selectedRole === "employer"
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      Employer
                    </button>
                  </div>
                </div>
              </>
            )}
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-[7px]" required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-[7px]" required />
            <Button type="submit" className="w-full h-11 rounded-[7px] font-semibold" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          {isLogin && (
            <div className="text-center mt-3">
              <button onClick={() => setIsForgot(true)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 my-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button variant="outline" className="w-full h-11 rounded-[7px] font-medium text-sm gap-2" onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/dashboard` },
            });
          }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-foreground font-medium hover:underline">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
