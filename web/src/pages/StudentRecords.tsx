import { useState } from "react";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  roll: string;
  email: string;
  course: string;
}

const initialStudents: Student[] = [
  { id: "1", firstName: "Marcus", lastName: "Holloway", roll: "CS-2024-001", email: "marcus.holloway@university.edu", course: "Computer Science" },
  { id: "2", firstName: "Elena", lastName: "Rodriguez", roll: "PH-2024-012", email: "elena.rodriguez@university.edu", course: "Applied Physics" },
  { id: "3", firstName: "Julian", lastName: "Chen", roll: "MA-2024-045", email: "julian.chen@university.edu", course: "Mathematics" },
  { id: "4", firstName: "Aisha", lastName: "Patel", roll: "CS-2024-008", email: "aisha.patel@university.edu", course: "Computer Science" },
  { id: "5", firstName: "David", lastName: "Kim", roll: "EE-2024-023", email: "david.kim@university.edu", course: "Electrical Engineering" },
  { id: "6", firstName: "Sofia", lastName: "Andersson", roll: "CH-2024-017", email: "sofia.andersson@university.edu", course: "Chemistry" },
  { id: "7", firstName: "Tomás", lastName: "García", roll: "MA-2024-031", email: "tomas.garcia@university.edu", course: "Mathematics" },
  { id: "8", firstName: "Priya", lastName: "Sharma", roll: "CS-2024-042", email: "priya.sharma@university.edu", course: "Computer Science" },
];

const StudentRecords = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<Student | null>(null);
  const { toast } = useToast();

  const handleUpdate = () => {
    if (!editForm) return;
    setStudents((prev) => prev.map((s) => (s.id === editForm.id ? editForm : s)));
    setEditStudent(null);
    setEditForm(null);
    toast({ title: "Student updated", description: `${editForm.firstName} ${editForm.lastName}'s record has been updated.` });
  };

  const handleDelete = () => {
    if (!deleteStudent) return;
    setStudents((prev) => prev.filter((s) => s.id !== deleteStudent.id));
    toast({ title: "Student deleted", description: `${deleteStudent.firstName} ${deleteStudent.lastName} has been removed.`, variant: "destructive" });
    setDeleteStudent(null);
  };

  const openEdit = (student: Student) => {
    setEditForm({ ...student });
    setEditStudent(student);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Student Records</h1>
          <p className="text-sm text-muted-foreground">
            {students.length} students enrolled
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90">
          <Plus size={16} />
          Add Student
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/50 border-b border-border">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roll No.</th>
              <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">Email</th>
              <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Course</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {students.map((student) => (
              <tr key={student.id} className="transition-colors hover:bg-secondary/30 group">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{student.firstName}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{student.lastName}</td>
                <td className="px-4 py-3 text-sm font-mono tracking-tighter text-muted-foreground tabular-nums">{student.roll}</td>
                <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">{student.email}</td>
                <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">{student.course}</td>
                <td className="px-4 py-3 text-sm text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground">
                        <MoreHorizontal size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(student)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteStudent(student)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Dialog */}
      <Dialog open={!!editStudent} onOpenChange={(open) => { if (!open) { setEditStudent(null); setEditForm(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Student</DialogTitle>
            <DialogDescription>Edit the student's information below.</DialogDescription>
          </DialogHeader>
          {editForm && (
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-first">First Name</Label>
                  <Input id="edit-first" value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-last">Last Name</Label>
                  <Input id="edit-last" value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-roll">Roll No.</Label>
                <Input id="edit-roll" value={editForm.roll} onChange={(e) => setEditForm({ ...editForm, roll: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-course">Course</Label>
                <Input id="edit-course" value={editForm.course} onChange={(e) => setEditForm({ ...editForm, course: e.target.value })} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditStudent(null); setEditForm(null); }}>Cancel</Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteStudent} onOpenChange={(open) => { if (!open) setDeleteStudent(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-medium text-foreground">{deleteStudent?.firstName} {deleteStudent?.lastName}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default">Cancel</AlertDialogCancel>
<Button variant="destructive" onClick={handleDelete}>
  Delete
</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentRecords;
