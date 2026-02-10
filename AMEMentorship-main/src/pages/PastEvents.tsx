import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

const pastEvents = [
  { title: "Career Kickstart Panel", date: "Jan 20, 2026", recap: "50+ grads attended our first panel of 2026. Panelists from Air Canada, Jazz Aviation, and IMP Aerospace shared hiring insights and what they look for in new AME candidates.", attendees: 52 },
  { title: "Networking Night — Vancouver", date: "Dec 5, 2025", recap: "Our first West Coast event brought together 30 attendees with 8 employers. Several attendees received follow-up interviews within the week.", attendees: 30 },
  { title: "Resume Review Day", date: "Nov 15, 2025", recap: "One-on-one resume reviews with industry recruiters. Participants left with polished, aviation-specific resumes ready to send out.", attendees: 25 },
  { title: "AME Grad Welcome Mixer", date: "Oct 1, 2025", recap: "Our inaugural event. We welcomed the fall graduating class and introduced them to the AME Mentorship Program community and resources.", attendees: 40 },
  { title: "Workplace Safety Workshop", date: "Sep 12, 2025", recap: "A hands-on workshop covering safety culture, reporting, and what employers expect from day one on the hangar floor.", attendees: 35 },
];

export default function PastEvents() {
  return (
    <>
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Past Events</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl">
            A look back at what we've done together. Every event brings our community closer to real opportunities.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="space-y-6">
            {pastEvents.map((event) => (
              <Card key={event.title} className="border-0 shadow-sm bg-card">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex w-16 h-16 bg-muted rounded-lg items-center justify-center shrink-0">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-accent font-medium mb-1">{event.date} · {event.attendees} attendees</p>
                      <h2 className="text-xl font-bold text-foreground mb-2">{event.title}</h2>
                      <p className="text-muted-foreground">{event.recap}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-muted/50 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Don't miss what's next</h3>
            <p className="text-muted-foreground mb-4">Check out our upcoming events and save your spot.</p>
            <Button asChild variant="gold">
              <Link to="/events/upcoming">See Upcoming Events <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}