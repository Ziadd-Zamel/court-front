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
    path: "/litigants-portal",
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
    name: "المبادئ ",
    path: "/principle",
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
    path: "/about-court/about",
    // children: [
    //   {
    //     name: "نبذة عن المحكمة",
    //     path: "/about-court/about",
    //   },
    //   {
    //     name: "المستشارون بالمحكمة",
    //     path: "/about-court/counselors",
    //   },
    //   {
    //     name: "الجمعية العمومية",
    //     path: "/about-court/general-assembly",
    //   },
    //   {
    //     name: "الهيكل التنظيمي للمحكمة العليا",
    //     path: "/about-court/structure-court",
    //   },
    //   {
    //     name: "القوانين الخاصة بالمحكمة",
    //     path: "/about-court/courts-law",
    //   },
    //   {
    //     name: "معدلات الأداء",
    //     path: "/about-court/performance-metrics",
    //   },
    //   {
    //     name: "الأخبار",
    //     path: "/about-court/news",
    //   },
    // ],
  },
];
