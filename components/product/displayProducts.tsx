import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slicers/productSlice";
import DisplayProductsItem from "@/components/product/displayProductsItem";
import Product from "@/types/Product";

const DisplayStores = () => {
  const { chosenStore } = useSelector((state: RootState) => state.store);
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!chosenStore) return;
    dispatch(fetchProducts(chosenStore));
  }, [chosenStore, dispatch]);

  return (
    <main className={"w-full flex flex-col gap-4 justify-start items-center"}>
      {products.map((item: Product, index) => (
        <DisplayProductsItem
          item={item}
          index={index + 1}
          key={item.productID}
        />
      ))}
    </main>
  );
};

export default DisplayStores;
