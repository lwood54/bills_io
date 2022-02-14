import * as React from "react";
import { Form } from "remix";
import FormInput from "../Base/form-input";

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
  return (
    <div className={`flex w-full items-center justify-center`}>
      <div className="card glass md:card-side h-3/4 p-2 overflow-auto text-neutral-content">
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
          <Form method="post" className="pb-4">
            <FormInput label="Email" type="email" name="email" />
            <FormInput label="Password" type="password" name="password" />
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
