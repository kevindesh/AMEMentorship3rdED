import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Link as LinkIcon, Briefcase, GraduationCap, Languages, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("mentee");

  // Shared
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState("");
  const [availability, setAvailability] = useState("");
  const [communicationPreference, setCommunicationPreference] = useState("");
  
  // Mentor Fields
  const [areasOfExpertise, setAreasOfExpertise] = useState("");
  const [specificAircraftExperience, setSpecificAircraftExperience] = useState("");
  const [mentorCapacity, setMentorCapacity] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Mentee Fields
  const [educationBackground, setEducationBackground] = useState("");
  const [workHistory, setWorkHistory] = useState("");
  const [aviationExperience, setAviationExperience] = useState("");
  const [specificCareerGoals, setSpecificCareerGoals] = useState("");
  const [whatToLearn, setWhatToLearn] = useState("");
  const [newcomerStatus, setNewcomerStatus] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          if (data.first_name) setFirstName(data.first_name);
          if (data.last_name) setLastName(data.last_name);
          if (data.role) setRole(data.role);
          setLanguagesSpoken(data.languages_spoken || "");
          setAvailability(data.availability || "");
          setCommunicationPreference(data.communication_preference || "");
          
          setAreasOfExpertise(data.areas_of_expertise || "");
          setSpecificAircraftExperience(data.specific_aircraft_experience || "");
          setMentorCapacity(data.mentor_capacity || "");
          setShortBio(data.short_bio || "");
          setLinkedinUrl(data.linkedin_url || "");

          setEducationBackground(data.education_background || "");
          setWorkHistory(data.work_history || "");
          setAviationExperience(data.aviation_experience || "");
          setSpecificCareerGoals(data.specific_career_goals || "");
          setWhatToLearn(data.what_to_learn || "");
          setNewcomerStatus(data.newcomer_status || "");
        } else {
          // If no profile data, check token role
          const storedRole = user?.role || "mentee";
          setRole(storedRole);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
    loadProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const updates = {
        id: user.id,
        role: role,
        first_name: firstName,
        last_name: lastName,
        languages_spoken: languagesSpoken,
        availability: availability,
        communication_preference: communicationPreference,
        areas_of_expertise: role === "mentor" ? areasOfExpertise : null,
        specific_aircraft_experience: role === "mentor" ? specificAircraftExperience : null,
        mentor_capacity: role === "mentor" ? mentorCapacity : null,
        short_bio: role === "mentor" ? shortBio : null,
        linkedin_url: role === "mentor" ? linkedinUrl : null,
        education_background: role === "mentee" ? educationBackground : null,
        work_history: role === "mentee" ? workHistory : null,
        aviation_experience: role === "mentee" ? aviationExperience : null,
        specific_career_goals: role === "mentee" ? specificCareerGoals : null,
        what_to_learn: role === "mentee" ? whatToLearn : null,
        newcomer_status: role === "mentee" ? newcomerStatus : null,
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates);

      if (error) throw error;
      toast({ title: "Profile Updated", description: "Your directory profile has been saved." });
      navigate("/member/directory");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-wide py-12">
      <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border p-6 md:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Plane className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <p className="text-muted-foreground">Make yourself visible in the public {Math.min(role.length, 10) ? role : 'member'} directory.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SHARED FIELDS */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">General Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder="Your First Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  placeholder="Your Last Name"
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="languages">Languages Spoken</Label>
                <Input 
                  id="languages" 
                  value={languagesSpoken} 
                  onChange={(e) => setLanguagesSpoken(e.target.value)} 
                  placeholder="e.g. English, French..." 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger id="availability"><SelectValue placeholder="Select availability" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekday_evenings">Weekday Evenings</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="lunch_hours">Lunch Hours</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="communication">Communication Preference</Label>
              <Select value={communicationPreference} onValueChange={setCommunicationPreference}>
                <SelectTrigger id="communication"><SelectValue placeholder="Select preference" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call (Zoom/Teams)</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="in_person">In-Person</SelectItem>
                  <SelectItem value="text">Text/Message</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* MENTOR FIELDS */}
          {role === "mentor" && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" /> Mentor Details
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Input 
                  id="expertise" 
                  value={areasOfExpertise} 
                  onChange={(e) => setAreasOfExpertise(e.target.value)} 
                  placeholder="e.g. AME M/E, Avionics, Structures, NDT..." 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aircraft">Specific Aircraft Experience</Label>
                <Input 
                  id="aircraft" 
                  value={specificAircraftExperience} 
                  onChange={(e) => setSpecificAircraftExperience(e.target.value)} 
                  placeholder="e.g. Boeing 737, Airbus A320, Helicopters..." 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Mentor Capacity</Label>
                  <Select value={mentorCapacity} onValueChange={setMentorCapacity}>
                    <SelectTrigger id="capacity"><SelectValue placeholder="How many mentees?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 mentee at a time</SelectItem>
                      <SelectItem value="2">2 mentees</SelectItem>
                      <SelectItem value="3">3+ mentees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile URL (Optional)</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="linkedin" 
                      type="url"
                      className="pl-9"
                      value={linkedinUrl} 
                      onChange={(e) => setLinkedinUrl(e.target.value)} 
                      placeholder="https://linkedin.com/in/..." 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio (Max 150 words)</Label>
                <Textarea 
                  id="bio" 
                  value={shortBio} 
                  onChange={(e) => setShortBio(e.target.value)} 
                  placeholder="Share a bit about your career journey... (Used in match notification emails)"
                  className="h-24"
                />
              </div>
            </div>
          )}

          {/* MENTEE FIELDS */}
          {role === "mentee" && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" /> Mentee Details
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="education">Education Background</Label>
                <Select value={educationBackground} onValueChange={setEducationBackground}>
                  <SelectTrigger id="education"><SelectValue placeholder="Select background" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="college">College / Trade School</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="international">International Credentials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workHistory">Work History</Label>
                  <Input 
                    id="workHistory" 
                    value={workHistory} 
                    onChange={(e) => setWorkHistory(e.target.value)} 
                    placeholder="Current job or prior roles" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aviationExp">Aviation Experience to Date</Label>
                  <Select value={aviationExperience} onValueChange={setAviationExperience}>
                    <SelectTrigger id="aviationExp"><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="hobbyist">Hobbyist</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="apprentice">Apprentice</SelectItem>
                      <SelectItem value="industry">Industry Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Specific Career Goals (3-5 year vision)</Label>
                <Textarea 
                  id="goals" 
                  value={specificCareerGoals} 
                  onChange={(e) => setSpecificCareerGoals(e.target.value)} 
                  placeholder="Where do you see yourself in aviation in the next 3-5 years?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="learn">What you hope to learn from a mentor (max 200 chars)</Label>
                <Textarea 
                  id="learn" 
                  value={whatToLearn} 
                  maxLength={200}
                  onChange={(e) => setWhatToLearn(e.target.value)} 
                  placeholder="Specific skills, advice, or networking guidance..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newcomer">Newcomer Status (Optional)</Label>
                <Input 
                  id="newcomer" 
                  value={newcomerStatus} 
                  onChange={(e) => setNewcomerStatus(e.target.value)} 
                  placeholder="Year of arrival in Canada (if applicable)" 
                />
              </div>
            </div>
          )}

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
            {loading ? "Saving Profile..." : "Save Public Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}