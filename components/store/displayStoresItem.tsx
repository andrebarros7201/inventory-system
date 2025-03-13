import Button from "@/components/ui/button";

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
        <Button label={"Open"} color={"blue"} type={"button"} bold />
        <Button label={"Edit"} color={"amber"} type={"button"} bold />
        <Button label={"Delete"} color={"red"} type={"button"} bold />
      </div>
    </div>
  );
};
export default DisplayStoresItem;
