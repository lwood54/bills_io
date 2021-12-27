import * as React from "react";

const Inline: React.FC = ({ children }) => {
  return <div className="flex flex-row p-2 gap-2">{children}</div>;
};

export default Inline;
