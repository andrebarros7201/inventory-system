"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  path: string;
};

const HeaderLink = ({ label, path }: Props) => {
  const currentPath = usePathname();
  return (
    <Link
      className={`box-border p-2 transition-all duration-200 ease-in-out border-2 border-transparent hover:border-white origin-bottom rounded 
  ${currentPath === path ? "border-b-2 border-b-white" : ""}`}
      href={path}
    >
      {label}
    </Link>
  );
};
export default HeaderLink;
