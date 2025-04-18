import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash,
  Users,
  Pencil,
} from "lucide-react";
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
import { formatPKR } from "@/lib/currency-formatter";

export default function RecordItem({
  animal,
  onEdit,
  onDelete,
}: {
  animal: AnimalRecord;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  const [expandedRecordsId, setExpandedRecordsId] = useState<number[]>([]);

  const handleAddHissedar = (animalId: number, newHissedar: any) => {
    console.log(animalId);
  };

  return (
    <Card key={animal.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="px-4 flex justify-between">
          <h2 className="text-3xl font-bold">#{animal.tagNumber}</h2>

          {/* Edit & Delete buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => onEdit(animal.id)}
              className="flex items-center"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => onDelete(animal.id)}
              className="flex items-center"
            >
              <Trash className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 border border-border">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">
                Per Hissa
              </p>
              <p className="font-semibold">
                {formatPKR(animal.perHissaAmount)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 border border-border">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">
                Reserved Hisse
              </p>
              <p className="font-semibold">{animal.hissedars.length}</p>
            </div>

            <div className="bg-white rounded-lg p-3 border border-border">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">
                Remaining Hisse
              </p>
              <p className="font-semibold">{7 - animal.hissedars.length}</p>
            </div>
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
              className="flex items-center cursor-pointer"
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
                <Button
                  className="border-gray-700 cursor-pointer"
                  variant="outline"
                >
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
                      <TableCell>{formatPKR(hissedar.paid_amount)}</TableCell>
                      <TableCell>
                        {formatPKR(
                          animal.perHissaAmount - hissedar.paid_amount,
                        )}
                      </TableCell>
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
