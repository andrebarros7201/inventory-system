import User from "@/types/IUser";

export default interface IUserSlice {
  isLoggedIn: boolean;
  user: User | undefined;
}
