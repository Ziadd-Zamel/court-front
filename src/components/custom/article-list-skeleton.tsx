export default function ArticleListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      </div>

      {/* Articles Grid/List Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Image placeholder */}
              <div className="h-48 bg-gray-200"></div>

              <div className="p-6">
                {/* Title skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Meta info skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-8">
        <div className="animate-pulse flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-10 h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Alternative: List layout skeleton
export function ArticleListSkeletonAlt() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      </div>

      {/* Articles List Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-lg shadow-md p-6 flex gap-4">
              {/* Image placeholder */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>

              <div className="flex-1 space-y-3">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>

                {/* Meta info skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-8">
        <div className="animate-pulse flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-10 h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Minimal skeleton for faster loading
export function ArticleListSkeletonMinimal() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
