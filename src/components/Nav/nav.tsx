import * as React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../constants/nav";
import { useAuth } from "../../contexts/Auth";
import useIsAuthorized from "../../hooks/use-isAuthorized";

const linkStyle = (isActive: boolean) => {
  const base =
    "w-24 p-1 text-center hover:bg-emerald-300 hover:rounded-md cursor-pointer";
  if (isActive) return `${base} border-b-2 border-emerald-600`;
  return base;
};

const Nav: React.FC = () => {
  const { user } = useAuth();
  const isAuthorized = useIsAuthorized(user);
  return (
    <div className="flex w-100 p-2 bg-emerald-400 gap-2">
      {isAuthorized && (
        <NavLink
          className={({ isActive }) => linkStyle(isActive)}
          to={PATH.DASHBOARD}
        >
          Dashboard
        </NavLink>
      )}
      {!isAuthorized ? (
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
      ) : (
        <NavLink
          className={({ isActive }) => linkStyle(isActive)}
          to={PATH.LOGOUT}
        >
          Logout
        </NavLink>
      )}
    </div>
  );
};

export default Nav;
