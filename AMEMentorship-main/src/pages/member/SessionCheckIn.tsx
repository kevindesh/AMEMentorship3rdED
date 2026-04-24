import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Star } from "lucide-react";

export default function SessionCheckIn() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [happened, setHappened] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!happened || (happened === "Yes" && !rating)) {
      toast({ title: "Incomplete", description: "Please answer the required questions.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("session_feedback").insert({
        user_id: user.id,
        role: user.user_metadata?.role || "unknown",
        session_happened: happened,
        fit_rating: happened === "Yes" ? parseInt(rating) : null,
        additional_notes: notes,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container-wide py-16 flex justify-center items-center">
        <Card className="max-w-md w-full text-center border-t-4 border-t-accent">
          <CardContent className="pt-10 pb-8 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-accent mx-auto" />
            <h2 className="text-2xl font-bold">Feedback Received!</h2>
            <p className="text-muted-foreground">Thank you for taking the time to update us. Your insights help us keep the mentorship program running smoothly.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/member'}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-wide py-12">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-2xl">First Session Check-In</CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            You had your first scheduled session recently. How did it go? <br/>
            <span className="text-sm text-muted-foreground italic">Three quick questions — takes 60 seconds.</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 md:p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Question 1 */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">1. Did the session happen as scheduled? <span className="text-accent">*</span></Label>
              <RadioGroup value={happened} onValueChange={setHappened} className="flex flex-col space-y-2 ml-2">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Yes" id="yes" className="h-5 w-5" />
                  <Label htmlFor="yes" className="text-base font-normal">Yes, we met</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="No" id="no" className="h-5 w-5" />
                  <Label htmlFor="no" className="text-base font-normal">No, it was cancelled</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Rescheduled" id="rescheduled" className="h-5 w-5" />
                  <Label htmlFor="rescheduled" className="text-base font-normal">It was rescheduled</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Question 2 */}
            {happened === "Yes" && (
              <div className="space-y-4 animate-fade-in">
                <Label className="text-base font-semibold">2. On a scale of 1–5, how was the fit? <span className="text-accent">*</span></Label>
                <RadioGroup value={rating} onValueChange={setRating} className="flex flex-row justify-between max-w-sm mt-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex flex-col items-center space-y-2">
                      <Label htmlFor={`rating-${num}`} className="cursor-pointer text-muted-foreground">{num}</Label>
                      <RadioGroupItem value={num.toString()} id={`rating-${num}`} className="h-6 w-6" />
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex justify-between max-w-sm text-xs text-muted-foreground px-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            )}

            {/* Question 3 */}
            <div className="space-y-4">
              <Label htmlFor="notes" className="text-base font-semibold">3. Anything we should know? <span className="text-muted-foreground font-normal">(Optional)</span></Label>
              <Textarea 
                id="notes" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="If anything came up that needs our help, let us know here. We're here to help."
                className="h-24 resize-none"
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}