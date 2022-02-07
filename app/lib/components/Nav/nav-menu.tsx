import * as React from "react";
import { Link } from "remix";
import { PATH } from "~/lib/constants/nav-constants";
import { S_NAV } from "~/lib/constants/styles";
import CloseButton from "../Base/close-button";
import MenuCollapse from "../Base/menu-collapse";

// const S_NAV.MENU_ITEM =
//   "bg-sky-400 text-sky-50 border-none w-full hover:bg-sky-50 hover:text-sky-600 btn rounded-sm";

interface NavMenuProps {
  isMenuOpen: boolean;
  isLoggedIn: boolean;
  toggleMenu: () => void;
}
const NavMenu: React.FC<NavMenuProps> = ({
  isLoggedIn,
  isMenuOpen = false,
  toggleMenu,
}) => {
  return (
    <aside
      className={`transform top-0 left-0 w-80 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end p-2">
        <CloseButton onClick={toggleMenu} />
      </div>
      <ul className="flex-column space-y-4 p-4 pr-0 mr-4 overflow-y-auto rounded-box">
        <MenuCollapse label="User">
          <Link
            to={PATH.PROFILE.VIEW}
            className={S_NAV.MENU_ITEM}
            onClick={toggleMenu}
          >
            Profile
          </Link>
        </MenuCollapse>
        <MenuCollapse label="Bills">
          <Link
            to={PATH.BILLS.ADD}
            className={S_NAV.MENU_ITEM}
            onClick={toggleMenu}
          >
            Add
          </Link>
          <Link
            to={PATH.BILLS.VIEW}
            className={S_NAV.MENU_ITEM}
            onClick={toggleMenu}
          >
            View
          </Link>
        </MenuCollapse>
      </ul>
    </aside>
  );
};

export default NavMenu;
