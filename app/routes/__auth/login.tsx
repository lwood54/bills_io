import { ActionFunction, Form, useTransition } from 'remix';
import { useActionData, MetaFunction, redirect, json } from 'remix';
import { supabaseToken } from '../../cookies';
import { supabase } from '../../lib/supabase/supabase.server';
import { Button, Container, Input, Stack, Text, theme } from '@chakra-ui/react';

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
  const { state } = useTransition();

  return (
    <Form method="post">
      <Container>
        <Stack p="4">
          {actionData?.error && <h2>{actionData?.error?.message}</h2>}

          <div>
            <Text fontSize="2xl">Email</Text>
            <Input
              focusBorderColor="brand.secondary"
              id="email"
              name="email"
              type="email"
              required
              size="lg"
            />
          </div>
          <div>
            <Text fontSize="2xl">Password</Text>
            <Input
              focusBorderColor="brand.secondary"
              id="password"
              name="password"
              type="password"
              required
              size="lg"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            colorScheme="teal"
            disabled={state === 'submitting'}
            isLoading={state === 'submitting'}
            spinnerPlacement="start"
          >
            Login
          </Button>
        </Stack>
      </Container>
    </Form>
  );
}
