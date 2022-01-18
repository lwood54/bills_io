import * as React from 'react';
import { Accordion, Heading, Stack } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData } from 'remix';
import { supabase } from '~/lib/supabase/supabase.server';
import { getUserByRequestToken } from '~/lib/auth';
import { PostgrestError, User } from '@supabase/supabase-js';
import BillRow from '~/components/Bills/bill-row';
import { Bill } from '~/lib/types/bills-types';

interface LoaderData {
  data: Bill[];
  error: PostgrestError | null;
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  // NOTE: getUserByRequestToken is required for each page that
  // requires the session/authorized user to access row level data
  const { user } = await getUserByRequestToken(request);
  let { data, error } = await supabase.from('bills').select('*');
  return { data, error, user };
};

interface ViewBillProps {
  name: string;
}
const ViewBill: React.FC<ViewBillProps> = ({ name }) => {
  const { data: bills } = useLoaderData<LoaderData>();
  return (
    <Stack>
      <Heading textAlign="center" color="cyan.600">
        View Bills
      </Heading>
      <Accordion allowToggle px="4">
        {bills.map((bill, i) => (
          <BillRow key={bill.id} isAlt={i % 2 === 0} bill={bill} />
        ))}
      </Accordion>
    </Stack>
  );
};

export default ViewBill;
