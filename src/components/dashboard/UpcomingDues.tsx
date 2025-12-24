import { Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, getDaysUntil } from "@/lib/utils";

interface DueItem {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  dueDate: string;
  type: string;
}

interface UpcomingDuesProps {
  dues: DueItem[];
}

const UpcomingDues = ({ dues }: UpcomingDuesProps) => {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg text-foreground">Upcoming Dues</h3>
        <a href="/payments" className="text-sm text-accent hover:underline">View Schedule</a>
      </div>

      <div className="space-y-4">
        {dues.map((due, index) => {
          const daysUntil = getDaysUntil(due.dueDate);
          const isUrgent = daysUntil <= 3;

          return (
            <div
              key={due.id}
              className={`p-4 rounded-lg border transition-colors ${
                isUrgent 
                  ? 'border-destructive/30 bg-destructive/5' 
                  : 'border-border bg-muted/30'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">{due.studentName}</p>
                  <p className="text-sm text-muted-foreground">{due.type}</p>
                </div>
                <p className="font-display font-bold text-lg text-foreground">
                  {formatCurrency(due.amount)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  {isUrgent ? (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={isUrgent ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                    Due {formatDate(due.dueDate)}
                    {daysUntil >= 0 && ` (${daysUntil} day${daysUntil !== 1 ? 's' : ''})`}
                  </span>
                </div>
                <Button variant="accent" size="sm">
                  Send Reminder
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingDues;