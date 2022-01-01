import * as React from "react";

type HeadingType = "h1" | "h2" | "h3" | "h4";
type ParagraphType = "b1" | "b2" | "b3" | "b4";

interface TextProps {
  as: HeadingType | ParagraphType;
  className?: string;
  textPosition?: "left" | "center" | "right" | "justify";
}

const HType = ["h1", "h2", "h3", "h4"];
const PType = ["b1", "b2", "b3", "b4"];

const Text: React.FC<TextProps> = ({
  as,
  children,
  className,
  textPosition = "center",
}) => {
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

  const TextComponent = isPType ? "p" : (as as HeadingType);
  return (
    <TextComponent
      className={`${getTextSize(as)} text-${textPosition} ${className}`}
    >
      {children}
    </TextComponent>
  );
};

export default Text;
