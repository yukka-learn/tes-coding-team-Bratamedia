"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useFormState } from "react-dom";
import { createStudent, updateStudent } from "./action";
import SubmitButton from "@/components/btn-submit";
import SelectChoiceClass from "@/components/select-choices-class";

export default function StudentForm({
  update = false,
  updateData,
}: {
  update?: boolean;
  updateData?: {
    id: string;
    name: string;
    classes: string;
  };
}) {
  const [state, formAction] = useFormState(
    updateData ? updateStudent : createStudent,
    {
      message: "",
    }
  );

  console.log(state);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{update ? "Update Student" : "Create Students"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            {updateData && (
              <input type="hidden" name="id" value={updateData.id} />
            )}
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={updateData?.name}
              placeholder="Enter your name"
              required
            />
            {state?.message && (
              <p className="text-red-500 text-sm italic">{state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <SelectChoiceClass defaultValue={updateData?.classes} />
          </div>
          <SubmitButton
            defaultText={update ? "Update.." : "Create"}
            pendingText={update ? "Updating.." : "Creating.."}
          />
        </form>
      </CardContent>
    </Card>
  );
}
