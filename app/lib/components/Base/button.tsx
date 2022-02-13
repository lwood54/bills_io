import * as React from "react";

interface ButtonProps {
  isDisabled?: boolean;
  label: string;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({ isDisabled = false, label, type }) => {
  return (
    <div className="card-actions">
      <button
        className="btn glass rounded-sm"
        disabled={isDisabled}
        type={type}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
