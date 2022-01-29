import * as React from 'react';
import {
  Accordion,
  Container,
  Heading,
  HStack,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { LoaderFunction, redirect, useLoaderData, useNavigate } from 'remix';
import { supabase } from '~/lib/supabase/supabase.server';
import { getUserByRequestToken } from '~/lib/auth';
import { PostgrestError, User } from '@supabase/supabase-js';
import BillRow from '~/components/Bills/bill-row';
import { Bill } from '~/lib/types/bills-types';
import { AddIcon } from '@chakra-ui/icons';
import { PATH } from '~/lib/constants/nav-constants';
import { sortByName } from '~/lib/helpers/general';

interface LoaderData {
  data: Bill[];
  error: PostgrestError | null;
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  // NOTE: getUserByRequestToken is required for each page that
  // requires the session/authorized user to access row level data
  const { user } = await getUserByRequestToken(request);
  console.log('user ID ====> ', user.id);
  if (!user) {
    throw redirect(PATH.LOGIN);
  }
  let { data, error } = await supabase.from('bills').select('*');
  return { data, error, user };
};

interface ViewBillProps {
  name: string;
}
const ViewBill: React.FC<ViewBillProps> = ({ name }) => {
  const { data: bills } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  const handleAddBill = () => {
    navigate(PATH.BILLS.ADD);
  };
  return (
    <Container maxW="860px" justifyContent="center">
      <Stack>
        <HStack p="4" justifyContent="space-between">
          <Heading color="cyan.600">View Bills</Heading>
          <IconButton
            colorScheme="cyan"
            color="cyan.50"
            rounded="full"
            aria-label="add-bill"
            icon={<AddIcon />}
            onClick={handleAddBill}
          />
        </HStack>
        <Accordion allowToggle px="4">
          {sortByName(bills).map((bill, i) => (
            <BillRow key={bill.id} isAlt={i % 2 === 0} bill={bill} />
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
};

export default ViewBill;
