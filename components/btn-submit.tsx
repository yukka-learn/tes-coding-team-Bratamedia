"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SubmitButton({
  pendingText = "Processing...",
  defaultText = "Submit",
}: {
  pendingText?: string;
  defaultText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className={cn("w-full")}
    >
      {pending ? pendingText : defaultText}
    </Button>
  );
}
