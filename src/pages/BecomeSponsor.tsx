import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, GraduationCap, Calendar, Mail, ArrowRight } from "lucide-react";

const impactAreas = [
  { icon: GraduationCap, title: "Fund Training", description: "Help us provide free job-readiness training to aviation graduates across Canada." },
  { icon: Users, title: "Support Mentorship", description: "Enable experienced professionals to guide new grads through their first career steps." },
  { icon: Calendar, title: "Power Events", description: "Sponsor networking nights, career fairs, and workshops that create real connections." },
  { icon: Heart, title: "Make an Impact", description: "Your contribution directly supports someone's path from graduate to employed professional." },
];

export default function BecomeSponsor() {
  return (
    <>
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Become a Sponsor</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl">
            Your support helps aviation graduates launch their careers. Every dollar makes a difference.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Where Your Support Goes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We keep it simple. Your sponsorship directly funds the programs and events that help aviation graduates succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impactAreas.map((area) => (
              <Card key={area.title} className="border-0 shadow-sm bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <area.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{area.title}</h3>
                  <p className="text-muted-foreground text-sm">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="container-narrow mx-auto text-center">
            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Support the Next Generation?</h2>
                <p className="text-muted-foreground mb-6">
                  We'd love to discuss how your sponsorship can make the biggest impact. Reach out and let's talk.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="gold" size="lg" asChild>
                    <a href="/contact">
                      <Mail className="h-4 w-4" /> Email Us to Sponsor
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/contact">Contact Page <ArrowRight className="h-4 w-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}