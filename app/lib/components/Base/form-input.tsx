import * as React from "react";
import { S_FORM } from "~/lib/constants/styles";

interface FormInputProps {
  customInputStyle?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  isColorInverted?: boolean;
  isDisabled?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  type: string;
}
const FormInput: React.FC<FormInputProps> = ({
  customInputStyle,
  defaultValue,
  icon,
  isColorInverted = false,
  isDisabled = false,
  label,
  name,
  placeholder,
  type,
}) => {
  return (
    <div className="form-control">
      <div className="flex items-center">
        <label className="label">
          <span
            className={`label-text ${
              isColorInverted ? "text-sky-800" : "text-neutral-content"
            }`}
          >
            {label}
          </span>
        </label>
        {icon && icon}
      </div>
      <input
        className={customInputStyle ?? S_FORM.INPUT}
        defaultValue={defaultValue}
        disabled={isDisabled}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default FormInput;
