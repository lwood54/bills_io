import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/nav";
import { useAuth } from "../../contexts/Auth";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const { error, session, user } = await signIn({ email, password });
      console.log("session", session);
      console.log("user", user);
      if (error) {
        setMessage(error.message);
        setPassword("");
        setEmail("");
        throw Error(error);
      }
      navigate(PATH.DASHBOARD);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {message && <h2>{message}</h2>}
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

        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to={PATH.SIGNUP}>Sign Up</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
