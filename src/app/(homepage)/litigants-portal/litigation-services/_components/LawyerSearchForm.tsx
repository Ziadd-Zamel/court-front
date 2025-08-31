/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";
import SearchDropdown from "./SearchDropdown";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
interface Props {
  circles: mainData[];
  fields: mainData[];
}
const LawyerSearchForm = ({ circles, fields }: Props) => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [circle1, setCircle1] = useState("");
  const [field, setField] = useState("");
  console.log(circles);
  // URL state management for tab switching
  const [activeTab, setActiveTab] = useQueryState("tab");

  // URL state for search parameters
  const [searchName, setSearchName] = useQueryState("name");
  const [searchKeyword, setSearchKeyword] = useQueryState("keyword");
  const [searchCircle, setSearchCircle] = useQueryState("circle");
  const [searchField, setSearchField] = useQueryState("field");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Store search values in URL
    setSearchName(name || null);
    setSearchKeyword(keyword || null);
    setSearchCircle(circle1 || null);
    setSearchField(field || null);

    // Switch to search results tab
    setActiveTab("searchResult");
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4 w-full md:max-w-[300px]">
      <div className="flex w-full md:max-w-sm flex-col gap-3 rounded-xl bg-gray-50 p-4">
        <SearchInput
          placeholder="اسم المحامي"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SearchInput
          placeholder="كلمة مفتاحية"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <SearchDropdown
          placeholder="اختر الدائرة"
          options={circles}
          value={circle1}
          onChange={setCircle1}
        />
        <SearchDropdown
          placeholder="اختر المجال"
          options={fields}
          value={field}
          onChange={setField}
        />
        <Button
          type="submit"
          className="bg-main hover:bg-main/90 text-white px-8 py-2 w-full"
        >
          بحث
        </Button>
      </div>
    </form>
  );
};

export default LawyerSearchForm;
