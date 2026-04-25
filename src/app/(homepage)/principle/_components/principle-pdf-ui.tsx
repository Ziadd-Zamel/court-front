"use client";
import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  principle: Principle;
  index: number;
};

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
    <>
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
          src={"/assets/principle-print/basmal.jpeg"}
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
        <div className="flex items-center">
          <p dir="rtl" className="text-xl font-bold mt-5 text-[#d4a96a]">
            {topMeta}
          </p>
          <p dir="ltr" className="text-xl font-bold mt-5 text-[#d4a96a]">
            /{serialNumber}
          </p>
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
              className="cursor-pointer text-sm text-[#d4a96a] hover:underline"
            >
              {text}
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
    </>
  );
}
