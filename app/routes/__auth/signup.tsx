import { ActionFunction, useTransition } from "remix";
import { useActionData, MetaFunction, redirect } from "remix";
import LoginForm from "~/lib/components/Auth/login-form";
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

  return (
    <LoginForm
      isLoginPage={false}
      errorMessage={actionData?.error?.message}
      isSubmitting={state === "submitting"}
    />
  );
};

export default SignUp;
