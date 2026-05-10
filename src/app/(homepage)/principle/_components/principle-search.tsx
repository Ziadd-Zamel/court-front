"use client";

import { useState } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";
import {
  KEYWORD_HELP,
  MULTI_KEYWORD_HELP,
  OR_KEYWORD_HELP,
  PHRASE_HELP,
} from "@/lib/constants/personal.constnat";
import { CURRENT_YEAR, YEARS_SINCE_FOUNDING } from "@/lib/constants/app-years";
import { SearchInput } from "../../supreme-court-library/_components/search-Input";
import DatePicker from "@/components/common/date-picker";

const formParsers = {
  exact_phrase: parseAsString,
  similar_phrase: parseAsString,
  include_terms: parseAsString,
  exclude_terms: parseAsString,
  any_terms: parseAsString,
  appeal_number: parseAsString,
  appeal_year: parseAsString,
  principle_number: parseAsString,
  principle_year: parseAsString,
  page: parseAsString,
};

export default function PrincipleSearch({
  disabled,
  isLoading,
}: {
  disabled?: boolean;
  isLoading?: boolean;
}) {
  // Single batched setter for all form-driven URL params.
  const [committed, setCommitted] = useQueryStates(formParsers);

  // Local form state, hydrated once from the URL. Inputs no longer write
  // to the URL on every keystroke - they just update local state until
  // the user clicks the search button.
  const [exactPhrase, setExactPhrase] = useState(committed.exact_phrase ?? "");
  const [similarPhrase, setSimilarPhrase] = useState(
    committed.similar_phrase ?? "",
  );
  const [includeTerms, setIncludeTerms] = useState(
    committed.include_terms ?? "",
  );
  const [excludeTerms, setExcludeTerms] = useState(
    committed.exclude_terms ?? "",
  );
  const [anyTerms, setAnyTerms] = useState(committed.any_terms ?? "");
  const [appealNumber, setAppealNumber] = useState(
    committed.appeal_number ?? "",
  );
  const [appealYear, setAppealYear] = useState(committed.appeal_year ?? "");
  const [principleNumber, setPrincipleNumber] = useState(
    committed.principle_number ?? "",
  );
  const [principleYear, setPrincipleYear] = useState(
    committed.principle_year ?? "",
  );

  const hasIncludeExclude = !!(includeTerms || excludeTerms);
  const hasAnyTerms = !!anyTerms;
  const hasSimilarPhrase = !!similarPhrase;
  const hasExactPhrase = !!exactPhrase;

  const handleSearch = () => {
    setCommitted({
      exact_phrase: exactPhrase || null,
      similar_phrase: similarPhrase || null,
      include_terms: includeTerms || null,
      exclude_terms: excludeTerms || null,
      any_terms: anyTerms || null,
      appeal_number: appealNumber || null,
      appeal_year: appealYear || null,
      principle_number: principleNumber || null,
      principle_year: principleYear || null,
      page: "1",
    });
  };

  const handleStringChange =
    (setter: (v: string) => void) => (v: string | null) =>
      setter(v ?? "");

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
            بكلمة أو أكثر:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={includeTerms}
              onChange={handleStringChange(setIncludeTerms)}
              placeholder="في المبادئ والموجز"
              help={KEYWORD_HELP}
              disabled={hasAnyTerms || hasSimilarPhrase || hasExactPhrase}
            />
            <SearchInput
              value={excludeTerms}
              onChange={handleStringChange(setExcludeTerms)}
              placeholder="استبعاد كلمات"
              help={MULTI_KEYWORD_HELP}
              disabled={hasAnyTerms || hasSimilarPhrase || hasExactPhrase}
            />
          </div>
        </div>

        {/* ROW 2 - Any Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            بجزء كلمة أو بأي كلمة:
          </div>

          <SearchInput
            value={anyTerms}
            onChange={handleStringChange(setAnyTerms)}
            placeholder="في المبادئ والموجز"
            help={OR_KEYWORD_HELP}
            disabled={hasIncludeExclude || hasSimilarPhrase || hasExactPhrase}
          />
        </div>

        {/* ROW 3 - Exact Phrase */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            بجملة مطابقة:
          </div>

          <SearchInput
            value={exactPhrase}
            onChange={handleStringChange(setExactPhrase)}
            placeholder="ابحث في المبادئ بجملة مطابقة لهذه الجملة"
            help={PHRASE_HELP}
            disabled={hasIncludeExclude || hasAnyTerms || hasSimilarPhrase}
          />
        </div>

        {/* ROW 4 - Similar Phrase */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            بجملة مشابهة:
          </div>

          <SearchInput
            value={similarPhrase}
            onChange={handleStringChange(setSimilarPhrase)}
            placeholder="في المبادئ والموجز"
            help={PHRASE_HELP}
            disabled={hasIncludeExclude || hasAnyTerms || hasExactPhrase}
          />
        </div>

        {/* ROW 5 - Appeal Number */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            برقم الطعن:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={appealNumber}
              onChange={handleStringChange(setAppealNumber)}
              placeholder="أدرج الرقم دون السنة. مثال: 1234"
            />
            <SearchInput
              value={appealYear}
              onChange={handleStringChange(setAppealYear)}
              placeholder={`أدرج السنة القضائية. مثال: ${YEARS_SINCE_FOUNDING}`}
            />
          </div>
        </div>

        {/* ROW 6 - Principle Number */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            برقم المبدأ:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={principleNumber}
              onChange={handleStringChange(setPrincipleNumber)}
              placeholder="أدرج الرقم دون السنة. مثال: 12"
            />
            <SearchInput
              value={principleYear}
              onChange={handleStringChange(setPrincipleYear)}
              placeholder={`أدرج السنة الميلادية. مثال: ${CURRENT_YEAR}`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          <div className="text-right text-lg font-semibold mt-2 text-gray-800 dark:text-white">
            بتاريخ الجلسة:
          </div>

          <DatePicker />
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 flex text-lg! xl:text-xl justify-center lg:justify-end">
        <Button
          disabled={disabled || isLoading}
          loading={isLoading}
          onClick={handleSearch}
          className="px-10"
        >
          بحث
        </Button>
      </div>
    </div>
  );
}
