import * as React from "react";
import XIcon from "../Icons/xIcon";

interface CloseButtonProps {
  onClick: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      className="btn btn-sm btn-square btn-ghost hover:bg-sky-600 hover:text-sky-50"
      onClick={onClick}
    >
      <XIcon />
    </button>
  );
};

export default CloseButton;
