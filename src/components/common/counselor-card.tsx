import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 hover:border-main/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex flex-col items-center gap-3 p-6 pb-4 min-h-[260px]">
        {/* Avatar */}
        <Avatar className="size-18 border-2 border-main/20">
          <AvatarFallback className="text-2xl font-bold text-main bg-main/5">
            {counselor.name.slice(0, 1)}
          </AvatarFallback>
          {counselor.image && <AvatarImage src={counselor.image} />}
        </Avatar>

        {/* Name */}
        <h3 className="text-center text-sm font-bold text-gray-900 leading-snug min-h-[40px] flex items-center">
          {counselor.name}
        </h3>

        {/* Main field badge */}
        {counselor.fields?.[0]?.field && (
          <span className="text-xs font-medium text-main bg-main/8 border border-main/20 px-3 py-1 rounded-full text-center">
            {counselor.fields[0].field}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Info list */}
      <ol className="flex flex-col gap-2 px-6 py-4 flex-1" dir="rtl">
        <li className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          1970
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          1992، {counselor.higher_qualification}
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          {counselor.appointed_year || "3333"}، مستشاراً بالمحكمة العليا
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          {counselor.experience_years} عاماً في العمل القضائي
        </li>
      </ol>

      {/* Tasks footer */}
      <div className="px-6 pb-5 border-gray-100 mt-auto min-h-[50px]">
        {counselor.tasks && (
          <p
            className="text-xs font-semibold pt-1 border-t text-main text-center leading-relaxed"
            dir="rtl"
          >
            {counselor.tasks}
          </p>
        )}
      </div>
    </div>
  );
}
