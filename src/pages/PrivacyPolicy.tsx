import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/register">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Registration
        </Link>
      </Button>
      
      <div className="prose prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
          <p className="text-muted-foreground">
            AME Mentorship Organization ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website and use our mentorship services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">We collect several types of information from and about users of our Website, including information:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>By which you may be personally identified, such as name, postal address, e-mail address, and telephone number ("personal information");</li>
            <li>That is about you but individually does not identify you, such as your job title, years of experience, and general location; and</li>
            <li>Information related to your mentorship goals and professional background.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">We use information that we collect about you or that you provide to us, including any personal information:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>To match mentors and mentees based on location, experience, and interests.</li>
            <li>To present our Website and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us.</li>
            <li>To fulfill any other purpose for which you provide it.</li>
            <li>To provide you with notices about your account or membership.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Disclosure of Your Information</h2>
          <p className="text-muted-foreground">
            We do not sell, rent, or trade your personal information to third parties. We may share limited information (such as name and general background) between matched mentors and mentees to facilitate the mentorship process. We may also disclose aggregated information about our users, and information that does not identify any individual, without restriction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Contact Information</h2>
          <p className="text-muted-foreground">
            To ask questions or comment about this privacy policy and our privacy practices, contact us through the forms provided on the website.
          </p>
        </section>
      </div>
    </div>
  );
}
