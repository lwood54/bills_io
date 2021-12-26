import * as React from "react";
import { supabase } from "../../supabase";
import BillsList from "./bills-list";

const BillsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-center">Bills Page</h1>
      <BillsList />
    </div>
  );
};

export default BillsPage;
