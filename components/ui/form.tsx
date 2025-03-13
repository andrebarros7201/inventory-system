import { FormEvent, ReactNode } from "react";

const Form: React.FC<{
  title: string;
  hasCloseButton?: boolean;
  closeFunction?: () => void;
  onSubmit: (e: FormEvent) => void;
  children: ReactNode[];
}> = ({ title, onSubmit, hasCloseButton, closeFunction, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={
        "w-full max-w-md flex flex-col gap-4 p-4 items-start justify-start bg-gray-700 "
      }
    >
      {hasCloseButton ? (
        <div className="flex w-full items-center justify-between">
          <h2 className={"font-bold text-2xl w-full text-start"}>{title}</h2>
          <button
            className={"text-red-600 font-extrabold text-lg cursor-pointer"}
            onClick={closeFunction}
          >
            X
          </button>
        </div>
      ) : (
        <h2 className={"font-bold text-2xl w-full text-start"}>{title}</h2>
      )}

      {children}
    </form>
  );
};

export default Form;
