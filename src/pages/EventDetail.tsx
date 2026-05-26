import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const events = [
  { title: "Resume Workshop for AME Grads", date: "Mar 15, 2026", time: "2:00 PM EST", location: "Online (Zoom)", description: "Learn how to build an aviation-specific resume that gets interviews. Bring your current resume for live feedback.", category: "Workshop" },
  { title: "Employer Meet & Greet", date: "Apr 2, 2026", time: "6:00 PM EST", location: "Toronto, ON", description: "Connect face-to-face with hiring managers from top Canadian MROs and airlines.", category: "Networking" },
  { title: "Interview Prep Bootcamp", date: "Apr 20, 2026", time: "10:00 AM EST", location: "Online (Zoom)", description: "Mock interviews, feedback, and tips from industry veterans. Limited spots available.", category: "Training" },
  { title: "Aviation Career Fair", date: "May 10, 2026", time: "9:00 AM – 4:00 PM EST", location: "Montreal, QC", description: "Our biggest event of the year. 20+ employers, panel discussions, and on-the-spot interviews.", category: "Career Fair" },
  { title: "Mentorship Kickoff", date: "May 25, 2026", time: "1:00 PM EST", location: "Online (Zoom)", description: "Meet your mentor, set goals, and start your guided career development journey.", category: "Mentorship" },
];

export default function EventDetail() {
  const { eventTitle } = useParams<{ eventTitle: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const decodedTitle = eventTitle ? decodeURIComponent(eventTitle) : "";
  const event = events.find(e => e.title === decodedTitle);

  const [registered, setRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Check local storage for registration state
    if (user && event) {
      const storageKey = `event_registration_${user.id}_${event.title}`;
      const isRegistered = localStorage.getItem(storageKey) === "true";
      if (isRegistered) {
        setRegistered(true);
      }
    } else {
      // Reset registration state if user is not logged in
      setRegistered(false);
    }
  }, [user, event]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      toast("Please log in to register for this event.");
      navigate("/signin");
      return;
    }

    if (user && event) {
      setIsRegistering(true);
      
      try {
        await fetch("https://script.google.com/macros/s/AKfycbwHgeMTyXOiETQz0gAq0P0KGy7iitjAzw_QjKEyxAnrS69gKk4UgLDhoiZ4KRD5u2L8Ww/exec", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            eventId: event.title,
            eventName: event.title,
          }),
        });
        
        // Since we are using no-cors, we assume success if no network error was thrown
        setRegistered(true);
        const storageKey = `event_registration_${user.id}_${event.title}`;
        localStorage.setItem(storageKey, "true");
        toast("Successfully registered for event!");
      } catch (error) {
        toast("Failed to register. Please try again.");
        console.error("Registration error:", error);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  if (!event) {
    return (
      <div className="container-wide mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground">Sorry, we couldn't find this event.</p>
      </div>
    );
  }


  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto max-w-2xl">
        <span className="inline-block px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
          {event.category}
        </span>
        <h1 className="text-4xl font-bold text-foreground mb-4">{event.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-md text-muted-foreground mb-8">
          <span className="flex items-center gap-1.5"><Calendar className="h-5 w-5" /> {event.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-5 w-5" /> {event.time}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-5 w-5" /> {event.location}</span>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <Button 
            onClick={handleRegister} 
            disabled={registered || isRegistering}
            variant={registered ? "secondary" : "gold"}
            size="lg"
            className={`w-full sm:w-auto ${registered ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {registered ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Registered
              </>
            ) : isRegistering ? (
              "Registering..."
            ) : (
              "Register Now"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
