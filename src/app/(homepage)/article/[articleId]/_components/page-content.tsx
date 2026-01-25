"use client";
import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

export default function PageContent({ article }: { article: Article }) {
  const contentTabs: SecondaryTabItem[] = [];

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Always add rule tab first if it exists
  if (article.rule) {
    contentTabs.push({
      label: article.rule.title,
      value: "rule",
      component: (
        <div className="text-right">
          <div
            className="text-gray-500 leading-relaxed text-sm text-justify font-normal "
            style={{ direction: "rtl" }}
            dangerouslySetInnerHTML={{
              __html: cleanHtmlStyles(article.rule.body_html),
            }}
          />
        </div>
      ),
    });
  }

  // --- replace your current "Add concatenated contents tab" block with this ---
  if (article.concatenated_contents) {
    const concatenatedContents = article.concatenated_contents;
    const availableContents: Content[] = [];

    // Collect present content items (avoid index signature issues)
    const contentProperties = [
      concatenatedContents.first,
      concatenatedContents.second,
      concatenatedContents.third,
      concatenatedContents.fourth,
      concatenatedContents.fifth,
      concatenatedContents.sixth,
      concatenatedContents.seventh,
      concatenatedContents.eighth,
    ];

    contentProperties.forEach((content) => {
      if (content && content.title && content.body_html) {
        availableContents.push(content);
      }
    });

    // Chunk into pairs and create a tab for each pair
    const chunkSize = 2;
    for (let i = 0; i < availableContents.length; i += chunkSize) {
      const pair = availableContents.slice(i, i + chunkSize); // length 1 or 2

      // Create a label from the titles in the pair joined by " و "
      const pairTitle = pair.map((c) => c.title).join(" و ");

      contentTabs.push({
        label: pairTitle,
        value: `concatenated-contents-${i / chunkSize}`, // unique value per pair
        component: (
          <div className="text-right">
            <div style={{ direction: "rtl" }}>
              {pair.map((content, idx) => (
                <div key={idx}>
                  <h4 className="text-xl font-semibold mb-4 text-gray-700">
                    {content.title}
                  </h4>
                  <div
                    className={`text-gray-500 leading-relaxed text-sm text-justify font-normal ${
                      idx < pair.length - 1 ? "mb-8" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: cleanHtmlStyles(content.body_html),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ),
      });
    }
  }
  // --- end replacement ---

  // Add content tabs in the middle
  const articleContentTabs: SecondaryTabItem[] = article.contents.map(
    (content) => ({
      label: content.title,
      value: content.title.toLowerCase().replace(/\s+/g, "-"),
      component: (
        <div className="text-right">
          <p className="text-gray-500 leading-relaxed text-sm text-justify">
            {content.body_text}
          </p>
        </div>
      ),
    }),
  );

  contentTabs.push(...articleContentTabs);

  // Always add counselors tab last if it exists
  if (article.counselors && article.counselors.length > 0) {
    contentTabs.push({
      label: "المستشارون",
      value: "counselors",
      component: (
        <div className="text-right ">
          <h4 className="text-2xl font-medium mb-12">هيئة الحكم</h4>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {article.counselors.map((counselor, index) => (
              <div
                key={counselor.uuid || index}
                className="flex items-center gap-4 justify-center"
              >
                <div className="w-8 h-8 rounded-full aspect-auto bg-main flex items-center justify-center text-white font-bold text-base">
                  {counselor.name.charAt(0)}
                </div>

                <h5 className="text-main text-base font-medium">
                  {counselor.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  }

  return (
    <section className="box-container !px-9 pt-20 w-full lg:w-2/3 pb-40">
      <div className="flex flex-col items-start">
        <h3 className="text-xl font-semibold md:text-md lg:text-2xl mb-5 flex items-center gap-1">
          <div className="flex items-center flex-row-reverse gap-1">
            <span>{article.principle_year}</span>
            <span className="-mx-1">/</span>
            <span>{article.principle_number}</span>
          </div>
          <span className="font-semibold text-xl">
            {article.principle_type}
          </span>
          <div className="flex items-center text-sm">
            (<span>{article.ruling_type}</span>
            <div className="flex items-center ms-1">
              <span>{article.number}</span>
              <span className="mx-1">/</span>
              <span>{article.sign}</span>)
            </div>
          </div>
        </h3>
        <h4 className="text-right text-sm font-bold sm:text-xl flex items-center gap-2">
          {article.title}
        </h4>
        <div className="mt-5 flex items-center justify-end gap-5">
          <div className="font-semibold text-main text-sm">
            {formatDate(article.publish_date)}
          </div>
          <div className="text-right text-sm font-semibold text-main">
            {article.author}
          </div>
        </div>
      </div>

      {/* Article brief */}
      <div
        className="text-gray-500 leading-relaxed text-base text-justify font-normal mt-16 mb-6"
        style={{ direction: "rtl" }}
        dangerouslySetInnerHTML={{
          __html: cleanHtmlStyles(article.brief_html),
        }}
      />

      <hr className=" border-main" />

      <SecondaryTabs
        tabs={contentTabs}
        defaultValue={contentTabs[0]?.value || ""}
        className="w-full flex justify-center items-center mt-16 "
        tabListClassName="mb-7 max-w-none flex-wrap"
      />
    </section>
  );
}
