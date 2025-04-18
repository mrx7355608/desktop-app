import { AnimalRecord, Hissedar } from "@/lib/types";
import RecordItem from "./record-item";

interface Props {
  records: AnimalRecord[];
  deleteRecord: (id: number) => void;
  editRecord: (id: number) => void;
  handleAddHissedar: (id: number, data: Hissedar) => void;
}

export default function RecordsList({
  records,
  deleteRecord,
  editRecord,
  handleAddHissedar,
}: Props) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {records.map((animal) => (
        <RecordItem
          animal={animal}
          onDelete={deleteRecord}
          onEdit={editRecord}
          onAddHissedar={handleAddHissedar}
        />
      ))}
    </div>
  );
}
