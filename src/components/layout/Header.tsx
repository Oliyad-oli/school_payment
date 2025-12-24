import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome ? 'bg-transparent' : 'bg-card/95 backdrop-blur-md border-b border-border'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-lg transition-colors ${isHome ? 'bg-accent/20' : 'bg-accent/10'} group-hover:bg-accent/30`}>
              <GraduationCap className={`h-6 w-6 ${isHome ? 'text-accent-foreground' : 'text-accent'}`} />
            </div>
            <span className={`font-display font-bold text-xl ${isHome ? 'text-primary-foreground' : 'text-foreground'}`}>
              EduPay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-accent ${isHome ? 'text-primary-foreground/80 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`font-medium transition-colors hover:text-accent ${isHome ? 'text-primary-foreground/80 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              className={`font-medium transition-colors hover:text-accent ${isHome ? 'text-primary-foreground/80 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Students
            </Link>
            <Link
              to="/payments"
              className={`font-medium transition-colors hover:text-accent ${isHome ? 'text-primary-foreground/80 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Payments
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant={isHome ? "ghost" : "outline"} size="sm" className={isHome ? 'text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10' : ''}>
              Sign In
            </Button>
            <Button variant="accent" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className={`font-medium py-2 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`font-medium py-2 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/students"
                className={`font-medium py-2 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Students
              </Link>
              <Link
                to="/payments"
                className={`font-medium py-2 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Payments
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/20">
                <Button variant="outline" className="w-full">Sign In</Button>
                <Button variant="accent" className="w-full">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;