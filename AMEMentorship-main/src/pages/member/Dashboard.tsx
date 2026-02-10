import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, MessageSquare, Briefcase, ArrowRight, Sparkles } from "lucide-react";

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || "Member"}
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your hub. Everything you need to move your career forward.
          </p>
        </div>

        {/* Quick Tip */}
        <Card className="border-0 shadow-sm bg-sky-light mb-8">
          <CardContent className="p-5 flex items-center gap-4">
            <Sparkles className="h-6 w-6 text-accent shrink-0" />
            <div>
              <p className="font-medium text-sm text-foreground">Next Step: Complete your first training module</p>
              <p className="text-xs text-muted-foreground">Start with "Resume Essentials" to build your aviation-specific resume.</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md bg-card hover:shadow-lg transition-shadow group">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <GraduationCap className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Training</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Job-readiness modules covering resumes, interviews, safety culture, and technical refreshers.
              </p>
              <Button asChild variant="gold" className="w-full group-hover:shadow-sm">
                <Link to="/member/training">Start Training <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-card hover:shadow-lg transition-shadow group">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <MessageSquare className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Forum</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Connect with the community. Share advice, find study groups, and celebrate wins.
              </p>
              <Button asChild variant="default" className="w-full group-hover:shadow-sm">
                <Link to="/member/forum">Open Forum <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-card hover:shadow-lg transition-shadow group">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <Briefcase className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Careers</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Browse job postings, internships, and co-op roles from our partner companies.
              </p>
              <Button asChild variant="default" className="w-full group-hover:shadow-sm">
                <Link to="/member/careers">Browse Jobs <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}