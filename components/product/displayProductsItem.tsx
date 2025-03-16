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

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();
    if (!chosenStore) return;

    if (
      !newProductNameRef.current?.value ||
      !newProductPriceRef.current?.value ||
      !newProductQuantityRef.current?.value
    ) {
      dispatch(
        NotificationActions.createNotification({
          type: "error",
          message: "Please fill out the field",
        }),
      );
    }

    try {
      const response = await axios.patch(`/api/product/`, {
        productID: item.productID,
        name: newProductNameRef.current!.value,
        price: newProductPriceRef.current!.value,
        quantity: newProductQuantityRef.current!.value,
      });

      const { notification } = response.data;
      dispatch(
        NotificationActions.createNotification({
          type: notification.type,
          message: notification.message,
        }),
      );
      dispatch(fetchProducts(chosenStore));
      setIsEditing(false);
    } catch (e) {
      console.log(e);
      dispatch(
        NotificationActions.createNotification({
          type: "error",
          message: "Failed to update product",
        }),
      );
    } finally {
      setTimeout(() => dispatch(NotificationActions.toggleVisible()), 5000);
    }
  }

  return (
    <div
      className={
        "w-full flex flex-col md:flex-row gap-4 justify-center sm:justify-between items-center bg-gray-700 px-4 py-2 rounded"
      }
    >
      <div className="md:w-full gap-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 py-4">
        <p>{index}</p>
        <p>{item.name}</p>
        <p>Price: {item.price} €</p>
        <p>Quantity: {item.quantity}</p>
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
      {isEditing && (
        <Modal>
          <Form
            title={"Edit Product"}
            onSubmit={(e) => handleUpdate(e)}
            hasCloseButton={true}
            closeFunction={() => setIsEditing(false)}
          >
            <Input
              label={"name"}
              id={"name"}
              type={"text"}
              required={true}
              min={3}
              ref={newProductNameRef}
            />

            <Input
              label={"price"}
              id={"price"}
              type={"number"}
              required={true}
              min={1}
              ref={newProductPriceRef}
            />

            <Input
              label={"quantity"}
              id={"quantity"}
              type={"number"}
              required={true}
              min={1}
              ref={newProductQuantityRef}
            />

            <button
              className={
                "bg-blue-500 hover:bg-blue-600 rounded p-4 cursor-pointer transition-all duration-300"
              }
            >
              Update Product
            </button>
          </Form>
        </Modal>
      )}
    </div>
  );
};
export default DisplayStoreItem;
