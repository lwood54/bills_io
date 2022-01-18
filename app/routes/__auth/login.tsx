import { ActionFunction, LoaderFunction, useTransition } from 'remix';
import { useActionData, MetaFunction, redirect } from 'remix';
import LoginForm from '~/components/LoginForm';
import { supabaseToken } from '../../cookies';
import { supabase } from '../../lib/supabase/supabase.server';

export let meta: MetaFunction = () => {
  return {
    title: 'Bills IO',
    description: 'Sign in or sign up.',
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();
  const { session, error } = await supabase.auth.signIn({ email, password });

  if (session) {
    supabase.auth.setAuth(session.access_token);
    return redirect('/profile', {
      headers: {
        'Set-Cookie': await supabaseToken.serialize(session.access_token, {
          expires: new Date(session?.expires_at!),
          maxAge: session.expires_in,
        }),
      },
    });
  }
  return { error };
};

const Login = () => {
  const actionData = useActionData();
  const { state } = useTransition();

  return (
    <LoginForm
      isLogin
      errorMessage={actionData?.error?.message}
      isSubmitting={state === 'submitting'}
    />
  );
};

export default Login;
