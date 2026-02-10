import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, ArrowRight } from "lucide-react";

const partners = [
  { name: "Air Canada", initial: "AC", type: "Airline" },
  { name: "Jazz Aviation", initial: "JA", type: "Regional Carrier" },
  { name: "IMP Aerospace", initial: "IA", type: "MRO" },
  { name: "Bombardier", initial: "BD", type: "Manufacturer" },
  { name: "WestJet", initial: "WJ", type: "Airline" },
  { name: "Provincial Aerospace", initial: "PA", type: "MRO" },
  { name: "BCIT", initial: "BC", type: "School" },
  { name: "Centennial College", initial: "CC", type: "School" },
  { name: "Canadore College", initial: "CN", type: "School" },
];

export default function Partners() {
  return (
    <>
      <section className="section-padding bg-primary">
        <div className="container-wide mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Partners</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl">
            We work with aviation employers, MROs, and schools to create real opportunities for new talent.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Partners Matter</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our partners make this possible. They provide job opportunities, mentorship, event sponsorships, and industry insight that directly benefit our members. Together, we're building a stronger talent pipeline for Canadian aviation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
            {partners.map((p) => (
              <Card key={p.name} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">{p.initial}</span>
                  </div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md bg-card">
              <CardContent className="p-8">
                <Handshake className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Want to Sponsor?</h3>
                <p className="text-muted-foreground mb-4">
                  Support grads with mentorship, training, and events. Your contribution makes a direct impact.
                </p>
                <Button asChild variant="gold">
                  <Link to="/become-sponsor">Become a Sponsor <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md bg-card">
              <CardContent className="p-8">
                <Handshake className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Want to Partner?</h3>
                <p className="text-muted-foreground mb-4">
                  Access early talent, post roles, and get involved in events. Build your pipeline with us.
                </p>
                <Button asChild variant="default">
                  <Link to="/become-partner">Become a Partner <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}