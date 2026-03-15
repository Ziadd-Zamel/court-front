import Image from "next/image";
import MainHeading from "@/components/common/main-heading";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getArticlesNewsById } from "@/lib/api/news";
import catchError from "@/lib/utils/catch-error";

export default async function NewsPageDetails({ id }: { id: string }) {
  const [data, error] = await catchError(() => getArticlesNewsById(id));

  if (error) return <ErrorState />;
  if (!data) return <NoDataState />;

  const NewsData = data?.data;
  console.log(NewsData);

  return (
    <div>
      <MainHeading
        title={data.data.title}
        titleClassName="lg:max-w-[60%] lg:text-lg"
        bgImage="/assets/aboute.jpg"
        overlay
      />

      <article className="box-container pb-40 pt-20">
        {/* Meta row: source + date */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-main inline-block" />
            <span className="text-sm text-gray-500 dark:text-white/70">المصدر:</span>
            <span className="text-sm font-medium text-main">
              {data.data.source}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-white/70">
            <span>{data.data.publish_date}</span>
            <span className="bg-main/10 dark:bg-white/10 text-main text-xs px-2 py-0.5 rounded-full">
              {data.data.category}
            </span>
          </div>
        </div>

        {/* Body text */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-white/70 text-sm leading-relaxed text-right mb-12"
          dangerouslySetInnerHTML={{ __html: data.data.content_html }}
        />

        {/* Images gallery */}
        {data.data.images && data.data.images.length > 0 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-600 dark:text-white mb-4 flex items-center gap-2">
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
            <h3 className="text-base font-semibold text-gray-600 dark:text-white mb-4 flex items-center gap-2">
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
