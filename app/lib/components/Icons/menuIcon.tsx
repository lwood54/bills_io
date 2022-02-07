import * as React from "react";

interface MenuIconProps {
  customClass?: string;
  customDimensions?: string;
}
const MenuIcon: React.FC<MenuIconProps> = ({
  customClass,
  customDimensions = "h-6 w-6",
}) => {
  const custClass = customClass ?? `${customDimensions} stroke-sky-50`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={custClass}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default MenuIcon;
