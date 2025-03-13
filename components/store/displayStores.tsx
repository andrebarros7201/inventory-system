import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StoreActions } from "@/redux/slicers/storeSlice";
import DisplayStoresItem from "@/components/store/displayStoresItem";

const DisplayStores = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { stores } = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStores() {
      try {
        const response = await fetch(`/api/store?userID=${user!.userID}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error fetching stores");
        }

        const data = await response.json();
        console.log(data.stores);
        dispatch(StoreActions.addStore(data.stores));
      } catch (error) {
        console.error(error);
      }
    }

    loadStores();
  }, [dispatch, user]);

  return (
    <main className={"w-full flex flex-col gap-4 justify-start items-center"}>
      {stores.map((store, index) => (
        <DisplayStoresItem store={store} index={index + 1} key={index} />
      ))}
    </main>
  );
};

export default DisplayStores;
