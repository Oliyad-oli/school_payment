import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Calendar,
  Download,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { formatCurrency, formatDate, getDaysUntil } from "@/lib/utils";

interface PaymentSchedule {
  id: string;
  studentName: string;
  studentId: string;
  type: string;
  amount: number;
  dueDate: string;
  status: "upcoming" | "overdue" | "paid";
}

interface PaymentRecord {
  id: string;
  studentName: string;
  studentId: string;
  type: string;
  amount: number;
  paymentDate: string;
  method: string;
  reference: string;
  status: "completed" | "pending" | "failed" | "refunded";
}

const schedules: PaymentSchedule[] = [
  { id: "SCH001", studentName: "Emily Johnson", studentId: "STU001", type: "Tuition - Spring 2025", amount: 2500, dueDate: "2025-01-15", status: "upcoming" },
  { id: "SCH002", studentName: "Michael Chen", studentId: "STU002", type: "Tuition - Spring 2025", amount: 2500, dueDate: "2025-01-15", status: "upcoming" },
  { id: "SCH003", studentName: "Sarah Williams", studentId: "STU003", type: "Lab Fee", amount: 150, dueDate: "2024-12-20", status: "overdue" },
  { id: "SCH004", studentName: "James Brown", studentId: "STU004", type: "Activity Fee", amount: 75, dueDate: "2024-12-28", status: "upcoming" },
  { id: "SCH005", studentName: "Lisa Garcia", studentId: "STU005", type: "Tuition - Spring 2025", amount: 2500, dueDate: "2025-01-15", status: "upcoming" },
  { id: "SCH006", studentName: "Alex Thompson", studentId: "STU006", type: "Art Supplies", amount: 120, dueDate: "2024-12-22", status: "paid" },
  { id: "SCH007", studentName: "Emma Davis", studentId: "STU007", type: "Field Trip Fee", amount: 50, dueDate: "2025-01-10", status: "upcoming" },
];

