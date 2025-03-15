"use client";
import withAuth from "@/utils/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/slicers/productSlice";

const Products = () => {
  const { chosenStore } = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (chosenStore) dispatch(fetchProducts(chosenStore));
  }, [chosenStore, dispatch]);
  return (
    <main
      className={
        "w-full flex flex-col items-start justify-start gap-8 p-4 lg:px-0 "
      }
    >
      <div className={"w-full flex justify-start items-center gap-4 "}>
        <h2 className={"font-bold text-3xl"}>Products</h2>
      </div>
    </main>
  );
};

export default withAuth(Products);
