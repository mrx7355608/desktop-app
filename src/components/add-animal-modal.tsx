import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddAnimalModalProps {
  trigger?: React.ReactNode;
  onAddAnimal?: (animal: any) => void;
}

export default function AddAnimalModal({
  trigger,
  onAddAnimal,
}: AddAnimalModalProps) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    tagNumber: "",
    perHissaAmount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new animal object
    const newAnimal = {
      id: Date.now(), // Temporary ID for demo
      tagNumber: formData.tagNumber,
      perHissaAmount: formData.perHissaAmount,
      hissedars: [],
    };

    // Call the onAddAnimal function if provided
    if (onAddAnimal) {
      onAddAnimal(newAnimal);
    }

    // Reset form and close modal
    setFormData({
      tagNumber: "",
      perHissaAmount: "",
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="cursor-pointer">Add Animal</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Animal</DialogTitle>
          <DialogDescription>
            Enter the details of the new animal. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tagNumber" className="text-right">
                Tag Number*
              </Label>
              <Input
                id="tagNumber"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. 742"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purchasePrice" className="text-right">
                Per Hissa Amount
              </Label>
              <Input
                id="perHissaAmount"
                name="perHissaAmount"
                type="number"
                value={formData.perHissaAmount}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">
              Save Animal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
