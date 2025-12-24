import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Payment {
  id: string;
  studentName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  type: string;
}

interface RecentPaymentsProps {
  payments: Payment[];
}

const RecentPayments = ({ payments }: RecentPaymentsProps) => {
  const statusStyles = {
    completed: "bg-success/10 text-success hover:bg-success/20",
    pending: "bg-warning/10 text-warning hover:bg-warning/20",
    failed: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg text-foreground">Recent Payments</h3>
        <a href="/payments" className="text-sm text-accent hover:underline">View All</a>
      </div>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-semibold text-sm">
                  {payment.studentName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{payment.studentName}</p>
                <p className="text-sm text-muted-foreground">{payment.type}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-foreground">{formatCurrency(payment.amount)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{formatDate(payment.date)}</span>
                <Badge className={statusStyles[payment.status]} variant="secondary">
                  {payment.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPayments;