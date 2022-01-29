import { ActionFunction, redirect } from 'remix';
import { supabaseToken } from '~/cookies';
import { getToken, getUserByRequestToken } from '~/lib/auth';
import { PATH } from '~/lib/constants/nav-constants';
import { supabase } from '~/lib/supabase/supabase.server';

export const action: ActionFunction = async ({ request, params }) => {
  await getUserByRequestToken(request);
  const { error } = await supabase
    .from('bills')
    .delete()
    .eq('id', Number(params.billId));
  if (error) {
    return { error };
  }
  return redirect(PATH.BILLS.VIEW);
};
