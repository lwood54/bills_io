import * as React from "react";

interface MenuCollapseProps {
  label: string;
}
const MenuCollapse: React.FC<MenuCollapseProps> = ({ children, label }) => {
  return (
    <div className="bg-sky-600 text-sky-50 collapse w-full border rounded-sm collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        <p>{label}</p>
      </div>
      <div className="collapse-content flex-column space-y-4">{children}</div>
    </div>
  );
};

export default MenuCollapse;
