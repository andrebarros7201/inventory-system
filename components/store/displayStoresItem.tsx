type Props = {
  store: { storeID: string; name: string; userID: string };
  index: number;
};

const DisplayStoresItem = ({ store, index }: Props) => {
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
        <button
          className={
            "px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-all duration-300 cursor-pointer"
          }
        >
          Open
        </button>
        <button
          className={
            "px-4 py-2 bg-amber-600 rounded  hover:bg-amber-700 transition-all duration-300 cursor-pointer"
          }
        >
          Edit
        </button>
        <button
          className={
            "px-4 py-2 bg-red-600 rounded  hover:bg-red-700 transition-all duration-300 cursor-pointer"
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default DisplayStoresItem;
