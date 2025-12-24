import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  CreditCard, 
  Users, 
  Calendar, 
  Shield, 
  BarChart3, 
  Bell,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Process tuition and fees through trusted payment gateways with bank-level encryption."
  },
  {
    icon: Users,
    title: "Student Management",
    description: "Easily manage student records, contact details, and payment histories in one place."
  },
  {
    icon: Calendar,
    title: "Payment Schedules",
    description: "Create and track payment schedules with automated reminders for parents."
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Admins manage data while parents securely view and pay only their invoices."
  },
  {
    icon: BarChart3,
    title: "Financial Reports",
    description: "Generate detailed payment recaps and reconciliation reports instantly."
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "Send payment reminders via email or SMS before dues are due."
  }
];

const benefits = [
  "Real-time payment processing",
  "Complete audit trail",
  "Mobile-friendly interface",
  "Secure data encryption",
  "24/7 payment availability",
  "Multi-currency support"
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6 animate-fade-up">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Secure & Trusted Payment Platform</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Simplify School Fee{' '}
              <span className="text-accent">Payments</span>
            </h1>

            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
              A secure, modern platform that lets parents pay tuition and fees online while giving administrators complete control over student records and payment schedules.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Link to="/dashboard">
                <Button variant="hero" size="lg" className="group">
                  View Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/students">
                <Button variant="hero-outline" size="lg">
                  Manage Students
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/10 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-accent">99.9%</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Uptime</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-accent">256-bit</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Encryption</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-accent">24/7</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Availability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-subtle">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage School Payments
            </h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive solution designed for schools of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Built for Modern Schools
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform is designed with security and ease-of-use at its core, ensuring both administrators and parents have a seamless experience.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/dashboard">
                  <Button variant="accent" size="lg">
                    Explore Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="card-elevated p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-success/10">
                    <CreditCard className="h-8 w-8 text-success" />
                    <div>
                      <p className="font-semibold text-foreground">Payment Received</p>
                      <p className="text-sm text-muted-foreground">Tuition - Grade 10</p>
                    </div>
                    <p className="ml-auto font-display font-bold text-success">$2,500</p>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                    <Calendar className="h-8 w-8 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">Upcoming Due</p>
                      <p className="text-sm text-muted-foreground">Lab Fee - Jan 15</p>
                    </div>
                    <p className="ml-auto font-display font-bold text-foreground">$150</p>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                    <Bell className="h-8 w-8 text-warning" />
                    <div>
                      <p className="font-semibold text-foreground">Reminder Sent</p>
                      <p className="text-sm text-muted-foreground">5 parents notified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-accent/10 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Ready to Streamline Your School Payments?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join schools worldwide who trust EduPay for secure, efficient fee collection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Button variant="hero-outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;