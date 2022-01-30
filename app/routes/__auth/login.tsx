import { ActionFunction, Form, useTransition } from "remix";
import { useActionData, MetaFunction, redirect } from "remix";
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
    <div className="flex bg-gradient-to-r from-cyan-500 to-blue-500 w-full justify-center items-center px-4 py-10 h-screen">
      <div className="card glass lg:card-side text-neutral-content">
        <div className="w-1/2">
          <figure className="p-6">
            <img src="/images/ud_login.svg" className="rounded-lg shadow-lg" />
          </figure>
        </div>
        <div className="w-lg card-body form-control">
          <h2 className="card-title">Login</h2>
          <Form method="post">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered rounded-sm border-sky-500 border-b-4 border-b-sky-700"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered rounded-sm border-sky-500 border-b-4 border-b-sky-700"
              />
            </div>
            <div className="card-actions">
              <button className="btn glass rounded-sm" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
