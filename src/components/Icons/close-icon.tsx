import * as React from "react";
import { ICON_STYLES } from "../../constants/iconStyles";
import { IconProps } from "../../types/svgTypes";

interface CloseIconProps extends IconProps {}
const CloseIcon: React.FC<CloseIconProps> = ({
  className = ICON_STYLES.defaultIconButtonStyles,
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default CloseIcon;
