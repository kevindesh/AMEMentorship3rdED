import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Users, Calendar, MessageSquare, Linkedin, Airplay } from "lucide-react";

export default function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="container-wide py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container-wide py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
        <Button asChild variant="outline">
          <Link to="/member/directory">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Link>
        </Button>
      </div>
    );
  }

  const isMentor = profile.role === "mentor";

  // Function to format the labels nicely
  const formatLabel = (text: string) => {
    if (!text) return "";
    return text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="container-wide py-8 space-y-6">
      <Button asChild variant="ghost" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
        <Link to="/member/directory">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
        </Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Sticky Profile Header */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 overflow-hidden border-t-4 border-t-accent shadow-sm">
            <CardContent className="pt-8 pb-6 flex flex-col items-center text-center px-4 space-y-4 bg-muted/10">
              <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                <AvatarImage src={profile.photo_url} />
                <AvatarFallback className="bg-primary/5 text-primary text-4xl">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h1>
                <Badge variant={isMentor ? "outline" : "secondary"} className={isMentor ? "bg-primary/5 text-primary border-primary/20" : "bg-secondary/60 text-secondary-foreground"}>
                  {formatLabel(profile.role)}
                </Badge>
              </div>

              {profile.languages_spoken && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" /> 
                  Speaks {profile.languages_spoken}
                </div>
              )}

              {profile.linkedin_url && (
                <Button asChild variant="outline" className="w-full mt-2">
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4 text-[#0A66C2]" /> LinkedIn Profile
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-8">
              
              {/* Bio or Goals Section */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary border-b pb-2">
                  {isMentor ? "About Me" : "Specific Career Goals"}
                </h3>
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {isMentor ? (profile.short_bio || "No bio provided.") : (profile.specific_career_goals || "No career goals provided yet.")}
                </p>
              </div>

              {/* What I Hope to Learn (Mentee Only) */}
              {!isMentor && profile.what_to_learn && (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-primary border-b pb-2">What I Hope to Learn</h3>
                  <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed italic">"{profile.what_to_learn}"</p>
                </div>
              )}

              {/* Experience Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary border-b pb-2">Experience & Background</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {isMentor ? (
                    <>
                      {profile.areas_of_expertise && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 font-semibold mb-1"><Briefcase className="h-4 w-4 text-accent"/> Expertise</div>
                          <div className="text-sm">{profile.areas_of_expertise}</div>
                        </div>
                      )}
                      {profile.specific_aircraft_experience && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 font-semibold mb-1"><Airplay className="h-4 w-4 text-accent"/> Aircraft Experience</div>
                          <div className="text-sm">{profile.specific_aircraft_experience}</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {profile.education_background && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 font-semibold mb-1"><GraduationCap className="h-4 w-4 text-primary"/> Education</div>
                          <div className="text-sm">{formatLabel(profile.education_background)}</div>
                        </div>
                      )}
                      {profile.aviation_experience && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 font-semibold mb-1"><Briefcase className="h-4 w-4 text-primary"/> Aviation Experience</div>
                          <div className="text-sm capitalize">{profile.aviation_experience} Level</div>
                        </div>
                      )}
                      {profile.work_history && (
                        <div className="bg-muted/30 p-4 rounded-lg sm:col-span-2">
                          <div className="flex items-center gap-2 font-semibold mb-1"><Briefcase className="h-4 w-4 text-primary"/> Work History</div>
                          <div className="text-sm">{profile.work_history}</div>
                        </div>
                      )}
                      {profile.newcomer_status && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="font-semibold mb-1">Newcomer Status</div>
                          <div className="text-sm">Arrived in {profile.newcomer_status}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Mentorship Settings */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary border-b pb-2">Mentorship Logistics</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.availability && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Availability</div>
                        <div className="text-sm text-muted-foreground">{formatLabel(profile.availability)}</div>
                      </div>
                    </div>
                  )}
                  {profile.communication_preference && (
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Preferred Communcation</div>
                        <div className="text-sm text-muted-foreground">{formatLabel(profile.communication_preference)}</div>
                      </div>
                    </div>
                  )}
                  {isMentor && profile.mentor_capacity && (
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Capacity</div>
                        <div className="text-sm text-muted-foreground">Up to {profile.mentor_capacity} {profile.mentor_capacity === "1" ? "mentee" : "mentees"}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}