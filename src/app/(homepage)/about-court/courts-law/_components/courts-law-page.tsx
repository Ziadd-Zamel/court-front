import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchQueries: {
    search?: string;
  };
};

export default function CourtLawsPage({ pagination, searchQueries }: Props) {
  // Tabs data configuration
  const courtReleaseTabs: TabItem[] = [
    {
      label: "نصوص الطعن بالنقض",
      value: "cassation-texts",
      heading: "نصوص الطعن بالنقض",
      component: (
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          <p className="text-gray-800 leading-relaxed text-lg">
            حيث إن ما استند إليه المدعي في البرهنة على ملكية البائعة ما بلعته
            إياه من الأرض انحصر في عقد القسمة العبري، فإن هذا لا يسعفه ليقرر
            سؤاله بالصحة والنفاذ فحدوى هذا العقد ههنا يتوقف على صلاحيته
            القانونية لنقل الملكية إليها، وحيث إنه بذاته لا يصلح لذلك، بل سيوجب
            إما تسجيله في السجل العقاري، وإما حكماً قضائياً بصحته ونفاذه وتسجيل
            هذا الحكم بذلك السجل. لذلك، كان على المدعي التدليل على تحقق واحد من
            هذين الشرطين. فإن لم يكن، امتنع حسبان المدعي عليها مالكة ما باعت،
            وانعدمت، من ثم، قدرتها على نقل الملكية، ولم يبق أمام المدعي إلا أن
            يختصم أطراف عقد القسمة جميعهم ليطلب الحكم بصحته، توطئة للحكم بصحة
            عقده ونفاذه. فإذا ما أجيب طلبه وسجل الحكم الصادر بصحة العقدين انتقلت
            الملكية إليه. فهذا وحده ما يوافق الأحكام المقررة في انتقال الملكية
            وأسباب نقلها، ويضمن تسلسل أسباب اكتسابها من المالك إلى المدعي.
          </p>
        </div>
      ),
    },
    {
      label: "اللائحة التنفيذية",
      value: "executive-regulation",
      heading: "اللائحة التنفيذية",
      component: (
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          <p className="text-gray-800 leading-relaxed text-lg">
            تحتوي هذه الصفحة على اللائحة التنفيذية للمحكمة العليا والقواعد
            والإجراءات المنظمة لعمل المحكمة. تشمل اللائحة التنفيذية جميع الأحكام
            والقواعد التي تحكم سير العمل في المحكمة العليا وإجراءات النظر في
            القضايا المعروضة عليها. كما تتضمن الشروط والمتطلبات اللازمة لتقديم
            الطعون والالتماسات والمذكرات القانونية، بالإضافة إلى المواعيد
            القانونية والرسوم القضائية المطلوبة.
          </p>
        </div>
      ),
    },
    {
      label: "اللائحة الداخلية",
      value: "internal-regulation",
      heading: "اللائحة الداخلية",
      component: (
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          <p className="text-gray-800 leading-relaxed text-lg">
            اللائحة الداخلية للمحكمة العليا تنظم الأعمال الإدارية والتنظيمية
            داخل المحكمة. تشمل هذه اللائحة قواعد وإجراءات العمل الداخلي، وتوزيع
            الاختصاصات بين مختلف الدوائر والأقسام، وآليات التعامل مع الملفات
            والوثائق القضائية. كما تتضمن القواعد المتعلقة بإدارة الجلسات
            القضائية والمرافعات الشفوية، وضوابط النشر والإعلان عن الأحكام
            والقرارات الصادرة عن المحكمة.
          </p>
        </div>
      ),
    },
    {
      label: "نصوص أخرى",
      value: "other-texts",
      heading: "نصوص أخرى",
      component: (
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          <p className="text-gray-800 leading-relaxed text-lg">
            تحتوي هذه الصفحة على مجموعة متنوعة من النصوص القانونية والقرارات
            والتعليمات الإضافية الصادرة عن المحكمة العليا. تشمل هذه النصوص
            المنشورات القضائية، والتعليقات على الأحكام المهمة، والدراسات
            القانونية المتخصصة. كما تتضمن المراسلات الرسمية والتعاميم الصادرة عن
            رئاسة المحكمة، بالإضافة إلى الإحصائيات السنوية وتقارير الأداء
            القضائي والتطورات في مجال القانون والقضاء.
          </p>
        </div>
      ),
    },
    {
      label: "قوانين أخرى",
      value: "other-laws",
      heading: "قوانين أخرى",
      component: (
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          <p className="text-gray-800 leading-relaxed text-lg">
            هذا القسم مخصص للقوانين والتشريعات الأخرى ذات الصلة بعمل المحكمة
            العليا. يشمل القوانين المكملة والتشريعات المساعدة التي تحكم النظام
            القضائي في الدولة. تتضمن هذه القوانين التشريعات المتعلقة بتنظيم
            المهن القانونية، وقوانين الإجراءات المدنية والجنائية، والقوانين
            الخاصة بالتنفيذ والحجز. كما تشمل الاتفاقيات الدولية والمعاهدات التي
            انضمت إليها الدولة في المجال القضائي والقانوني.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container mb-20"
    >
      <ReusableTabs
        tabs={courtReleaseTabs}
        defaultValue="cassation-texts"
        tabContentClassName="lg:mt-[130px]"
      />
    </section>
  );
}
