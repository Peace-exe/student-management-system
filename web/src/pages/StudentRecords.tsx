import { useState, useEffect } from "react";
import { Plus, MoreHorizontal, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
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
import useStudentStore, { type Student } from "../store/useStudentStore";

type StudentForm = {
  firstName: string;
  lastName: string;
  rollNum: string;
  email: string;
  course: string;
};

const emptyStudent: StudentForm = { firstName: "", lastName: "", rollNum: "", email: "", course: "" };

const StudentRecords = () => {
  const students = useStudentStore((state) => state.students);
  const setStudents = useStudentStore((state) => state.setStudents);

  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<StudentForm | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<StudentForm>(emptyStudent);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const { toast } = useToast();

  const fetchStudents = async (page = 1) => {
    try {
      setFetchLoading(true);
      const res = await axios.get(`http://localhost:7001/getAllStudents?page=${page}`, { withCredentials: true });
      setStudents(res.data.data);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setTotalStudents(res.data.totalStudents);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setStudents([]);
        setTotalStudents(0);
      } else {
        toast({ title: "Failed to load students", description: err.response?.data?.message || "Please try again.", variant: "destructive" });
      }
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1);
  }, []);

  const handleAdd = async () => {
    if (!addForm.firstName || !addForm.lastName || !addForm.rollNum || !addForm.email || !addForm.course) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    try {
      setActionLoading(true);
      await axios.post("http://localhost:7001/createStudent", addForm, { withCredentials: true });
      toast({ title: "Student added", description: `${addForm.firstName} ${addForm.lastName} has been added.` });
      setShowAdd(false);
      setAddForm(emptyStudent);
      fetchStudents(currentPage);
    } catch (err: any) {
      toast({ title: "Failed to add student", description: err.response?.data?.message || err.message, variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editForm || !editStudent) return;
    try {
      setActionLoading(true);
      const { rollNum } = editStudent;
      const { firstName, lastName, email, course } = editForm;
      await axios.post(`http://localhost:7001/updateStudent?rollNum=${rollNum}`, { firstName, lastName, email, course }, { withCredentials: true });
      toast({ title: "Student updated", description: `${editForm.firstName} ${editForm.lastName}'s record has been updated.` });
      setEditStudent(null);
      setEditForm(null);
      fetchStudents(currentPage);
    } catch (err: any) {
      toast({ title: "Failed to update student", description: err.response?.data?.message || err.message, variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteStudent) return;
    try {
      setActionLoading(true);
      await axios.delete(`http://localhost:7001/deleteStudent/${encodeURIComponent(deleteStudent.rollNum)}`, { withCredentials: true });
      toast({ title: "Student deleted", description: `${deleteStudent.firstName} ${deleteStudent.lastName} has been removed.`, variant: "destructive" });
      setDeleteStudent(null);
      fetchStudents(currentPage);
    } catch (err: any) {
      toast({ title: "Failed to delete student", description: err.response?.data?.message || err.message, variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  const openEdit = (student: Student) => {
    setEditForm({
      firstName: student.firstName,
      lastName: student.lastName,
      rollNum: student.rollNum,
      email: student.email,
      course: student.course,
    });
    setEditStudent(student);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Student Records</h1>
          <p className="text-sm text-muted-foreground">
            {fetchLoading ? "Loading..." : `${totalStudents} students enrolled`}
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90">
          <Plus size={16} />
          Add Student
        </button>
      </div>

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
            {fetchLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">Loading students...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">No students found.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="transition-colors hover:bg-secondary/30 group">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{student.firstName}</td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{student.lastName}</td>
                  <td className="px-4 py-3 text-sm font-mono tracking-tighter text-muted-foreground tabular-nums">{student.rollNum}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1 || fetchLoading} onClick={() => fetchStudents(currentPage - 1)}>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="outline" size="sm" disabled={currentPage === totalPages || fetchLoading} onClick={() => fetchStudents(currentPage + 1)}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

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
            <Button onClick={handleUpdate} disabled={actionLoading}>{actionLoading ? "Saving..." : "Save Changes"}</Button>
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
            <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>{actionLoading ? "Deleting..." : "Delete"}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Student Dialog */}
      <Dialog open={showAdd} onOpenChange={(open) => { if (!open) { setShowAdd(false); setAddForm(emptyStudent); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Student</DialogTitle>
            <DialogDescription>Fill in the details to add a new student.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="add-first">First Name</Label>
                <Input id="add-first" value={addForm.firstName} onChange={(e) => setAddForm({ ...addForm, firstName: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-last">Last Name</Label>
                <Input id="add-last" value={addForm.lastName} onChange={(e) => setAddForm({ ...addForm, lastName: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-roll">Roll No.</Label>
              <Input id="add-roll" placeholder="123/ABC/456" value={addForm.rollNum} onChange={(e) => setAddForm({ ...addForm, rollNum: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-email">Email</Label>
              <Input id="add-email" type="email" value={addForm.email} onChange={(e) => setAddForm({ ...addForm, email: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-course">Course</Label>
              <Input id="add-course" value={addForm.course} onChange={(e) => setAddForm({ ...addForm, course: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setAddForm(emptyStudent); }}>Cancel</Button>
            <Button onClick={handleAdd} disabled={actionLoading}>{actionLoading ? "Adding..." : "Add Student"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentRecords;