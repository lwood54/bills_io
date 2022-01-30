import * as React from "react";

import { LoaderFunction, redirect, useLoaderData, useNavigate } from "remix";
import { supabase } from "~/lib/supabase/supabase.server";
import { getUserByRequestToken } from "~/lib/auth";
import { PostgrestError, User } from "@supabase/supabase-js";
import { Bill } from "~/lib/types/bills-types";
import { PATH } from "~/lib/constants/nav-constants";
import { sortByName } from "~/lib/helpers/general";

interface LoaderData {
  data: Bill[];
  error: PostgrestError | null;
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  // NOTE: getUserByRequestToken is required for each page that
  // requires the session/authorized user to access row level data
  const { user } = await getUserByRequestToken(request);

  if (!user) {
    throw redirect(PATH.LOGIN);
  }
  let { data, error } = await supabase.from("bills").select("*");
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
    <div
      className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200 h-screen"
      style={{
        backgroundImage: "url('images/financial_bg.jpeg')",
      }}
    >
      <div className="card glass xl:card-side text-neutral-content">
        <figure className="p-6">
          <img
            src="images/ud_person_finance.svg"
            // src="https://picsum.photos/id/1005/300/200"
            className="rounded-lg shadow-lg"
          />
        </figure>
        <div className="max-w-md card-body">
          <h2 className="card-title">Glass</h2>
          <p>
            Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
            sit necessitatibus veritatis sed molestiae voluptates incidunt iure
            sapiente.
          </p>
          <div className="card-actions">
            <button className="btn glass rounded-full">Get Started</button>
          </div>
        </div>
      </div>
    </div>
    // <Container maxW="860px" justifyContent="center">
    //   <Stack>
    //     <HStack p="4" justifyContent="space-between">
    //       <Heading color="cyan.600">View Bills</Heading>
    //       <IconButton
    //         colorScheme="cyan"
    //         color="cyan.50"
    //         rounded="full"
    //         aria-label="add-bill"
    //         icon={<AddIcon />}
    //         onClick={handleAddBill}
    //       />
    //     </HStack>
    //     <Accordion allowToggle px="4">
    //       {sortByName(bills).map((bill, i) => (
    //         <BillRow key={bill.id} isAlt={i % 2 === 0} bill={bill} />
    //       ))}
    //     </Accordion>
    //   </Stack>
    // </Container>
  );
};

export default ViewBill;
