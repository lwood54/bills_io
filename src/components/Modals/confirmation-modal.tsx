import * as React from "react";

const ConfirmationModal: React.FC<{ confirmationMessage: string }> = ({
  confirmationMessage,
}) => {
  return (
    <div className="h-full w-full bg-black flex just-center align-center">
      <h1>{confirmationMessage}</h1>
    </div>
  );
};

export default ConfirmationModal;
