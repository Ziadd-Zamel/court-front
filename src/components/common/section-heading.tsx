type SectionHeadingProps = {
  title: string;
  count?: number | null;
  className?: string;
};

/** Tan section title with underline; optionally shows (N). */
export default function SectionHeading({
  title,
  count,
  className = "",
}: SectionHeadingProps) {
  const hasCount = typeof count === "number" && Number.isFinite(count);

  return (
    <div className={`mb-10 text-right ${className}`.trim()}>
      <h3 className="text-2xl font-bold text-main">
        {title}
        {hasCount ? ` (${count})` : ""}
      </h3>
      <div className="mt-2 h-[2px] w-56 bg-main" />
    </div>
  );
}
