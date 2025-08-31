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
        name: "الطباعة والنشر",
        path: "/litigants-portal/printing-publishing",
      },
    ],
  },
  {
    name: "الدائرة الدستورية",
    path: "/constitutional-court",
    // children: [
    //   {
    //     name: 'القضاء الدستوري',
    //     path: '/constitutional-court/constitutional-judiciary',
    //   },
    //   {
    //     name: 'عن الدائرة الدستورية',
    //     path: '/constitutional-court/about-constitutional-court',
    //   },
    // ],
  },
  {
    name: "المبادئ القانونية",
    path: "/legal-principles",
    // children: [
    //   {
    //     name: 'قضاء الأحوال الشخصية',
    //     path: '/legal-principles/personal-status-judiciary',
    //   },
    //   {
    //     name: 'قضاء النقض الإداري',
    //     path: '/legal-principles/administrative-cassation-judiciary',
    //   },
    //   {
    //     name: 'قضاء النقض المدني',
    //     path: '/legal-principles/civil-cassation-judiciary',
    //   },
    //   {
    //     name: 'قضاء النقض الجنائي',
    //     path: '/legal-principles/criminal-cassation-judiciary',
    //   },
    //   {
    //     name: 'قضاء الدوائر مجتمعة',
    //     path: '/legal-principles/united-circuits-judiciary',
    //   },
    // ],
  },
  {
    name: "مكتبة المحكمة العليا",
    path: "/supreme-court-library",
    // children: [
    //   {
    //     name: 'الكتب',
    //     path: '/supreme-court-library/books',
    //   },
    //   {
    //     name: 'المقالات والدوريات',
    //     path: '/supreme-court-library/articles-periodicals',
    //   },
    //   {
    //     name: 'خدمات الزوار',
    //     path: '/supreme-court-library/visitor-services',
    //   },
    // ],
  },
  {
    name: "المكتب الفني",
    path: "/technical-office",
    // children: [
    //   {
    //     name: 'أوراق علمية',
    //     path: '/technical-office/scientific-papers',
    //   },
    //   {
    //     name: 'المطبوعات',
    //     path: '/technical-office/publications',
    //   },
    // ],
  },
  {
    name: "عن المحكمة",
    path: "",
    children: [
      {
        name: "المستشارون بالمحكمة",
        path: "/about-court/judges",
      },
      {
        name: "نبذة عن المحكمة",
        path: "/about-court/about",
      },
      {
        name: "القوانين الخاصة بالمحكمة",
        path: "/about-court/laws",
      },
      {
        name: "الاتصال بالمحكمة",
        path: "/about-court/contact",
      },
    ],
  },
];
