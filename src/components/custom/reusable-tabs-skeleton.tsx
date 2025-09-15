interface ReusableTabsSkeletonProps {
  showSearch?: boolean;
  direction?: "ltr" | "rtl";
  className?: string;
  tabsCount?: number;
}

// Universal skeleton for any tab content
export default function ReusableTabsSkeleton({
  showSearch = true,
  direction = "rtl",
  className = "",
  tabsCount = 5,
}: ReusableTabsSkeletonProps) {
  return (
    <div dir={direction} className={`w-full ${className} mt-20 animate-pulse`}>
      <div className="flex flex-col lg:flex-row md:items-start gap-20 w-full">
        {/* Tab list skeleton */}
        <div
          className={`flex flex-col items-center gap-1 md:max-w-[300px] w-full bg-transparent mt-40`}
        >
          {showSearch && (
            <div className="w-full mb-12">
              {/* Search bar skeleton */}
              <div className="relative">
                <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-300 rounded"></div>
              </div>
            </div>
          )}

          {/* Tab triggers skeleton */}
          {Array.from({ length: tabsCount }).map((_, index) => (
            <div
              key={index}
              className="w-full h-14 bg-gray-200 rounded-lg mb-1 flex items-center justify-between px-4"
            >
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Tab content skeleton */}
        <div className="w-full">
          <div className="mt-20 lg:mt-16 w-full">
            {/* Heading skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-8 sm:h-10 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Universal content skeleton - Works for any content type */}
            <div className="mt-6 space-y-6">
              {/* Main content area - flexible blocks */}
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-gray-200 rounded h-20"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal version - just basic blocks
export function ReusableTabsSkeletonMinimal({
  showSearch = true,
  direction = "rtl",
  className = "",
  tabsCount = 5,
}: ReusableTabsSkeletonProps) {
  return (
    <div dir={direction} className={`w-full ${className} mt-20 animate-pulse`}>
      <div className="flex flex-col lg:flex-row gap-20 w-full">
        {/* Sidebar skeleton */}
        <div className="md:max-w-[300px] w-full space-y-3 mt-40">
          {showSearch && (
            <div className="w-full h-12 bg-gray-200 rounded-lg mb-6"></div>
          )}
          {Array.from({ length: tabsCount }).map((_, index) => (
            <div
              key={index}
              className="w-full h-12 bg-gray-200 rounded-lg"
            ></div>
          ))}
        </div>

        {/* Content skeleton - Simple blocks */}
        <div className="w-full mt-20 lg:mt-16 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
