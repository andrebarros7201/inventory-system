import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const withAuth = (Component: React.FC) => {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/");
      }
    }, [isLoggedIn, router]);

    if (!user) return null;

    return <Component {...props} />;
  };
};

export default withAuth;
