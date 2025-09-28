"use client";
import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

export default function PageContent({ article }: { article: Article }) {
  const contentTabs: SecondaryTabItem[] = [];
  console.log(article);

  // Always add rule tab first if it exists
  if (article.rule) {
    contentTabs.push({
      label: article.rule.title,
      value: "rule",
      component: (
        <div className="text-right">
          <div
            className="text-gray-500 leading-relaxed text-lg text-justify font-normal "
            style={{ direction: "rtl" }}
            dangerouslySetInnerHTML={{
              __html: cleanHtmlStyles(article.rule.body_html),
            }}
          />
        </div>
      ),
    });
  }

  // Add concatenated contents tab if concatenated_contents exists
  if (article.concatenated_contents) {
    const concatenatedContents = article.concatenated_contents;
    const availableContents: Content[] = [];

    // Check each property directly to avoid TypeScript index signature errors
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

    if (availableContents.length > 0) {
      // Create concatenated title by joining all titles with " و "
      const concatenatedTitle = availableContents
        .map((content) => content.title)
        .join(" و ");

      contentTabs.push({
        label: concatenatedTitle,
        value: "concatenated-contents",
        component: (
          <div className="text-right">
            <div style={{ direction: "rtl" }}>
              {availableContents.map((content, index) => (
                <div key={index}>
                  <h4 className="text-xl font-semibold mb-4 text-gray-700">
                    {content.title}
                  </h4>
                  <div
                    className={`text-gray-500 leading-relaxed text-lg text-justify font-normal ${
                      index < availableContents.length - 1 ? "mb-8" : ""
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

  // Add content tabs in the middle
  const articleContentTabs: SecondaryTabItem[] = article.contents.map(
    (content) => ({
      label: content.title,
      value: content.title.toLowerCase().replace(/\s+/g, "-"),
      component: (
        <div className="text-right">
          <p className="text-gray-500 leading-relaxed text-lg text-justify">
            {content.body_text}
          </p>
        </div>
      ),
    })
  );

  contentTabs.push(...articleContentTabs);

  // Always add counselors tab last if it exists
  if (article.counselors && article.counselors.length > 0) {
    contentTabs.push({
      label: "المستشارون",
      value: "counselors",
      component: (
        <div className="text-right -mt-10 ">
          <h4 className="text-2xl font-medium mb-12">هيئة الحكم</h4>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {article.counselors.map((counselor, index) => (
              <div
                key={counselor.uuid || index}
                className="flex items-center gap-4 justify-center"
              >
                <div className="w-8 h-8 rounded-full aspect-auto bg-main flex items-center justify-center text-white font-bold text-lg">
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
    <>
      <section className="box-container !px-9 pt-20 w-full lg:w-2/3 pb-20">
        <div className="flex flex-col items-start">
          <h3 className="text-right text-sm font-bold sm:text-4xl flex items-center gap-2">
            {article.title}:
            <span className="mt-0.5 text-sm sm:text-3xl block">
              {article.number}/{article.sign}
            </span>
          </h3>
          <div className="mt-5 flex items-center justify-end gap-5">
            <div className="font-semibold text-main">
              {article.publish_date}
            </div>
            <div className="text-right text-sm font-semibold text-main sm:text-base">
              {article.author}
            </div>
          </div>
        </div>

        {/* Article brief */}
        <div className="mb-3 text-right mt-12">
          <p className="text-sm font-medium text-gray-800 sm:text-md xl:text-xl">
            {article.title}
          </p>
        </div>

        <hr className="mb-16 border-main" />

        <SecondaryTabs
          tabs={contentTabs}
          defaultValue={contentTabs[0]?.value || ""}
          className="w-full flex justify-center items-center mt-20 "
          tabListClassName="mb-20 max-w-none flex-wrap"
        />
      </section>
    </>
  );
}
