import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { PATH } from "../../constants/nav";

const BillsPage: React.FC = () => {
  const linkStyle = (isActive: boolean) => {
    const base = `bg-sky-200 border-b-4 border-b-sky-400 w-full text-center`;
    if (!isActive) {
      return base;
    }
    return `${base} border-b-sky-800`;
  };
  return (
    <div>
      <div className="w-full flex justify-between bg-sky-400">
        <NavLink
          className={({ isActive }) => linkStyle(isActive)}
          to={PATH.bills.VIEW}
        >
          View Bills
        </NavLink>
        <NavLink
          className={({ isActive }) => linkStyle(isActive)}
          to={PATH.bills.ADD}
        >
          Add Bill
        </NavLink>
        <NavLink
          className={({ isActive }) => linkStyle(isActive)}
          to={PATH.bills.EDIT}
        >
          Edit Bill
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default BillsPage;
