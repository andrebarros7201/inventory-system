"use client";
import withAuth from "@/utils/withAuth";

const Products = () => {
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
