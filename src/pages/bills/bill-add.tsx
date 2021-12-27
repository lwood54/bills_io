import * as React from "react";
import Button from "../../components/Base/Button/button";
import FormInput from "../../components/Base/FormInput/form-input";
import Inline from "../../components/Base/Inline/inline";
import { isNegative } from "../../helpers/numbers";

const BillAdd: React.FC = () => {
  const [formState, setFormState] = React.useState({
    name: "",
    balance: 0,
    interest: 0,
    dayDue: 1,
    payment: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const val = e.currentTarget.value;
    if (field === "balance" && isNegative(val)) return;
    if (field === "interest" && isNegative(val)) return;
    if (field === "dayDue" && Number(val) > 31) return;
    if (field === "payment" && isNegative(val)) return;
    setFormState({
      ...formState,
      [field]: val,
    });
  };

  const handleAddBill = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("formState", formState);
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={(e) => handleAddBill(e)}
        className="flex flex-col mt-4 justify-between align-center"
      >
        <FormInput
          id="name"
          type="text"
          label="Name"
          onChange={(e) => handleChange(e, "name")}
          value={formState.name}
        />
        <FormInput
          id="balance"
          type="number"
          label="Balance"
          onChange={(e) => handleChange(e, "balance")}
          value={formState.balance}
        />
        <FormInput
          id="interest"
          type="number"
          label="Interest"
          onChange={(e) => handleChange(e, "interest")}
          value={formState.interest}
        />
        <Button style={{ marginTop: "48px" }} label="Add Bill" type="submit" />
      </form>
    </div>
  );
};

export default BillAdd;
