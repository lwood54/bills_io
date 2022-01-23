import * as React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useSubmit,
} from 'remix';
import { supabase } from '~/lib/supabase/supabase.server';
import { getUserByRequestToken } from '~/lib/auth';
import { PostgrestError, User } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { isPositive } from '~/lib/helpers/bills-helpers';
import { PATH } from '~/lib/constants/nav-constants';
import { dataToFormData } from '~/lib/helpers/conversions';
import FormInput from '~/components/Base/FormInput/form-input';

export const VALIDATION = {
  GREATER_THAN_ZERO: 'Should be greater than 0',
  LESS_THAN_32: 'Should be less than 32',
  POS_INT: 'Should be a positive number',
  REQUIRED: 'This is a required field',
};

interface Bill {
  balance: number;
  dayDue: number;
  interest: number;
  name: string;
  payment: number;
  user_id: string;
}

interface LoaderData {
  data: Bill[];
  error: PostgrestError | null;
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await getUserByRequestToken(request);
  if (!user) {
    return redirect(PATH.LOGIN);
  }
  return { user };
};

export const action: ActionFunction = async ({ request }) => {
  const { user } = await getUserByRequestToken(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (!user) return redirect(PATH.LOGIN);
  const { error } = await supabase.from('bills').insert([data]);
  if (!error) {
    return redirect(PATH.BILLS.VIEW);
  }
  return { error };
};

interface AddBillProps {
  name: string;
}
const AddBill: React.FC<AddBillProps> = ({ name }) => {
  const { user } = useLoaderData<LoaderData>();
  const actionData = useActionData();
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Bill>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      balance: 0,
      interest: 0,
      dayDue: 1,
      payment: 0,
      user_id: user?.id,
    },
  });

  const onSubmit = (data: Bill) => {
    submit(dataToFormData(data), { method: 'post' });
  };

  return (
    <Stack>
      <Heading textAlign="center">Add a Bill</Heading>
      <Form onSubmit={handleSubmit(onSubmit)} method="post">
        <FormInput
          id="name"
          error={errors.name}
          {...register('name', {
            required: 'This is a required field',
          })}
          placeholder="Name"
          label="Name"
        />
        <FormInput
          id="balance"
          error={errors.balance}
          {...register('balance', {
            required: 'This is a required field',
            validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
          })}
          placeholder="Balance"
          label="Balance"
        />
        <FormInput
          id="interest"
          error={errors.interest}
          {...register('interest', {
            required: 'This is a required field',
            validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
          })}
          placeholder="Interest"
          label="Interest"
        />
        <FormInput
          id="dayDue"
          error={errors.dayDue}
          {...register('dayDue', {
            required: 'This is a required field',
            validate: {
              positive: (v) => isPositive(v) || VALIDATION.GREATER_THAN_ZERO,
              lessThan30: (v) => Number(v) < 32 || VALIDATION.LESS_THAN_32,
            },
          })}
          placeholder="Day Due"
          label="Day Due"
        />
        <FormInput
          id="payment"
          error={errors.payment}
          {...register('payment', {
            required: 'This is a required field',
            validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
          })}
          placeholder="Payment"
          label="Payment"
        />
        <Button type="submit">Add Bill</Button>
      </Form>
    </Stack>
  );
};

export default AddBill;
