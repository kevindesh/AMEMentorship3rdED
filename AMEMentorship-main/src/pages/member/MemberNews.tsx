import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const news = [
  { title: "AME Mentorship Organization Launches", date: "Feb 1, 2026", excerpt: "We're pairing experienced aviation professionals with new grads to provide guidance, support, and real industry insight." },
  { title: "New Training Modules Available", date: "Jan 15, 2026", excerpt: "Members now have access to job-readiness training covering interview skills, workplace safety, and technical refreshers." },
  { title: "Partnership with BCIT Announced", date: "Dec 20, 2025", excerpt: "We're working with BCIT to support AME students before they graduate, so they're job-ready on day one." },
];

export default function MemberNews() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-accent" /> Recent News
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card key={item.title} className="border-0 shadow bg-card">
              <CardContent className="p-8">
                <div className="text-xs text-muted-foreground mb-2">{item.date}</div>
                <h2 className="font-semibold text-xl mb-2">{item.title}</h2>
                <p className="text-base text-muted-foreground">{item.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
