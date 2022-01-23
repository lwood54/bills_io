import * as React from 'react';
import {
  Accordion,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
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
    submit(data, { method: 'post' });
  };

  return (
    <Stack>
      <Heading textAlign="center">Add a Bill</Heading>
      <Form onSubmit={handleSubmit(onSubmit)} method="post">
        <FormControl isInvalid={Boolean(errors.name?.message)}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'This is a required field',
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.balance?.message)}>
          <FormLabel htmlFor="balance">Balance</FormLabel>
          <Input
            id="balance"
            type="number"
            placeholder="Balance"
            {...register('balance', {
              required: 'This is a required field',
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
          />
          <FormErrorMessage>
            {errors.balance && errors.balance.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.interest?.message)}>
          <FormLabel htmlFor="interest">Interest</FormLabel>
          <Input
            id="interest"
            type="number"
            placeholder="Interest"
            {...register('interest', {
              required: 'This is a required field',
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
          />
          <FormErrorMessage>
            {errors.interest && errors.interest.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.dayDue?.message)}>
          <FormLabel htmlFor="dayDue">Day Due</FormLabel>
          <Input
            id="dayDue"
            type="number"
            placeholder="Day Due"
            {...register('dayDue', {
              required: 'This is a required field',
              validate: {
                positive: (v) => isPositive(v) || VALIDATION.GREATER_THAN_ZERO,
                lessThan30: (v) => Number(v) < 32 || VALIDATION.LESS_THAN_32,
              },
            })}
          />
          <FormErrorMessage>
            {errors.dayDue && errors.dayDue.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.payment?.message)}>
          <FormLabel htmlFor="payment">Payment</FormLabel>
          <Input
            id="payment"
            type="number"
            placeholder="payment"
            {...register('payment', {
              required: 'This is a required field',
              validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
            })}
          />
          <FormErrorMessage>
            {errors.payment && errors.payment.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit">Add Bill</Button>
      </Form>
    </Stack>
  );
};

export default AddBill;
