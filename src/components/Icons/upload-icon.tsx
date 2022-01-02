import * as React from "react";
import { IconProps } from "../../types/svgTypes";

interface UploadIconProps extends IconProps {}
const UploadIcon: React.FC<UploadIconProps> = ({
  className = "h-6 w-6 hover:stroke-slate-400 active:stroke-sky-600 fill-transparent stroke-sky-100",
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
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

export default UploadIcon;
