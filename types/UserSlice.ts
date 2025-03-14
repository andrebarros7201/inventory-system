import User from "@/types/User";

export default interface UserSlice {
  isLoggedIn: boolean;
  user: User | undefined;
  loading: boolean;
}
