import { HomeCard } from "@/components/ui/homeCard";

export default function Home() {
  return (
    <main
      className={
        "flex-1 w-full flex flex-col items-center justify-start gap-6 py-6"
      }
    >
      <header className={"w-full flex items-center justify-center"}>
        <h2 className={"italic font-bold text-3xl"}>Inventory System</h2>
      </header>
      <div className={"flex flex-col sm:grid grid-cols-2 gap-4"}>
        <HomeCard
          title={"Manage Stores"}
          description={"Create, Edit and Manage your stores"}
          image={"/store.svg"}
          imageAlt={"image of a store"}
          buttonText={"Start Now"}
        />
        <HomeCard
          title={"Manage Stores Item"}
          description={"Create, Edit and Manage your items"}
          image={"/fruit-pear.svg"}
          imageAlt={"image of a pear"}
          buttonText={"Start Now"}
        />
      </div>
    </main>
  );
}
