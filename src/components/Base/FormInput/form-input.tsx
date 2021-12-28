import * as React from "react";

interface FormInputProps {
  customClass?: string;
  containerClass?: string;
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
  containerClass = "",
  customClass = "",
  id,
  isStacked = true,
  label,
  onChange,
  placeholder,
  scale = "m",
  type,
  value,
}) => {
  return (
    <div className={`${containerClass} w-96`}>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={(e) => onChange(e, id)}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`appearance-none w-full rounded-t py-3 px-4 leading-tight border border-b-4 border-b-teal-400 py-3 px-4 focus:outline-none focus:bg-teal-50 focus:border-teal-400 ${customClass}`}
        value={value}
      />
    </div>
  );
};

export default FormInput;
