export interface Hissedar {
  id: number;
  name: string;
  paid_amount: number;
  total_hisse: number;
  payment_receiver: string;
  contact: string;
}

export interface AnimalRecord {
  id: number;
  tagNumber: string;
  perHissaAmount: number;
  hissedars: Hissedar[];
}
