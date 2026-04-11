"use client";

import SecondaryHeading from "@/components/common/seondary-heading";
import { Description } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import {
  FaQuestionCircle,
  FaGavel,
  FaScroll,
  FaFileAlt,
  FaBook,
} from "react-icons/fa";

export default function FavoritesPage() {
  const favoriteTypes = [
    {
      id: 1,
      title: "قضاء النقض",
      description: "مختاراتك من أحكام قضاء النقض",
      icon: FaGavel,
      route: "/favorite/articles",
      image: "/assets/articles.svg",
    },
    {
      id: 2,
      title: "القضاء الدستوري",
      description: "مختاراتك من أحكام القضاء الدستوري",
      icon: FaGavel,
      route: "/favorite/constitutional",
      image: "/assets/articles.svg",
    },
    {
      id: 3,
      title: "المعلومات المهمة",
      description: "مفضلتك من المعلومات الإجرائية التي تهم المتقاضين",
      icon: FaQuestionCircle,
      route: "/favorite/questions",
      image: "/assets/important-notices.png",
    },
    {
      id: 4,
      title: "الكتب والإصدارات",
      description: "مفضلتك من الكتب وإصدارات المحكمة العليا",
      icon: FaBook,
      route: "/favorite/books",
      image: "/assets/booksPup.svg",
    },
    {
      id: 5,
      title: "منصة المبادئ القانونية",
      description: "مختاراتك من مبادئ المحكمة العليا المبوبة المفهرسة",
      icon: FaScroll,
      route: "/favorite/principles",
      image: "/assets/articles.svg",
    },
    {
      id: 6,
      title: "البحوث والأوراق العلمية",
      description: "مفضلتك من البحوث ومذكرات نيابة النقض",
      icon: FaFileAlt,
      route: "/favorite/research",
      image: "/assets/research.svg",
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
                    <div className="w-40 h-40 border-input dark:border-white/50 border rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-main/10 transition-colors duration-300">
                      <Image
                        src={service.image}
                        alt="Image"
                        width={60}
                        height={60}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-main transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm dark:text-white/70">
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
