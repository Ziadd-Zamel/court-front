"use client";
import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  principle: Principle;
  index: number;
};

const FIELDS = [
  ["مدني", "الطعن المدني", "#F29000", "civil|المدني|مدنية|القضاء المدني|طعن مدني|الطعون المدنية"],
  ["إداري", "الطعن الإداري", "#866300", "admin|administrative|الإداري|إدارية|القضاء الإداري|طعن إداري|الطعون الإدارية"],
  ["دستوري", "الطعن الدستوري", "#2C6FD2", "constitutional|الدستوري|دستورية|القضاء الدستوري|طعن دستوري|الدائرة الدستورية"],
  ["جنائي", "الطعن الجنائي", "#EE0000", "criminal|الجنائي|جنائية|القضاء الجنائي|طعن جنائي|الطعون الجنائية"],
  ["أ. شخصية", "طعن الأحوال الشخصية", "#7C35B1", "personal|أ. الشخصية|أ الشخصية|أحوال شخصية|الأحوال الشخصية|طعن أ. الشخصية|الطعن في الأحوال الشخصية"],
  ["مجتمعة", "طعن الدوائر المجتمعة", "#5AAA65", "full court|الدوائر مجتمعة|الدوائر المجتمعة|دوائر مجتمعة"],
] as const;

