"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import AddStore from "@/components/store/addStore";
import DisplayStores from "@/components/store/displayStores";
import withAuth from "@/utils/withAuth";
import { useEffect } from "react";
import { fetchStores } from "@/redux/slicers/storeSlice";

const Store = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { userStores, loading } = useSelector(
    (state: RootState) => state.store,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchStores(user.userID));
  }, [dispatch, user]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main
      className={
        "w-full flex flex-col gap-8 p-4 lg:px-0 justify-start items-start"
      }
    >
      <div
        className={
          "w-full flex flex-col gap-4 justify-start items-start sm:flex-row sm:items-center"
        }
      >
        <h2 className={"font-bold text-3xl"}>
          {userStores.length === 0
            ? "No Stores"
            : userStores.length === 1
              ? "1 Store"
              : `${userStores.length} Stores`}
        </h2>
        <AddStore />
      </div>
      <DisplayStores />
    </main>
  );
};

export default withAuth(Store);
