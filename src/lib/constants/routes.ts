export type RouteItem = {
  name: string;
  path: string;
  children?: RouteItem[];
};

export const ROUTES: RouteItem[] = [
  {
    name: "الرئيسة",
    path: "/",
  },

  {
    name: "بوابة المتقاضين والقانونيين",
    path: "",
    children: [
      {
        name: "الاستعلام عن طعن",
        path: "/litigants-portal/important-notices",
      },
      {
        name: "معلومات مهمة",
        path: "/litigants-portal/important-notices",
      },
      {
        name: " المحامون المقبولون",
        path: "/litigants-portal/litigation-services",
      },
      {
        name: " إصدارات المحكمة و النشر",
        path: "/litigants-portal/court-releases",
      },
    ],
  },
  {
    name: "الدائرة الدستورية",
    path: "/constitutional-court",
  },
  {
    name: "المبادئ القانونية",
    path: "/legal-principles",
  },
  {
    name: "مكتبة المحكمة العليا",
    path: "/supreme-court-library",
  },
  {
    name: "المكتب الفني",
    path: "/technical-office",
  },
  {
    name: "عن المحكمة",
    path: "",
    children: [
      {
        name: "نبذة عن المحكمة",
        path: "/about-court/about",
      },
      {
        name: "المستشارون بالمحكمة",
        path: "/about-court/counselors",
      },
      {
        name: "الجمعية العمومية",
        path: "/about-court/general-assembly",
      },
      {
        name: "الهيكل التنظيمي للمحكمة العليا",
        path: "/about-court/structure-court",
      },
      {
        name: "القوانين الخاصة بالمحكمة",
        path: "/about-court/courts-law",
      },
      {
        name: "معدلات الأداء",
        path: "/about-court/performance-metrics",
      },
      {
        name: "الأخبار",
        path: "/about-court/news",
      },
    ],
  },
];
