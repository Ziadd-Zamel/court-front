import Image from "next/image";
import { YEARS_SINCE_FOUNDING } from "@/lib/constants/app-years";

export default function AboutSection() {
  return (
    <section className="py-20 flex items-start lg:flex-row flex-col gap-25 box-container ">
      <div className="border-1 border-main dark:border-main/50 w-full md:w-1/3 lg:w-[35%] h-[250px] sm:h-[350px] md:h-[700px] p-2 sm:p-4 self-center">
        <Image
          src={"/assets/aboute.jpg"}
          alt="abpute image"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full lg:w-2/3 -mt-3">
        <h2 className="text-main text-4xl mb-5">عن المحكمة العليا</h2>
        <div className="flex flex-col gap-5 mt-2">
          <p className="font-medium text-justify text-sm text-gray-800 dark:text-white/70">
            تعتلي المحكمة العليا قمة هرم السلطة القضائية في ليبيا. تتمحور
            وظيفتها الرئيسة على عملين اثنين: ضمان الشرعية الدستورية؛ ورقابة
            التطبيق الصحيح للقانون. تكفل بالأولى بقاء الشرعية الدستورية في
            مدارجها العليا بمواجهة انتهاك السلطة التشريعية للدستور، وإبطال
            أعمالها المخالفة له وردّها إلى حظيرة المشروعية الدستورية. وأما
            الوظيفة الثانية، فتمارسها بوصفها محكمة قانون، وتضمن بها سلامة
            تطبيق المحاكم الدنيا للقانون، وتوحيده بما تتبناه من تفسيرات.
          </p>
          <p className="font-medium text-justify text-sm text-gray-800 dark:text-white/70">
            {`نشأت المحكمة العليا نشأة دستورية بموجب دستور المملكة الليبية لسنة 1951. منذ ذلك التاريخ، لم تنفك القيمة القانونية للمبادئ التي ترسيها ملازمة لها. نصت المادة 155 من الدستور على أن: "تكون المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع المحاكم في المملكة الليبية المتحدة." وقد رسخت هذه القاعدة الدستورية بعد ذلك وفصّلتها المادة 28 من القانون 14 لسنة 1953 بشأن المحكمة العليا الاتحادية للمملكة الليبية المتحدة، إذ كشفت عن أن القوة الملزمة لمبادئ المحكمة لا تقف عند حدود عمل المحاكم، بل تمتد لتحكم وظائف السلطات كافةً في البلاد.`}
          </p>
          <p className="font-medium text-justify text-sm text-gray-800 dark:text-white/70">
            {`بهذه القيمة القانونية، يرتقي قضاء المحكمة العليا المنطوي على مبدأ قانوني ليشكل قاعدةً قانونيةً يحتج بها على الكافة. وقد ظلت القوة اللزامية للقواعد التي ترسيها، والمتجذّرة في دستور البلاد، قائمة في ظل التحول السياسي عام 1969. وبصدور القانون 6 لسنة 1982 بإعادة تنظيم المحكمة العليا، استقرت بتعديل جزئي في الصياغة أملته الأيديولوجيا السياسية السائدة آنذاك، والميل إلى توضيح نطاق الإلزام بشكل أكثر تفصيلاً، إذ نصت المادة 31 منه على أن: "تكون المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع المحاكم وكافة الجهات الأخرى."`}
          </p>
        </div>
        <div className="w-fit mt-20">
          <div className="relative">
            <p className="text-[120px] font-merriweather font-extrabold -mt-5 text-gray-900 dark:text-white">
              {YEARS_SINCE_FOUNDING}
            </p>
            <span className="absolute top-[115px] text-lg font-bold -left-10 text-main">
              عاماً
            </span>
          </div>
        </div>
        <p className="text-2xl -mt-4 font-semibold text-main mr-2">
          منذ التأسيس ونشأة الدائرة الدستورية
        </p>
      </div>
    </section>
  );
}
