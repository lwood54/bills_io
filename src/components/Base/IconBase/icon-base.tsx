import * as React from "react";
import { IconProps } from "../../../types/svgTypes";

interface IconBaseProps extends IconProps {}
const IconBase: React.FC<IconBaseProps> = ({
  className,
  children,
  viewboxHeight = 24,
  viewboxWidth = 24,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
    onClick={onClick}
  >
    {children}
  </svg>
);

export default IconBase;
