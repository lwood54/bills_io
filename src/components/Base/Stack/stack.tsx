import * as React from "react";

interface StackProps {
  width?: "full" | "1/2" | "3/4";
}
const Stack: React.FC<StackProps> = ({ children, width = "full" }) => {
  // return <div className={`flex flex-col w-${width}`}>{children}</div>;
  return <div className={`flex flex-col`}>{children}</div>;
};

export default Stack;
