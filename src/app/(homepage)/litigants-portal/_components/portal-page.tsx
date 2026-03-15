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
        "راقب تفاصيل إجراءات العملية القضائية المتعلقة بالطعن المرفوع منك أو ضدك، وتابع كل خطواته نحو مرحلته الأخيرة، انتهاءً بالحكم وإيداع نسخته النهائية.",
      image: "/assets/appeal-inquiry.png",
      route: "/litigants-portal/appeal-inquiry",
    },
    {
      id: 2,
      title: "معلومات مهمة",
      description:
        "فضاء مخصص لأسئلة وإجابات مصنّفة، تهم المتقاضين عموماً في مراحل الدعاوى المختلفة أمام المحكمة العليا، وتعيّنهم على تفادي الأخطاء المتكررة.",
      image: "/assets/important-notices.png",
      route: "/litigants-portal/important-notices",
    },
    {
      id: 3,
      title: "إصدارات المحكمة والنشر",
      description:
        "من هنا تطلع على إصدارات المحكمة العليا كافة، وما هو منها قيد الطباعة. ومن هنا أيضاً تطلب إلى المكتب الفني بالمحكمة نشر أعمالك البحثية أو طباعتها.",
      image: "/assets/court-releases.svg",
      route: "/litigants-portal/court-releases",
    },
    {
      id: 4,
      title: "المحامون المقبولون",
      description:
        "بطاقات تعريف بالمحامين المقبولين للترافع أمام المحكمة العليا، تيسيراً للمتقاضين لاختيار ممثليهم القانونيين عن دراية، وبالاستناد إلى بيانات معتمدة.",
      image: "/assets/litigation-services.svg",
      route: "/litigants-portal/litigation-services",
    },
  ];

  return (
    <section
      id="litigants-portal"
      aria-labelledby="litigants-portal Page"
      className="relative py-30 box-container dark:bg-[#121212]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link
            href={`${service.route}`}
            key={service.id}
            className="transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
          >
            <div className="p-6 text-center">
              <div className="w-40 h-40 border-2 border-gray-200 dark:border-white/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-main dark:group-hover:border-main group-hover:bg-main/10 dark:group-hover:bg-main/15 transition-all duration-300">
                <Image
                  src={service.image}
                  alt="Image"
                  width={60}
                  height={60}
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 group-hover:text-main transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-500 dark:text-white/70 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