const paymentRecords: PaymentRecord[] = [
  { id: "PAY001", studentName: "Emily Johnson", studentId: "STU001", type: "Tuition - Fall 2024", amount: 2500, paymentDate: "2024-12-20", method: "Credit Card", reference: "TXN789456123", status: "completed" },
  { id: "PAY002", studentName: "Michael Chen", studentId: "STU002", type: "Lab Fee", amount: 150, paymentDate: "2024-12-19", method: "Bank Transfer", reference: "TXN789456124", status: "completed" },
  { id: "PAY003", studentName: "Sarah Williams", studentId: "STU003", type: "Tuition - Fall 2024", amount: 2500, paymentDate: "2024-12-18", method: "Credit Card", reference: "TXN789456125", status: "pending" },
  { id: "PAY004", studentName: "James Brown", studentId: "STU004", type: "Activity Fee", amount: 75, paymentDate: "2024-12-17", method: "Debit Card", reference: "TXN789456126", status: "completed" },
  { id: "PAY005", studentName: "Lisa Garcia", studentId: "STU005", type: "Tuition - Fall 2024", amount: 2500, paymentDate: "2024-12-16", method: "Credit Card", reference: "TXN789456127", status: "failed" },
  { id: "PAY006", studentName: "Alex Thompson", studentId: "STU006", type: "Art Supplies", amount: 120, paymentDate: "2024-12-22", method: "PayPal", reference: "TXN789456128", status: "completed" },
];

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || schedule.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredRecords = paymentRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const scheduleStatusStyles = {
    upcoming: { bg: "bg-accent/10 text-accent", icon: Clock },
    overdue: { bg: "bg-destructive/10 text-destructive", icon: AlertCircle },
    paid: { bg: "bg-success/10 text-success", icon: CheckCircle2 },
  };

  const recordStatusStyles = {
    completed: { bg: "bg-success/10 text-success", icon: CheckCircle2 },
    pending: { bg: "bg-warning/10 text-warning", icon: Clock },
    failed: { bg: "bg-destructive/10 text-destructive", icon: XCircle },
    refunded: { bg: "bg-muted text-muted-foreground", icon: AlertCircle },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Payments</h1>
              <p className="text-muted-foreground mt-1">View schedules and track payment history.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="accent">
                <Plus className="h-4 w-4" />
                Create Schedule
              </Button>
            </div>
          </div>

          <Tabs defaultValue="schedules" className="space-y-6">
            <TabsList className="bg-muted p-1">
              <TabsTrigger value="schedules" className="data-[state=active]:bg-background">
                <Calendar className="h-4 w-4 mr-2" />
                Payment Schedules
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-background">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Payment History
              </TabsTrigger>
            </TabsList>

            {/* Schedules Tab */}
            <TabsContent value="schedules">
              {/* Filters */}
              <div className="card-elevated p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by student name or ID..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Schedule Cards */}
              <div className="grid gap-4">
                {filteredSchedules.map((schedule, index) => {
                  const StatusIcon = scheduleStatusStyles[schedule.status].icon;
                  const daysUntil = getDaysUntil(schedule.dueDate);

                  return (
                    <div 
                      key={schedule.id} 
                      className={`card-elevated p-6 animate-fade-up ${schedule.status === 'overdue' ? 'border-l-4 border-l-destructive' : ''}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${scheduleStatusStyles[schedule.status].bg}`}>
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{schedule.studentName}</p>
                            <p className="text-sm text-muted-foreground">{schedule.studentId} • {schedule.type}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className={schedule.status === 'overdue' ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                                Due: {formatDate(schedule.dueDate)}
                                {schedule.status === 'upcoming' && daysUntil >= 0 && ` (${daysUntil} day${daysUntil !== 1 ? 's' : ''} left)`}
                                {schedule.status === 'overdue' && ` (${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? 's' : ''} overdue)`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-display text-2xl font-bold text-foreground">
                              {formatCurrency(schedule.amount)}
                            </p>
                            <Badge className={scheduleStatusStyles[schedule.status].bg} variant="secondary">
                              {schedule.status}
                            </Badge>
                          </div>
                          {schedule.status !== 'paid' && (
                            <Button variant="accent" size="sm">
                              Send Reminder
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="card-elevated p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Scheduled</p>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {formatCurrency(schedules.reduce((sum, s) => sum + s.amount, 0))}
                  </p>
                </div>
                <div className="card-elevated p-4 text-center border-l-4 border-l-destructive">
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="font-display text-2xl font-bold text-destructive">
                    {formatCurrency(schedules.filter(s => s.status === 'overdue').reduce((sum, s) => sum + s.amount, 0))}
                  </p>
                </div>
                <div className="card-elevated p-4 text-center border-l-4 border-l-success">
                  <p className="text-sm text-muted-foreground">Collected</p>
                  <p className="font-display text-2xl font-bold text-success">
                    {formatCurrency(schedules.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0))}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <div className="card-elevated overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left py-4 px-6 font-semibold text-foreground">Student</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground hidden md:table-cell">Type</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground hidden lg:table-cell">Reference</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground hidden sm:table-cell">Date</th>
                        <th className="text-right py-4 px-6 font-semibold text-foreground">Amount</th>
                        <th className="text-center py-4 px-6 font-semibold text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.map((record, index) => {
                        const StatusIcon = recordStatusStyles[record.status].icon;
                        return (
                          <tr 
                            key={record.id}
                            className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <td className="py-4 px-6">
                              <p className="font-medium text-foreground">{record.studentName}</p>
                              <p className="text-sm text-muted-foreground">{record.studentId}</p>
                            </td>
                            <td className="py-4 px-6 hidden md:table-cell text-muted-foreground">
                              {record.type}
                            </td>
                            <td className="py-4 px-6 hidden lg:table-cell">
                              <code className="text-xs bg-muted px-2 py-1 rounded">{record.reference}</code>
                            </td>
                            <td className="py-4 px-6 hidden sm:table-cell text-muted-foreground">
                              {formatDate(record.paymentDate)}
                            </td>
                            <td className="py-4 px-6 text-right font-display font-semibold text-foreground">
                              {formatCurrency(record.amount)}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Badge className={`${recordStatusStyles[record.status].bg} gap-1`} variant="secondary">
                                <StatusIcon className="h-3 w-3" />
                                {record.status}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payments;