import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/dashboard/StatCard";
import RecentPayments from "@/components/dashboard/RecentPayments";
import UpcomingDues from "@/components/dashboard/UpcomingDues";
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data
const stats = [
  { 
    title: "Total Revenue", 
    value: "$124,500", 
    change: "+12.5% from last month", 
    changeType: "positive" as const,
    icon: DollarSign 
  },
  { 
    title: "Active Students", 
    value: "342", 
    change: "+8 this week", 
    changeType: "positive" as const,
    icon: Users 
  },
  { 
    title: "Pending Payments", 
    value: "$18,200", 
    change: "24 invoices", 
    changeType: "neutral" as const,
    icon: CreditCard 
  },
  { 
    title: "Collection Rate", 
    value: "94.2%", 
    change: "+2.1% from last month", 
    changeType: "positive" as const,
    icon: TrendingUp 
  },
];

const recentPayments = [
  { id: "1", studentName: "Emily Johnson", amount: 2500, date: "2024-12-20", status: "completed" as const, type: "Tuition - Grade 10" },
  { id: "2", studentName: "Michael Chen", amount: 150, date: "2024-12-19", status: "completed" as const, type: "Lab Fee" },
  { id: "3", studentName: "Sarah Williams", amount: 2500, date: "2024-12-18", status: "pending" as const, type: "Tuition - Grade 11" },
  { id: "4", studentName: "James Brown", amount: 75, date: "2024-12-17", status: "completed" as const, type: "Activity Fee" },
  { id: "5", studentName: "Lisa Garcia", amount: 2500, date: "2024-12-16", status: "failed" as const, type: "Tuition - Grade 9" },
];

const upcomingDues = [
  { id: "1", studentName: "Alex Thompson", studentId: "STU001", amount: 2500, dueDate: "2024-12-26", type: "Tuition - Grade 12" },
  { id: "2", studentName: "Emma Davis", studentId: "STU002", amount: 150, dueDate: "2024-12-28", type: "Art Supplies Fee" },
  { id: "3", studentName: "Ryan Martinez", studentId: "STU003", amount: 2500, dueDate: "2025-01-05", type: "Tuition - Grade 8" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back! Here's your school payment overview.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/students">
                <Button variant="outline">
                  <Users className="h-4 w-4" />
                  View Students
                </Button>
              </Link>
              <Button variant="accent">
                <Plus className="h-4 w-4" />
                Add Payment
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={stat.title} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <StatCard {...stat} />
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
              <RecentPayments payments={recentPayments} />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
              <UpcomingDues dues={upcomingDues} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 card-elevated p-6 animate-fade-up" style={{ animationDelay: '600ms' }}>
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/students" className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center group">
                <Users className="h-6 w-6 mx-auto text-accent mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">Add Student</p>
              </Link>
              <div className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center cursor-pointer group">
                <CreditCard className="h-6 w-6 mx-auto text-accent mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">Record Payment</p>
              </div>
              <Link to="/payments" className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center group">
                <DollarSign className="h-6 w-6 mx-auto text-accent mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">View Schedules</p>
              </Link>
              <div className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center cursor-pointer group">
                <TrendingUp className="h-6 w-6 mx-auto text-accent mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">Generate Report</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;