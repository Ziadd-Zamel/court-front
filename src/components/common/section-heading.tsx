type SectionHeadingProps = {
  title: string;
  count?: number | null;
  countLabel?: string;
  className?: string;
};

/** Tan section title with underline; optionally shows (الإجمالي: N). */
export default function SectionHeading({
  title,
  count,
  countLabel = "الأعمال",
  className = "",
}: SectionHeadingProps) {
  const hasCount = typeof count === "number" && Number.isFinite(count);

  return (
    <div className={`mb-10 text-right ${className}`.trim()}>
      <h3 className="text-2xl font-bold text-main">
        {title}
        {hasCount ? ` (${countLabel}: ${count})` : ""}
      </h3>
      <div className="mt-2 h-[2px] w-56 bg-main" />
    </div>
  );
}
