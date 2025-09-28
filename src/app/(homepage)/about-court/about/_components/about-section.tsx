import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 flex items-start lg:flex-row flex-col justify-between gap-20 box-container ">
      <div className="border-1 border-main w-full md:w-1/2 lg:w-[35%] h-[250px] sm:h-[350px] md:h-[600px] p-2 sm:p-4 self-center">
        <Image
          src={"/assets/bg-1.jpg"}
          alt="abpute image"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 -mt-3">
        <h2 className="text-main text-5xl mb-5">عن المحكمة</h2>
        <div className="flex flex-col gap-5">
          <p className="text-base font-medium text-justify">
            تعتلي المحكمة العليا قمة هرم السلطة القضائية في ليبيا، وتتمحور
            وظيفتها الرئيسة حول عملين اثنين: ضمان الشرعية الدستورية، ورقابة
            التطبيق الصحيح للقانون. فهي تكفل بالأولى بقاء الشرعية الدستورية في
            مدارجها العليا، بمواجهة انتهاك السلطة التشريعية للدستور، وإبطال
            أعمالها المخالفة وردّها إلى سواء السبيل وإلى حظيرة المشروعية
            الدستورية. أما الوظيفة الثانية، فتمارسها بوصفها محكمة قانون، إذ تضمن
            سلامة تطبيق المحاكم الدنيا للقانون، وتوحيده بما تتبناه من تفسيرات.
          </p>
          <p className="text-base font-medium text-justify">
            نشأت المحكمة العليا بدائرتها الدستورية نشأة دستورية بموجب دستور
            المملكة الليبية لعام 1951. ومنذ ذلك التاريخ لم تنفك القيمة القانونية
            للمبادئ التي ترسيها ملزمة لها. فقد نصت المادة 155 من الدستور على أن
            المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع
            المحاكم في المملكة الليبية المتحدة. وقد رسخت هذه القاعدة الدستورية
            بعد ذلك وفصّلتها المادة 28 من القانون رقم 14 لسنة 1953 بشأن المحكمة
            العليا الاتحادية للمملكة الليبية المتحدة، إذ بيّنت أن القوة الملزمة
            لمبادئ المحكمة لا تقف عند حدود عمل المحاكم، بل تمتد لتحكم وظائف
            السلطات كافة في البلاد
          </p>
          <p className="text-base font-medium text-justify">
            ظلت القوة الإلزامية للقواعد التي ترسيها المحكمة العليا، المستقرة في
            دستور البلاد، قائمة في ظل التحولات السياسية. وبصدور القانون رقم 6
            لسنة 1982 بإعادة تنظيم المحكمة العليا، استقر هذا المبدأ مع تعديل
            جزئي أوضح نطاق الإلزام بشكل أكبر، إذ نصت المادة 31 منه على أن
            المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع
            المحاكم وكافة الجهات الأخرى
          </p>
          <div className="w-fit">
            <div className="relative">
              <p className="text-[200px] font-majalla -mt-16 -mb-28">73</p>
              <span className="absolute top-[170px] text-lg -left-10">
                عاماً
              </span>
            </div>
          </div>
          <p className="text-lg font-medium text-justify">
            منذ التأسيس ونشأة الدائرة الدستورية
          </p>
        </div>
      </div>
    </section>
  );
}
