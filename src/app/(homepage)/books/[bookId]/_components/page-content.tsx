"use client";

import Image from "next/image";

export default function PageContent({ Book }: { Book: BookData }) {
  return (
    <>
      <section className="box-container h-full w-full py-20">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-8">
          <Image
            src={Book.book_image || "/assets/book-1.jpg"}
            alt="Book cover"
            width={340}
            height={480}
            className="rounded-lg shadow-lg w-[340px] h-[480px]"
          />

          <div className="flex flex-col self-start gap-2">
            <h2 className="font-bold sm:text-2xl lg:text-3xl text-main mb-10">
              {Book.title}
            </h2>

            <Info label="المؤلف" value={Book.author} />
            <Info label="الناشر" value={Book.publisher} />
            <Info label="عام النشر" value={Book.published_year} />
            <Info label="التصنيف" value={Book.category} />
            <Info label="عدد الصفحات" value={Book.book_number} />
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-gray-800">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}
