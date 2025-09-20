import Image from "next/image";

export default function PageContent({ Book }: { Book: BookData }) {
  return (
    <>
      <section className="box-container h-full w-full py-20">
        <div className="flex items-start gap-8">
          <Image
            src={Book.book_image || "/assets/HeroBg.png"}
            alt="Book cover"
            width={340}
            height={480}
            className="rounded-lg shadow-lg w-[340px] h-[480px]"
          />
          <div className="flex flex-col gap-2 justify-start items-start ">
            <h2 className="font-bold text-4xl text-main mb-10">{Book.title}</h2>

            <div className="flex items-center   gap-2">
              <span className="font-semibold text-gray-800">المؤلف</span>
              <span className="text-gray-600">{Book.author}</span>
            </div>

            <div className="flex items-center   gap-2">
              <span className="font-semibold text-gray-800">الناشر</span>
              <span className="text-gray-600">{Book.publisher}</span>
            </div>

            <div className="flex items-center   gap-2">
              <span className="font-semibold text-gray-800">عام النشر</span>
              <span className="text-gray-600">{Book.published_year}</span>
            </div>

            <div className="flex items-center   gap-2">
              <span className="font-semibold text-gray-800">التصنيف</span>
              <span className="text-gray-600">{Book.category}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
