import { ActionFunction, redirect } from 'remix';
import { supabase } from '../lib/supabase/supabase.server';
import { supabaseToken } from '../cookies';
import { getToken } from '../lib/auth';
import { PATH } from '~/lib/constants/nav-constants';

export const action: ActionFunction = async ({ request }) => {
  const token = await getToken(request);
  const { error } = await supabase.auth.api.signOut(token!);
  if (error) {
    return { error };
  }
  return redirect(PATH.LOGIN, {
    headers: {
      'Set-Cookie': await supabaseToken.serialize('', { maxAge: 0 }),
    },
  });
};
