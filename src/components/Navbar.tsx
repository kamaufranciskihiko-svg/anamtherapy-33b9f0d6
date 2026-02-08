import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Therapist", href: "/therapist" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleNavClick = (href: string) => {
    setOpen(false);
    // Handle hash links on the home page
    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (window.location.pathname === "/") {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container-narrow flex items-center justify-between h-16 px-6">
        <Link to="/" className="font-heading text-xl font-semibold text-foreground tracking-tight">
          Anam Therapy
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <Button asChild size="sm">
            <Link to="/book">Book a Session</Link>
          </Button>
          {user ? (
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard"><User className="w-4 h-4 mr-1" /> Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 space-y-4">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <Button asChild size="sm" className="w-full">
            <Link to="/book" onClick={() => setOpen(false)}>Book a Session</Link>
          </Button>
          {user ? (
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/auth" onClick={() => setOpen(false)}>Sign In</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
