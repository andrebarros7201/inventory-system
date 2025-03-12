"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddStore from "@/components/store/addStore";

const Store = () => {
  const { stores } = useSelector((state: RootState) => state.store);
  return (
    <main
      className={"w-full flex flex-col gap-4 sm:p-4 justify-start items-start"}
    >
      <div className={"w-full flex gap-4 justify-start items-center"}>
        <h2 className={"font-bold text-3xl"}>
          {stores.length === 0
            ? "No Stores"
            : stores.length === 1
              ? "1 Store"
              : `${stores.length} Stores`}
        </h2>
        <AddStore />
      </div>
    </main>
  );
};

export default Store;
