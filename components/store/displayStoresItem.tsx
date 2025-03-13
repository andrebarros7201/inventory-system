import Button from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { fetchStores } from "@/redux/slicers/storeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";

type Props = {
  store: { storeID: string; name: string; userID: string };
  index: number;
};

const DisplayStoreItem = ({ store, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const newStoreNameRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  async function handleDelete(id: string) {
    try {
      if (!user) return;
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
      dispatch(fetchStores(user.userID));
    } catch (error) {
      console.error(error);
      dispatch(
        NotificationActions.createNotification({
          type: "error",
          message: "Something went wrong",
        }),
      );
    }
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    try {
      const response = await fetch(`/api/store`, {
        method: "PATCH",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          name: newStoreNameRef.current!.value,
          storeID: store.storeID,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not update store");
      }

      dispatch(fetchStores(user.userID));

      dispatch(
        NotificationActions.createNotification({
          type: "success",
          message: "Store updated",
        }),
      );
    } catch (error) {
      console.error(error);
      dispatch(
        NotificationActions.createNotification({
          type: "error",
          message: "Failed to update store",
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
        <Button
          label={"Edit"}
          color={"amber"}
          type={"button"}
          onClick={() => setIsEditing(!isEditing)}
          bold
        />
        <Button
          label={"Delete"}
          color={"red"}
          type={"button"}
          onClick={() => handleDelete(store.storeID)}
          bold
        />
      </div>
      {isEditing && (
        <div
          onClick={() => setIsEditing(false)}
          className="h-dvw w-dvw fixed top-0 left-0 flex justify-center items-center bg-gray-700/70"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-gray-700 p-8 rounded shadow-lg top-10 fixed flex flex-col items-start justify-start gap-4"
          >
            <div className="flex items-center justify-between w-full">
              <h2 className={"font-bold text-2xl w-full text-start"}>
                Update Store
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={"text-red-600 font-extrabold text-lg cursor-pointer"}
              >
                X
              </button>
            </div>
            <form
              className={"flex flex-col gap-8 items-start"}
              onSubmit={handleUpdate}
            >
              <Input
                label={"name"}
                id={"name"}
                type={"text"}
                required={true}
                min={3}
                ref={newStoreNameRef}
              />

              <button
                className={
                  "bg-blue-500 hover:bg-blue-600 rounded p-4 cursor-pointer transition-all duration-300"
                }
              >
                Add Store
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DisplayStoreItem;
