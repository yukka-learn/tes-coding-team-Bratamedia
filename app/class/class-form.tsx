"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useFormState } from "react-dom";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { createClass, updateClass } from "./action";
import SubmitButton from "@/components/btn-submit";

export default function CreateClassForm({
  update = false,
  updateData,
}: {
  update?: boolean;
  updateData?: {
    id: string;
    name: string;
  };
}) {
  const [state, formAction] = useFormState(update ? updateClass : createClass, {
    message: "",
  });

  console.log(state);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{update ? "Update Class" : "Create Class"}</CardTitle>
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
              type="text"
              name="name"
              placeholder="Enter New Class Name"
              defaultValue={updateData?.name}
              required
            />
            {state?.message && (
              <p className="text-red-500 text-sm italic">{state.message}</p>
            )}
          </div>

          <SubmitButton
            defaultText="Create Class"
            pendingText="Creating Class...."
          />
        </form>
      </CardContent>
    </Card>
  );
}
