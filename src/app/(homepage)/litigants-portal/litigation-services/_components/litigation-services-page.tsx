import ContentSection from "./ContentSection";
import LawyerSearchForm from "./LawyerSearchForm";

interface Props {
  circles: mainData[];
  fields: mainData[];
}

export default function LitigationServicesPage({ circles, fields }: Props) {
  return (
    <section
      id="LitigationServicesPage"
      aria-labelledby="Litigation Services Page"
      className="relative pt-10 w-full box-container pb-40"
    >
      <p className=" pb-20 text-lg text-gray-500">
        تنبيه: بيان مجال الترافع أمام المحكمة العليا مبني على إفادة المحامي أو
        النقابة، ولا يمثل رأي المحكمة العليا.
      </p>
      <div className="flex items-start flex-col lg:flex-row gap-20 w-full">
        <LawyerSearchForm fields={fields} circles={circles} />
        <ContentSection />
      </div>
    </section>
  );
}
