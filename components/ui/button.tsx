import clsx from "clsx";
import Link from "next/link";

type Props = {
  link?: boolean;
  linkPath?: string;
  label: string;
  color: "red" | "green" | "blue" | "amber";
  bold?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({
  link = false,
  linkPath = "",
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
      className={clsx(
        "px-4 py-2 rounded transition duration-300 cursor-pointer",
        {
          "font-bold": bold,
          "bg-red-500 hover:bg-red-600": color === "red",
          "bg-blue-500 hover:bg-blue-600": color === "blue",
          "bg-green-500 hover:bg-green-600": color === "green",
          "bg-amber-500 hover:bg-amber-600": color === "amber",
        },
      )}
    >
      {!link ? (
        label
      ) : (
        <Link className={"w-full h-full"} href={linkPath}>
          {label}
        </Link>
      )}
    </button>
  );
};

export default Button;
