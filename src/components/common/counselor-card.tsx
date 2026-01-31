import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "@radix-ui/react-select";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  return (
    <div
      className="border p-5 pt-10 flex flex-col gap-2 items-center shadow-sm"
      key={counselor.uuid}
    >
      <Avatar className="size-16">
        <AvatarFallback className="">
          <User />
        </AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-bold min-h-[65px]">{counselor.name}</h3>

      <div className="flex flex-col items-start text-start justify-center min-h-[100px]">
        <p className="text-sm text-gray-800">{counselor.birth_date}</p>
        <p className="text-sm text-gray-800">{counselor.qualification}</p>
        <p className="text-sm text-gray-800">
          {counselor.experience_years} عاماً في العمل القضائي
        </p>
        <p className="text-sm text-gray-800">
          {counselor.appointed_year} مستشاراً في المحكمة العليا في
        </p>
      </div>
      <Separator className="w-full h-px bg-gray-200 mt-3 mb-5" />
      <ul className="flex flex-col text-sm text-main text-center">
        <li>رئيس دائرة النقض المدني</li>
        <li>عضو دائرة النقض المدني</li>
        <li>عضو الدوائر مجتمعة</li>
      </ul>
    </div>
  );
}
