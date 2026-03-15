export default function VistorServices() {
  return (
    <section className="-mt-9">
      <h2 className="text-main font-semibold text-2xl pb-4 border-b-3 border-b-main pe-10 w-fit  mb-8">
        دليل الاستخدام
      </h2>

      {/* هدف المكتبة */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">هدف المكتبة:</h3>
        <p className="text-gray-600 dark:text-white/70 font-medium">
          تهدف مكتبة المحكمة العليا إلى توفير بيئة علمية مناسبة للبحث القانوني،
          وإتاحة المراجع والدراسات القانونية لرجال القضاء والباحثين والطلبة، بما
          يسهم في تطوير المعرفة القانونية وتعزيز البحث العلمي.
        </p>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* خدمات المكتبة */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">خدمات المكتبة:</h3>
        <p className="text-gray-600 dark:text-white/70 font-medium mb-4">
          تقدم المكتبة الخدمات الآتية:
        </p>
        <ol className="text-gray-600 dark:text-white/70 font-medium list-decimal list-inside space-y-2 marker:text-main">
          <li>
            إتاحة الاطلاع على الكتب والمراجع القانونية داخل قاعات المطالعة.
          </li>
          <li>مساعدة الباحثين في الوصول إلى المصادر القانونية.</li>
          <li>إتاحة البحث في الفهارس الورقية والإلكترونية للمكتبة.</li>
          <li>إرشاد الباحثين إلى المصادر والمراجع المناسبة لموضوعاتهم.</li>
        </ol>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* مواعيد استقبال الزوار */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">
          مواعيد استقبال الزوار:
        </h3>
        <ol className="text-gray-600 dark:text-white/70 font-medium list-decimal list-inside space-y-4 marker:text-main">
          <li>
            <span className="font-semibold">
              العاملون بالمحكمة العليا وأعضاء الهيئات القضائية
            </span>
            <br />
            من الأحد إلى الخميس
            <br />
            من الساعة 09:00 صباحاً إلى 14:00 ظهراً.
          </li>
          <li>
            <span className="font-semibold">الطلبة والباحثون والقانونيون</span>
            <br />
            من الأحد إلى الأربعاء
            <br />
            من الساعة 09:00 صباحاً إلى 14:00 ظهراً.
          </li>
        </ol>
        <p className="text-gray-600 dark:text-white/70 font-medium mt-4">
          يجوز لإدارة المكتبة تعديل هذه المواعيد متى اقتضت الحاجة.
        </p>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* التسجيل والدخول */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">التسجيل والدخول:</h3>
        <ol className="text-gray-600 dark:text-white/70 font-medium list-decimal list-inside space-y-2 marker:text-main">
          <li>
            يتعين على الزائر تسجيل حضوره عند الدخول باستخدام بطاقة تعريف سارية.
          </li>
          <li>يجوز لموظفي المكتبة طلب إبراز بطاقة التعريف عند الحاجة.</li>
          <li>يلتزم الزائر بالتقيد بتعليمات موظفي المكتبة.</li>
        </ol>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* نظام الاطلاع */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">نظام الاطلاع:</h3>
        <ol className="text-gray-600 dark:text-white/70 font-medium list-decimal list-inside space-y-2 marker:text-main">
          <li>يقتصر الاطلاع على الكتب والمراجع داخل قاعات المكتبة.</li>
          <li>يجب تسليم الكتب إلى موظف المكتبة بعد الانتهاء منها.</li>
          <li>لا يجوز للزائر إعادة الكتب إلى الرفوف بنفسه.</li>
        </ol>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* التصوير والنسخ */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">التصوير والنسخ:</h3>
        <ol className="text-gray-600 dark:text-white/70 font-medium list-decimal list-inside space-y-2 marker:text-main">
          <li>
            يمنع تصوير الكتب أو الوثائق أو نسخها حفاظاً على حقوق الملكية
            الفكرية.
          </li>
          <li>
            يجوز السماح بالتصوير في حالات استثنائية بإذن من إدارة المكتبة.
          </li>
        </ol>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* نظام الاستعارة */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">نظام الاستعارة:</h3>
        <ol className="text-gray-600 dark:text-white/70 font-medium list-decimal list-inside space-y-2 marker:text-main">
          <li>
            خدمة الاستعارة الخارجية معلّقة في الوقت الحالي إلى حين إشعار آخر.
          </li>
        </ol>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* المحافظة على مقتنيات المكتبة */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">
          المحافظة على مقتنيات المكتبة:
        </h3>
        <p className="text-gray-600 dark:text-white/70 font-medium mb-4">يلتزم الزائر بما يأتي:</p>
        <ul className="text-gray-600 dark:text-white/70 font-medium list-disc list-inside space-y-2 marker:text-main">
          <li>المحافظة على الكتب والمراجع.</li>
          <li>
            المحافظة على سلامة صفحات الكتب والمراجع، وعدم طيّها أو الكتابة عليها
            أو إلحاق الضرر بها.
          </li>
          <li>المحافظة على أجهزة المكتبة وأثاثها.</li>
          <li>استخدام الأجهزة في أغراض البحث فقط.</li>
        </ul>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* النظام داخل قاعات المطالعة */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">
          النظام داخل قاعات المطالعة:
        </h3>
        <p className="text-gray-600 dark:text-white/70 font-medium mb-4">يلتزم الزائر بما يأتي:</p>
        <ul className="text-gray-600 dark:text-white/70 font-medium list-disc list-inside space-y-2 marker:text-main">
          <li>المحافظة على الهدوء داخل قاعات المطالعة.</li>
          <li>احترام خصوصية الباحثين الآخرين.</li>
          <li>ضبط الهاتف المحمول على الوضع الصامت.</li>
          <li>الامتناع عن إجراء المكالمات داخل قاعات المطالعة.</li>
        </ul>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* الطعام والتدخين */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">الطعام والتدخين:</h3>
        <ol className="text-gray-600 dark:text-white/70 font-medium list-decimal list-inside space-y-2 marker:text-main">
          <li>يمنع إدخال الأطعمة إلى قاعات المكتبة.</li>
          <li>يسمح بالمشروبات فقط بما لا يضر بالمقتنيات.</li>
          <li>يمنع التدخين منعاً باتاً في جميع مرافق المكتبة.</li>
        </ol>
        <div className="w-full h-px bg-main mt-8" />
      </div>

      {/* إدارة المكتبة */}
      <div className=" mb-8">
        <h3 className="text-xl font-bold text-main mb-6">إدارة المكتبة:</h3>
        <p className="text-gray-600 dark:text-white/70 font-medium">
          يعدّ ضمان حسن استخدام المكتبة والمحافظة على مواردها العلمية من
          المقومات الأساسية لاستمرار عملها بفاعلية. ولذلك، يحق لإدارة المكتبة
          اتخاذ الإجراءات المناسبة في حال مخالفة هذه التعليمات.
        </p>
      </div>
    </section>
  );
}
