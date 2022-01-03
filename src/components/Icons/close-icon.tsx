import * as React from "react";
import { DEF_ICON_BUTTON } from "../../constants/iconStyles";
import { IconProps } from "../../types/svgTypes";
import IconBase from "../Base/IconBase/icon-base";

interface CloseIconProps extends IconProps {}
const CloseIcon: React.FC<CloseIconProps> = ({
  className = DEF_ICON_BUTTON,
  ...rest
}) => (
  <IconBase {...{ className, ...rest }}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </IconBase>
);

export default CloseIcon;
