"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function BtnDelete({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: (id: string) => Promise<{
    message: string;
  }>;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAction(id);
      setOpen(false); // Close dialog after deletion
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
