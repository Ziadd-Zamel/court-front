import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getVistorServices } from "@/lib/api/vistor-services.api";
import catchError from "@/lib/utils/catch-error";
import ServiceContent from "./service-content";

export default async function VistorServices() {
  const [payload, error] = await catchError(() => getVistorServices());

  if (!payload || payload.data.length === 0) {
    return <NoDataState />;
  }
  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="mt-4">
      <h2 className="text-main font-semibold text-4xl pb-4 border-b-3 border-b-main pe-10 w-fit mb-20">
        خدمات الزوار
      </h2>
      {payload.data.map((service, index) => (
        <div key={index} className="mb-20">
          <h3 className="text-3xl font-bold text-main mb-8">
            {service.title}:
          </h3>

          <ServiceContent body_html={service.body_html} />
          <div className="w-full h-px bg-main mt-8" />
        </div>
      ))}
    </section>
  );
}
