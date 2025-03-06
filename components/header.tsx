const Header = () => {
  return (
    <header className="w-full flex flex-row justify-center bg-blue-500 p-4">
      <div className="max-w-[1000px] w-full">
        <nav className={"flex items-center justify-start gap-4"}>
          <h2 className={"font-bold text-2xl h-full"}>Inventory System</h2>
          <ul className={"h-full flex items-center justify-start"}>
            <li>Login</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
