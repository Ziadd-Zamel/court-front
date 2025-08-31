export default function QuestionSkeleton() {
  return (
    <div className="w-full space-y-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Accordion Trigger Skeleton */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex-1 pr-4">
              {/* Question title skeleton - varying widths for realism */}
              <div
                className="h-5 bg-gray-200 rounded"
                style={{
                  width: i % 2 === 0 ? "75%" : i % 3 === 0 ? "60%" : "85%",
                }}
              ></div>
            </div>
            {/* Chevron skeleton */}
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Occasional expanded content skeleton for variety */}
          {i === 1 && (
            <div className="p-5 pt-0">
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Pagination skeleton */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
