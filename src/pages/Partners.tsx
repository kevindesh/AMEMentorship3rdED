import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, ArrowRight } from "lucide-react";

const partners = [
  { name: "AME Solutions", image: "/AMESolutions Partner.jpeg", type: "Founding Partner" },
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

          <div className="flex justify-center mb-12">
            {partners.map((p) => (
              <Card key={p.name} className="border-0 shadow-lg bg-card hover:shadow-xl transition-shadow w-full max-w-md mx-auto">
                <CardContent className="p-10 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-2xl flex items-center justify-center mb-6 overflow-hidden bg-primary/5 shadow-md">
                    <img src={p.image} alt={p.name + ' Logo'} className="object-contain w-full h-full" />
                  </div>
                  <h3 className="font-bold text-2xl mb-1 text-primary">{p.name}</h3>
                  <p className="text-base text-muted-foreground mb-2">{p.type}</p>
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