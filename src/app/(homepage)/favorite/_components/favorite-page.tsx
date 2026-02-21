"use client";

import SecondaryHeading from "@/components/common/seondary-heading";
import Image from "next/image";
import Link from "next/link";
import {
  FaGavel,
  FaBook,
  FaQuestionCircle,
  FaFileAlt,
  FaBalanceScale,
  FaNewspaper,
  FaScroll,
} from "react-icons/fa";

export default function FavoritesPage() {
  const favoriteTypes = [
    {
      id: 1,
      title: "المبادئ القانونية",
      description: "مختاراتك من أحكام المحكمة العليا من مختلف دوائرها",
      icon: FaGavel,
      image: "/assets/articles.svg",
      route: "/favorite/articles",
    },
    {
      id: 2,
      title: "الكتب والإصدارات",
      description: "مفضلتك من كتب المكتبة وإصدارات المحكمة العليا",
      icon: FaBook,
      route: "/favorite/books",
      image: "/assets/booksPup.svg",
    },
    {
      id: 3,
      title: "المعلومات المهمة",
      description: "أهم الأسئلة التي تهمك عن مختلف أعمال المحكمة العليا",
      icon: FaQuestionCircle,
      route: "/favorite/questions",
      image: "/assets/important-notices.png",
    },
    {
      id: 4,
      title: "البحوث والأوراق العلمية",
      description:
        "الوصول السريع لتفضيلاتك من البحوث والمقالات المنشورة على الموقع",
      icon: FaFileAlt,
      route: "/favorite/research",
      image: "/assets/research.svg",
    },
    {
      id: 5,
      title: "القوانين",
      description:
        "مجموعة القوانين والقرارات واللوائح المنتقاة لسهولة الرجوع إليها",
      icon: FaBalanceScale,
      route: "/favorite/law",
      image: "/assets/free_icon_1 (5).svg",
    },
    {
      id: 6,
      title: "أخبار المحكمة",
      description: "حزمة الأحداث وقرارات الجمعية العمومية المختارة",
      icon: FaNewspaper,
      route: "/favorite/news",
      image: "/assets/free_icon_1 (8).svg",
    },
    {
      id: 7,
      title: "المبادئ",
      description: "مختاراتك من المبادئ القانونية المحفوظة لسهولة الرجوع إليها",
      icon: FaScroll,
      route: "/favorite/principles",
      image: "/assets/articles.svg",
    },
  ];

  return (
    <>
      <SecondaryHeading title="مجلدي" breadcrumb />

      <div className="min-h-screen py-40">
        <div className="box-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteTypes.map((service) => {
              return (
                <Link
                  href={`${service.route}`}
                  key={service.id}
                  className="transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
                >
                  <div className="p-8 text-center">
                    <div className="w-40 h-40 border-input border rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-main/10 transition-colors duration-300">
                      <Image
                        src={service.image}
                        alt="Image"
                        width={60}
                        height={60}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-main transition-colors duration-300">
                      {service.title}
                    </h3>
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
