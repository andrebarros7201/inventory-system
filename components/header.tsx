"use client";
import HeaderLink from "@/components/ui/header-link";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UserActions } from "@/redux/slicers/userSlice";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  function handleLogOut() {
    router.push("/");
    dispatch(UserActions.logOut());
    dispatch(
      NotificationActions.createNotification({
        type: "success",
        message: "Logged out",
      }),
    );
  }
  return (
    <header className="w-full flex flex-row justify-center bg-blue-500 p-4">
      <div className="max-w-[1000px] w-full">
        <nav className={"flex items-center justify-start gap-4"}>
          <Link href={"/"}>
            <h2 className={"font-bold text-2xl h-full"}>Inventory System</h2>
          </Link>
          <ul className={"h-full flex items-center justify-start"}>
            {!isLoggedIn ? (
              <>
                <li>
                  <HeaderLink label={"Log In"} path={"/login"} />
                </li>
                <li>
                  <HeaderLink label={"Sign up"} path={"/signup"} />
                </li>
              </>
            ) : (
              <li>
                <button className={"cursor-pointer"} onClick={handleLogOut}>
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
