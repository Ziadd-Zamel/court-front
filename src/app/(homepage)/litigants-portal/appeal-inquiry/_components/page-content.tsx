"use client";
import RtlInputField from "@/components/common/RtlInputField";
import RtlSelectField from "@/components/common/RtlSelectField";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MainTable from "./Main-Table";
import { useQuery } from "@tanstack/react-query";
import { getClassificationsData } from "@/lib/api/classifications.apy";
import { getCaseData } from "@/lib/api/case.api";
import NoSearchResults from "@/components/custom/no-result";

export interface PageContentProps {
  showstates: boolean;
  setShowstates: (v: boolean) => void;
}

export default function PageContent({ setShowstates }: PageContentProps) {
  // Local state for form inputs
  const [appealNumber, setAppealNumber] = useState("");
  const [judicialYear, setJudicialYear] = useState("");
  const [appealTypeId, setAppealTypeId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // URL state management with nuqs
  const [urlAppealNumber, setUrlAppealNumber] = useQueryState("appealNumber", {
    defaultValue: "",
  });

  const [urlJudicialYear, setUrlJudicialYear] = useQueryState("judicialYear", {
    defaultValue: "",
  });

  const [urlAppealType, setUrlAppealType] = useQueryState("appealType", {
    defaultValue: "",
  });

  // React Query for classifications
  const { data: classificationsData, error: classificationsError } = useQuery({
    queryKey: ["classifications"],
    queryFn: getClassificationsData,
    staleTime: 30 * 60 * 1000,
  });

  const {
    data: caseData,
    error: caseError,
    isLoading: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["caseData", urlAppealNumber, urlJudicialYear, urlAppealType],
    queryFn: () => getCaseData(urlAppealNumber, urlJudicialYear, urlAppealType),
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  const isSearchDisabled =
    !appealNumber.trim() || !judicialYear.trim() || !appealTypeId.trim();

  const handleSearch = async () => {
    if (isSearchDisabled) return;

    setHasSearched(true);
    await Promise.all([
      setUrlAppealNumber(appealNumber),
      setUrlJudicialYear(judicialYear),
      setUrlAppealType(appealTypeId),
    ]);
    refetch();
  };
  useEffect(() => {
    // If we have a payload with real rows -> set parent state true
    if (
      caseData?.data &&
      Array.isArray(caseData.data) &&
      caseData.data.length > 0
    ) {
      setHasSearched(true); // optional: mark that real data arrived
      setShowstates(true); // <--- your requested call
      return;
    }

    // If a search was attempted and it's finished loading with no data, set false
    if (
      hasSearched &&
      !isLoading &&
      (!caseData?.data || caseData.data.length === 0)
    ) {
      setShowstates(false);
    }
  }, [caseData, isLoading, hasSearched, setShowstates]);
  // Determine what to show based on search state
  const renderContent = () => {
    // If no search has been performed yet, show instructions
    if (!hasSearched && !caseData) {
      return (
        <div className="pt-20 pb-40">
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-white mb-4 text-right">
            إضاءات:
          </h3>
          <ul className="text-gray-600 dark:text-white/70 text-sm space-y-4 list-disc list-inside text-right">
            <li className="marker:text-main">
              للحصول على نتائج سريعة ودقيقة، يُراعى إدخال بيانات قضيتك إدخالاً
              صحيحاً. يُرجى الانتباه إلى أنه في حالات نادرة، قد يتأخر تحديث
              بيانات القضية لوقت قصير، لا يجاوز في الغالب يومين أو ثلاثة.
            </li>
            <li className="marker:text-main">
              حرصاً على وقتك ووقت العاملين، لا حاجة لمراجعة مكاتب المحكمة العليا
              من أجل الحصول على النسخة النهائية للحكم إلا بعد التحقق، بواسطة هذه
              الخدمة، من إيداعها.
            </li>
            <li className="marker:text-main">
              يجب مراعاة أن البيانات الواردة في هذه الخدمة لا تتمتع بأي حجية.
              تظل الحجية القانونية المطلقة قاصرة على المستندات الورقية المودعة
              ملف القضية.
            </li>
          </ul>
        </div>
      );
    }

    // If search has been performed and there are results
    if (hasSearched && caseData?.data && caseData.data.length > 0) {
      return (
        <MainTable
          caseData={caseData.data}
          error={caseError?.message || null}
        />
      );
    }

    // If search failed with API/validation error (wrong input)
    if (hasSearched && !isLoading && caseError) {
      return <NoSearchResults box={false} message="خطأ في الإدخال" />;
    }

    // If search completed but no appeal data available yet
    if (
      hasSearched &&
      !isLoading &&
      (!caseData?.data || caseData.data.length === 0)
    ) {
      return (
        <NoSearchResults
          box={false}
          message="المعذرة، بيانات الطعن المحدد ليست متاحة بعد"
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex-1 py-6 pl-2 pr-2 md:pl-10 md:pr-10 lg:pr-20 dark:bg-[#1a1a1a]">
      <h2 className="mb-4 mt-5 text-right text-xl font-bold text-gray-800 dark:text-white sm:text-3xl">
        تتبّع قضيتك{" "}
      </h2>

      <hr className="mb-12 mt-2 border-main" />

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
          value={appealTypeId}
          onChange={setAppealTypeId}
          options={classificationsData?.data || []}
          placeholder="اختر نوع الطعن"
        />

        {classificationsError && (
          <div className="text-red-500 dark:text-red-400 text-sm mt-1">
            خطأ في تحميل أنواع الطعون: {classificationsError.message}
          </div>
        )}
      </div>

      {/* Search Button */}
      <div className="mt-8 flex justify-center">
        <Button
          className="min-w-20"
          onClick={handleSearch}
          disabled={isSearchDisabled || isLoading}
        >
          {isLoading ? " البحث جار" : "بحث"}
        </Button>
      </div>

      <div className="min-h-[40vh] pb-40 pt-10">{renderContent()}</div>
    </div>
  );
}
