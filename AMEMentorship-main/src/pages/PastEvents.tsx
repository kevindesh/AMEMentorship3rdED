import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, Play } from "lucide-react";

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
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-0 shadow-md bg-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-muted/30">
                    <p className="text-sm text-accent font-medium mb-2 flex items-center gap-2">
                       <Calendar className="h-4 w-4" /> Recent Event
                    </p>
                    <h2 className="text-2xl font-bold text-foreground mb-4">AME Mentorship Highlights</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      Check out the highlights from our most recent networking and mentorship event! See familiar faces and catch a glimpse of the community coming together to build relationships and support the next generation of aviation professionals.
                    </p>
                  </div>
                  <div className="md:w-1/2 bg-black/5 flex items-center justify-center relative min-h-[300px] md:min-h-[400px]">
                    <video 
                      className="w-full h-full object-cover max-h-[400px]" 
                      controls 
                      controlsList="nodownload"
                      preload="metadata"
                      poster="/og-image.jpg"
                    >
                      <source src="/WhatsAppVideo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </CardContent>
            </Card>
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