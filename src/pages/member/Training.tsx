import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trainingModules } from "@/data/trainingModules";

export default function Training() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Training</h1>
          <p className="text-muted-foreground text-lg">
            Practical, focused modules to get you job-ready. No fluff — just what you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingModules.map((mod) => (
            <Card key={mod.id} className={`border-0 shadow-sm bg-card ${mod.status === "coming-soon" ? "opacity-70" : "hover:shadow-md transition-shadow"}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  {mod.status === "coming-soon" ? (
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">{mod.lessonsCount} lessons</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{mod.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{mod.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {mod.duration}
                  </span>
                  {mod.status === "available" ? (
                    <Button variant="gold" size="sm" asChild>
                      <Link to={`/member/training/${mod.id}`}>
                        Start <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      <Lock className="h-3.5 w-3.5" /> Locked
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}