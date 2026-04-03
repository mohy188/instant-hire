import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import CameraCapture from "@/components/CameraCapture";

const COUNTRY_CODES = [
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+91", label: "IN +91" },
  { code: "+61", label: "AU +61" },
  { code: "+49", label: "DE +49" },
  { code: "+33", label: "FR +33" },
  { code: "+81", label: "JP +81" },
  { code: "+86", label: "CN +86" },
  { code: "+971", label: "AE +971" },
  { code: "+966", label: "SA +966" },
  { code: "+92", label: "PK +92" },
  { code: "+880", label: "BD +880" },
  { code: "+234", label: "NG +234" },
  { code: "+55", label: "BR +55" },
  { code: "+52", label: "MX +52" },
];

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupStep, setSignupStep] = useState(1); // 1: info, 2: phone, 3: photo

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedRole, setSelectedRole] = useState<"employer" | "freelancer">("freelancer");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "signup");
    setIsForgot(false);
    setSignupStep(1);
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

  const handleSignup = async () => {
    if (!capturedPhoto) {
      toast({ title: "Please capture a live photo to continue", variant: "destructive" });
      return;
    }
    setLoading(true);
    const fullPhone = `${countryCode}${phoneNumber}`;
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

    if (data.user) {
      await Promise.all([
        supabase.from("user_roles").insert({ user_id: data.user.id, role: selectedRole }),
        supabase.from("profiles").update({
          phone_number: fullPhone,
          photo_url: capturedPhoto,
        }).eq("user_id", data.user.id),
      ]);
    }

    setLoading(false);
    toast({ title: "Account created! Check your email to verify." });
    setIsLogin(true);
    setSignupStep(1);
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupStep === 1) {
      if (!displayName.trim() || !email.trim() || password.length < 6) {
        toast({ title: "Please fill all fields (password min 6 chars)", variant: "destructive" });
        return;
      }
      setSignupStep(2);
    } else if (signupStep === 2) {
      if (!phoneNumber.trim() || phoneNumber.length < 6) {
        toast({ title: "Please enter a valid phone number", variant: "destructive" });
        return;
      }
      setSignupStep(3);
    }
  };

  // Forgot password view
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
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
              });
              setLoading(false);
              if (error) toast({ title: error.message, variant: "destructive" });
              else { toast({ title: "Password reset email sent!" }); setIsForgot(false); }
            }} className="space-y-4">
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

  // Login view
  if (isLogin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[420px]">
          <Link to="/" className="block text-center mb-10">
            <span className="text-lg tracking-tight text-foreground font-heading"><span className="font-normal">Instant</span><span className="font-bold">Hire</span></span>
          </Link>
          <div className="border border-border rounded-xl p-8 bg-background">
            <h1 className="text-2xl font-bold text-foreground text-center">Welcome Back</h1>
            <p className="text-sm text-muted-foreground text-center mt-2 mb-8">Sign in to continue to InstantHire</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-[7px]" required />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-[7px]" required />
              <Button type="submit" className="w-full h-11 rounded-[7px] font-semibold" disabled={loading}>
                {loading ? "Please wait..." : "Login"}
              </Button>
            </form>
            <div className="text-center mt-3">
              <button onClick={() => setIsForgot(true)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Forgot Password?</button>
            </div>
            <div className="flex items-center gap-3 my-6">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>
            <Button variant="outline" className="w-full h-11 rounded-[7px] font-medium text-sm gap-2" onClick={async () => {
              await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/dashboard` } });
            }}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <button onClick={() => { setIsLogin(false); setSignupStep(1); }} className="text-foreground font-medium hover:underline">Sign Up</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step signup
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <Link to="/" className="block text-center mb-10">
          <span className="text-lg tracking-tight text-foreground font-heading"><span className="font-normal">Instant</span><span className="font-bold">Hire</span></span>
        </Link>
        <div className="border border-border rounded-xl p-8 bg-background">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  signupStep >= s ? "bg-foreground text-background" : "border border-border text-muted-foreground"
                }`}>{s}</div>
                {s < 3 && <div className={`w-6 h-px transition-colors ${signupStep > s ? "bg-foreground" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {signupStep === 1 && (
            <>
              <h1 className="text-2xl font-bold text-foreground text-center">Create Your Account</h1>
              <p className="text-sm text-muted-foreground text-center mt-2 mb-6">Step 1 — Your details</p>
              <form onSubmit={nextStep} className="space-y-4">
                <Input type="text" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="h-11 rounded-[7px]" required />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["freelancer", "employer"] as const).map((r) => (
                      <button key={r} type="button" onClick={() => setSelectedRole(r)}
                        className={`h-11 rounded-[7px] border text-sm font-medium transition-colors capitalize ${
                          selectedRole === r ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:bg-muted"
                        }`}>{r}</button>
                    ))}
                  </div>
                </div>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-[7px]" required />
                <Input type="password" placeholder="Password (min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-[7px]" required />
                <Button type="submit" className="w-full h-11 rounded-[7px] font-semibold">Continue</Button>
              </form>
            </>
          )}

          {/* Step 2: Phone Number */}
          {signupStep === 2 && (
            <>
              <h1 className="text-2xl font-bold text-foreground text-center">Phone Number</h1>
              <p className="text-sm text-muted-foreground text-center mt-2 mb-6">Step 2 — Required for verification</p>
              <form onSubmit={nextStep} className="space-y-4">
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-11 rounded-[7px] border border-input bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                    className="h-11 rounded-[7px] flex-1"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-[7px]" onClick={() => setSignupStep(1)}>Back</Button>
                  <Button type="submit" className="flex-1 h-11 rounded-[7px] font-semibold">Continue</Button>
                </div>
              </form>
            </>
          )}

          {/* Step 3: Live Photo */}
          {signupStep === 3 && (
            <>
              <h1 className="text-2xl font-bold text-foreground text-center">Identity Photo</h1>
              <p className="text-sm text-muted-foreground text-center mt-2 mb-6">Step 3 — Take a live photo for verification</p>
              <div className="flex flex-col items-center gap-4">
                <CameraCapture onCapture={setCapturedPhoto} capturedImage={capturedPhoto} />
                <div className="flex gap-3 w-full">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-[7px]" onClick={() => setSignupStep(2)}>Back</Button>
                  <Button
                    className="flex-1 h-11 rounded-[7px] font-semibold"
                    disabled={!capturedPhoto || loading}
                    onClick={handleSignup}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </Button>
                </div>
              </div>
            </>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <button onClick={() => { setIsLogin(true); setSignupStep(1); }} className="text-foreground font-medium hover:underline">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
