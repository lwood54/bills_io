import * as React from "react";
import { Link } from "remix";
import { PATH } from "~/lib/constants/nav-constants";

const Welcome: React.FC = () => {
  return (
    <>
      <h1>Welcome to Bills IO!</h1>
      <p>Already confirmed your email?</p>
      <Link to={PATH.LOGIN}>Login</Link>
    </>
  );
};

export default Welcome;