const key = (v: unknown) =>
  String(v ?? "")
    .trim()
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u061c\u064b-\u065f\u0670\u200e\u200f\u202a-\u202e\u2066-\u2069ـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[._-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function field(value: unknown) {
  const normalized = key(value);
  return FIELDS.find(([label, appeal, , aliases]) =>
    [label, appeal, ...aliases.split("|")].some((alias) => key(alias) === normalized)
  );
}

export default function PrinciplePdfUI({ principle }: ArticleCardProps) {
  const firstPublication = principle.publications?.[0];
  const websiteUrl = principle.website_url?.trim() ?? "";
  const hasWebsiteUrl = Boolean(websiteUrl);
  const publicationPdfUrl =
    typeof firstPublication?.pdf_file === "string"
      ? firstPublication.pdf_file.trim()
      : "";
  const hasPublicationPdf = Boolean(publicationPdfUrl);
  const pdfPageForAnchor =
    firstPublication?.page_number ?? principle.page_number ?? 231;

  const normalize = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const text = String(value).trim();
    if (!text || text.toLowerCase() === "null") return "";
    return text;
  };

  const [label, , ink] =
    field(principle.principle_type) ??
    field(principle.ruling_type) ??
    ["مبدأ", "", "#d4a96a"];

  const serialNumber = normalize(principle.serial_number);
  const topMeta = [
    normalize(principle.gregorian_year),
    normalize(principle.principle_type),
  ]
    .filter(Boolean)
    .join(" ");

  const sessionDate = normalize(principle.session_date)
    ? normalize(principle.session_date)
        .split(" - ")
        .map((date) => date.split("-").reverse().join("-"))
        .join(" - ")
    : "";
  const rulingType = normalize(principle.ruling_type);
  const number = normalize(principle.number);
  const judicialYear = normalize(principle.judicial_year);
  const sign = normalize(principle.sign);
  const headingMeta =
    `${[judicialYear, number].filter(Boolean).join("/")}${sign}`.trim();
  const brief = normalize(principle.brief);

  const handlePublicationPdfClick = () => {
    if (!publicationPdfUrl) return;
    window.open(`${publicationPdfUrl}#page=${pdfPageForAnchor}`, "_blank");
  };

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-0 top-[105.69mm] z-10 grid h-[23mm] w-[20mm] place-items-center overflow-hidden text-white"
        style={{ background: ink }}
        aria-hidden
      >
        <span
          className="whitespace-nowrap font-bold leading-none -rotate-90"
          style={{ fontSize: label.length > 6 ? "12pt" : "18pt" }}
        >
          {label}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-between w-full -mb-4">
          <Image
            src={"/assets/principle-print/qr.png"}
            alt="Qr"
            width={100}
            height={150}
            loading="eager"
            unoptimized
          />
          <Image
            src={"/assets/principle-print/pdf-logo.png"}
            alt="Qr"
            width={180}
            height={0}
            loading="eager"
            unoptimized
          />
        </div>
        <Image
          src={"/assets/principle-print/basmala.jpeg"}
          alt="basmal"
          width={80}
          height={80}
          loading="eager"
          unoptimized
        />
        <Image
          src={"/assets/principle-print/pdf-principle.png"}
          alt="basmal"
          width={180}
          height={0}
          loading="eager"
          unoptimized
          className="mt-5"
        />
        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center">
            <p dir="rtl" className="text-xl font-bold mt-5" style={{ color: ink }}>
              {topMeta}
            </p>
            <p dir="ltr" className="text-xl font-bold mt-5" style={{ color: ink }}>
              /{serialNumber}
            </p>
          </div>
          <span className="text-xl font-bold mt-5" style={{ color: ink }}>
            :رقم المبدأ
          </span>
        </div>
        <div className="flex items-center gap-1 mt-5">
          <div className="w-10 h-[1px] bg-gray-300" />
          <Image
            src={"/assets/ShortLogoB.jpg"}
            alt="logo"
            width={30}
            height={30}
            loading="eager"
            unoptimized
          />
          <div className="w-10 h-[1px] bg-gray-300" />
        </div>
        <p className="text-xl w-full mt-5 font-bold text-center">
          {rulingType}: {headingMeta}
        </p>
        <p
          dir="rtl"
          className="text-lg w-full mt-5 text-[#d4a96a] font-bold text-center"
        >
          جلسة: <span dir="ltr">{sessionDate}</span>
        </p>
        <p dir="rtl" className=" text-justify w-full mt-5 font-adobe-arabic">
          {brief}
        </p>
      </div>

      <div className="flex items-center justify-center gap-1 my-3">
        <div className="w-10 h-[1px]" style={{ background: ink }} />
        <Image
          src={"/assets/ShortLogoB.jpg"}
          alt="logo"
          width={30}
          height={30}
          loading="eager"
          unoptimized
        />
        <div className="w-10 h-[1px]" style={{ background: ink }} />
      </div>

      <p dir="rtl" className="w-full text-justify font-adobe-arabic">
        {principle.content}
      </p>

      <div className="mt-4 flex w-full items-center justify-center">
        {(() => {
          const parts = [
            principle.appeal_year ? `السنة ${principle.appeal_year}` : null,
            principle.issue_number ? `العدد ${principle.issue_number}` : null,
            principle.page_number ? `ص ${principle.page_number}` : null,
          ].filter(Boolean);

          const text =
            parts.length > 0
              ? `مجلة المحكمة العليا: ${parts.join(" - ")}`
              : "مجلة المحكمة العليا";

          return hasWebsiteUrl ? (
            <Link
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-sm text-center text-[#d4a96a] hover:underline"
            >
              منشور على الموقع الإلكتروني للمحكمة العليا:
              <br /> www.alolya.gov.ly
            </Link>
          ) : hasPublicationPdf ? (
            <button
              type="button"
              onClick={handlePublicationPdfClick}
              className="cursor-pointer text-start text-sm text-[#d4a96a] hover:underline"
            >
              {text}
            </button>
          ) : (
            <span className="text-sm text-[#d4a96a] dark:text-white/70">
              {text}
            </span>
          );
        })()}
      </div>

      {principle.overturn && (
        <p className="text-sm text-red-600 font-medium pt-3 text-center">
          {principle?.overturn_decision ? principle.overturn_decision : ""}
        </p>
      )}

      <div className="flex items-center justify-center gap-1 mt-4">
        <div className="w-10 h-[1px]" style={{ background: ink }} />
        <Image
          src={"/assets/ShortLogoB.jpg"}
          alt="logo"
          width={30}
          height={30}
          loading="eager"
          unoptimized
        />
        <div className="w-10 h-[1px]" style={{ background: ink }} />
      </div>
    </div>
  );
}
