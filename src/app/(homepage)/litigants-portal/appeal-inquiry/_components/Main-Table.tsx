import CustomRow from "./custom-table-row";
import SimpleTableRow from "./simple-table-row";

interface PageContentProps {
  caseData: CaseDataType[] | undefined;
  error: string | null;
}

export default function MainTable({ caseData }: PageContentProps) {
  const caseItem = caseData?.[0];

  if (!caseItem) return null;

  return (
    <section className="">
      <table className="w-full border-collapse">
        <h5 className="text-2xl font-medium text-right pb-5 w-full">
          البيانات العامة
        </h5>
        <tbody className="rounded-md">
          <SimpleTableRow
            white={false}
            label="رقم الطعن"
            value={caseItem.rippId || ""}
          />
          <SimpleTableRow
            label="السنة القضائية"
            value={caseItem.year?.toString() || ""}
          />
          <SimpleTableRow
            white={false}
            label="نوع الطعن"
            value={caseItem.classname || ""}
          />
          <SimpleTableRow
            label="تاريخ التقرير"
            value={caseItem.receiptdate || ""}
          />
          <SimpleTableRow white={false} label="الحكم المطعون فيه" value={""} />
          <CustomRow
            label="رقم الدعوى"
            value={caseItem.issueId?.toString() || ""}
          />
          <CustomRow label="المحكمة" value={caseItem.orgname || ""} />
          <CustomRow label="منطوق الحكم" value={caseItem.conclusion || ""} />
        </tbody>
      </table>

      {/* Appellant - بيانات الطاعن/الطاعنين */}
      <h5 className="text-2xl font-medium pb-5 text-right w-full mt-24">
        بيانات الطاعن/الطاعنين
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow label="الاسم" value={caseItem.appellant || ""} />
          <SimpleTableRow
            label="المحامي/المحامون"
            value={caseItem.appellant_lawyername || ""}
          />
        </tbody>
      </table>

      {/* Respondent - بيانات المطعون ضده/ضدهم */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-24">
        بيانات المطعون ضده/ضدهم
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow label="الاسم" value={caseItem.ripper || ""} />

          <SimpleTableRow
            label="المحامي/المحامون"
            value={caseItem.ripper_lawyername || ""}
          />
        </tbody>
      </table>

      {/* Urgent Section - الشق المستعجل */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-24">
        الشق المستعجل
      </h5>
      {caseItem.appeals_urgent && caseItem.appeals_urgent.length > 0 && (
        <>
          {caseItem.appeals_urgent.map((appeal, index) => (
            <table key={index} className="w-full border-collapse">
              <tbody>
                <SimpleTableRow
                  white={false}
                  label="الدائرة المختصة"
                  value={caseItem.classname || ""}
                />
                <SimpleTableRow
                  label="تاريخ الجلسة"
                  value={appeal.session_date || ""}
                />
                <SimpleTableRow
                  white={false}
                  label="منطوق الحكم"
                  value={appeal.ruling || ""}
                />
              </tbody>
            </table>
          ))}
        </>
      )}

      {/* Appeal Examination - فحص الطعن */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-24">
        فحص الطعن
      </h5>
      {caseItem.appeals_review && caseItem.appeals_review.length > 0 ? (
        <>
          {caseItem.appeals_review.map((review, index) => (
            <table key={index} className="w-full border-collapse">
              <tbody>
                <SimpleTableRow
                  white={false}
                  label="الدائرة المختصة"
                  value={caseItem.classname || ""}
                />
                <SimpleTableRow
                  label="تاريخ الجلسة"
                  value={review.session_date || ""}
                />
                <SimpleTableRow
                  white={false}
                  label="منطوق القرار"
                  value={review.ruling || ""}
                />
              </tbody>
            </table>
          ))}
        </>
      ) : (
        <table className="w-full border-collapse">
          <tbody>
            <SimpleTableRow white={false} label="الدائرة المختصة" value="" />
            <SimpleTableRow label="تاريخ الجلسة" value="" />
            <SimpleTableRow white={false} label="منطوق القرار" value="" />
          </tbody>
        </table>
      )}

      {/* نيابة النقض */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-24">
        نيابة النقض
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow
            white={false}
            label="تاريخ الإحالة إلى نيابة النقض"
            value={caseItem.niaba?.date_of_move || ""}
          />
          <SimpleTableRow
            label="تاريخ إيداع مذكرة النيابة"
            value={caseItem.niaba?.date_of_filing || ""}
          />
          <SimpleTableRow
            white={false}
            label="ملخص الرأي"
            value={caseItem.niaba?.Summary_of_Opinion || ""}
          />
          <SimpleTableRow
            label="الرأي الختامي بالجلسة"
            value={caseItem.niaba?.Concluding_Opinion || ""}
          />
        </tbody>
      </table>

      {/* نظر الطعن - Appeal Sessions */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-24">
        نظر الطعن
      </h5>

      {caseItem.appeals_sessions && caseItem.appeals_sessions.length > 0 ? (
        <>
          {caseItem.appeals_sessions.map((session, index) => (
            <table key={index} className="w-full border-collapse mt-1">
              <tbody>
                <SimpleTableRow
                  label="جلسة/جلسات المرافعة"
                  value={session.session_date || ""}
                />
                <SimpleTableRow
                  white={false}
                  label="منطوق القرار"
                  value={session.ruling || ""}
                />
              </tbody>
            </table>
          ))}
        </>
      ) : (
        <table className="w-full border-collapse">
          <tbody>
            <SimpleTableRow white={false} label="الدائرة المختصة" value="" />
            <SimpleTableRow label="جلسة/جلسات المرافعة" value="" />
          </tbody>
        </table>
      )}

      {/* الحكم السابق على الفصل في الطعن */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-24">
        الحكم السابق على الفصل في الطعن
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow
            white={false}
            label="تاريخ الجلسة"
            value={caseItem.final_judgment?.final_judgment || ""}
          />
          <SimpleTableRow
            label="منطوق الحكم"
            value={caseItem.final_judgment?.judgment_ruling?.trim() || ""}
          />
        </tbody>
      </table>

      {/* الفصل في الطعن */}
      <h5 className="text-2xl font-medium text-right pb-5 w-full mt-24">
        الفصل في الطعن
      </h5>
      <table className="w-full border-collapse">
        <tbody>
          <SimpleTableRow
            white={false}
            label="تاريخ الحكم"
            value={caseItem.final_judgment?.final_judgment || ""}
          />
          <SimpleTableRow
            label="منطوق الحكم"
            value={caseItem.final_judgment?.judgment_ruling?.trim() || ""}
          />
          <SimpleTableRow
            white={false}
            label="إيداع مسودة الحكم"
            value={caseItem.final_judgment?.draft_judgment ? "نعم" : ""}
          />
          <SimpleTableRow
            label="توقيع النسخة النهائية للحكم"
            value={caseItem.final_judgment?.final_draft_judgment ? "نعم" : ""}
          />
        </tbody>
      </table>
    </section>
  );
}
