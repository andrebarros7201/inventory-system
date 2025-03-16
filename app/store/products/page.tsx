"use client";
import withAuth from "@/utils/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/slicers/productSlice";
import AddProduct from "@/components/product/addProduct";
import DisplayProducts from "@/components/product/displayProducts";

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
      <div
        className={
          "w-full flex flex-col justify-start items-start gap-4 sm:flex-row sm:items-center"
        }
      >
        <h2 className={"font-bold text-3xl"}>Products</h2>
        <AddProduct />
      </div>
      <DisplayProducts />
    </main>
  );
};

export default withAuth(Products);
