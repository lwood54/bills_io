import * as React from "react";
import IconBase from "../Base/Icon/icon-base";

interface EditIconProps {
  className?: string;
  color?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}
const EditIcon: React.FC<EditIconProps> = (props) => (
  <IconBase {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </IconBase>
);

export default EditIcon;
