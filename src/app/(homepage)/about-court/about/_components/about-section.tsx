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
            تم إنشاء المحكمة العليا في ليبيا عقب استقلال البلاد بتاريخ
            20-02-1953م، بالرغم من النص عليها في الدستور الذي أقرّته الجمعية
            الوطنية الليبية بتاريخ 20-12-1951م، إلا أنها لم تظهر إلى الوجود
            فعليًا إلا بعد صدور قانون المحكمة العليا الاتحادية بتاريخ
            17-11-1953م
          </p>
          <p className="text-base font-medium text-justify">
            جرى تعديل القانون بالمرسوم الصادر بتاريخ 22-04-1954م، ومنذ ذلك
            التاريخ شرعت المحكمة في ممارسة اختصاصاتها كمحكمة دستورية، ومحكمة نقض
            في القضايا المدنية والتجارية والأحوال الشرعية، ومحكمة للقضاء
            الإداري، ومحكمة خاصة بالطعون الانتخابية، بالإضافة إلى دورها في
            الفتوى والتشريع، وذلك نظرًا لحاجة البلاد آنذاك إلى جهة قانونية
            متخصصة وذات خبرة في تفسير القوانين ومراجعتها قبل إصدارها من الحكومة
            الاتحادية وحكومات الولايات.
          </p>
          <p className="text-base font-medium text-justify">
            أعاد المشرّع تنظيم المحكمة بقرار صدر بتاريخ 29-09-1959م، ثم صدر
            القانون رقم (8) لسنة 1962م بشأن إعادة تنظيم المحكمة العليا، والذي تم
            تعديله بالقانون رقم (20) لسنة 1963م، ثم بالقانون رقم (10) لسنة
            1973م، وأخيرًا بالقانون رقم (22) لسنة 1984م. هذا القانون وتعديلاته
            هو الذي يحدد اختصاصات المحكمة العليا حاليًا، وينظم أعمالها، ويبين
            دورها على رأس الهرم القضائي في البلاد.
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
