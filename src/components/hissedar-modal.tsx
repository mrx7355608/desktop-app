"use client";

import type React from "react";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface AddHissedarModalProps {
  trigger?: React.ReactNode;
  animalId?: number;
  onAddHissedar?: (hissedar: any) => void;
}

export default function AddHissedarModal({
  trigger,
  animalId,
  onAddHissedar,
}: AddHissedarModalProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    paidAmount: "",
    remainingAmount: "",
    totalHisse: "",
    paymentReceiver: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new hissedar object
    const newHissedar = {
      id: Date.now(), // Temporary ID for demo
      ...formData,
      date: date ? format(date, "PPP") : "",
      animalId,
    };

    // Call the onAddHissedar function if provided
    if (onAddHissedar) {
      onAddHissedar(newHissedar);
    }

    // Reset form and close modal
    setFormData({
      name: "",
      contact: "",
      paidAmount: "",
      remainingAmount: "",
      totalHisse: "",
      paymentReceiver: "",
    });
    setDate(undefined);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="cursor-pointer">Add Hissedar</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Hissedar</DialogTitle>
          <DialogDescription>
            Enter the details of the new hissedar. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paidAmount" className="text-right">
                Paid Amount
              </Label>
              <Input
                id="paidAmount"
                name="paidAmount"
                type="number"
                value={formData.paidAmount}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="remainingAmount" className="text-right">
                Remaining
              </Label>
              <Input
                id="remainingAmount"
                name="remainingAmount"
                type="number"
                value={formData.remainingAmount}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalHisse" className="text-right">
                Total Hisse
              </Label>
              <Input
                id="totalHisse"
                name="totalHisse"
                value={formData.totalHisse}
                onChange={handleChange}
                className="col-span-3"
                type="number"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentReceiver" className="text-left">
                Payment Receiver
              </Label>
              <Input
                id="paymentReceiver"
                name="paymentReceiver"
                value={formData.paymentReceiver}
                onChange={handleChange}
                className="col-span-3"
                required
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
              Save Hissedar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
