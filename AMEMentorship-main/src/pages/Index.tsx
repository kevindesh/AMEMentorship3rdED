import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, Briefcase, GraduationCap, Building2, MessageSquare, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-aviation.jpg";

const upcomingEvents = [
  { title: "Resume Workshop for AME Grads", date: "Mar 15, 2026", time: "2:00 PM EST", location: "Online (Zoom)", description: "Learn how to build an aviation-specific resume that gets interviews." },
  { title: "Employer Meet & Greet", date: "Apr 2, 2026", time: "6:00 PM EST", location: "Toronto, ON", description: "Connect with hiring managers from top Canadian MROs." },
  { title: "Interview Prep Bootcamp", date: "Apr 20, 2026", time: "10:00 AM EST", location: "Online (Zoom)", description: "Mock interviews, feedback, and tips from industry veterans." },
];

const pastEvents = [
  { title: "Career Kickstart Panel", date: "Jan 20, 2026", recap: "50+ grads attended. Panelists from Air Canada, Jazz Aviation, and IMP Aerospace shared hiring insights." },
  { title: "Networking Night — Vancouver", date: "Dec 5, 2025", recap: "Our first West Coast event. 30 attendees connected with 8 employers." },
];

const partners = [
  { name: "Air Canada", initial: "AC" },
  { name: "Jazz Aviation", initial: "JA" },
  { name: "IMP Aerospace", initial: "IA" },
  { name: "Bombardier", initial: "BD" },
  { name: "WestJet", initial: "WJ" },
  { name: "Provincial Aerospace", initial: "PA" },
];

const news = [
  { title: "AME Mentorship Program Launches", date: "Feb 1, 2026", excerpt: "We're pairing experienced aviation professionals with new grads to provide guidance, support, and real industry insight." },
  { title: "New Training Modules Available", date: "Jan 15, 2026", excerpt: "Members now have access to job-readiness training covering interview skills, workplace safety, and technical refreshers." },
  { title: "Partnership with BCIT Announced", date: "Dec 20, 2025", excerpt: "We're working with BCIT to support AME students before they graduate, so they're job-ready on day one." },
];

const forumTopics = [
  { title: "Best tips for your first MRO interview?", replies: 12, author: "Sarah M." },
  { title: "M2 license study group — who's in?", replies: 8, author: "James R." },
  { title: "What tools should a new AME carry?", replies: 15, author: "Mike T." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Aircraft mechanic working on an engine in a modern hangar" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        </div>
        <div className="relative container-wide mx-auto section-padding">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Aviation Career Starts Here
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              We help aircraft maintenance graduates and early-career engineers find their first job. Clear guidance. Real connections. No gatekeeping.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/register">Become a Member <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Are</h2>
            <p className="text-muted-foreground text-lg">
              Backed by AME Solutions Inc. and the AME Mentorship Network, we bridge the gap between aviation school and your first job. We make the transition simple with practical resources, mentorship, and real industry connections.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">For Students & Grads</h3>
                <p className="text-muted-foreground text-sm">
                  Job-ready training, resume help, interview prep, and career guidance tailored for aviation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Mentorship</h3>
                <p className="text-muted-foreground text-sm">
                  Get paired with experienced professionals who've been where you are. Real advice from real people.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Job Connections</h3>
                <p className="text-muted-foreground text-sm">
                  Access job postings, employer events, and a network built to help new aviation professionals succeed.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/about">Learn More About Us <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-accent text-sm font-medium mb-3">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {event.time}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {event.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/events/upcoming">View All Events <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Past Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.title} className="border-0 shadow-sm bg-card">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.recap}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="link">
              <Link to="/events/past">See All Past Events <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Partners</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              We work with leading aviation companies and schools to create real opportunities for new talent.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            {partners.map((p) => (
              <div key={p.name} className="bg-card rounded-lg p-4 flex flex-col items-center justify-center aspect-square shadow-sm border border-border/50">
                <span className="text-2xl font-bold text-primary mb-1">{p.initial}</span>
                <span className="text-xs text-muted-foreground text-center">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/become-sponsor">Become a Sponsor</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/become-partner">Become a Partner</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Recent News</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card key={item.title} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-accent font-medium mb-2">{item.date}</p>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Partner */}
      <section className="section-padding bg-navy-light">
        <div className="container-wide mx-auto">
          <Card className="border-0 shadow-lg bg-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-2 text-gold mb-4">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Featured Corporate Partner</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Partner With Us to Shape the Future of Aviation
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Our corporate partners gain early access to talented, motivated aviation graduates. Support the next generation while building your talent pipeline.
                  </p>
                  <Button asChild variant="gold">
                    <Link to="/become-partner">Learn About Corporate Partnership</Link>
                  </Button>
                </div>
                <div className="bg-primary/5 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="h-16 w-16 text-accent mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground">Your Company Here</p>
                    <p className="text-sm text-muted-foreground">Become our next featured partner</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Forum Preview */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Community Forum</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/forum">View Forum</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {forumTopics.map((topic) => (
              <Card key={topic.title} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{topic.title}</p>
                      <p className="text-xs text-muted-foreground">by {topic.author}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{topic.replies} replies</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Launch Your Aviation Career?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join hundreds of aviation graduates who've found their path. Free to join. Real results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/register">Become a Member — It's Free <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}