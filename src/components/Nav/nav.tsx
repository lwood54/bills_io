import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/nav";
import { useAuth } from "../../contexts/Auth";
import useIsAuthorized from "../../hooks/use-isAuthorized";

const linkStyle = (isActive: boolean) => {
  const base = "w-24 p-1 text-center hover:bg-teal-300 cursor-pointer";
  if (isActive) {
    return `${base} hover:rounded-t-md border-b-2 border-teal-600`;
  }
  return `${base} hover:rounded-md active:bg-sky-300`;
};

const Nav: React.FC = () => {
  const { signOut, user } = useAuth();
  const isAuthorized = useIsAuthorized(user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        throw Error(error);
      }
      navigate(PATH.LOGIN);
    } catch (error) {
      console.log("error on logout", error);
    }
  };

  return (
    <div className="flex justify-between w-full p-2 bg-teal-400">
      <div className="flex gap-2">
        {isAuthorized && (
          <>
            <NavLink
              className={({ isActive }) => linkStyle(isActive)}
              to={PATH.HOME}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => linkStyle(isActive)}
              to={PATH.PROFILE}
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) => linkStyle(isActive)}
              to={PATH.bills.ROOT}
            >
              Bills
            </NavLink>
          </>
        )}
        {!isAuthorized && (
          <>
            <NavLink
              className={({ isActive }) => linkStyle(isActive)}
              to={PATH.SIGNUP}
            >
              Sign Up
            </NavLink>
            <NavLink
              className={({ isActive }) => linkStyle(isActive)}
              to={PATH.LOGIN}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
      {isAuthorized && (
        <button className={linkStyle(false)} onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Nav;
