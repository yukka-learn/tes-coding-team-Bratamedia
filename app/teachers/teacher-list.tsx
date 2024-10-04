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
import { TeacherFetch } from "@/lib/schema-fetch";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import BtnDelete from "@/components/btn-delete";
import { deleteTeacher } from "./action";

export default function TeacherListTable({
  teachers,
}: {
  teachers: TeacherFetch[];
}) {
  const [selectedClass, setSelectedClass] = useState<string>("all");

  // Mengelompokkan siswa berdasarkan kelas
  const teachersByClass = teachers.reduce((acc, teacher) => {
    const className = teacher.class.name;
    if (!acc[className]) {
      acc[className] = [];
    }
    acc[className].push({
      ...teacher,
      class: {
        ...teacher.class,
        teacher: teacher.class.name || { id: "", name: "" },
      },
    } as TeacherFetch);
    return acc;
  }, {} as Record<string, TeacherFetch[]>);

  // Mendapatkan daftar kelas
  const classes = Object.keys(teachersByClass);

  // Mengambil siswa sesuai kelas yang dipilih
  const filteredTeachers =
    selectedClass && selectedClass !== "all"
      ? teachersByClass[selectedClass] || []
      : teachers;

  return (
    <div>
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

      <Table>
        <TableCaption>
          List of Teachers {selectedClass && ` in ${selectedClass}`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>All Students</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, i) => (
              <TableRow key={teacher.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.class.name}</TableCell>
                <TableCell>{teacher.class.students.length}</TableCell>
                <TableCell className="space-x-2">
                  <div className="flex space-x-4">
                    <Link href={`/teachers/${teacher.id}`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <div>
                      <BtnDelete id={teacher.id} deleteAction={deleteTeacher} />
                    </div>
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
