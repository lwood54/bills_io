import * as React from "react";
import { numToCurrency } from "../../helpers/conversions";
import { Bill } from "./bills-list";

const BillCard: React.FC<{ bill: Bill }> = ({ bill }) => {
  return (
    <div className="p-2 w-64 bg-slate-100 rounded-md">
      <h3 className="text-center">{bill.name}</h3>
      <p>Remaining Balance: {numToCurrency(bill.balance)}</p>
      <p>Day Due: {bill.dayDue}</p>
      <p>Payment: {numToCurrency(bill.payment)}</p>
    </div>
  );
};

export default BillCard;
