import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";
import { toast } from "sonner";

export default function SignIn() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const result = await loginWithGoogle(credentialResponse.credential);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Welcome back!");
      navigate("/member");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 font-bold text-xl text-primary mb-8">
          <Plane className="h-6 w-6" />
          AME Mentorship Program
        </Link>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 md:p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground mb-6">Welcome back. Let's pick up where you left off.</p>

            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                width="100%"
                text="signin_with"
                shape="rectangular"
              />
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/register" className="text-accent font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}