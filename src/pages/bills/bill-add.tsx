import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Base/Button/button";
import FormInput from "../../components/Base/FormInput/form-input";
import { PATH } from "../../constants/nav";
import { VALIDATION } from "../../constants/validation";
import { useAuth } from "../../contexts/Auth";
import { isPositive } from "../../helpers/numbers";
import { supabase } from "../../supabase";

interface BillAddState {
  name: string;
  balance: number;
  interest: number;
  dayDue: number;
  payment: number;
  user_id: string;
}

const BillAdd: React.FC = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillAddState>({
    defaultValues: {
      name: "",
      balance: 0,
      interest: 0,
      dayDue: 1,
      payment: 0,
      user_id: user.id,
    },
  });
  const navigate = useNavigate();

  const handleAddBill: SubmitHandler<BillAddState> = async (data) => {
    try {
      const { error } = await supabase.from("bills").insert([data]);
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
          onSubmit={handleSubmit(handleAddBill)}
          className="flex flex-wrap gap-2 max-w-4xl mt-4 justify-center align-center"
        >
          <FormInput
            id="name"
            {...register("name", {
              required: VALIDATION.REQUIRED,
            })}
            error={errors?.name?.message}
            label="Name"
          />
          <FormInput
            id="balance"
            {...register("balance", {
              required: "This is a required field",
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
            error={errors?.balance?.message}
            label="Balance"
          />
          <FormInput
            id="interest"
            {...register("interest", {
              required: "This is a required field",
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
            error={errors?.interest?.message}
            label="Interest %"
          />
          <FormInput
            id="dayDue"
            {...register("dayDue", {
              required: "This is a required field",
              validate: {
                positive: (v) => isPositive(v) || VALIDATION.GREATER_THAN_ZERO,
                lessThan30: (v) => Number(v) < 32 || VALIDATION.LESS_THAN_32,
              },
            })}
            error={errors?.dayDue?.message}
            label="Day Due"
          />
          <FormInput
            id="payment"
            {...register("payment", {
              required: "This is a required field",
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
            error={errors?.payment?.message}
            label="Payment"
          />
          <Button
            customClass="w-96 mt-[24px] h-[49px]"
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
