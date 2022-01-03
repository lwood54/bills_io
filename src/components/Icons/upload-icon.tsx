import * as React from "react";
import {
  DEF_ICON_BUTTON,
  DEF_STROKE,
  ICON_STYLES,
} from "../../constants/iconStyles";
import { IconProps } from "../../types/svgTypes";
import IconBase from "../Base/IconBase/icon-base";

interface UploadIconProps extends IconProps {}

const UploadIcon: React.FC<UploadIconProps> = ({
  className = DEF_ICON_BUTTON.replace(DEF_STROKE, "stroke-sky-100"),
  ...rest
}) => (
  <IconBase {...{ className, ...rest }}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </IconBase>
);

export default UploadIcon;
