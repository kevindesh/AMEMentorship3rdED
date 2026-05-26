import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Briefcase, GraduationCap, Mail, ArrowRight } from "lucide-react";

const employerBenefits = [
  { icon: Users, title: "Access Early Talent", description: "Connect with motivated, certified aviation graduates before they hit the open market." },
  { icon: Briefcase, title: "Post Roles", description: "Share job openings, internships, and co-op positions directly with our members." },
  { icon: Building2, title: "Event Involvement", description: "Participate in career fairs, panels, and networking nights. Meet candidates face-to-face." },
];

const memberBenefits = [
  { icon: Briefcase, title: "Real Job Opportunities", description: "Access roles from partner companies actively looking for new aviation talent." },
  { icon: Users, title: "Mentorship", description: "Get paired with experienced professionals from partner organizations." },
  { icon: GraduationCap, title: "Career Pipeline", description: "A clear path from training to employment, supported every step of the way." },
];

export default function BecomePartner() {
  return (
    <>
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Become a Partner</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl">
            For employers and schools who want to support — and hire — the next generation of aviation professionals.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Employer Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">What Partners Get</h2>
              <div className="space-y-6">
                {employerBenefits.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-sky-light rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">What Members Get</h2>
              <div className="space-y-6">
                {memberBenefits.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-narrow mx-auto text-center">
          <Card className="border-0 shadow-lg bg-card">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Let's Build Something Together</h2>
              <p className="text-muted-foreground mb-6">
                Whether you're an employer, MRO, school, or industry organization — we'd love to explore how we can work together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="gold" size="lg">
                  <Link to="/contact">
                    <Mail className="h-4 w-4 mr-2" /> Get in Touch
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/partners">View Current Partners <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}