import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, Plane } from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  children?: { label: string; href: string; external?: boolean }[];
}

const publicNav: NavItem[] = [
  {
    label: "Who We Are",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "LinkedIn", href: "https://linkedin.com/company/ame-solutions", external: true },
    ],
  },
  {
    label: "Events",
    children: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Past Events", href: "/events/past" },
    ],
  },
  {
    label: "Our Partners",
    children: [
      { label: "Partners", href: "/partners" },
      { label: "Become a Sponsor", href: "/become-sponsor" },
      { label: "Become a Partner", href: "/become-partner" },
    ],
  },
  { label: "Forum", href: "/forum" },
];

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isMember = location.pathname.startsWith("/member");

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <nav className="container-wide mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Plane className="h-6 w-6" />
          <span>AME Mentorship Program</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {!isMember &&
            publicNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0 w-52 bg-card rounded-lg shadow-lg border border-border py-2 animate-fade-in">
                      {item.children.map((child) =>
                        child.external ? (
                          <a
                            key={child.label}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {child.label} ↗
                          </a>
                        ) : (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href!}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}

          {isMember && (
            <>
              <Link to="/member" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/member/training" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                Training
              </Link>
              <Link to="/member/forum" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                Forum
              </Link>
              <Link to="/member/careers" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                Careers
              </Link>
            </>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {!isMember && (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/member">Member Area</Link>
                </Button>
              )}
              {isMember && (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/">Public Site</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild variant="gold" size="sm">
                <Link to="/register">Become a Member</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-lg text-primary flex items-center gap-2">
                <Plane className="h-5 w-5" /> AME Mentorship Program
              </span>
            </div>
            <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
              {!isMember &&
                publicNav.map((item) =>
                  item.children ? (
                    <MobileDropdown key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href!}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                )}

              {isMember && (
                <>
                  <Link to="/member" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md">Dashboard</Link>
                  <Link to="/member/training" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md">Training</Link>
                  <Link to="/member/forum" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md">Forum</Link>
                  <Link to="/member/careers" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md">Careers</Link>
                </>
              )}

              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    {!isMember && (
                      <Button asChild variant="default" className="w-full" onClick={() => setMobileOpen(false)}>
                        <Link to="/member">Member Area</Link>
                      </Button>
                    )}
                    <Button variant="outline" className="w-full" onClick={() => { logout(); setMobileOpen(false); }}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>
                      <Link to="/signin">Sign In</Link>
                    </Button>
                    <Button asChild variant="gold" className="w-full" onClick={() => setMobileOpen(false)}>
                      <Link to="/register">Become a Member</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

function MobileDropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children?.map((child) =>
            child.external ? (
              <a
                key={child.label}
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {child.label} ↗
              </a>
            ) : (
              <Link
                key={child.label}
                to={child.href}
                onClick={onNavigate}
                className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {child.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}