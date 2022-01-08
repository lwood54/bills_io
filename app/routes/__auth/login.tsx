import { ActionFunction, Form } from 'remix';
import { useActionData, MetaFunction, redirect, json } from 'remix';
import { supabaseToken } from '../../cookies';
import { supabase } from '../../lib/supabase/supabase.server';

export let meta: MetaFunction = () => {
  return {
    title: 'Bills IO',
    description: 'Sign in or sign up.',
  };
};

export let action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();
  const { session, error } = await supabase.auth.signIn({ email, password });
  console.log('session???', session);
  if (session) {
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

export default function Login() {
  const actionData = useActionData();
  return (
    <Form method="post">
      {actionData?.error && <h2>{actionData?.error?.message}</h2>}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
      </div>
      <button type="submit" title="Login">
        Login
      </button>
    </Form>
  );
}
