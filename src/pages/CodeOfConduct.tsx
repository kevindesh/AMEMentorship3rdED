import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/register">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Registration
        </Link>
      </Button>
      
      <div className="prose prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Code of Conduct</h1>
        <p className="text-muted-foreground mb-8">Effective Date: April 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Purpose</h2>
          <p className="text-muted-foreground">
            The AME Mentorship Organization ("Organization") is dedicated to fostering a supportive, inclusive, and professional environment for Aircraft Maintenance Engineers (AMEs) and those aspiring to join the field. This Code of Conduct outlines our expectations for all participants, including Mentors, Mentees, Members, Partners, and Volunteers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Core Values</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-4">
            <li><strong>Professionalism:</strong> Conduct all interactions with dignity, courtesy, and respect for the diverse backgrounds and experiences of others.</li>
            <li><strong>Integrity:</strong> Be honest and transparent in your communications and actions. Provide constructive, accurate, and helpful guidance.</li>
            <li><strong>Confidentiality:</strong> Respect the privacy of others. Treat discussions between Mentors and Mentees as confidential unless explicitly agreed otherwise.</li>
            <li><strong>Commitment:</strong> Honor your commitments to mentorship meetings, goals, and the Organization's mission. Be responsive and reliable.</li>
            <li><strong>Inclusivity:</strong> Foster an environment free from discrimination, harassment, or bias based on race, gender, age, religion, sexual orientation, disability, or any other protected characteristic.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Expected Behavior</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-4">
            <li>Communicate clearly and respectfully in all forms (in-person, email, forums).</li>
            <li>Be open to feedback and differing perspectives.</li>
            <li>Acknowledge and respect boundaries. If a topic is off-limits, respect that decision.</li>
            <li>Use the Organization's platform and resources solely for the purpose of professional development and networking.</li>
            <li>Report concerns or issues to the administration promptly.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Unacceptable Behavior</h2>
          <p className="text-muted-foreground mb-4">The following behaviors are strictly prohibited:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Harassment, intimidation, or bullying of any kind.</li>
            <li>Discriminatory language or actions.</li>
            <li>Sharing confidential information without consent.</li>
            <li>Using the platform for unwarranted solicitation, spam, or commercial gain without authorization.</li>
            <li>Any action that jeopardizes the safety or well-being of others.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Enforcement and Reporting</h2>
          <p className="text-muted-foreground mb-4">
            Violations of this Code of Conduct will not be tolerated. The Organization reserves the right to take appropriate action, including issuing warnings, suspending participation, or permanently removing individuals from the program and platform.
          </p>
          <p className="text-muted-foreground">
            If you experience or witness a violation of this Code of Conduct, please report it immediately to our administrative team via the contact form on our website. All reports will be handled confidentially and investigated promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
