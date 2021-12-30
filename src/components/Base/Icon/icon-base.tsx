import * as React from "react";

interface IconBaseProps {
  className?: string;
  color?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}
const IconBase: React.FC<IconBaseProps> = ({
  className = "h-6 w-6",
  color = "#64748b",
  onClick,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      onClick={onClick}
    >
      {children}
    </svg>
  );
};

export default IconBase;
