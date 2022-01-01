import * as React from "react";

interface ButtonProps {
  customClass?: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  customClass = "",
  label,
  onClick,
  type,
}) => {
  return (
    <button
      className={`appearance-none bg-teal-300 w-full rounded-t border-b-4 border-b-teal-400 hover:bg-teal-200 hover:border-b-teal-400 active:bg-sky-300 active:border-b-sky-600 ${customClass}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
