import * as React from "react";
import IconBase from "../Base/Icon/icon-base";

interface CloseIconProps {
  className?: string;
  color?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}
const CloseIcon: React.FC<CloseIconProps> = (props) => (
  <IconBase {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </IconBase>
);

export default CloseIcon;
