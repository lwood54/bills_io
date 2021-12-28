import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Base/Button/button";
import FormInput from "../../components/Base/FormInput/form-input";
import { PATH } from "../../constants/nav";
import { useAuth } from "../../contexts/Auth";
import { isNegative } from "../../helpers/numbers";
import { supabase } from "../../supabase";

const BillAdd: React.FC = () => {
  const { user } = useAuth();
  const [formState, setFormState] = React.useState({
    name: "",
    balance: 0,
    interestRate: 0,
    dayDue: 1,
    payment: 0,
    user_id: user.id,
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const val = e.currentTarget.value;
    if (field === "balance" && isNegative(val)) return;
    if (field === "interestRate" && isNegative(val)) return;
    if (field === "dayDue" && Number(val) > 31) return;
    if (field === "payment" && isNegative(val)) return;
    setFormState({
      ...formState,
      [field]: val,
    });
  };

  const handleAddBill = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("bills").insert([formState]);
      if (error) {
        throw Error(error.message);
      }
      navigate(PATH.bills.VIEW);
    } catch (error) {
      console.log("add bill error", error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <form
          onSubmit={(e) => handleAddBill(e)}
          className="flex flex-wrap gap-2 max-w-4xl mt-4 justify-center align-center"
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
            id="interestRate"
            type="number"
            label="Interest"
            onChange={(e) => handleChange(e, "interestRate")}
            value={formState.interestRate}
          />
          <FormInput
            id="dayDue"
            type="number"
            label="Day Due"
            onChange={(e) => handleChange(e, "dayDue")}
            value={formState.dayDue}
          />
          <FormInput
            id="payment"
            type="number"
            label="Payment"
            onChange={(e) => handleChange(e, "payment")}
            value={formState.payment}
          />
          <Button
            customClass="w-96 mt-[24px] h-[48px]"
            label="Add Bill"
            type="submit"
          />
        </form>
      </div>
      <h1 className="text-center mt-[100px]">
        NOTE: might be nice to display a chart of current bills and payments
        here
      </h1>
    </>
  );
};

export default BillAdd;
