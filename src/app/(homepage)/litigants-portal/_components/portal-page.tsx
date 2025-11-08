"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LitigantsPortalPage() {
  const services = [
    {
      id: 1,
      title: "الاستعلام عن طعن",
      description:
        "راقب تفاصيل إجراءات العملية القضائية المتعلقة بالطعن المرفوع منك أو ضدك، وتابع كل خطوة يخطوها نحو مرحلته الأخيرة، انتهاءً بالحكم الصادر فيه.",
      image: "/assets/appeal-inquiry.png",
      route: "/litigants-portal/appeal-inquiry",
    },
    {
      id: 2,
      title: "معلومات مهمة",
      description:
        "فضاء مخصص لأهم الأسئلة والإجابات المصنّفة التي تهم المتقاضين عموماً في مرحلة الدعوى أمام المحكمة العليا، وتعصمهم من الأخطاء المتكررة.",
      image: "/assets/important-notices.png",
      route: "/litigants-portal/important-notices",
    },
    {
      id: 3,
      title: "إصدارات المحكمة والنشر",
      description:
        "من هنا تطلب نشر أعمالك البحثية، وتطلع على إصدارات المحكمة، المجلة وموسوعة الأحكام وغيرها، المتوفرة وما هو قيد الطباعة.",
      image: "/assets/court-releases.svg",
      route: "/litigants-portal/court-releases",
    },
    {
      id: 4,
      title: "المحامون المقبولون",
      description:
        "بطاقات المحامين المقبولين للترافع أمام المحكمة العليا، تمكيناً للمتقاضين من اختيار ممثليهم القانونيين عن دراية، واستناداً إلى بيانات معتمدة.",
      image: "/assets/litigation-services.svg",
      route: "/litigants-portal/litigation-services",
    },
  ];

  return (
    <section
      id="litigants-portal"
      aria-labelledby="litigants-portal Page"
      className="relative py-40 box-container"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <Link
            href={`${service.route}`}
            key={service.id}
            className="transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
          >
            <div className="p-8 text-center">
              <div className="w-40 h-40 border-input border rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-main/10 transition-colors duration-300">
                <Image src={service.image} alt="Image" width={60} height={60} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-main transition-colors duration-300">
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
    </section>
  );
}
