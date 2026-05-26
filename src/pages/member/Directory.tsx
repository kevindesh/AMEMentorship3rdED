import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Briefcase, GraduationCap, Users, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Directory() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadDirectory() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("first_name", { ascending: true });

        if (error) throw error;
        setProfiles(data || []);
      } catch (error) {
        console.error("Error loading directory:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDirectory();
  }, []);

  const filteredMentors = profiles.filter(
    (p) => p.role === "mentor" && 
    (`${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) || 
     (p.areas_of_expertise || "").toLowerCase().includes(search.toLowerCase()))
  );

  const filteredMentees = profiles.filter(
    (p) => p.role === "mentee" && 
    (`${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) || 
     (p.aviation_experience || "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container-wide py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 border-b-2 border-accent inline-block mb-3">
            <Users className="h-6 w-6 inline text-accent mr-2 mb-1" />
            Member Directory
          </h1>
          <p className="text-muted-foreground">Browse public profiles for Mentors and Mentees in the AME Network.</p>
        </div>
        
        <Button asChild variant="gold">
          <Link to="/member/complete-profile">Edit My Profile</Link>
        </Button>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by name, expertise, or experience..." 
          className="pl-10 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="mentors" className="w-full mt-6">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="mentors">Mentors ({filteredMentors.length})</TabsTrigger>
          <TabsTrigger value="mentees">Mentees ({filteredMentees.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mentors" className="mt-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Link key={mentor.id} to={`/member/directory/${mentor.id}`} className="block focus:outline-none focus:ring-2 focus:ring-accent rounded-xl h-full">
                <Card className="hover:shadow-md transition-shadow overflow-hidden group border-t-4 border-t-accent h-full">
                  <CardHeader className="pb-3 bg-muted/20">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-card shadow-sm">
                      <AvatarImage src={mentor.photo_url} />
                      <AvatarFallback className="bg-primary/5 text-primary text-xl">
                        {mentor.first_name?.[0]}{mentor.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{mentor.first_name} {mentor.last_name}</h3>
                      <Badge variant="outline" className="bg-primary/5 text-primary hover:bg-primary/10 border-primary/20 font-medium">
                        Mentor
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="text-sm text-muted-foreground space-y-2">
                    {mentor.areas_of_expertise && (
                      <p className="flex items-start gap-2">
                        <Briefcase className="h-4 w-4 mt-0.5 text-accent shrink-0" /> 
                        <span className="line-clamp-2">{mentor.areas_of_expertise}</span>
                      </p>
                    )}
                    {mentor.specific_aircraft_experience && (
                      <p className="flex items-start gap-2">
                        <Plane className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                        <span className="line-clamp-1">{mentor.specific_aircraft_experience}</span>
                      </p>
                    )}
                    {mentor.languages_spoken && (
                      <p className="flex items-start gap-2">
                        <Users className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                        <span className="line-clamp-1">Speaks {mentor.languages_spoken}</span>
                      </p>
                    )}
                  </div>
                  {mentor.short_bio && (
                    <div className="pt-3 mt-3 border-t">
                      <p className="text-sm italic text-foreground/80 line-clamp-3">"{mentor.short_bio}"</p>
                    </div>
                  )}
                </CardContent>
                </Card>
              </Link>
            ))}
            {loading === false && filteredMentors.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                No mentors found matching your search.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mentees" className="mt-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentees.map((mentee) => (
              <Link key={mentee.id} to={`/member/directory/${mentee.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl h-full">
                <Card className="hover:shadow-md transition-shadow overflow-hidden group border-t-4 border-t-primary/60 h-full">
                  <CardHeader className="pb-3 bg-muted/20">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-card shadow-sm">
                      <AvatarImage src={mentee.photo_url} />
                      <AvatarFallback className="bg-accent/10 text-accent text-xl">
                        {mentee.first_name?.[0]}{mentee.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{mentee.first_name} {mentee.last_name}</h3>
                      <Badge variant="secondary" className="font-medium bg-secondary/60 hover:bg-secondary/80">Mentee</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="text-sm text-muted-foreground space-y-2">
                    {mentee.aviation_experience && mentee.aviation_experience !== 'none' && (
                      <p className="flex items-start gap-2">
                        <GraduationCap className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        <span className="capitalize">{mentee.aviation_experience} level</span>
                      </p>
                    )}
                    {mentee.education_background && (
                      <p className="flex items-start gap-2">
                        <Briefcase className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        <span className="capitalize">{mentee.education_background.replace('_', ' ')}</span>
                      </p>
                    )}
                    {mentee.languages_spoken && (
                      <p className="flex items-start gap-2">
                        <Users className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        <span className="line-clamp-1">Speaks {mentee.languages_spoken}</span>
                      </p>
                    )}
                  </div>
                  {mentee.what_to_learn && (
                    <div className="pt-3 mt-3 border-t">
                      <p className="text-sm italic text-foreground/80 line-clamp-3">"{mentee.what_to_learn}"</p>
                    </div>
                  )}
                </CardContent>
                </Card>
              </Link>
            ))}
            {loading === false && filteredMentees.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                No mentees found matching your search.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}