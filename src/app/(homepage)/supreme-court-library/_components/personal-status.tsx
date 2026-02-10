"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-Input";
import {
  KEYWORD_HELP,
  MULTI_KEYWORD_HELP,
  EXCLUDE_KEYWORD_HELP,
  OR_KEYWORD_HELP,
} from "@/lib/constants/personal.constnat";

export default function PersonalStatus() {
  const [word, setWord] = useQueryState("word");
  const [multi, setMulti] = useQueryState("multi");
  const [exclude, setExclude] = useQueryState("exclude");
  const [orWord, setOrWord] = useQueryState("or");

  const [appealNumber, setAppealNumber] = useQueryState("appealNumber");
  const [appealYear, setAppealYear] = useQueryState("appealYear");
  const [principleNumber, setPrincipleNumber] =
    useQueryState("principleNumber");
  const [principleYear, setPrincipleYear] = useQueryState("principleYear");

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
        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">كلمة أو أكثر:</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchInput
              value={word ?? ""}
              onChange={setWord}
              placeholder="في المبادئ"
              help={KEYWORD_HELP}
            />
            <SearchInput
              value={multi ?? ""}
              onChange={setMulti}
              placeholder="في الموجز"
              help={MULTI_KEYWORD_HELP}
            />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">جملة مطابقة:</div>

          <SearchInput
            value={exclude ?? ""}
            onChange={setExclude}
            placeholder="ابحث في المبادئ بجملة مطابقة لهذه الجملة"
            help={EXCLUDE_KEYWORD_HELP}
          />
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="text-right text-lg font-semibold">جملة مشابهة:</div>

          <SearchInput
            value={orWord ?? ""}
            onChange={setOrWord}
            placeholder="ابحث في المبادئ بجملة مشابهة لهذه الجملة"
            help={OR_KEYWORD_HELP}
          />
        </div>

        {/* ROW 4 */}
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

        {/* ROW 5 */}
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
        <Button className="px-10">بحث</Button>
      </div>
    </div>
  );
}
