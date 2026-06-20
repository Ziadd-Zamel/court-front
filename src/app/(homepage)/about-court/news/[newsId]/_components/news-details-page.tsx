import Image from "next/image";
import SecondaryHeading from "@/components/common/seondary-heading";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getArticlesNewsById } from "@/lib/api/news";
import catchError from "@/lib/utils/catch-error";

export default async function NewsPageDetails({ id }: { id: string }) {
  const [data, error] = await catchError(() => getArticlesNewsById(id));

  if (error) return <ErrorState />;
  if (!data) return <NoDataState />;

  return (
    <div>
      <SecondaryHeading title="تفاصيل الخبر" breadcrumb />

      <article className="box-container pb-24 pt-12 sm:pb-40 sm:pt-20">
        <h1 className="mb-4 text-base font-bold leading-snug text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
          {data.data.title}
        </h1>

        {/* Meta row: source + date */}
        <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-4 dark:border-white/10 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-main" />
            <span className="text-xs text-gray-500 dark:text-white/70 sm:text-sm">
              المصدر:
            </span>
            <span className="text-xs font-medium text-main sm:text-sm">
              {data.data.source}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-white/70 sm:text-sm">
            <span>{data.data.publish_date}</span>
            <span className="rounded-full bg-main/10 px-2 py-0.5 text-[10px] text-main dark:bg-white/10 sm:text-xs">
              {data.data.category}
            </span>
          </div>
        </div>

        {/* Body text */}
        <div
          className="prose prose-sm sm:prose-lg dark:prose-invert prose-headings:text-sm sm:prose-headings:text-xl prose-p:text-xs sm:prose-p:text-sm mb-8 max-w-none text-right leading-relaxed text-gray-700 dark:text-white/70 sm:mb-12"
          dangerouslySetInnerHTML={{ __html: data.data.content_html }}
        />

        {/* Images gallery */}
        {data.data.images && data.data.images.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-white sm:mb-4 sm:text-base">
              <span className="w-1 h-5 bg-main rounded-full inline-block" />
              الصور
            </h3>

            {data.data.images.length === 1 && (
              <div className="relative w-full max-h-[700px] h-[700px] rounded-sm overflow-hidden">
                <Image
                  src={data.data.images[0]}
                  alt={data.data.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {data.data.images.length === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {data.data.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-64 rounded-sm overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${data.data.title} - ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {data.data.images.length >= 3 && (
              <div className="grid grid-cols-2 gap-3">
                {/* First image spans full width */}
                <div className="col-span-2 relative h-full rounded-sm overflow-hidden">
                  <Image
                    src={data.data.images[0]}
                    alt={`${data.data.title} - 1`}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Rest in a 2-col grid */}
                {data.data.images.slice(1).map((img, i) => (
                  <div
                    key={i + 1}
                    className="relative h-52 rounded-sm overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${data.data.title} - ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Video */}
        {data.data.main_video && (
          <div className="mt-8">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-white sm:mb-4 sm:text-base">
              <span className="w-1 h-5 bg-main rounded-full inline-block" />
              الفيديو
            </h3>
            <video
              src={data.data.main_video}
              controls
              className="w-full rounded-xl max-h-[480px]"
              preload="metadata"
            />
          </div>
        )}
      </article>
    </div>
  );
}
