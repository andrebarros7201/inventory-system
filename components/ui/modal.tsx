import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Modal = ({ children }: Props) => {
  return (
    <div
      className={
        "w-screen h-screen bg-gray-700/70 flex items-center justify-center fixed top-0 left-0 overflow-hidden"
      }
    >
      {children}
    </div>
  );
};

export default Modal;
