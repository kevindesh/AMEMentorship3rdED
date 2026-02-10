import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Lightbulb, ArrowRight } from "lucide-react";

const values = [
  { icon: Heart, title: "No Gatekeeping", description: "We believe every grad deserves a fair shot. We share what we know — openly and honestly." },
  { icon: Target, title: "Outcome-Focused", description: "Everything we do points toward one thing: helping you get hired. No fluff. Just results." },
  { icon: Users, title: "Community First", description: "We're built by people who've been in your shoes. This isn't a corporation — it's a community." },
  { icon: Lightbulb, title: "Practical Help", description: "We skip the theory and give you what actually works: real templates, real advice, real connections." },
];

export default function AboutUs() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About AME Mentorship Program</h1>
            <p className="text-lg text-primary-foreground/80">
              We exist because landing your first aviation job shouldn't be this hard. We're here to change that.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
            <p className="text-foreground font-medium">
              AME Solutions Inc. has been actively engaged in the aviation industry, providing consulting services in workforce development, training placement, and technical expertise. We have also been closely partnered with the AME Mentorship Network, an established community of over 300 Aircraft Maintenance Engineers and industry professionals across Canada. Together, we have successfully supported mentorship initiatives, assessment days, and direct employment pathways for new entrants into the aviation industry.
            </p>
            <p>
              The AME Mentorship Program was born from this collaboration. It started with a simple question: why is it so hard for aircraft maintenance graduates to find their first job?
            </p>
            <p>
              Graduates spend years training, earning certifications, and preparing for a career in aviation. But when they finish school, many find themselves stuck — unsure where to apply, how to network, or what employers actually want.
            </p>
            <p>
              We've been there. We know the frustration of sending resumes into a void, not knowing who to talk to, or feeling like the industry has no room for newcomers. That's why we built AME Mentorship Program.
            </p>
            <p>
              We're a non-profit organization that bridges the gap between aviation school and your first job. We connect graduates with employers, provide job-readiness training, and offer mentorship from experienced professionals who want to see the next generation succeed.
            </p>
            <p className="text-foreground font-medium">
              No complicated processes. No hidden fees. Just honest help that leads to real offers.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-sky-light rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            To empower aircraft maintenance graduates and early-career aerospace engineers with the guidance, resources, and connections they need to confidently launch their aviation careers.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/register">Join Our Community <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}