import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const footerLinks = {
  "Who We Are": [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "LinkedIn", href: "https://linkedin.com/company/ame-solutions", external: true },
  ],
  Events: [
    { label: "Upcoming Events", href: "/events/upcoming" },
    { label: "Past Events", href: "/events/past" },
  ],
  Partners: [
    { label: "Our Partners", href: "/partners" },
    { label: "Become a Sponsor", href: "/become-sponsor" },
    { label: "Become a Partner", href: "/become-partner" },
  ],
  Members: [
    { label: "Register", href: "/register" },
    { label: "Sign In", href: "/signin" },
    { label: "Forum", href: "/forum" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Plane className="h-5 w-5" />
              AME Mentorship Program
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Helping aviation graduates launch their careers. No gatekeeping. Just honest help.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-semibold text-sm mb-4 text-primary-foreground/90">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} AME Mentorship Program. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/50">
            AMESolutions.ca — Built for the next generation of aviation professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}