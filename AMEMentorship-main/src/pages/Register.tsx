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
import { Plane, ArrowRight, Check } from "lucide-react";
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
  const [googleCredential, setGoogleCredential] = useState("");
  const [role, setRole] = useState<"member" | "mentee" | "mentor">("member");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        const decoded: any = jwtDecode(credentialResponse.credential);
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
    
    const result = await loginWithGoogle(googleCredential, role, formattedUsername, phone);
    setLoading(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setStep(2);
    setTimeout(() => navigate("/member"), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 font-bold text-xl text-primary mb-8">
          <Plane className="h-6 w-6" />
          AME Mentorship Program
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
                <p className="text-muted-foreground mb-6">Join AME Mentorship Program — it's free and takes 30 seconds.</p>
                
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