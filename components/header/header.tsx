const Header = () => {
  return (
    <header className="w-full flex flex-row justify-center bg-blue-500 p-4">
      <div className="max-w-[1000px] w-full border-2 border-red-500">
        <nav className={"flex items-center gap-4 "}>
          <h2 className={"italic font-bold text-xl"}>Inventory System</h2>
          <ul>
            <li>Login</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
