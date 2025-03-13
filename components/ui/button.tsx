type Props = {
  label: string;
  color: string;
  bold?: boolean;
  onClick?: () => void;
  type: "submit" | "reset" | "button" | undefined;
};

const Button = ({
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

export default Button;
