import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
  Filter,
  Mail,
  Phone,
  MoreVertical,
  Edit2,
  Trash2,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
  phone: string;
  parentName: string;
  balance: number;
  status: "active" | "inactive" | "graduated";
}

const initialStudents: Student[] = [
  { id: "STU001", name: "Emily Johnson", grade: "Grade 10", email: "emily.j@email.com", phone: "+1 234 567 8901", parentName: "Robert Johnson", balance: 0, status: "active" },
  { id: "STU002", name: "Michael Chen", grade: "Grade 11", email: "m.chen@email.com", phone: "+1 234 567 8902", parentName: "Wei Chen", balance: 2500, status: "active" },
  { id: "STU003", name: "Sarah Williams", grade: "Grade 9", email: "sarah.w@email.com", phone: "+1 234 567 8903", parentName: "Amanda Williams", balance: 150, status: "active" },
  { id: "STU004", name: "James Brown", grade: "Grade 12", email: "james.b@email.com", phone: "+1 234 567 8904", parentName: "David Brown", balance: 0, status: "active" },
  { id: "STU005", name: "Lisa Garcia", grade: "Grade 10", email: "lisa.g@email.com", phone: "+1 234 567 8905", parentName: "Maria Garcia", balance: 4500, status: "active" },
  { id: "STU006", name: "Alex Thompson", grade: "Grade 8", email: "alex.t@email.com", phone: "+1 234 567 8906", parentName: "John Thompson", balance: 2500, status: "active" },
  { id: "STU007", name: "Emma Davis", grade: "Grade 11", email: "emma.d@email.com", phone: "+1 234 567 8907", parentName: "Susan Davis", balance: 75, status: "inactive" },
  { id: "STU008", name: "Ryan Martinez", grade: "Grade 9", email: "ryan.m@email.com", phone: "+1 234 567 8908", parentName: "Carlos Martinez", balance: 0, status: "active" },
];

const Students = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "",
    email: "",
    phone: "",
    parentName: "",
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.grade || !newStudent.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const student: Student = {
      id: `STU${String(students.length + 1).padStart(3, '0')}`,
      ...newStudent,
      balance: 0,
      status: "active",
    };

    setStudents([...students, student]);
    setNewStudent({ name: "", grade: "", email: "", phone: "", parentName: "" });
    setIsAddDialogOpen(false);
    toast.success("Student added successfully");
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast.success("Student removed successfully");
  };

  const statusStyles = {
    active: "bg-success/10 text-success",
    inactive: "bg-muted text-muted-foreground",
    graduated: "bg-accent/10 text-accent",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Students</h1>
              <p className="text-muted-foreground mt-1">Manage student records and view balances.</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="accent">
                  <Plus className="h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display">Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the student's information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Student Name *</Label>
                    <Input
                      id="name"
                      placeholder="Full name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade *</Label>
                    <Select
                      value={newStudent.grade}
                      onValueChange={(value) => setNewStudent({ ...newStudent, grade: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@email.com"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1 234 567 8900"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent/Guardian Name</Label>
                    <Input
                      id="parent"
                      placeholder="Parent's full name"
                      value={newStudent.parentName}
                      onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="accent" onClick={handleAddStudent}>
                    Add Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="card-elevated p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Student</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground hidden md:table-cell">Contact</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground hidden lg:table-cell">Parent/Guardian</th>
                    <th className="text-right py-4 px-6 font-semibold text-foreground">Balance</th>
                    <th className="text-center py-4 px-6 font-semibold text-foreground">Status</th>
                    <th className="text-center py-4 px-6 font-semibold text-foreground w-16">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr 
                      key={student.id} 
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-accent font-semibold text-sm">
                              {getInitials(student.name)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.id} • {student.grade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {student.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 hidden lg:table-cell text-muted-foreground">
                        {student.parentName}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`font-display font-semibold ${student.balance > 0 ? 'text-destructive' : 'text-success'}`}>
                          {formatCurrency(student.balance)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge className={statusStyles[student.status]} variant="secondary">
                          {student.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit Student
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No students found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <p>Showing {filteredStudents.length} of {students.length} students</p>
            <p>Total outstanding balance: <span className="font-semibold text-foreground">{formatCurrency(students.reduce((sum, s) => sum + s.balance, 0))}</span></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Students;