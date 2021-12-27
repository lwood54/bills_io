import * as React from "react";

const Stack: React.FC = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

export default Stack;
