
import { create } from "zustand";
import { devtools} from "zustand/middleware";

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  rollNum: string;
  course: string;
  createdAt: string;
  updatedAt: string;
  __v:number
}

interface StudentStore {
  students: Student[];
  selectedStudent: Student | null;
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  setSelectedStudent: (student: Student | null) => void;
  clearStudents: () => void;
}

const useStudentStore = create<StudentStore>()(
  devtools(
    
    (set) => ({
      students: [],
      selectedStudent: null,

      setStudents: (students) =>
        set({ students }, false, "setStudents"),

      addStudent: (student) =>
        set((state) => ({ students: [...state.students, student] }), false, "addStudent"),

      updateStudent: (id, data) =>
        set((state) => ({
          students: state.students.map((s) => s._id === id ? { ...s, ...data } : s),
        }), false, "updateStudent"),

      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s._id !== id),
        }), false, "deleteStudent"),

      setSelectedStudent: (student) =>
        set({ selectedStudent: student }, false, "setSelectedStudent"),

      clearStudents: () =>
        set({ students: [], selectedStudent: null }, false, "clearStudents"),
    }),
    { name: "StudentStore" }
  )
);

export default useStudentStore;