import * as React from "react";
import IconBase from "../Base/Icon/icon-base";

interface UploadIconProps {
  className?: string;
  color?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}
const UploadIcon: React.FC<UploadIconProps> = (props) => (
  <IconBase {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </IconBase>
);

export default UploadIcon;
