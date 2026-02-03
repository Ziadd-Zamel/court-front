import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "@radix-ui/react-select";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  return (
    <div
      className="border p-5 pt-5 flex flex-col gap-2 items-center shadow-sm max-w-[330px]"
      key={counselor.uuid}
    >
      <Avatar className="size-16">
        <AvatarFallback className="font-merriweather text-2xl font-bold text-main">
          {counselor.name.slice(0, 1)}
        </AvatarFallback>
        {counselor.image && <AvatarImage src={counselor.image} />}
      </Avatar>
      <h3 className="text-xs md:text-sm lg:text-base whitespace-nowrap font-bold min-h-[65px]">
        {counselor.name}
      </h3>

      <ol className=" min-h-[200px] -mt-5 space-y-[5px] self-start">
        <li className="text-sm text-gray-800">1970</li>
        <li className="text-sm text-gray-800">
          1992، {counselor.higher_qualification}
        </li>
        <li className="text-sm text-gray-800">
          {counselor.appointed_year || "3333"}، مستشاراً بالمحكمة العليا
        </li>
        <li className="text-sm text-gray-800">
          {counselor.experience_years} عاماً في العمل القضائي
        </li>
        <li className="text-base text-main font-semibold">
          {counselor.fields[0].field}
        </li>
      </ol>
      {counselor.tasks && (
        <>
          <Separator className="w-full h-0.5 bg-main mb-3" />
          <p className="text-base font-bold ">{counselor.tasks}</p>
        </>
      )}
    </div>
  );
}

// {counselor.birth_date}
