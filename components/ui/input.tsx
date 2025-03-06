import { forwardRef } from "react";

type Props = {
  label: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  id: string;
  type: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder, required, min, max, id, type }, ref) => {
    return (
      <div className={"w-full flex flex-col gap-2"}>
        <label className={"capitalize"} htmlFor={id}>
          {label}
        </label>
        <input
          className={
            "w-full flex flex-col gap-4 text-lg border-1 border-blue-500 rounded p-2 bg-white text-blue-500 caret-blue-500 focus:outline-none focus:shadow"
          }
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
