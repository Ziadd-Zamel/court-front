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
  PHRASE_HELP,
} from "@/lib/constants/personal.constnat";
import { CURRENT_YEAR, YEARS_SINCE_FOUNDING } from "@/lib/constants/app-years";
import { SearchInput } from "../../supreme-court-library/_components/search-Input";
import DateRangePicker from "@/components/common/date-range-picker";
import DatePicker from "@/components/common/date-picker";

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

  // Mutual exclusion: only one of the three text-search rows can be active
  const hasIncludeExclude = !!(includeTerms || excludeTerms);
  const hasAnyTerms = !!anyTerms;
  const hasSimilarPhrase = !!similarPhrase;
  const [strictAlef] = useQueryState("strict_alef", { defaultValue: "0" });
  const [strictYa] = useQueryState("strict_ya", { defaultValue: "0" });
  const [strictTa] = useQueryState("strict_ta", { defaultValue: "0" });

  const handleSearch = () => {
    // Start from current URL to preserve ruling_type_uuid
    const params = new URLSearchParams(window.location.search);

    params.set("page", "1");
    if (exactPhrase) params.set("exact_phrase", exactPhrase);
    else params.delete("exact_phrase");
    if (similarPhrase) params.set("similar_phrase", similarPhrase);
    else params.delete("similar_phrase");
    if (includeTerms) params.set("include_terms", includeTerms);
    else params.delete("include_terms");
    if (excludeTerms) params.set("exclude_terms", excludeTerms);
    else params.delete("exclude_terms");
    if (anyTerms) params.set("any_terms", anyTerms);
    else params.delete("any_terms");
    if (appealNumber) params.set("appeal_number", appealNumber);
    else params.delete("appeal_number");
    if (appealYear) params.set("appeal_year", appealYear);
    else params.delete("appeal_year");
    if (principleNumber) params.set("principle_number", principleNumber);
    else params.delete("principle_number");
    if (principleYear) params.set("principle_year", principleYear);
    else params.delete("principle_year");
    params.set("strict_alef", strictAlef ?? "0");
    params.set("strict_ya", strictYa ?? "0");
    params.set("strict_ta", strictTa ?? "0");

    router.push(`?${params.toString()}#principles-results`);
  };

  return (
    <div className="w-full mt-4">
      {/* Title */}
      <div className="mb-10 text-right">
        <h2 className="text-2xl font-bold text-main">
          املأ حقلاً أو أكثر للبحث:
        </h2>
        <div className="mt-2 h-[2px] w-56 bg-main" />
      </div>

      <div className="space-y-6">
        {/* ROW 1 - Include Terms & Exclude Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            كلمة أو أكثر:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={includeTerms ?? ""}
              onChange={setIncludeTerms}
              placeholder="في المبادئ والموجز"
              help={KEYWORD_HELP}
              disabled={hasAnyTerms || hasSimilarPhrase}
            />
            <SearchInput
              value={excludeTerms ?? ""}
              onChange={setExcludeTerms}
              placeholder="استبعاد كلمات"
              help={MULTI_KEYWORD_HELP}
              disabled={hasAnyTerms || hasSimilarPhrase}
            />
          </div>
        </div>

        {/* ROW 2 - Any Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            بجزء كلمة أو بأي كلمة:
          </div>

          <SearchInput
            value={anyTerms ?? ""}
            onChange={setAnyTerms}
            placeholder="في المبادئ والموجز"
            help={OR_KEYWORD_HELP}
            disabled={hasIncludeExclude || hasSimilarPhrase}
          />
        </div>

        {/* ROW 3 - Exact Phrase */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            جملة مطابقة:
          </div>

          <SearchInput
            value={exactPhrase ?? ""}
            onChange={setExactPhrase}
            placeholder="ابحث في المبادئ بجملة مطابقة لهذه الجملة"
            help={EXCLUDE_KEYWORD_HELP}
          />
        </div> */}

        {/* ROW 4 - Similar Phrase */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">بجملة:</div>

          <SearchInput
            value={similarPhrase ?? ""}
            onChange={setSimilarPhrase}
            placeholder="في المبادئ والموجز"
            help={PHRASE_HELP}
            disabled={hasIncludeExclude || hasAnyTerms}
          />
        </div>

        {/* ROW 5 - Appeal Number */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            رقم الطعن:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={appealNumber ?? ""}
              onChange={setAppealNumber}
              placeholder="أدرج الرقم دون السنة. مثال: 1234"
            />
            <SearchInput
              value={appealYear ?? ""}
              onChange={setAppealYear}
              placeholder={`أدرج السنة القضائية. مثال: ${YEARS_SINCE_FOUNDING}`}
            />
          </div>
        </div>

        {/* ROW 6 - Principle Number */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            رقم المبدأ:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={principleNumber ?? ""}
              onChange={setPrincipleNumber}
              placeholder="أدرج الرقم دون السنة. مثال: 12"
            />
            <SearchInput
              value={principleYear ?? ""}
              onChange={setPrincipleYear}
              placeholder={`أدرج السنة الميلادية. مثال: ${CURRENT_YEAR}`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            تاريخ الجلسة:
          </div>

          <DatePicker />
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 flex text-lg! xl:text-xl justify-center lg:justify-end">
        <Button onClick={handleSearch} className="px-10">
          بحث
        </Button>
      </div>
    </div>
  );
}
