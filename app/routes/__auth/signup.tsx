import { ActionFunction, useTransition } from "remix";
import { useActionData, MetaFunction, redirect } from "remix";
import { supabase } from "../../lib/supabase/supabase.server";

export let meta: MetaFunction = () => {
  return {
    title: "Bills IO",
    description: "Sign up.",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (user) {
    return redirect("/welcome");
  }
  return { error };
};

const SignUp = () => {
  const actionData = useActionData();
  const { state } = useTransition();

  return <div>sign up page</div>;
};

export default SignUp;
