import { ActionFunction, Form, useTransition } from "remix";
import { useActionData, MetaFunction, redirect } from "remix";
import LoginForm from "~/lib/components/Auth/login-form";
import { S_FORM } from "~/lib/constants/styles";
import { supabaseToken } from "../../cookies";
import { supabase } from "../../lib/supabase/supabase.server";

export let meta: MetaFunction = () => {
  return {
    title: "Bills IO",
    description: "Sign in or sign up.",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();
  const { session, error } = await supabase.auth.signIn({ email, password });

  if (session) {
    supabase.auth.setAuth(session.access_token);
    return redirect("/profile", {
      headers: {
        "Set-Cookie": await supabaseToken.serialize(session.access_token, {
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
  console.log("action.error", actionData?.error);
  const { state } = useTransition();

  return (
    <div
      style={{ height: "calc(100vh - 64px)" }}
      className="flex justify-center w-full bg-gradient-to-r from-sky-600 to-teal-600 p-4"
    >
      <LoginForm
        isLoginPage
        errorMessage={actionData?.error?.message}
        isSubmitting={state === "submitting"}
      />
    </div>
  );
};

export default Login;
