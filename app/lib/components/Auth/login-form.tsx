import * as React from "react";
import { Form } from "remix";
import { S_FORM } from "~/lib/constants/styles";

interface LoginFormProps {
  errorMessage: string;
  isLoginPage: boolean;
  isSubmitting: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  errorMessage,
  isLoginPage,
  isSubmitting,
}) => {
  const transitionColors = isLoginPage
    ? "from-sky-600 to-teal-600"
    : "from-teal-600 to-sky-600";
  return (
    <div
      className={`flex bg-gradient-to-r ${transitionColors} w-full justify-center items-center px-4 py-10 h-screen`}
    >
      <div className="card glass lg:card-side text-neutral-content">
        <div className="w-1/2">
          <figure className="p-6">
            <img
              src={
                isLoginPage
                  ? "/images/ud_login.svg"
                  : "/images/ud_auth_check.svg"
              }
              className="rounded-lg shadow-lg"
            />
          </figure>
        </div>
        <div className="w-lg card-body form-control">
          <h2 className="card-title">{isLoginPage ? "Login" : "Sign Up"}</h2>
          {errorMessage && <h2>{errorMessage}</h2>}
          <Form method="post">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={S_FORM.INPUT}
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
                className={S_FORM.INPUT}
              />
            </div>
            <div className="card-actions">
              <button
                className="btn glass rounded-sm"
                disabled={isSubmitting}
                type="submit"
              >
                {isLoginPage ? "Login" : "Sign Up"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
