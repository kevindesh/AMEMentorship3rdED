import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const events = [
  { title: "Resume Workshop for AME Grads", date: "Mar 15, 2026", time: "2:00 PM EST", location: "Online (Zoom)", description: "Learn how to build an aviation-specific resume that gets interviews. Bring your current resume for live feedback.", category: "Workshop" },
  { title: "Employer Meet & Greet", date: "Apr 2, 2026", time: "6:00 PM EST", location: "Toronto, ON", description: "Connect face-to-face with hiring managers from top Canadian MROs and airlines.", category: "Networking" },
  { title: "Interview Prep Bootcamp", date: "Apr 20, 2026", time: "10:00 AM EST", location: "Online (Zoom)", description: "Mock interviews, feedback, and tips from industry veterans. Limited spots available.", category: "Training" },
  { title: "Aviation Career Fair", date: "May 10, 2026", time: "9:00 AM – 4:00 PM EST", location: "Montreal, QC", description: "Our biggest event of the year. 20+ employers, panel discussions, and on-the-spot interviews.", category: "Career Fair" },
  { title: "Mentorship Kickoff", date: "May 25, 2026", time: "1:00 PM EST", location: "Online (Zoom)", description: "Meet your mentor, set goals, and start your guided career development journey.", category: "Mentorship" },
];

export default function UpcomingEvents() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleEventClick = (event: typeof events[0]) => {
    if (isAuthenticated) {
      // Navigate to event detail page (you can implement this route)
      navigate(`/events/${encodeURIComponent(event.title)}`);
    } else {
      toast("Please log in to view event details.");
      navigate("/signin");
    }
  };

  return (
    <>
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Upcoming Events</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl">
            Workshops, networking nights, and career fairs — all designed to help you get hired.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="space-y-6">
            {events.map((event) => {
              const isRegistered = user && localStorage.getItem(`event_registration_${user.id}_${event.title}`) === "true";
              
              return (
              <Card
                key={event.title}
                className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                        {event.category}
                      </span>
                      <h2 className="text-xl font-bold text-foreground mb-2">{event.title}</h2>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {event.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {event.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {event.location}</span>
                      </div>
                    </div>
                    <Button 
                      variant={isRegistered ? "secondary" : "gold"} 
                      size="sm"
                      className={isRegistered ? "opacity-75 cursor-not-allowed pointer-events-none" : ""}
                    >
                      {isRegistered ? (
                        <>Registered <Check className="ml-2 h-4 w-4" /></>
                      ) : (
                        <>Register <ArrowRight className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Want to be notified about new events?</p>
            <Button asChild variant="default">
              <Link to="/register">Become a Member for Updates</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}