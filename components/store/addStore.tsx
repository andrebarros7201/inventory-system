"use client";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import Button from "@/components/ui/button";

const AddStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const storeNameRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
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
        <div
          onClick={() => setIsOpen(false)}
          className="h-dvw w-dvw fixed top-0 left-0 flex justify-center items-center bg-gray-700/70"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-gray-700 p-8 rounded shadow-lg top-10 fixed flex flex-col items-start justify-start gap-4"
          >
            <div className="flex items-center justify-between w-full">
              <h2 className={"font-bold text-2xl w-full text-start"}>
                Add Store
              </h2>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={"text-red-600 font-extrabold text-lg cursor-pointer"}
              >
                X
              </button>
            </div>
            <form
              className={"flex flex-col gap-8 items-start"}
              onSubmit={handleSubmit}
            >
              <Input
                label={"name"}
                id={"name"}
                type={"text"}
                required={true}
                min={3}
                ref={storeNameRef}
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
    </>
  );
};

export default AddStore;
