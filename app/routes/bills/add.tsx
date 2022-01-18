import * as React from 'react';
import { Accordion, Heading, Stack } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData } from 'remix';
import { supabase } from '~/lib/supabase/supabase.server';
import { getUserByRequestToken } from '~/lib/auth';
import { PostgrestError, User } from '@supabase/supabase-js';

interface Bill {
  id: number;
  name: string;
  balance: number;
  dayDue: number;
  interest: number;
  payment: number;
}

interface LoaderData {
  data: Bill[];
  error: PostgrestError | null;
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await getUserByRequestToken(request);
  let { data, error } = await supabase.from('bills').select('*');
  return { data, error, user };
};

interface AddBillProps {
  name: string;
}
const AddBill: React.FC<AddBillProps> = ({ name }) => {
  const { data: bills } = useLoaderData<LoaderData>();

  return (
    <Stack>
      <Heading textAlign="center">Add a Bill</Heading>
      <Accordion allowToggle px="4">
        stuff
      </Accordion>
    </Stack>
  );
};

export default AddBill;
