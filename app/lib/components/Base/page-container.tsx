import * as React from "react";

interface PageContainerProps {
  hideGradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}
const PageContainer: React.FC<PageContainerProps> = ({
  children,
  gradientFrom,
  gradientTo,
  hideGradient,
}) => {
  const gradientRange = React.useCallback(() => {
    if (hideGradient) return "";
    return `from-${gradientFrom} to-${gradientTo}`;
  }, [gradientFrom, gradientTo, hideGradient]);

  return (
    <div
      style={{ height: "calc(100vh - 64px)" }}
      className={`flex bg-gradient-to-r ${gradientRange()} w-full justify-center items-center px-4 py-10 h-screen`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
