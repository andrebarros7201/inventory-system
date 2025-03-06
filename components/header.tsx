import HeaderLink from "@/components/ui/header-link";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex flex-row justify-center bg-blue-500 p-4">
      <div className="max-w-[1000px] w-full">
        <nav className={"flex items-center justify-start gap-4"}>
          <Link href={"/"}>
            <h2 className={"font-bold text-2xl h-full"}>Inventory System</h2>
          </Link>
          <ul className={"h-full flex items-center justify-start"}>
            <HeaderLink label={"Log In"} path={"/login"} />
          </ul>
          <ul className={"h-full flex items-center justify-start"}>
            <HeaderLink label={"Sign up"} path={"/signup"} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
