"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AddHissedarModal from "./hissedar-modal";

// Sample data for demonstration
const animals = [
  {
    id: 1,
    tagNumber: "A-7842",
    properties: {
      "per hissa amount": "30,000",
      "reserved hisse": "3",
      "remaining hisse": "4",
    },
    hissedars: [
      {
        id: 1,
        name: "Ahmed Ali",
        share: "40%",
        paid: "25,000",
        remaining: "5,000",
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
        contact: "0300-1234567",
      },
      {
        id: 2,
        name: "Fatima Khan",
        share: "35%",
        paid: "25,000",
        remaining: "5,000",
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
        contact: "0321-7654321",
      },
      {
        id: 3,
        name: "Usman Malik",
        share: "25%",
        paid: "25,000",
        remaining: "5,000",
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
        contact: "0333-9876543",
      },
    ],
  },
  {
    id: 2,
    tagNumber: "B-5291",
    properties: {
      "per hissa amount": "30,000",
      "reserved hisse": "2",
      "remaining hisse": "5",
    },
    hissedars: [
      {
        id: 1,
        name: "Imran Shah",
        contact: "0345-1234567",
        paid: "25,000",
        remaining: "5,000",
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
      },
      {
        id: 2,
        name: "Ayesha Nawaz",
        contact: "0312-7654321",
        paid: "35,000",
        remaining: "0",
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
      },
    ],
  },
  {
    id: 3,
    tagNumber: "C-3104",
    properties: {
      "per hissa amount": "30,000",
      "reserved hisse": "2",
      "remaining hisse": "5",
    },
    hissedars: [
      {
        id: 1,
        name: "Zubair Ahmed",
        contact: "0333-1234567",
        paid: "34,000",
        remaining: "9,000",
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
      },
      {
        id: 2,
        name: "Saima Khalid",
        paid: "150,000",
        remaining: "0",
        contact: "0300-7654321",
        total_hisse: 5,
        payment_receiver: "Umer Munir",
      },
    ],
  },
];

export default function RecordsList() {
  const [expandedRecords, setExpandedRecords] = useState<number[]>([]);

  const toggleHissedar = (id: number) => {
    setExpandedRecords((prev) =>
      prev.includes(id)
        ? prev.filter((recordId) => recordId !== id)
        : [...prev, id],
    );
  };

  const handleAddHissedar = (animalId: number, newHissedar: any) => {
    if (!expandedRecords.includes(animalId)) {
      setExpandedRecords((prev) => [...prev, animalId]);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {animals.map((animal) => (
        <Card key={animal.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="px-4">
              <h2 className="text-3xl font-bold">#{animal.tagNumber}</h2>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.entries(animal.properties).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white rounded-lg p-3 border border-border"
                  >
                    <p className="text-xs text-muted-foreground uppercase font-medium mb-1">
                      {key}
                    </p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => toggleHissedar(animal.id)}
                  className="flex items-center"
                >
                  <Users className="mr-2 h-4 w-4" />
                  {expandedRecords.includes(animal.id)
                    ? "Hide Hissedar"
                    : "Show Hissedar"}
                  {expandedRecords.includes(animal.id) ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" className="border-gray-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hissedar
                </Button>
                <AddHissedarModal
                  trigger={
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Hissedar
                    </Button>
                  }
                  animalId={animal.id}
                  onAddHissedar={(newHissedar) =>
                    handleAddHissedar(animal.id, newHissedar)
                  }
                />
              </div>

              {expandedRecords.includes(animal.id) && (
                <div className="mt-4 border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Paid Amount</TableHead>
                        <TableHead>Remaining Amount</TableHead>
                        <TableHead>Total Hisse</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Payment Receiver</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {animal.hissedars.map((hissedar) => (
                        <TableRow key={hissedar.id}>
                          <TableCell className="font-medium">
                            {hissedar.name}
                          </TableCell>
                          <TableCell className="font-medium">
                            {hissedar.contact}
                          </TableCell>
                          <TableCell>{hissedar.paid}</TableCell>
                          <TableCell>{hissedar.remaining}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {hissedar.total_hisse}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date().toDateString().slice(4)}
                          </TableCell>
                          <TableCell>{hissedar.payment_receiver}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
