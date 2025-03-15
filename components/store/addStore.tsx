"use client";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { fetchStores } from "@/redux/slicers/storeSlice";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/ui/form";
import FormButton from "@/components/ui/formButton";

const AddStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const storeNameRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) {
      return;
    }
    try {
      const response = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify({
          userID: user!.userID,
          name: storeNameRef.current!.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to add store");
      }

      dispatch(
        NotificationActions.createNotification({
          type: "success",
          message: data.message,
        }),
      );
      setIsOpen(false);
      dispatch(fetchStores(user.userID));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Button
        label={"Add New Store"}
        color={"blue"}
        onClick={() => setIsOpen(!isOpen)}
        bold={true}
      />

      {isOpen && (
        <Modal>
          <Form
            title={"Add New Store"}
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
              ref={storeNameRef}
            />

            <FormButton
              label={"Create Store"}
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
