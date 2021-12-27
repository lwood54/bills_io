import * as React from "react";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, style, type }) => {
  return (
    <button
      style={style}
      className="appearance-none block w-full bg-teal-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
