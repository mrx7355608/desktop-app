"use client";

import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import RecordItem from "./record-item";

export interface Hissedar {
  id: number;
  name: string;
  paid: string;
  remaining: string;
  total_hisse: number;
  payment_receiver: string;
  contact: string;
}

export interface RecordProperties {
  [key: string]: string;
}

export interface AnimalRecord {
  id: number;
  tagNumber: string;
  properties: RecordProperties;
  hissedars: Hissedar[];
}

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
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<AnimalRecord[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setRecords(animals);
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Spinner size="medium" />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {records.map((animal) => (
        <RecordItem animal={animal} />
      ))}
    </div>
  );
}
