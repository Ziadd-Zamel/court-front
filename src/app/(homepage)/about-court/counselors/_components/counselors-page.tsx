import SearchBar from "@/components/common/search-bar";
import CounselorsContent from "./counselors-content";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function CounselorsPage({ pagination, search }: Props) {
  return (
    <section>
      <div className="flex md:flex-row flex-col-reverse items-center w-full justify-between box-container mt-16 gap-16">
        <h2 className=" text-2xl lg:text-4xl text-main font-semibold w-full md:w-1/2 self-start">
          المستشارون بالمحكمة العليا{" "}
        </h2>
        <div className=" w-full md:w-1/2 max-w-[400px] self-end">
          <SearchBar />
        </div>
      </div>

      <CounselorsContent pagination={pagination} search={search} />
    </section>
  );
}
