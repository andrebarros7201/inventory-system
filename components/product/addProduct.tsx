"use client";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/ui/form";
import FormButton from "@/components/ui/formButton";
import axios from "axios";
import { fetchProducts } from "@/redux/slicers/productSlice";

const AddStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);
  const { chosenStore } = useSelector((state: RootState) => state.store);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!chosenStore) return;

    if (
      !productNameRef.current?.value ||
      !productPriceRef.current?.value ||
      !productQuantityRef.current?.value
    ) {
      dispatch(
        NotificationActions.createNotification({
          type: "error",
          message: "All fields are required",
        }),
      );
    }

    try {
      const response = await axios.post("/api/product", {
        storeID: chosenStore,
        name: productNameRef.current?.value,
        price: Number(productPriceRef.current?.value),
        quantity: Number(productQuantityRef.current?.value),
      });

      const { notification } = response.data;

      dispatch(
        NotificationActions.createNotification({
          type: notification.type,
          message: notification.message,
        }),
      );

      dispatch(fetchProducts(chosenStore));
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <>
      <Button
        label={"Add New Product"}
        color={"blue"}
        onClick={() => setIsOpen(!isOpen)}
        bold={true}
      />

      {isOpen && (
        <Modal>
          <Form
            title={"Add New Product"}
            onSubmit={handleSubmit}
            hasCloseButton={true}
            closeFunction={() => setIsOpen(false)}
          >
            <Input
              label={"name"}
              id={"name"}
              type={"text"}
              required={true}
              min={3}
              ref={productNameRef}
            />{" "}
            <Input
              label={"price"}
              id={"price"}
              type={"number"}
              required={true}
              min={0.01}
              ref={productPriceRef}
            />{" "}
            <Input
              label={"quantity"}
              id={"quantity"}
              type={"number"}
              required={true}
              min={1}
              ref={productQuantityRef}
            />
            <FormButton
              label={"Create Product"}
              color={"blue"}
              onClick={handleSubmit}
              type={"submit"}
              bold={true}
            />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AddStore;
