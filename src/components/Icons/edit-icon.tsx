import * as React from "react";
import { ICON_STYLES } from "../../constants/iconStyles";
import { IconProps } from "../../types/svgTypes";

interface EditIconProps extends IconProps {
  className?: string;
  color?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}
const EditIcon: React.FC<EditIconProps> = ({
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
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

export default EditIcon;
