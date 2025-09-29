import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: "المستشارون بالمحكمة",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      image: "/assets/free_icon_1.svg",

      route: "/about-court/counselors",
    },
    {
      id: 2,
      title: "الجمعية العمومية",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      image: "/assets/free_icon_1 (4).svg",
      route: "/about-court/general-assembly",
    },
    {
      id: 3,
      title: "الهيكل التنظيمي للمحكمة",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      image: "/assets/free_icon_1 (1).svg",

      route: "/about-court/structure-court",
    },
    {
      id: 4,
      title: "أخبار المحكمة العليا",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      image: "/assets/free_icon_1 (8).svg",

      route: "/about-court/news",
    },
    {
      id: 5,
      title: "معدلات الأداء",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      image: "/assets/free_icon_1 (7).svg",

      route: "/about-court/performance-metrics",
    },
    {
      id: 6,
      title: "قوانين المحكمة العليا",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      image: "/assets/free_icon_1 (5).svg",
      route: "/about-court/courts-law",
    },
  ];

  return (
    <div className="min-h-screen py-40">
      <div className="box-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              href={`${service.route}`}
              key={service.id}
              className="  transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
