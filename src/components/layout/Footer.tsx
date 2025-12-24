import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent/20">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <span className="font-display font-bold text-xl">EduPay</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm">
              Simplifying school fee payments for parents and administrators worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
              <li><Link to="/students" className="hover:text-accent transition-colors">Students</Link></li>
              <li><Link to="/payments" className="hover:text-accent transition-colors">Payments</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} EduPay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;