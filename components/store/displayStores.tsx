import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import DisplayStoreItem from "@/components/store/displayStoresItem";
import Store from "@/types/Store";

const DisplayStores = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { userStores, loading, error } = useSelector(
    (state: RootState) => state.store,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) return;
    //dispatch(fetchStores(user.userID));
  }, [user, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={"w-full flex flex-col gap-4 justify-start items-center"}>
      {userStores.map((store: Store, index) => (
        <DisplayStoreItem store={store} index={index + 1} key={store.storeID} />
      ))}
    </main>
  );
};

export default DisplayStores;
