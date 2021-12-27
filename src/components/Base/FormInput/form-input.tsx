import * as React from "react";
import Inline from "../Inline/inline";
import Stack from "../Stack/stack";

interface FormInputProps {
  id: string;
  isStacked?: boolean;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  placeholder?: string;
  scale?: "s" | "m" | "l" | "xl";
  type: string;
  value: string | number;
}
const FormInput: React.FC<FormInputProps> = ({
  id,
  isStacked = true,
  label,
  onChange,
  placeholder,
  scale = "m",
  type,
  value,
}) => {
  const renderInputGroup = React.useMemo(() => {
    const getMargin = () => {
      switch (scale) {
        case "s":
          return "mb-1";
        case "m":
          return "mb-2";
        case "l":
          return "mb-4";
        case "xl":
          return "mb-6";
      }
    };
    return (
      <div className={getMargin()}>
        <label htmlFor={id}>{label}</label>
        <input
          onChange={(e) => onChange(e, id)}
          type={type}
          id={id}
          placeholder={placeholder}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={value}
        />
      </div>
    );
  }, [label, id, type, placeholder, value]);
  return (
    <>
      {isStacked ? (
        <Stack>{renderInputGroup}</Stack>
      ) : (
        <Inline>{renderInputGroup}</Inline>
      )}
    </>
  );
};

export default FormInput;
