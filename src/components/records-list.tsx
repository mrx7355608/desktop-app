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

// Sample data for demonstration
const animals = [
  {
    id: 1,
    tagNumber: "A-7842",
    properties: {
      breed: "Holstein",
      age: "3 years",
      weight: "450 kg",
    },
    hissedars: [
      { id: 1, name: "Ahmed Ali", share: "40%", contact: "0300-1234567" },
      { id: 2, name: "Fatima Khan", share: "35%", contact: "0321-7654321" },
      { id: 3, name: "Usman Malik", share: "25%", contact: "0333-9876543" },
    ],
  },
  {
    id: 2,
    tagNumber: "B-5291",
    properties: {
      breed: "Sahiwal",
      age: "4 years",
      weight: "520 kg",
    },
    hissedars: [
      { id: 1, name: "Imran Shah", share: "50%", contact: "0345-1234567" },
      { id: 2, name: "Ayesha Nawaz", share: "50%", contact: "0312-7654321" },
    ],
  },
  {
    id: 3,
    tagNumber: "C-3104",
    properties: {
      breed: "Nili-Ravi",
      age: "2 years",
      weight: "380 kg",
    },
    hissedars: [
      { id: 1, name: "Zubair Ahmed", share: "60%", contact: "0333-1234567" },
      { id: 2, name: "Saima Khalid", share: "40%", contact: "0300-7654321" },
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

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {animals.map((animal) => (
        <Card key={animal.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="px-4">
              <h2 className="text-3xl font-bold">{animal.tagNumber}</h2>
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

              <div className="flex gap-3 mt-4">
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hissedar
                </Button>
              </div>

              {expandedRecords.includes(animal.id) && (
                <div className="mt-4 border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Share</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {animal.hissedars.map((hissedar) => (
                        <TableRow key={hissedar.id}>
                          <TableCell className="font-medium">
                            {hissedar.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{hissedar.share}</Badge>
                          </TableCell>
                          <TableCell>{hissedar.contact}</TableCell>
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
