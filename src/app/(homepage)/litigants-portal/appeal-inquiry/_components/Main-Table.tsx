import CustomRow from "./custom-table-row";
import SimpleTableRow from "./simple-table-row";

interface PageContentProps {
  caseData: CaseDataType[] | undefined;
  error: string | null;
}

export default function MainTable({ caseData }: PageContentProps) {
  console.log(caseData);
  return (
    <section className="">
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow
            white={false}
            label="رقم الطعن"
            value={caseData?.[0]?.rippId || ""}
          />
          <SimpleTableRow
            label="السنة القضائية"
            value={caseData?.[0]?.year?.toString() || ""}
          />
          <SimpleTableRow
            white={false}
            label="نوع الطعن"
            value={caseData?.[0]?.classname || ""}
          />
          <SimpleTableRow label="تاريخ التقرير" value="" />
          <SimpleTableRow white={false} label="الحكم المطعون فيه" value="" />
          <CustomRow
            label="رقم الدعوى"
            value={caseData?.[0]?.issueId.toString() || ""}
          />
          <CustomRow label="المحكمة" value={caseData?.[0]?.orgname || ""} />
          <CustomRow label="منطوق الحكم" value="" />
        </tbody>
      </table>

      {/* Appellant Information - بيانات الطاعن/الطاعنين */}
      <table className="w-full border-collapse mt-10">
        <tbody>
          <SimpleTableRow
            white={false}
            label="بيانات الطاعن/الطاعنين"
            value={caseData?.[0]?.appellant || ""}
          />
          <SimpleTableRow
            label="الاسم"
            value={caseData?.[0]?.appellant || ""}
          />
          <SimpleTableRow white={false} label="الصفة" value="" />
          <CustomRow label="شخص طبيعي" value="" />
          <CustomRow label="مواطن أجنبي" value="" />
          <CustomRow label="شخص اعتباري عام" value="" />
        </tbody>
      </table>

      {/* Respondent Information - بيانات المطعون ضده/ضدهم */}
      <table className="w-full border-collapse mt-10">
        <tbody>
          <SimpleTableRow
            white={false}
            label="بيانات المطعون ضده/ضدهم"
            value={caseData?.[0]?.ripper || ""}
          />
          <SimpleTableRow label="الاسم" value={caseData?.[0]?.ripper || ""} />
          <SimpleTableRow white={false} label="الصفة" value="" />
          <CustomRow label="شخص طبيعي" value="" />
          <CustomRow label="شخص اعتباري عام" value="" />
          <CustomRow label="شخص اعتباري خاص" value="" />
          <CustomRow label="المحامي/المحامون" value="" />
        </tbody>
      </table>

      {/* Urgent Section - الشق المستعجل */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-10">
        الشق المستعجل
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow white={false} label="الدائرة المختصة" value="" />
          <SimpleTableRow label="تاريخ الجلسة" value="" />
          <SimpleTableRow white={false} label="منطوق الحكم" value="" />
        </tbody>
      </table>

      {/* Appeal Examination - فحص الطعن */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-10">
        فحص الطعن
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow white={false} label="الدائرة المختصة" value="" />
          <SimpleTableRow label="تاريخ الجلسة" value="" />
          <SimpleTableRow white={false} label="منطوق القرار" value="" />
        </tbody>
      </table>

      {/* Case Conclusion - نهاية النقض */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-10">
        نهاية النقض
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow
            white={false}
            label="تاريخ الإحالة إلى نيابة النقض"
            value=""
          />
          <SimpleTableRow label="تاريخ إيداع مذكرة النيابة" value="" />
          <SimpleTableRow white={false} label="ملخص الرأي" value="" />
          <SimpleTableRow label="الرأي الختامي" value="" />
        </tbody>
      </table>

      {/* Appeal Consideration - نظر الطعن */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-10">
        نظر الطعن
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow white={false} label="الدائرة المختصة" value="" />
          <SimpleTableRow label="جلسة/جلسات المرافعة" value="" />
        </tbody>
      </table>

      {/* Previous Decision - الحكم السابق على الفصل في الطعن */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-10">
        الحكم السابق على الفصل في الطعن
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow white={false} label="تاريخ الجلسة" value="" />
          <SimpleTableRow label="منطوق الحكم" value="" />
        </tbody>
      </table>

      {/* Final Decision - الفصل في الطعن */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-10">
        الفصل في الطعن
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow
            white={false}
            label="تاريخ الحكم"
            value={
              caseData?.[0]?.sessions?.find(
                (session) => session.ruling && session.ruling !== "بلا"
              )?.session_date || ""
            }
          />
          <SimpleTableRow
            label="منطوق الحكم"
            value={
              caseData?.[0]?.sessions?.find(
                (session) => session.ruling && session.ruling !== "بلا"
              )?.ruling || ""
            }
          />
          <SimpleTableRow white={false} label="إيداع مسودة الحكم" value="" />
          <SimpleTableRow label="توقيع النسخة النهائية للحكم" value="" />
        </tbody>
      </table>
    </section>
  );
}
