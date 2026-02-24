"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Image from "next/image";

const routeNameMap: { [key: string]: string } = {
  "/": "Home",
  "/litigants-portal": "بوابة المتقاضين والقانونيين",
  "/litigants-portal/important-notices": "معلومات مهمة",
  "/litigants-portal/appeal-inquiry": "الاستعلام عن الطعون",
  "/litigants-portal/litigation-services": "المحامون المقبولون",
  "/litigants-portal/court-releases": "إصدارات المحكمة و النشر",
  "/technical-office": "المكتب الفني",
  "/supreme-court-library": "مكتبة المحكمة العليا",
  "/constitutional-court": "الدائرة الدستورية",
  "/legal-principles": "المبادئ القانونية",
  "/about-court": "عن المحكمة",
  "/about-court/about": "نبذة عن المحكمة",
  "/about-court/counselors": "المستشارون بالمحكمة",
  "/about-court/general-assembly": "الجمعية العمومية",
  "/about-court/structure-court": "الهيكل التنظيمي للمحكمة العليا",
  "/about-court/courts-law": "القوانين الخاصة بالمحكمة",
  "/about-court/performance-metrics": "معدلات الأداء",
  "/about-court/news": "الأخبار",
  "/favorite": "مجلدي",
  "/favorite/articles": "المبادئ القانونية المفضلة",
  "/favorite/books": "الكتب والإصدارات المفضلة",
  "/favorite/news": "أخبار المحكمة المفضلة",
  "/favorite/research": "البحوث والأوراق العلمية المفضلة",
  "/favorite/law": " القوانين المفضلة",
  "/favorite/questions": "المعلومات المهمة المفضلة",
  "/favorite/principles": "المبادئ المفضلة",
  "/principle": "المبادئ القانونية",
};

// UUID pattern — matches any segment that looks like a UUID or long ID
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Map of parent path → detail label
const dynamicSegmentMap: { [key: string]: string } = {
  "/about-court/news": "تفاصيل الخبر",
  "/legal-principles": "تفاصيل المبدأ",
  "/litigants-portal/important-notices": "تفاصيل الإشعار",
  "/litigants-portal/court-releases": "تفاصيل الإصدار",
};

interface CustomBreadcrumbProps {
  className?: string;
  black?: boolean;
}

export default function CustomBreadcrumb({
  className,
  black,
}: CustomBreadcrumbProps) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  if (pathname === "/") return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList
        className={cn(
          black
            ? "text-black hover:text-black/50"
            : "text-main hover:text-main/50",
        )}
      >
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Image
              src={"/assets/HomePage.svg"}
              alt="Home Icon"
              width={20}
              height={0}
              className="md:size-5 size-4"
            />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.length > 0 && (
          <BreadcrumbSeparator className="-ml-1 -mr-2" />
        )}

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const parentHref = "/" + pathSegments.slice(0, index).join("/");

          // If segment looks like a UUID/ID, resolve a friendly label
          const isId =
            UUID_REGEX.test(segment) ||
            (segment.length > 20 && !segment.includes(" "));
          const displayName = isId
            ? dynamicSegmentMap[parentHref] || "التفاصيل"
            : routeNameMap[href] ||
              segment.charAt(0).toUpperCase() +
                segment.slice(1).replace(/-/g, " ");

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-white">
                    {displayName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="-ml-1" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
