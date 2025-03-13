import Button from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";

type Props = {
  store: { storeID: string; name: string; userID: string };
  index: number;
};

const DisplayStoreItem = ({ store, index }: Props) => {
  const dispatch = useDispatch();
  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/store?storeID=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete store");
      }

      dispatch(
        NotificationActions.createNotification({
          type: "success",
          message: "Store deleted",
        }),
      );
    } catch (error) {
      dispatch(
        NotificationActions.createNotification({
          type: "error",
          message: "Something went wrong",
        }),
      );
    }
  }

  return (
    <div
      className={
        "w-full flex gap-4 justify-between items-center bg-gray-700 px-4 py-2 rounded"
      }
    >
      <div className="flex gap-4 justify-start items-center">
        <p>{index}</p>
        <p>{store.name}</p>
      </div>
      <div className={"flex gap-4 items-center"}>
        <Button label={"Open"} color={"blue"} type={"button"} bold />
        <Button label={"Edit"} color={"amber"} type={"button"} bold />
        <Button
          label={"Delete"}
          color={"red"}
          type={"button"}
          onClick={() => handleDelete(store.storeID)}
          bold
        />
      </div>
    </div>
  );
};
export default DisplayStoreItem;
