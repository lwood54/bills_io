import * as React from 'react';
import { Button, Container, Heading, HStack, Stack } from '@chakra-ui/react';
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useSubmit,
  useTransition,
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
  bill: Bill;
  error: PostgrestError | null;
  user: User;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user } = await getUserByRequestToken(request);
  if (!user) {
    return redirect(PATH.LOGIN);
  }
  if (params.billId !== 'add') {
    const { data: bill, error } = await supabase
      .from('bills')
      .select('*')
      .eq('id', params.billId);
    return { bill: bill && bill[0], user, error };
  }
  return { user };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { user } = await getUserByRequestToken(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (!user) return redirect(PATH.LOGIN);
  // IF ADD BILL
  if (params.billId === 'add') {
    const { error } = await supabase.from('bills').insert([data]);
    if (!error) {
      return redirect(PATH.BILLS.VIEW);
    }
    return { error };
  }
  // IF EDIT BILL
  const res = await supabase
    .from('bills')
    .update({ ...data })
    .eq('id', Number(params.billId));
  if (!res.error) {
    return redirect(PATH.BILLS.VIEW);
  }
  return { error: res.error };
};

interface ModifyBillProps {
  name: string;
}
const ModifyBill: React.FC<ModifyBillProps> = ({ name }) => {
  const { bill, user, error } = useLoaderData<LoaderData>();
  const actionData = useActionData();
  const { state } = useTransition();
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Bill>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: bill?.name || '',
      balance: bill?.balance || 0,
      interest: bill?.interest || 0,
      dayDue: bill?.dayDue || 1,
      payment: bill?.payment || 0,
      user_id: user?.id,
    },
  });

  const onSubmit = (data: Bill) => {
    submit(dataToFormData(data), { method: 'post' });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method="post">
      <Container>
        <Stack alignItems="center">
          <Heading textAlign="center" color="teal.500">
            {bill ? 'Edit Bill' : 'Add a Bill'}
          </Heading>
          <FormInput
            id="name"
            error={errors.name}
            {...register('name', {
              required: VALIDATION.REQUIRED,
            })}
            placeholder="Name"
            label="Name"
          />
          <HStack width="100%">
            <FormInput
              id="balance"
              error={errors.balance}
              {...register('balance', {
                required: VALIDATION.REQUIRED,
                validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
              })}
              placeholder="Balance"
              label="Balance"
            />
            <FormInput
              id="interest"
              error={errors.interest}
              {...register('interest', {
                required: VALIDATION.REQUIRED,
                validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
              })}
              placeholder="Interest"
              label="Interest"
            />
          </HStack>
          <HStack width="100%">
            <FormInput
              id="dayDue"
              error={errors.dayDue}
              {...register('dayDue', {
                required: VALIDATION.REQUIRED,
                validate: {
                  positive: (v) =>
                    isPositive(v) || VALIDATION.GREATER_THAN_ZERO,
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
                required: VALIDATION.REQUIRED,
                validate: (v) => isPositive(v, true) || VALIDATION.POS_INT,
              })}
              placeholder="Payment"
              label="Payment"
            />
          </HStack>
          <Button
            rounded="sm"
            type="submit"
            size="lg"
            colorScheme="teal"
            disabled={state === 'submitting'}
            isLoading={state === 'submitting' || state === 'loading'}
            spinnerPlacement="start"
            borderBottomColor="teal.700"
            borderBottomWidth="4px"
            width="100%"
          >
            {bill ? 'Save Edit' : 'Add Bill'}
          </Button>
        </Stack>
      </Container>
    </Form>
  );
};

export default ModifyBill;
