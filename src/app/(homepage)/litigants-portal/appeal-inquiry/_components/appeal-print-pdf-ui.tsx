import PrinciplePrintHeader from "@/components/common/principle-print-header";
import Image from "next/image";
import MainTable from "./Main-Table";

type Props = {
  caseData: CaseDataType[];
};

function normalize(value: unknown) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim();
  if (!text || text.toLowerCase() === "null") return "";
  return text;
}

export default function AppealPrintPdfUI({ caseData }: Props) {
  const caseItem = caseData[0];

  const judicialYear = normalize(caseItem?.year);
  const number = normalize(caseItem?.rippId);
  const sign = "ق";
  const appealMeta =
    `${[judicialYear, number].filter(Boolean).join("/")}${sign}`.trim();
  const subtitle = caseItem
    ? `${normalize(caseItem.classname)}: ${appealMeta}`
    : "";

  return (
    <div
      dir="rtl"
      className="w-full bg-white text-black print:bg-white print:text-black"
    >
      <PrinciplePrintHeader title="الاستعلام عن الطعون" subtitle={subtitle} />
      <div className="mt-4 w-full">
        <MainTable caseData={caseData} error={null} compact />
      </div>

      <div className="mt-6 flex w-full items-center justify-center gap-2">
        <div className="h-px w-14 bg-gray-300" />
        <Image
          src="/assets/ShortLogoB.jpg"
          alt="logo"
          width={36}
          height={36}
          loading="eager"
          unoptimized
        />
        <div className="h-px w-14 bg-gray-300" />
      </div>
    </div>
  );
}
