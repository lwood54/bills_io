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
    <div
      style={{ height: "calc(100vh - 64px)" }}
      className="flex justify-center w-full bg-gradient-to-r from-teal-600 to-sky-600 p-4"
    >
      <LoginForm
        isLoginPage={false}
        errorMessage={actionData?.error?.message}
        isSubmitting={state === "submitting"}
      />
    </div>
  );
};

export default SignUp;
