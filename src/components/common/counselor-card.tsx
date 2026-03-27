import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  const getYear = (date?: string | null) => {
    if (!date) return "----";
    return date.slice(0, 4);
  };
  const birthYear = getYear(counselor.birth_date);
  const qualificationName =
    counselor.higher_qualification || counselor.qualification || "----";
  const qualificationYear = getYear(
    counselor.higher_qualification_date || counselor.qualification_date,
  );
  const appointedYear = counselor.appointed_year || "----";
  const experienceYears = counselor.experience_years ?? "----";
  const footerText =
    counselor.status === "current" ? counselor.tasks : "متقاعد";
  console.log(counselor);
  return (
    <div className="group relative flex flex-col bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 hover:border-main/30 dark:hover:border-main/50 shadow-xl hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex flex-col items-center gap-3 p-6 pb-4 min-h-[260px]">
        {/* Avatar */}
        <Avatar className="size-18 border-2 border-main/20 dark:border-main/40">
          <AvatarFallback className="text-2xl font-bold text-main bg-main/5 dark:bg-white/10">
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
          <span className="text-xs font-medium text-main bg-main/8 dark:bg-white/10 dark:border-white/20 border border-main/20 px-3 py-1 rounded-full text-center">
            {counselor.fields[0].field}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/20 to-transparent" />

      {/* Info list */}
      <ol className="flex flex-col gap-2 px-6 py-4 flex-1" dir="rtl">
        <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          {birthYear}
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          {qualificationYear}، {qualificationName}
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          {appointedYear}، مستشاراً بالمحكمة العليا
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-main/40 shrink-0" />
          {experienceYears} عاماً في العمل القضائي
        </li>
      </ol>

      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      {/* Tasks footer */}
      <div className="px-6 pb-5 border-black dark:border-transparent mt-auto min-h-[50px]">
        {footerText && (
          <p
            className="text-xs font-bold pt-2 text-black dark:text-white text-center leading-relaxed"
            dir="rtl"
          >
            {footerText}
          </p>
        )}
      </div>
    </div>
  );
}
