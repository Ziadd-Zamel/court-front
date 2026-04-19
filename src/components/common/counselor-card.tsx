import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  const getYear = (date?: string | null) => {
    if (!date) return "----";
    return date.slice(0, 4);
  };
  const birthYear = getYear(counselor.birth_date);
  const normalQualText = counselor.qualification?.trim();
  const higherQualText = counselor.higher_qualification?.trim();
  const normalQualLine =
    normalQualText &&
    `${getYear(counselor.qualification_date)}، ${normalQualText}`;
  const higherQualLine =
    higherQualText &&
    `${getYear(counselor.higher_qualification_date)}، ${higherQualText}`;
  const appointedYear = counselor.appointed_year || "----";
  const experienceYears = counselor.experience_years ?? "----";
  const footerText =
    counselor.status === "current" ? counselor.tasks : "متقاعد";
  return (
    <div className="group relative flex h-full min-h-0 min-w-0 flex-1 flex-col bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 hover:border-main/30 dark:hover:border-main/50 shadow-xl hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex shrink-0 flex-col items-center gap-3 p-6 pb-4 min-h-[260px]">
        {/* Avatar */}
        <Avatar className="size-18 border-2 border-main/20 dark:border-main/40">
          <AvatarFallback className="text-2xl font-bold text-main bg-main/5 dark:bg-white/10">
            {counselor.name.slice(0, 1)}
          </AvatarFallback>
          {counselor.image && <AvatarImage src={counselor.image} />}
        </Avatar>

        {/* Name */}
        <h3 className="text-center text-sm font-bold dark:text-white text-gray-900 leading-snug min-h-[40px] flex items-center">
          {counselor.name}
        </h3>

        {/* Main field badge */}
        {counselor.fields?.[0]?.field && (
          <span className="text-xs font-medium text-main bg-white dark:bg-white/10 border border-main/60 dark:border-white/20 shadow-sm px-3 py-1 rounded-full text-center">
            {counselor.fields[0].field}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mx-6 h-px shrink-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-white/20 to-transparent" />

      {/* Info list — flex-1 fills row height so cards align when one has fewer lines */}
      <ol
        className="flex min-h-0 flex-1 flex-col justify-start gap-2 px-6 py-4"
        dir="rtl"
      >
        <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
          <span className="size-1.5 shrink-0 rounded-full bg-main/40" />
          {birthYear}
        </li>
        {normalQualLine && (
          <li className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-white/70">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-main/40" />
            <span className="min-w-0 flex-1">{normalQualLine}</span>
          </li>
        )}
        {higherQualLine && (
          <li className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-white/70">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-main/40" />
            <span className="min-w-0 flex-1">{higherQualLine}</span>
          </li>
        )}
        <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
          <span className="size-1.5 shrink-0 rounded-full bg-main/40" />
          {appointedYear}، مستشاراً بالمحكمة العليا
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
          <span className="size-1.5 shrink-0 rounded-full bg-main/40" />
          {experienceYears} عاماً في العمل القضائي
        </li>
      </ol>

      <div className="mx-6 h-px shrink-0 bg-gradient-to-r from-transparent via-gray-800 dark:via-gray-400 to-transparent" />

      {/* Tasks footer */}
      <div className="mt-auto shrink-0 border-black px-6 pb-5 dark:border-transparent min-h-[50px]">
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
