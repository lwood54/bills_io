import * as React from "react";
import NavBar from "./nav-bar";
import NavMenu from "./nav-menu";

interface NavProps {
  isLoggedIn: boolean;
}
const Nav: React.FC<NavProps> = ({ children, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <NavBar toggleMenuOpen={toggleMenu} isLoggedIn={isLoggedIn} />
      <NavMenu
        isLoggedIn={isLoggedIn}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
      <div
        className={`${
          isMenuOpen ? "visible" : "invisible"
        } fixed top-0 left-0 bg-slate-600/50 h-screen w-full`}
        onClick={toggleMenu}
      />
      {children}
    </>
  );
};

export default Nav;
