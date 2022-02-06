import * as React from "react";

const S_MENU_ITEM =
  "bg-sky-400 text-sky-50 border-none w-full hover:bg-sky-600 hover:text-sky-50 btn rounded-sm";

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
      className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end p-2">
        <button
          className="btn btn-square btn-ghost hover:bg-sky-600 hover:text-sky-50"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul className="p-4 pr-0 m-0 overflow-y-auto w-60 rounded-box">
        <li>
          <a className={S_MENU_ITEM}>Menu Item</a>
        </li>
        <li>
          <a className={S_MENU_ITEM}>Menu Item</a>
        </li>
      </ul>
    </aside>
  );
};

export default NavMenu;
