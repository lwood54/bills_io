import * as React from "react";
import { Form, Link, useLocation } from "remix";
import { PATH } from "~/lib/constants/nav-constants";
import MenuButton from "../Base/menu-button";

interface NavBarProps {
  isLoggedIn: boolean;
  toggleMenuOpen: () => void;
}
const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, toggleMenuOpen }) => {
  const isLoginPage = useLocation().pathname.includes("login");

  return (
    <div className="navbar mb-2 bg-cyan-900 text-cyan-50 mb-0">
      <div className="px-2 mx-2 navbar-start">
        <MenuButton onClick={toggleMenuOpen} />
      </div>
      <div className="px-2 mx-2 navbar-center lg:flex">
        <div className="flex items-stretch">
          <h3 className="text-xl font-semibold text-sky-50">Bills IO</h3>
        </div>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <Form method="post" action={PATH.SIGN_OUT}>
            <button className="btn btn-ghost rounded-sm" type="submit">
              Sign Out
            </button>
          </Form>
        ) : (
          <Link
            className="btn btn-ghost btn-sm rounded-sm"
            to={isLoginPage ? PATH.SIGN_UP : PATH.LOGIN}
          >
            {isLoginPage ? "Sign Up" : "Login"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
