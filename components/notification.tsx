type Props = {
  type: string;
  message: string;
};
const Notification = ({ type, message }: Props) => {
  function handleClose() {}
  return (
    <div className={"w-full flex justify-center bg-transparent"}>
      <div
        className={`${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : ""} text-white p-4 flex items-center`}
      >
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Notification;
