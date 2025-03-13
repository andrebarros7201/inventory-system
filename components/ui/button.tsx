type Props = {
  label: string;
  color: string;
  bold?: boolean;
  onClick: () => void;
};

const Button = ({ label, color, bold, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-500 px-4 py-2 ${bold ? "font-bold" : ""} hover:bg-${color}-700 cursor-pointer transition duration-300 rounded`}
    >
      {label}
    </button>
  );
};

export default Button;
