import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { deleteClass } from "./action";
import { ClassFetch } from "@/lib/schema-fetch";
import BtnDelete from "@/components/btn-delete";

export default function ClassTable({ classess }: { classess: ClassFetch[] }) {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent class.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>All Teachers</TableHead>
            <TableHead>All Students</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classess.length > 0 ? (
            classess.map((classe, i) => (
              <TableRow key={classe.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{classe.name}</TableCell>
                <TableCell>{classe?.teacher ? 1 : 0}</TableCell>
                <TableCell>{classe?.students?.length || 0}</TableCell>
                <TableCell className="space-x-2 flex">
                  <Link href={`/class/${classe.id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <BtnDelete id={classe.id} deleteAction={deleteClass} />
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
