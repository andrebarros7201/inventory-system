"use client";
import { useDispatch, useSelector } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { RootState } from "@/redux/store";

const Notification = () => {
  const {
    isVisible,
    notification: { type, message },
  } = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(NotificationActions.toggleVisible());
  }

  return (
    isVisible && (
      <div
        className={`${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : ""} text-xl text-white flex items-center rounded p-4 fixed top-6 gap-8 shadow-black shadow-2xl z-20`}
      >
        <p className={"font-bold"}>{message}</p>
        <button className={"cursor-pointer"} onClick={handleClose}>
          X
        </button>
      </div>
    )
  );
};

export default Notification;
