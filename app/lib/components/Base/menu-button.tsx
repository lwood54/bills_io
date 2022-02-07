import * as React from "react";
import MenuIcon from "../Icons/menuIcon";

interface MenuButtonProps {
  onClick?: () => void;
}
const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return (
    <button className="btn btn-square btn-ghost" onClick={onClick}>
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
