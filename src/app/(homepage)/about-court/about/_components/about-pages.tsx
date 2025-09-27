import React from "react";
import { Briefcase, Plane, Layers } from "lucide-react";
import Link from "next/link";

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: "المستشارون بالمحكمة",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      icon: (
        <Briefcase className="w-8 h-8 text-main group-hover:scale-125 duration-300 transition-all" />
      ),
      route: "/about-court/counselors",
    },
    {
      id: 2,
      title: "الجمعية العمومية",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      icon: (
        <Plane className="w-8 h-8 text-main group-hover:scale-125 duration-300 transition-all" />
      ),
      route: "/about-court/general-assembly",
    },
    {
      id: 3,
      title: "الهيكل التنظيمي للمحكمة",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      icon: (
        <Layers className="w-8 h-8 text-main group-hover:scale-125 duration-300 transition-all" />
      ),
      route: "/about-court/structure-court",
    },
    {
      id: 4,
      title: "أخبار المحكمة العليا",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      icon: (
        <Briefcase className="w-8 h-8 text-main group-hover:scale-125 duration-300 transition-all" />
      ),
      route: "/about-court/news",
    },
    {
      id: 5,
      title: "معدلات الأداء",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      icon: (
        <Plane className="w-8 h-8 text-main group-hover:scale-125 duration-300 transition-all" />
      ),
      route: "/about-court/performance-metrics",
    },
    {
      id: 6,
      title: "قوانين المحكمة العليا",
      description:
        "هيكل من القوانين الأساسية يحمل المحكمة الأهلية مع تمويض أعمري من قوانين المرافعات أمري من قبل ذلك المرافعات",
      icon: (
        <Layers className="w-8 h-8 text-main group-hover:scale-125 duration-300 transition-all" />
      ),
      route: "/about-court/courts-law",
    },
  ];

  return (
    <div className="min-h-screen py-12">
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
                  {service.icon}
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
