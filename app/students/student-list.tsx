// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { StudentFetch } from "@/lib/schema-fetch";
// import { DialogDemo } from "./dialog";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import DeleteStudent from "./student-delete";

// export function TableDemo({ students }: { students: StudentFetch[] }) {
//   return (
//     <Table>
//       <TableCaption>A list of your recent invoices.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead>No</TableHead>
//           <TableHead>Name</TableHead>
//           <TableHead>Kelas</TableHead>

//           {/* <TableHead className="text-right">Amount</TableHead> */}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {students.map((student, i) => (
//           <TableRow key={student.id}>
//             <TableCell>{i + 1}</TableCell>
//             <TableCell className="font-medium">{student.name}</TableCell>
//             <TableCell className="flex gap-2">{student.class.name}</TableCell>
//             <TableCell className="space-x-2">
//               <Link href={`/students/${student.id}`}>
//                 <Button variant="outline">Edit {student.id}</Button>
//               </Link>
//               <DeleteStudent id={student.id} />
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }

"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentFetch } from "@/lib/schema-fetch";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Pastikan path ini sesuai dengan struktur proyek kamu
import { useState } from "react";
import BtnDelete from "@/components/btn-delete";
import { deleteStudent } from "./action";

export function TableDemo({ students }: { students: StudentFetch[] }) {
  const [selectedClass, setSelectedClass] = useState<string>("all");

  // Mengelompokkan siswa berdasarkan kelas
  const studentsByClass = students.reduce((acc, student) => {
    const className = student.class.name;
    if (!acc[className]) {
      acc[className] = [];
    }
    acc[className].push(student);
    return acc;
  }, {} as Record<string, StudentFetch[]>);

  // Mendapatkan daftar kelas
  const classes = Object.keys(studentsByClass);

  // Mengambil siswa sesuai kelas yang dipilih
  const filteredStudents =
    selectedClass && selectedClass !== "all"
      ? studentsByClass[selectedClass] || [] // Pastikan tidak terjadi error jika kelas tidak ditemukan
      : students;

  return (
    <div>
      {/* Dropdown untuk memilih kelas */}
      <div className="mb-4 w-fit">
        <label htmlFor="class" className="block mb-2 font-medium">
          Filter by Class:
        </label>
        <Select
          value={selectedClass}
          onValueChange={setSelectedClass}
          required
          name="class"
        >
          <SelectTrigger id="class">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>{" "}
            {/* Value "all" untuk semua kelas */}
            {classes.map((className) => (
              <SelectItem key={className} value={className}>
                Kelas {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Menampilkan daftar siswa */}
      <Table>
        <TableCaption>
          List of Students{selectedClass && ` in ${selectedClass}`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, i) => (
              <TableRow key={student.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.class.name}</TableCell>
                <TableCell>
                  {student.class?.teacher?.name || "No Teacher"}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/students/${student.id}`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <BtnDelete id={student.id} deleteAction={deleteStudent} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
