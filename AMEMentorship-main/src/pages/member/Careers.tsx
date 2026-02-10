import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building2, Briefcase, ExternalLink, Search } from "lucide-react";

const jobs = [
  { title: "Junior Aircraft Maintenance Engineer", company: "Air Canada", location: "Toronto, ON", type: "Full-time", level: "New Grad", posted: "2 days ago", description: "Join our maintenance team at Pearson International. M1/M2 license required." },
  { title: "AME Apprentice", company: "Jazz Aviation", location: "Halifax, NS", type: "Full-time", level: "Entry Level", posted: "5 days ago", description: "Hands-on apprenticeship working on CRJ and Dash-8 aircraft in our Halifax base." },
  { title: "Avionics Technician Co-op", company: "Bombardier", location: "Montreal, QC", type: "Co-op", level: "Student", posted: "1 week ago", description: "4-month co-op position working with avionics systems on Global Express aircraft." },
  { title: "Structures Repair Technician", company: "IMP Aerospace", location: "Halifax, NS", type: "Full-time", level: "New Grad", posted: "1 week ago", description: "Perform structural inspections and repairs on military and civilian aircraft." },
  { title: "Line Maintenance Technician", company: "WestJet", location: "Calgary, AB", type: "Full-time", level: "Entry Level", posted: "2 weeks ago", description: "Line maintenance on Boeing 737 MAX fleet. Shift work required." },
  { title: "AME Intern — Summer 2026", company: "Provincial Aerospace", location: "St. John's, NL", type: "Internship", level: "Student", posted: "3 weeks ago", description: "Summer internship supporting maintenance on surveillance aircraft." },
];

export default function Careers() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = jobs.filter((job) => {
    const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()) || job.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || job.type.toLowerCase().replace("-", "").includes(typeFilter.toLowerCase().replace("-", ""));
    return matchSearch && matchType;
  });

  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Career Opportunities</h1>
          <p className="text-muted-foreground text-lg">
            Roles from our partner companies — internships, co-ops, and entry-level positions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, company, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              maxLength={100}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="fulltime">Full-time</SelectItem>
              <SelectItem value="coop">Co-op</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filtered.map((job) => (
            <Card key={`${job.title}-${job.company}`} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{job.type}</Badge>
                      <Badge variant="secondary" className="text-xs">{job.level}</Badge>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-1">{job.title}</h2>
                    <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {job.company}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Posted {job.posted}</span>
                    </div>
                  </div>
                  <Button variant="gold" size="sm">
                    Express Interest <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs match your search. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}