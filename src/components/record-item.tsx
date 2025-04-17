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
import { AnimalRecord } from "./records-list";

export default function RecordItem({ animal }: { animal: AnimalRecord }) {
  const [expandedRecordsId, setExpandedRecordsId] = useState<number[]>([]);

  const handleAddHissedar = (animalId: number, newHissedar: any) => {
    console.log(animalId);
  };

  return (
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
              onClick={() => {
                expandedRecordsId.includes(animal.id)
                  ? // Hide the table by removing the animal id from the list
                    setExpandedRecordsId((prev) =>
                      prev.filter((p) => p !== animal.id),
                    )
                  : // Display the table by adding animal id in the list
                    setExpandedRecordsId((prev) => [...prev, animal.id]);
              }}
              className="flex items-center"
            >
              <Users className="mr-2 h-4 w-4" />
              {expandedRecordsId.includes(animal.id)
                ? "Hide Hissedar"
                : "Show Hissedar"}
              {expandedRecordsId.includes(animal.id) ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
            <AddHissedarModal
              trigger={
                <Button className="border-gray-700" variant="outline">
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

          {expandedRecordsId.includes(animal.id) && (
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
                        <Badge variant="outline">{hissedar.total_hisse}</Badge>
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
  );
}
