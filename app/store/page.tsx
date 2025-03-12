"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Store = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
    </div>
  );
};

export default Store;
