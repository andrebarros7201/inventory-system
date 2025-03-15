import Button from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { fetchStores, StoreActions } from "@/redux/slicers/storeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";
import Form from "@/components/ui/form";
import Modal from "@/components/ui/modal";

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
    } finally {
      dispatch(fetchStores(user.userID));
    }
  }

  function handleSetOpenedStore() {
    dispatch(StoreActions.setChosenStore(store.storeID));
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
        <Button
          label={"Open"}
          color={"blue"}
          type={"button"}
          bold
          link={true}
          linkPath={"/store/products"}
          onClick={handleSetOpenedStore}
        />
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
        <Modal>
          <Form
            title={"Edit Store"}
            onSubmit={handleUpdate}
            hasCloseButton={true}
            closeFunction={() => setIsEditing(false)}
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
              Update Store
            </button>
          </Form>
        </Modal>
      )}
    </div>
  );
};
export default DisplayStoreItem;
