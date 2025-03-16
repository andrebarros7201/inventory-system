import Button from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";
import Form from "@/components/ui/form";
import Modal from "@/components/ui/modal";
import Product from "@/types/Product";
import axios from "axios";
import { fetchProducts } from "@/redux/slicers/productSlice";

type Props = {
  item: Product;
  index: number;
};

const DisplayStoreItem = ({ item, index }: Props) => {
  const { chosenStore } = useSelector((state: RootState) => state.store);
  const [isEditing, setIsEditing] = useState(false);
  const newProductNameRef = useRef<HTMLInputElement>(null);
  const newProductPriceRef = useRef<HTMLInputElement>(null);
  const newProductQuantityRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  async function handleDelete(id: string) {
    if (!id) return;

    try {
      const response = await axios.delete(`/api/product?productID=${id}`);

      const { notification } = response.data;

      dispatch(
        NotificationActions.createNotification({
          type: notification.type,
          message: notification.message,
        }),
      );
      dispatch(fetchProducts(chosenStore!));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => dispatch(NotificationActions.toggleVisible()), 5000);
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
        <p>{item.name}</p>
      </div>
      <div className={"flex gap-4 items-center"}>
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
          onClick={() => handleDelete(item.productID)}
          bold
        />
      </div>
      {/*isEditing && (
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
      )*/}
    </div>
  );
};
export default DisplayStoreItem;
