"use client";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";

type ArticleCardProps = {
  principle: Principle;
  index: number;
};

const FIELDS = [
  ["إداري", "الطعن الإداري", "#866300", "admin|administrative|الإداري|إدارية|القضاء الإداري|طعن إداري|الطعون الإدارية"],
  ["جنائي", "الطعن الجنائي", "#EE0000", "criminal|الجنائي|جنائية|القضاء الجنائي|طعن جنائي|الطعون الجنائية"],
  ["مدني", "الطعن المدني", "#F29000", "civil|المدني|مدنية|القضاء المدني|طعن مدني|الطعون المدنية"],
  ["أ. شخصية", "طعن الأحوال الشخصية", "#7C35B1", "personal|أ. الشخصية|أ الشخصية|أحوال شخصية|الأحوال الشخصية|طعن أ. الشخصية|الطعن في الأحوال الشخصية"],
  ["مجتمعة", "طعن الدوائر المجتمعة", "#5AAA65", "full court|الدوائر مجتمعة|الدوائر المجتمعة|دوائر مجتمعة"],
  ["دستوري", "الطعن الدستوري", "#2C6FD2", "constitutional|الدستوري|دستورية|القضاء الدستوري|طعن دستوري|الدائرة الدستورية"],
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
  const index = FIELDS.findIndex(([label, appeal, , aliases]) =>
    [label, appeal, ...aliases.split("|")].some((alias) => key(alias) === normalized),
  );
  if (index < 0) return null;
  return { entry: FIELDS[index], index };
}

/** Book-tab stack: shape stays 23mm; vertical position steps by type order. */
const RIBBON_STEP_MM = 6;
const RIBBON_BASE_TOP_MM = 70;

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

  const matched =
    field(principle.principle_type) ?? field(principle.ruling_type);
  const label = matched?.entry[0] ?? "مبدأ";
  const ink = matched?.entry[2] ?? "#F29000";
  const fieldIndex = matched?.index ?? 0;
  const ribbonTopMm = RIBBON_BASE_TOP_MM + fieldIndex * RIBBON_STEP_MM;
  const dividerSrc = `/assets/dividers/divider_${ink.replace("#", "").toUpperCase()}.png`;

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
    <div className="relative w-full overflow-visible" style={{ width: "210mm" }}>
      <div
        data-principle-ribbon
        className="pointer-events-none absolute z-10 grid h-[23mm] w-[20mm] place-items-center overflow-hidden text-white"
        style={
          {
            background: ink,
            left: 0,
            right: "auto",
            margin: 0,
            top: `${ribbonTopMm}mm`,
            "--ribbon-top": `${ribbonTopMm}mm`,
          } as CSSProperties
        }
        aria-hidden
      >
        <span
          className="whitespace-nowrap font-bold leading-none -rotate-90"
          style={{ fontSize: label.length > 6 ? "12pt" : "18pt" }}
        >
          {label}
        </span>
      </div>

      <div className="py-[8mm] pl-[26mm] pr-[20mm]">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="-mb-4 flex w-full items-center justify-between">
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
              <p
                dir="rtl"
                className="mt-5 text-xl font-bold"
                style={{ color: ink }}
              >
                {topMeta}
              </p>
              <p
                dir="ltr"
                className="mt-5 text-xl font-bold"
                style={{ color: ink }}
              >
                /{serialNumber}
              </p>
            </div>
            <span className="mt-5 text-xl font-bold" style={{ color: ink }}>
              :رقم المبدأ
            </span>
          </div>
          <p className="mt-3 w-full text-center text-sm font-medium text-black">
            {rulingType}: {headingMeta}
          </p>
          <p
            dir="rtl"
            className="mt-3 w-full text-center text-lg font-bold text-black"
          >
            جلسة: <span dir="ltr">{sessionDate}</span>
          </p>
          <p dir="rtl" className="mt-5 w-full text-justify font-adobe-arabic text-black">
            {brief}
          </p>
        </div>

        <div className="my-3 flex w-full items-center justify-center">
          <Image
            src={dividerSrc}
            alt="divider"
            width={140}
            height={28}
            loading="eager"
            unoptimized
            className="h-7 w-auto"
          />
        </div>

        <p dir="rtl" className="w-full text-justify font-adobe-arabic text-black">
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
                className="cursor-pointer text-center text-sm text-black hover:underline"
              >
                منشور على الموقع الإلكتروني للمحكمة العليا:
                <br /> www.alolya.gov.ly
              </Link>
            ) : hasPublicationPdf ? (
              <button
                type="button"
                onClick={handlePublicationPdfClick}
                className="cursor-pointer text-start text-sm text-black hover:underline"
              >
                {text}
              </button>
            ) : (
              <span className="text-sm text-black">
                {text}
              </span>
            );
          })()}
        </div>

        {principle.overturn && (
          <p className="pt-3 text-center text-sm font-medium text-red-600">
            {principle?.overturn_decision ? principle.overturn_decision : ""}
          </p>
        )}

        <div className="mt-4 flex w-full items-center justify-center">
          <Image
            src={dividerSrc}
            alt="divider"
            width={140}
            height={28}
            loading="eager"
            unoptimized
            className="h-7 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
