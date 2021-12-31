import * as React from "react";

interface TextProps {
  as: "h1" | "h2" | "h3" | "h4" | "b1" | "b2" | "b3" | "b4";
}

const HType = ["h1", "h2", "h3", "h4"];
const PType = ["b1", "b2", "b3", "b4"];

const Text: React.FC<TextProps> = ({ as, children }) => {
  const isPType = PType.includes(as);
  const isHType = HType.includes(as);

  if (!isPType && !isHType) {
    throw Error("provided prop does not match: h1,h2,h3,h4,b1,b2,b3,b4");
  }

  const getTextSize = (type: string) => {
    switch (type) {
      case "h1":
        return "text-4xl";
      case "h2":
        return "text-3xl";
      case "h3":
        return "text-2xl";
      case "h4":
        return "text-xl";
      case "b1":
        return "text-lg";
      case "b2":
        return "text-base";
      case "b3":
        return "text-s";
      case "b4":
        return "text-xs";
    }
  };

  const TextComponent = isPType ? "p" : (as as "h1" | "h2" | "h3" | "h4");
  return (
    <TextComponent className={`${getTextSize(as)}`}>{children}</TextComponent>
  );
};

export default Text;
