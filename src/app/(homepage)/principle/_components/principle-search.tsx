/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  KEYWORD_HELP,
  MULTI_KEYWORD_HELP,
  EXCLUDE_KEYWORD_HELP,
  OR_KEYWORD_HELP,
} from "@/lib/constants/personal.constnat";
import { SearchInput } from "../../supreme-court-library/_components/search-Input";

export default function PrincipleSearch() {
  const router = useRouter();

  // Match the API parameter names
  const [exactPhrase, setExactPhrase] = useQueryState("exact_phrase");
  const [similarPhrase, setSimilarPhrase] = useQueryState("similar_phrase");
  const [includeTerms, setIncludeTerms] = useQueryState("include_terms");
  const [excludeTerms, setExcludeTerms] = useQueryState("exclude_terms");
  const [anyTerms, setAnyTerms] = useQueryState("any_terms");

  const [appealNumber, setAppealNumber] = useQueryState("appeal_number");
  const [appealYear, setAppealYear] = useQueryState("appeal_year");
  const [principleNumber, setPrincipleNumber] =
    useQueryState("principle_number");
  const [principleYear, setPrincipleYear] = useQueryState("principle_year");

  const [page, setPage] = useQueryState("page");

  const handleSearch = () => {
    // Build the URL manually with all current values
    const params = new URLSearchParams();

    params.set("page", "1");
    if (exactPhrase) params.set("exact_phrase", exactPhrase);
    if (similarPhrase) params.set("similar_phrase", similarPhrase);
    if (includeTerms) params.set("include_terms", includeTerms);
    if (excludeTerms) params.set("exclude_terms", excludeTerms);
    if (anyTerms) params.set("any_terms", anyTerms);
    if (appealNumber) params.set("appeal_number", appealNumber);
    if (appealYear) params.set("appeal_year", appealYear);
    if (principleNumber) params.set("principle_number", principleNumber);
    if (principleYear) params.set("principle_year", principleYear);

    // Push the URL with all params
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-10 text-right">
        <h2 className="text-2xl font-bold text-main">
          املأ واحدًا أو أكثر من حقول البحث
        </h2>
        <div className="mt-2 h-[2px] w-56 bg-main" />
      </div>

      <div className="space-y-8">
        {/* ROW 1 - Include Terms & Exclude Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">كلمة أو أكثر:</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={includeTerms ?? ""}
              onChange={setIncludeTerms}
              placeholder="في المبادئ"
              help={KEYWORD_HELP}
            />
            <SearchInput
              value={excludeTerms ?? ""}
              onChange={setExcludeTerms}
              placeholder="استبعاد كلمات"
              help={MULTI_KEYWORD_HELP}
            />
          </div>
        </div>

        {/* ROW 2 - Any Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">أي من الكلمات:</div>

          <SearchInput
            value={anyTerms ?? ""}
            onChange={setAnyTerms}
            placeholder="ابحث عن أي من هذه الكلمات"
            help={OR_KEYWORD_HELP}
          />
        </div>

        {/* ROW 3 - Exact Phrase */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">جملة مطابقة:</div>

          <SearchInput
            value={exactPhrase ?? ""}
            onChange={setExactPhrase}
            placeholder="ابحث في المبادئ بجملة مطابقة لهذه الجملة"
            help={EXCLUDE_KEYWORD_HELP}
          />
        </div>

        {/* ROW 4 - Similar Phrase */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">جملة مشابهة:</div>

          <SearchInput
            value={similarPhrase ?? ""}
            onChange={setSimilarPhrase}
            placeholder="ابحث في المبادئ بجملة مشابهة لهذه الجملة"
            help={OR_KEYWORD_HELP}
          />
        </div>

        {/* ROW 5 - Appeal Number */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">رقم الطعن:</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={appealYear ?? ""}
              onChange={setAppealYear}
              placeholder="أدرج السنة القضائية. مثال: 73"
            />
            <SearchInput
              value={appealNumber ?? ""}
              onChange={setAppealNumber}
              placeholder="أدرج الرقم دون السنة. مثال: 1234"
            />
          </div>
        </div>

        {/* ROW 6 - Principle Number */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">رقم المبدأ:</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={principleYear ?? ""}
              onChange={setPrincipleYear}
              placeholder="أدرج السنة الميلادية. مثال: 2025"
            />
            <SearchInput
              value={principleNumber ?? ""}
              onChange={setPrincipleNumber}
              placeholder="أدرج الرقم دون السنة. مثال: 12"
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-12 flex justify-center lg:justify-end">
        <Button onClick={handleSearch} className="px-10">
          بحث
        </Button>
      </div>
    </div>
  );
}
