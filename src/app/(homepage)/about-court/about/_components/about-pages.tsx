import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: "المستشارون بالمحكمة",
      description:
        "بيان ببطاقات مستشاري المحكمة العليا، يشمل العاملين منهم فقط. منه يمكن الاطلاع على كل أعمال المستشار والأحكام التي شارك فيها مما هو منشور بالموقع، وذلك بالنقر على بطاقته",
      image: "/assets/free_icon_1.svg",

      route: "/about-court/counselors",
    },
    {
      id: 2,
      title: "الجمعية العمومية",
      description:
        "وهي السلطة العليا في المحكمة بموجب قانون المحكمة العليا. من هنا تتطلع على قراراتها وما تعلق بها من شؤون",

      image: "/assets/free_icon_1 (4).svg",
      route: "/about-court/general-assembly",
    },
    {
      id: 3,
      title: "الهيكل التنظيمي للمحكمة",
      description:
        "مجرد عرض للبنية الوظيفية في المحكمة، وذلك بحسب أقسامها وفروعها، ابتداء من الجمعية العمومية ورئيس المحكمة العليا.",

      image: "/assets/free_icon_1 (1).svg",

      route: "/about-court/structure-court",
    },
    {
      id: 4,
      title: "أخبار المحكمة العليا",
      description:
        "اطلع على أهم أخبار المحكمة بما فيعا من إعلانات ومناسبات وأحداث مهمة تتصل بالعلمية القضائية وبالعمل الإداري والنشاطات المهمة.",

      image: "/assets/free_icon_1 (8).svg",

      route: "/about-court/news",
    },
    {
      id: 5,
      title: "معدلات الأداء",
      description:
        "ترسيخاً لمبدأ العلنية، يمكن للزوار الكرام الاطلاع على سير العمل القضائي في المحكمة العليا، ومعدلات الفصل في الطعون، في أشكال بيانيةٍ، أسهلَ دلالةً، وأوفرَ وقتاً",

      image: "/assets/free_icon_1 (7).svg",

      route: "/about-court/performance-metrics",
    },
    {
      id: 6,
      title: "قوانين المحكمة العليا",
      description:
        "حزمة من النصوص القانونية، والتشريعات، واللوائح المتعلقة بالمحكمة العليا: نظام عملها، نظر الطعون أمامها، القواعد المنظمة لعمل الدائرة الدستورية بها",

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
