import * as React from "react";
import { supabase } from "../../supabase";
import BillCard from "./bill-card";

export interface Bill {
  balance: number;
  created_at: string;
  dayDue: number;
  id: number;
  interestRate: number;
  name: string;
  payment: number;
  user_id: string;
}

const BillsList: React.FC = () => {
  const [bills, setBills] = React.useState<Bill[]>([]);
  const getBillsList = async () => {
    try {
      let { data, error } = await supabase.from("bills").select("*");
      setBills(data as Bill[]);
      if (error) {
        throw Error(error.message);
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    getBillsList();
  }, []);
  return (
    <div className="flex p-5">
      {bills.map((bill) => (
        <BillCard key={bill.id} bill={bill} />
      ))}
    </div>
  );
};

export default BillsList;
