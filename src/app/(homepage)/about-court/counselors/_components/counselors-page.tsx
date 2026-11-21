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
      <CounselorsContent pagination={pagination} search={search} />
    </section>
  );
}
