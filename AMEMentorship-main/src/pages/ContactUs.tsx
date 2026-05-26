import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, Send, MapPin } from "lucide-react";
import { toast } from "sonner";

// ...existing code...
export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !reason.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxtE8xTn5YK4nFWoclVXnGwIiZPYexm2-gCutOLNswRbhGxmxnzSr-5tj_xayEhLPp7/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name,
            email,
            reason,
            message,
          }).toString(),
        }
      );
      const result = await response.json();
      if (result.result === "success") {
        toast.success("Thanks for reaching out! We'll get back to you soon.");
        setName("");
        setEmail("");
        setReason("");
        setMessage("");
      } else {
        toast.error("There was a problem submitting your message. Please try again later.");
      }
    } catch (error) {
      toast.error("There was a problem submitting your message. Please try again later.");
    }
  };

  return (
    <>
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-primary-foreground/80">
              Have a question? Want to get involved? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="reason">Reason For Contact</Label>
                  <Input
                    id="reason"
                    placeholder="e.g. General Inquiry, Support, Partnership, etc."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-1.5"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help..." value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1.5 min-h-[140px]" maxLength={1000} />
                </div>
                <Button type="submit" variant="gold" size="lg">
                  Send Message <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Email Us</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">info@amesolutions.ca</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Response Time</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">We usually respond within 24–48 hours. Hang tight — we'll get back to you.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Location</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Greater Toronto Area (serving Canada)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
