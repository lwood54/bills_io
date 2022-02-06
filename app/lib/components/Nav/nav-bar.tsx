import * as React from "react";
import { Link } from "remix";
import { PATH } from "~/lib/constants/nav-constants";
import MenuButton from "../Icons/menu-button";

interface NavBarProps {
  isLoggedIn: boolean;
  toggleMenuOpen: () => void;
}
const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, toggleMenuOpen }) => {
  return (
    <div className="navbar mb-2 bg-sky-600 text-sky-50 mb-0">
      <div className="px-2 mx-2 navbar-start">
        <MenuButton onClick={toggleMenuOpen} />
      </div>
      <div className="px-2 mx-2 navbar-center lg:flex">
        <div className="flex items-stretch">
          <h3 className="text-xl font-semibold">Bills IO</h3>
        </div>
      </div>
      <div className="navbar-end">
        <Link
          className="btn btn-ghost btn-sm rounded-sm"
          to={isLoggedIn ? PATH.SIGN_OUT : PATH.LOGIN}
        >
          {isLoggedIn ? "Sign Out" : "Login"}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
