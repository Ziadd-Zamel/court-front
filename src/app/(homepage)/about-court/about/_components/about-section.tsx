import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 flex items-start lg:flex-row flex-col justify-between gap-20 box-container ">
      <div className="border-1 border-main w-full md:w-1/2 lg:w-[35%] h-[250px] sm:h-[350px] md:h-[600px] p-2 sm:p-4 self-center">
        <Image
          src={"/assets/aboute.jpg"}
          alt="abpute image"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 -mt-3">
        <h2 className="text-main text-5xl mb-5">نبذة عن المحكمة</h2>
        <div className="flex flex-col gap-5 mt-2">
          <p className="text-base font-medium text-justify">
            تعتلي المحكمة العليا قمة هرم السلطة القضائية في ليبيا. تتمحور
            وظيفتها الرئيسة على عملين اثنين: ضمان الشرعية الدستورية؛ ورقابة
            التطبيق الصحيح للقانون. تكفل بالأولى بقاء الشرعية الدستورية في
            مدارجها العليا بمواجهة انتهاك السلطة التشريعية للدستور، وإبطالِ
            أعمالها المخالفة له وردِّها إلى سواء السبيل، إلى حظيرة المشروعية
            الدستورية. وأما الوظيفة الثانية، فتمارسها بوصفها محكمة قانون، وتضمن
            بها سلامةَ تطبيق المحاكم الدنيا للقانون، وتوحيدَه بما تتبناه من
            تفسيرات.
          </p>
          <p className="text-base font-medium text-justify">
            {`نشأت المحكمة العليا بدائرتها الدستورية نشأة دستورية بموجب دستور المملكة الليبية لعام 1951. منذ ذلك التاريخ، لم تنفك القيمة القانونية للمبادئ التي ترسيها ملازمة لها. نصت المادة 155 من الدستور على أن: "تكون المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع المحاكم في المملكة الليبية المتحدة." وقد رسخت هذه القاعدة الدستورية بعد ذلك وفصّلتها المادة 28 من القانون 14 لسنة 1953 بشأن المحكمة العليا الاتحادية للمملكة الليبية المتحدة، إذ كشفت عن أن القوة الملزمة لمبادئ المحكمة لا تقف عند حدود عمل المحاكم، بل تمتد لتحكم وظائف السلطات كافةً في البلاد.`}
          </p>
          <p className="text-base font-medium text-justify">
            {`ظلت القوة الإلزامية للقواعد التي ترسيها المحكمة العليا، المتجذِّرة في دستور البلاد، قائمة في ظل التحولات السياسية. وبصدور القانون 6 لسنة 1982 بإعادة تنظيم المحكمة العليا، استقرت بتعديل جزئي وضح نطاق الإلزام بشكل أكثر إذ نصت المادة 31 منه على أن: "تكون المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع المحاكم وكافة الجهات الأخرى."`}
          </p>
          <div className="w-fit">
            <div className="relative">
              <p className="text-[140px] font-merriweather font-extrabold -mt-5">
                73
              </p>
              <span className="absolute top-[135px] text-xl font-bold -left-10 text-main">
                عاماً
              </span>
            </div>
          </div>
          <p className="text-3xl -mt-12 font-semibold text-main mr-2">
            منذ التأسيس ونشأة الدائرة الدستورية
          </p>
        </div>
      </div>
    </section>
  );
}
