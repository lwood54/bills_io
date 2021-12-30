import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/nav";
import { useAuth } from "../../contexts/Auth";

export function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const { signUp } = useAuth();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const { error } = await signUp({ email, password });
      if (error) {
        throw Error(error);
      }
      navigate(PATH.HOME);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />

        <br />

        <button type="submit">Sign up</button>
        <p>
          Already have an account? <Link to={PATH.LOGIN}>Login</Link>
        </p>
      </form>
    </>
  );
}
