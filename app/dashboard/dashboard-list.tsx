"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { StudentFetch } from "@/lib/schema-fetch";

export default function AllData({ students }: { students: StudentFetch[] }) {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");

  // Get unique classes and teachers, ensuring no empty strings
  const uniqueClasses = Array.from(
    new Set(students.map((student) => student.class.name))
  ).filter(Boolean);

  const uniqueTeachers = Array.from(
    new Set(
      students.map((student) => student.class.teacher?.name || "unassigned")
    )
  ).filter(Boolean);

  // Create a mapping of teachers to their classes
  students.reduce((acc, student) => {
    const teacherName = student.class.teacher?.name || "unassigned";
    if (!acc[teacherName]) {
      acc[teacherName] = new Set();
    }
    acc[teacherName].add(student.class.name);
    return acc;
  }, {} as Record<string, Set<string>>);

  useEffect(() => {
    if (selectedClass === "all") {
      setSelectedTeacher("all");
    } else {
      const teachersForClass = students
        .filter((student) => student.class.name === selectedClass)
        .map((student) => student.class.teacher?.name || "unassigned");

      const uniqueTeachersForClass = Array.from(new Set(teachersForClass));

      if (uniqueTeachersForClass.length === 1) {
        setSelectedTeacher(uniqueTeachersForClass[0]);
      } else {
        setSelectedTeacher("all");
      }
    }
  }, [selectedClass, students]);

  // Filter students based on selected class and teacher
  const filteredStudents = students.filter((student) => {
    const matchClass =
      selectedClass === "all" || student.class.name === selectedClass;
    const matchTeacher =
      selectedTeacher === "all" ||
      (student.class.teacher?.name || "unassigned") === selectedTeacher;
    return matchClass && matchTeacher;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Filter dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="teacher-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Teacher:
          </label>
          <Select onValueChange={setSelectedTeacher} value={selectedTeacher}>
            <SelectTrigger className="w-full" id="teacher-select">
              <SelectValue placeholder="All Teachers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              {uniqueTeachers.map((teacherName) => (
                <SelectItem key={teacherName} value={teacherName}>
                  {teacherName === "unassigned"
                    ? "No Teacher Assigned"
                    : teacherName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            htmlFor="class-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Class:
          </label>
          <Select onValueChange={setSelectedClass} value={selectedClass}>
            <SelectTrigger className="w-full" id="class-select">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {uniqueClasses.map((className) => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableCaption>List of Teachers, Students, and Classes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Teacher Name</TableHead>
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
                  {student.class.teacher?.name || "No Teacher Assigned"}
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
