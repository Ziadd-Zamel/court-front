import { ArrowLeft, ArrowRight } from "lucide-react";

const TrakeLineSectoin = ({
  setSelectedYear,
  selectedYear,
}: {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const years = [
    { year: 2012, label: "ديسمبر، ٢٠٢٤" },
    { year: 2013, label: "يناير، ٢٠٢٥" },
    { year: 2014, label: "فبراير، ٢٠٢٥" },
    { year: 2015, label: "مارس، ٢٠٢٥" },
    { year: 2016, label: "أبريل، ٢٠٢٥" },
  ];

  return (
    <div className="relative mt-[130px] px-16">
      <div
        style={{ direction: "rtl" }}
        className="relative flex items-center justify-between"
      >
        <button
          className="absolute cursor-pointer -left-8 text-gray-400 transition-colors hover:text-gray-300"
          onClick={() => {
            const currentIndex = years.findIndex(
              (item) => item.year === selectedYear
            );
            if (currentIndex < years.length - 1) {
              setSelectedYear(years[currentIndex + 1].year);
            }
          }}
        >
          <ArrowLeft className="size-5 sm:size-6" />
        </button>

        <div
          style={{ direction: "rtl" }}
          className="h-[2px] w-full bg-[#e4e4e4] sm:h-[4px]"
        >
          <div
            className="h-full bg-main transition-all duration-500"
            style={{
              width: `${
                years.findIndex((item) => item.year === selectedYear) * 25
              }%`,
            }}
          />
        </div>

        <div
          style={{ direction: "rtl" }}
          className="absolute flex w-full justify-between"
        >
          {years.map((item) => (
            <button
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              className="group relative w-fit cursor-pointer "
            >
              <div
                className={`h-1 w-1 rounded-full transition-all duration-300 sm:h-2 sm:w-2 ${
                  selectedYear === item.year
                    ? "bg-white ring-4 ring-[#3e5481] sm:ring-8"
                    : "bg-white ring-4 ring-[#e4e4e4] hover:ring-4 hover:ring-[#3e5481] sm:ring-8"
                } `}
              />
              <span className="absolute bottom-5 left-1/2 w-[50px] -translate-x-1/2 transform text-[10px] font-bold text-black sm:w-[120px] sm:text-lg">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <button
          className="absolute -right-8 text-gray-400 transition-colors hover:text-gray-300 cursor-pointer "
          onClick={() => {
            const currentIndex = years.findIndex(
              (item) => item.year === selectedYear
            );
            if (currentIndex > 0) {
              setSelectedYear(years[currentIndex - 1].year);
            }
          }}
        >
          <ArrowRight className="size-5 sm:size-6" />
        </button>
      </div>
    </div>
  );
};

export default TrakeLineSectoin;
