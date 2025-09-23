/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import RtlInputField from "@/components/common/RtlInputField";
import RtlSelectField from "@/components/common/RtlSelectField";
import { useQueryState } from "nuqs";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface PageContentProps {
  caseData: CaseDataType | undefined;
  error: string | null;
}

export default function PageContent({ caseData, error }: PageContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Local state for form inputs
  const [appealNumber, setAppealNumber] = useState("");
  const [judicialYear, setJudicialYear] = useState("");
  const [appealType, setAppealType] = useState("");

  // URL state management with nuqs (only updated on search)
  const [urlAppealNumber, setUrlAppealNumber] = useQueryState("appealNumber", {
    defaultValue: "",
  });

  const [urlJudicialYear, setUrlJudicialYear] = useQueryState("judicialYear", {
    defaultValue: "",
  });

  const [urlAppealType, setUrlAppealType] = useQueryState("appealType", {
    defaultValue: "",
  });
  console.log(caseData);
  console.log(error);
  const appealTypeOptions = [
    "طعن أحوال شخصية",
    "طعن إداري",
    "طعن مدني",
    "طعن جنائي",
    "طعن دستوري",
    "الدوائر مجتمعة",
    "دعوى إدارية",
    "التماس إعادة النظر",
    "معارضة",
    "تنازع اختصاص",
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (appealNumber) {
      params.set("appealNumber", appealNumber);
    }

    if (judicialYear) {
      params.set("judicialYear", judicialYear);
    }

    if (appealType) {
      params.set("appealType", appealType);
    }

    const url = `${pathname}?${params.toString()}`;
    router.push(url, { scroll: false });
  };

  return (
    <div className="min-h-screen flex-1 py-6 pl-2 pr-2 md:pl-10 md:pr-10 lg:pr-20">
      <h2
        className="mb-4 mt-5 text-right font-zain text-3xl font-bold text-gray-800 sm:text-4xl"
        style={{ direction: "rtl" }}
      >
        البحث عن قضية:
      </h2>

      <hr className="mb-12 mt-2 border-orange-400" />

      <div className="space-y-4">
        {/* Appeal Number Input */}
        <RtlInputField
          label="رقم الطعن"
          value={appealNumber}
          onChange={(e) => setAppealNumber(e.target.value)}
          placeholder="أدخل الرقم فقط دون أي مسافة أو علامة أخرى. لا تدخل رقم السنة القضائية. مثال: 1234"
        />

        {/* Judicial Year Input */}
        <RtlInputField
          label="السنة القضائية"
          value={judicialYear}
          onChange={(e) => setJudicialYear(e.target.value)}
          placeholder="أدخل الرقم فقط دون أي مسافة أو علامة أخرى. مثال: 73"
        />

        {/* Appeal Type Select */}
        <RtlSelectField
          label="نوع الطعن"
          value={appealType}
          onChange={setAppealType}
          options={appealTypeOptions}
          placeholder="اختر نوع الطعن"
        />
      </div>

      {/* Search Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSearch}
          className="rounded-md bg-[#F3E5CA] px-8 py-0.5 text-xl font-semibold text-gray-800 hover:bg-[#E6C59A] sm:px-12 sm:py-1 lg:text-lg min-[1200px]:text-2xl"
        >
          بحث
        </button>
      </div>

      {/* Display Current Values */}
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h3 className="font-bold mb-2" style={{ direction: "rtl" }}>
          القيم الحالية:
        </h3>
        <p style={{ direction: "rtl" }}>رقم الطعن: {appealNumber}</p>
        <p style={{ direction: "rtl" }}>السنة القضائية: {judicialYear}</p>
        <p style={{ direction: "rtl" }}>نوع الطعن: {appealType}</p>
      </div>
    </div>
  );
}
