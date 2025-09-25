import SearchBar from "@/components/common/search-bar";

const Sidebar = () => {
  const appealStages = [
    "التقرير بالطعن",
    "إيداع المذكرات",
    "الشق المستعجل",
    "رأي نيابة النقض",
    "فحص الطعن",
    "إعلان موعد الجلسة",
    "نظر الموضوع",
    "الفصل في الطعن",
    "إعادة القضية",
  ];

  return (
    <div className="flex flex-col h-full text-right border-gray-300 pt-10 bg-[#F1E2CE] pl-16 pr-7">
      <h3 className="text-xl text-gray-800 font-semibold mb-6">
        مراحل الطعن أمام المحكمة العليا
      </h3>

      <ul className="space-y-4">
        {appealStages.map((stage, index) => (
          <li
            key={index}
            className="flex items-center justify-start text-gray-700"
          >
            <span className="text-xl">•</span>
            <span className="mr-4 -mt-1">{stage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
