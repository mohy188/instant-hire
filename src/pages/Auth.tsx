import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <Link to="/" className="block text-center mb-10">
          <span className="text-lg font-bold tracking-tight text-foreground">
            OnlineChatWorkers.com
          </span>
        </Link>

        {/* Card */}
        <div className="border border-border rounded-xl p-8 bg-background">
          <h1 className="text-2xl font-bold text-foreground text-center">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-2 mb-8">
            {isLogin
              ? "Sign in to continue to your account"
              : "Get started with OnlineChatWorkers"}
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            {!isLogin && (
              <Input
                type="text"
                placeholder="Full Name"
                className="h-11 rounded-[7px] border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              className="h-11 rounded-[7px] border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
            <Input
              type="password"
              placeholder="Password"
              className="h-11 rounded-[7px] border-border bg-background text-foreground placeholder:text-muted-foreground"
            />

            <Button
              type="submit"
              className="w-full h-11 rounded-[7px] font-semibold text-sm"
            >
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          {isLogin && (
            <div className="text-center mt-3">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Google */}
          <Button
            variant="outline"
            className="w-full h-11 rounded-[7px] font-medium text-sm gap-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Toggle */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-foreground font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
