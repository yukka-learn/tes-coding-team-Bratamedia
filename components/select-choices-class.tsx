"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";

interface Class {
  id: string;
  name: string;
  teacher: {
    id: string;
    name: string;
    classId: string;
  } | null;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function SelectChoiceClass({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const { data: classes = [], error } = useSWR<Class[]>("/api/class", fetcher);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    defaultValue
  );

  console.log(classes);

  useEffect(() => {
    if (defaultValue) {
      setSelectedClass(defaultValue);
    } else {
      setSelectedClass(undefined);
    }
  }, [defaultValue, classes]);

  if (!classes && !error) return <div>Loading...</div>;
  if (error) return <div>Error fetching classes.</div>;

  return (
    <Select
      value={selectedClass}
      onValueChange={(value) => setSelectedClass(value)}
      required
      name="class"
    >
      <SelectTrigger id="class">
        <SelectValue placeholder="Select a class" />
      </SelectTrigger>
      <SelectContent>
        {classes.length === 0 ? (
          <SelectItem value="no-class" disabled>
            No Class Available
          </SelectItem>
        ) : (
          classes.map((cls) => (
            <SelectItem key={cls.id} value={cls.name}>
              Kelas {cls.name} -{" "}
              {cls.teacher?.name ?? (
                <span className="italic text-red-400">No Teacher</span>
              )}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
