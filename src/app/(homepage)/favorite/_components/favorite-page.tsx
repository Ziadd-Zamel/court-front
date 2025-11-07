"use client";

import SecondaryHeading from "@/components/common/seondary-heading";
import Link from "next/link";
import {
  FaGavel,
  FaBook,
  FaQuestionCircle,
  FaFileAlt,
  FaBalanceScale,
  FaNewspaper,
} from "react-icons/fa";

export default function FavoritesPage() {
  const favoriteTypes = [
    {
      id: 1,
      title: "المبادئ القانونية",
      description: "مختاراتك من أحكام المحكمة العليا من مختلف دوائرها",
      icon: FaGavel,
      route: "/favorite/articles",
    },
    {
      id: 2,
      title: "الكتب والإصدارات",
      description: "مفضلتك من كتب المكتبة وإصدارات المحكمة العليا",
      icon: FaBook,
      route: "/favorite/books",
    },
    {
      id: 3,
      title: "المعلومات المهمة",
      description: "أهم الأسئلة التي تهمك عن مختلف أعمال المحكمة العليا",
      icon: FaQuestionCircle,
      route: "/favorite/questions",
    },
    {
      id: 4,
      title: "البحوث والأوراق العلمية",
      description:
        "الوصول السريع لتفضيلاتك من البحوث والمقالات المنشورة على الموقع",
      icon: FaFileAlt,
      route: "/favorite/research",
    },
    {
      id: 5,
      title: "القوانين",
      description:
        "مجموعة القوانين والقرارات واللوائح المنتقاة لسهولة الرجوع إليها",
      icon: FaBalanceScale,
      route: "/favorite/law",
    },
    {
      id: 6,
      title: "أخبار المحكمة",
      description: "حزمة الأحداث وقرارات الجمعية العمومية المختارة",
      icon: FaNewspaper,
      route: "/favorite/news",
    },
  ];

  return (
    <>
      <SecondaryHeading title="مجلدي" breadcrumb />

      <div className="min-h-screen py-40">
        <div className="box-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteTypes.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  href={`${service.route}`}
                  key={service.id}
                  className="transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
                >
                  <div className="p-8 text-center">
                    <div className="w-40 h-40 border-input border rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-main/10 transition-colors duration-300">
                      <Icon className="text-6xl text-main" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-main transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
