import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StoreActions } from "@/redux/slicers/storeSlice";

const DisplayStores = () => {
  const { user } = useSelector((state: RootState) => state.user);
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
    <main
      className={"w-full flex flex-col gap-4 justify-start items-center"}
    ></main>
  );
};

export default DisplayStores;
