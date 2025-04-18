import "./App.css";
import Navbar from "./components/navbar";
import RecordsList from "./components/records-list";
import { useEffect, useState } from "react";
import { AnimalRecord } from "./lib/types";
import { Spinner } from "./components/ui/spinner";

const animals = [
  {
    id: 1,
    tagNumber: "101",
    perHissaAmount: 30000,
    hissedars: [
      {
        id: 1,
        name: "Ahmed Ali",
        paid_amount: 25000,
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
        contact: "0300-1234567",
      },
      {
        id: 2,
        name: "Fatima Khan",
        paid_amount: 25000,
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
        contact: "0321-7654321",
      },
      {
        id: 3,
        name: "Usman Malik",
        paid_amount: 25000,
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
        contact: "0333-9876543",
      },
    ],
  },
  {
    id: 2,
    tagNumber: "102",
    perHissaAmount: 30000,
    hissedars: [
      {
        id: 1,
        name: "Imran Shah",
        contact: "0345-1234567",
        paid_amount: 25000,
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
      },
      {
        id: 2,
        name: "Ayesha Nawaz",
        contact: "0312-7654321",
        paid_amount: 35000,
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
      },
    ],
  },
  {
    id: 3,
    tagNumber: "103",
    perHissaAmount: 30000,
    hissedars: [
      {
        id: 1,
        name: "Zubair Ahmed",
        contact: "0333-1234567",
        paid_amount: 34000,
        total_hisse: 1,
        payment_receiver: "Sharjeel Ali",
      },
      {
        id: 2,
        name: "Saima Khalid",
        paid_amount: 150000,
        contact: "0300-7654321",
        total_hisse: 5,
        payment_receiver: "Umer Munir",
      },
    ],
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<AnimalRecord[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setRecords(animals);
      setLoading(false);
    }, 3000);
  }, []);

  const editRecord = (animalId: number) => {};
  const deleteRecord = (animalId: number) => {
    setRecords((prev) => prev.filter((p) => p.id !== animalId));
  };
  const handleAddHissedar = (animalId: number, newHissedar: any) => {
    setRecords((prev) => {
      return prev.map((rec) => {
        if (rec.id === animalId) {
          rec.hissedars.push(newHissedar);
        }
        return rec;
      });
    });
  };

  return (
    <main>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <RecordsList
          records={records}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
          handleAddHissedar={handleAddHissedar}
        />
      )}
    </main>
  );
}

export default App;
