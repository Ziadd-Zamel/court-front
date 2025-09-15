export default function PendingBookCard({ book }: { book: PendingBook }) {
  return (
    <div className="border border-black p-4 text-center shadow hover:shadow-lg transition cursor-pointer w-[130px] sm:w-[160px] h-40 sm:h-52 flex flex-col items-center">
      <h3 className=" text-sm sm:text-lg font-semibold mb-2">{book.title}</h3>
      <div className="justify-self-end mt-auto">
        {book.author && (
          <p className=" text-xs sm:text-sm text-gray-600 mb-1">
            {" "}
            {book.author}
          </p>
        )}
        {book.issue_number && (
          <p className=" text-xs sm:text-sm text-gray-600">
            العدد: {book.issue_number}
          </p>
        )}
      </div>
    </div>
  );
}
