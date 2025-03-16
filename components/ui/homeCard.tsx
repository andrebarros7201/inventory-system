import Link from "next/link";
import Button from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonText: string;
};

export const HomeCard = ({
  title,
  description,
  image,
  imageAlt,
  buttonText,
}: Props) => {
  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow-md flex flex-col lg:flex-row items-center gap-6">
      <img
        src={image}
        alt={imageAlt}
        className="object-contain w-1/4 lg:w-1/3"
      />
      <div className="flex items-center justify-center lg:items-start flex-col gap-2 text-gray-800">
        <h4 className="text-lg lg:text-2xl font-bold">{title}</h4>
        <p className="text-gray-600">{description}</p>
        <Button
          label={buttonText}
          color={"blue"}
          bold={true}
          link={true}
          linkPath={"/signup"}
        />
      </div>
    </div>
  );
};
