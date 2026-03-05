import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const steps = ["Create Account", "Choose Role", "You're In"];

export default function Register() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailSignup, setIsEmailSignup] = useState(false);
  const [googleCredential, setGoogleCredential] = useState("");
  const [role, setRole] = useState<"member" | "mentee" | "mentor">("member");
  const [loading, setLoading] = useState(false);

  const handleEmailNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all email and password fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Basic password validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character");
      return;
    }

    setIsEmailSignup(true);
    setStep(1);
  };

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    if (credentialResponse.credential) {
      try {
        const decoded = jwtDecode<{ name?: string; email: string }>(credentialResponse.credential);
        const fullName = decoded.name || "";
        const nameParts = fullName.split(" ");
        if (nameParts.length > 0) setFirstName(nameParts[0]);
        if (nameParts.length > 1) setLastName(nameParts.slice(1).join(" "));
        
        setEmail(decoded.email);
        setGoogleCredential(credentialResponse.credential);
        setStep(1);
      } catch (error) {
        toast.error("Failed to process Google sign up.");
      }
    }
  };

  const handleRoleSubmit = async () => {
    if (!firstName || !lastName || !role || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    // Generate username format: FirstName. LastInitial (e.g. Kevin. S)
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    // Ensure proper capitalization for consistent display
    const formattedFirstName = cleanFirstName.charAt(0).toUpperCase() + cleanFirstName.slice(1);
    const formattedLastInitial = cleanLastName.charAt(0).toUpperCase();
    
    const formattedUsername = `${formattedFirstName}. ${formattedLastInitial}`;
    
    let result;
    if (isEmailSignup) {
      result = await register(email, password, formattedUsername, role, phone);
    } else {
      result = await loginWithGoogle(googleCredential, role, formattedUsername, phone);
    }
    
    setLoading(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }

    // --- Google Sheets Integration ---
    try {
      // Replace with your Google Apps Script Web App URL or Zapier/Make Webhook 
      const webHookUrl = "https://script.google.com/macros/s/AKfycbw0RTmsiQPbydgQRstbSDwiF2kTxMRMwjn78ytH3ZhCdaV7WDFvpJQ5zy9A4IcFDzg5Mg/exec";
      
      if (webHookUrl !== "YOUR_GOOGLE_SHEETS_WEBHOOK_URL_HERE") {
        await fetch(webHookUrl, {
          method: "POST",
          mode: "no-cors", // Required to avoid CORS issues directly from the browser to Google Scripts
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: cleanFirstName,
            lastName: cleanLastName,
            username: formattedUsername,
            email: email,
            phone: phone,
            role: role,
            registeredAt: new Date().toISOString(),
          }),
        });
        console.log("Sent user data to Google Sheets");
      }
    } catch (error) {
      console.error("Failed to send to Google Sheets:", error);
    }
    // ---------------------------------

    setStep(2);
    setTimeout(() => navigate("/member"), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 font-bold text-xl text-primary mb-8">
          <Plane className="h-6 w-6" />
          AME Mentorship Organization
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 md:p-8">
            {step === 0 && (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h1>
                <p className="text-muted-foreground mb-6">Join AME Mentorship Organization — it's free and takes 30 seconds.</p>
                
                <form onSubmit={handleEmailNext} className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Must be at least 8 characters and contain uppercase, lowercase, number, and special character.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Continue with Email
                  </Button>
                </form>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex justify-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Sign up failed.")}
                    theme="outline"
                    size="large"
                    width="100%"
                    text="signup_with"
                    shape="rectangular"
                  />
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Already a member?{" "}
                  <Link to="/signin" className="text-accent hover:underline font-semibold">
                    Sign in here
                  </Link>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-2">Complete Your Profile</h1>
                <p className="text-muted-foreground mb-6">Confirm your details and choose your role.</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <Label>I am joining as a:</Label>
                  <RadioGroup value={role} onValueChange={(v) => setRole(v as typeof role)} className="space-y-3">
                  <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent cursor-pointer transition-colors">
                    <RadioGroupItem value="member" className="mt-0.5" />
                    <div>
                      <p className="font-semibold">Member</p>
                      <p className="text-sm text-muted-foreground">I'm a student or grad looking for career support.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent cursor-pointer transition-colors">
                    <RadioGroupItem value="mentee" className="mt-0.5" />
                    <div>
                      <p className="font-semibold">Mentee</p>
                      <p className="text-sm text-muted-foreground">I want to be paired with a mentor for guided support.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent cursor-pointer transition-colors">
                    <RadioGroupItem value="mentor" className="mt-0.5" />
                    <div>
                      <p className="font-semibold">Mentor</p>
                      <p className="text-sm text-muted-foreground">I'm an experienced professional who wants to give back.</p>
                    </div>
                  </label>
                </RadioGroup>
                </div>
                
                <Button onClick={handleRoleSubmit} variant="gold" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Creating Account..." : "Complete Registration"}
                </Button>
              </>
            )}

            {step === 2 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Aboard!</h1>
                <p className="text-muted-foreground">You're in. Redirecting to your dashboard...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}