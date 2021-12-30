import * as React from "react";

interface FormInputProps {
  customClass?: string;
  containerClass?: string;
  defaultValue?: string | number;
  error?: string;
  id?: string;
  label: string;
  placeholder?: string;
}
const FormInput: React.FC<FormInputProps> = React.forwardRef(
  (
    {
      containerClass = "",
      customClass = "",
      defaultValue,
      error,
      id,
      label,
      placeholder,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`${containerClass} w-96`}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          defaultValue={defaultValue}
          id={id}
          placeholder={placeholder}
          className={`${
            error
              ? "border border-red-600 rounded"
              : "border border-b-4 border-b-teal-400"
          } appearance-none w-full rounded-t py-3 px-4 leading-tight py-3 px-4 focus:outline-none focus:bg-teal-50 focus:border-teal-400 ${customClass}`}
          {...rest}
        />
        {error && <p className="text-red-600 text-xs">{error}</p>}
      </div>
    );
  }
);

export default FormInput;
