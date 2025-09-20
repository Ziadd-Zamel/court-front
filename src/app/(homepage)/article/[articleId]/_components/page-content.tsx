import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";

export default function PageContent({ article }: { article: Article }) {
  // Create tabs from the article contents
  const contentTabs: SecondaryTabItem[] = article.contents.map((content) => ({
    label: content.title,
    value: content.title.toLowerCase().replace(/\s+/g, "-"),
    component: (
      <div className="text-right">
        <p className="text-gray-500 leading-relaxed text-lg">
          {content.body_text}
        </p>
      </div>
    ),
  }));
  console.log(article);

  // Add counselors tab if there are counselors
  if (article.counselors && article.counselors.length > 0) {
    contentTabs.push({
      label: "المستشارون",
      value: "counselors",
      component: (
        <div className="text-right">
          <div className="space-y-2">
            {article.counselors.map((counselor, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-800">{counselor}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  }

  return (
    <>
      <section className="box-container !px-9 pt-20 w-full lg:w-2/3 pb-20">
        <div className="flex flex-col items-start">
          <h3 className="text-right text-2xl font-bold sm:text-4xl flex items-center gap-2">
            {article.title}:
            <span className="mt-0.5 text-3xl block">{article.number}</span>
          </h3>
          <div className="mt-5 flex items-center justify-end gap-5">
            <div className="font-semibold text-main">
              {article.publish_date}
            </div>
            <div className="text-right text-sm font-semibold text-main sm:text-base">
              {article.sign}
            </div>
          </div>
        </div>

        {/* Article brief */}
        <div className="mb-3 text-right mt-12">
          <p className="text-sm font-semibold text-gray-800 sm:text-md xl:text-xl">
            {article.brief}
          </p>
        </div>

        <hr className="mb-16 border-main" />

        <SecondaryTabs
          tabs={contentTabs}
          defaultValue={contentTabs[0]?.value || ""}
          className="w-full flex justify-center items-center mt-20"
          tabListClassName="mb-20"
        />
      </section>
    </>
  );
}
