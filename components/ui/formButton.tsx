import { FormEvent } from "react";

type Props = {
  label: string;
  color: string;
  bold?: boolean;
  onClick: (e: FormEvent) => void;
  type: "submit" | "reset" | "button" | undefined;
};

const FormButton = ({
  label,
  color,
  bold = false,
  onClick,
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-${color}-500 px-4 py-2 ${bold ? "font-bold" : ""} hover:bg-${color}-700 cursor-pointer transition duration-300 rounded`}
    >
      {label}
    </button>
  );
};

export default FormButton;
