import CustomRow from "./custom-table-row";
import SimpleTableRow from "./simple-table-row";

interface PageContentProps {
  caseData: CaseDataType[] | undefined;
  error: string | null;
}

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  const text = String(value).trim();
  if (!text || text.toLowerCase() === "null") return false;
  return true;
}

function hasAnyValue(...values: unknown[]): boolean {
  return values.some(hasValue);
}

type TableRow = {
  label: string;
  value: string;
  white?: boolean;
  custom?: boolean;
};

function displayValue(value: unknown): string {
  if (!hasValue(value)) return "";
  return String(value).trim();
}

function TableSection({
  title,
  rows,
  className = "",
}: {
  title: string;
  rows: TableRow[];
  className?: string;
}) {
  const visibleRows = rows.filter((row) => hasValue(row.value));
  if (visibleRows.length === 0) return null;

  return (
    <>
      {title ? (
        <h5
          className={`text-2xl font-medium text-right pb-5 w-full dark:text-white ${className}`}
        >
          {title}
        </h5>
      ) : null}
      <table className="w-full border-collapse mb-4">
      <tbody>
        {visibleRows.map((row, index) =>
          row.custom ? (
            <CustomRow key={row.label} label={row.label} value={row.value} />
          ) : (
            <SimpleTableRow
              key={row.label}
              label={row.label}
              value={row.value}
              white={row.white ?? index % 2 === 0}
            />
          ),
        )}
      </tbody>
    </table>
  </>
  );
}

export default function MainTable({ caseData }: PageContentProps) {
  const caseItem = caseData?.[0];

  if (!caseItem) return null;

  const fj = caseItem.final_judgment;
  const niaba = caseItem.niaba;

  return (
    <section className="">
      <TableSection
        title="البيانات العامة"
        rows={[
          { label: "رقم الطعن", value: displayValue(caseItem.rippId), white: false },
          { label: "السنة القضائية", value: displayValue(caseItem.year) },
          { label: "نوع الطعن", value: displayValue(caseItem.classname), white: false },
          { label: "تاريخ التقرير", value: displayValue(caseItem.receiptdate) },
          {
            label: "تاريخ ورود الطعن",
            value: displayValue(caseItem.incoming_date),
            white: false,
          },
          { label: "تاريخ الحكم المطعون فيه", value: displayValue(caseItem.concluDate) },
          { label: "البند", value: displayValue(caseItem.itemname), white: false },
          { label: "الجزء", value: displayValue(caseItem.partNumber) },
          {
            label: "رقم الدعوى",
            value: displayValue(caseItem.issueId),
            custom: true,
          },
          { label: "المحكمة", value: displayValue(caseItem.orgname), custom: true },
          {
            label: "منطوق الحكم",
            value: displayValue(caseItem.conclusion),
            custom: true,
          },
          ...(hasValue(caseItem.notes)
            ? [
                {
                  label: "ملاحظات",
                  value: displayValue(caseItem.notes),
                  custom: true,
                },
              ]
            : []),
        ]}
      />

      <TableSection
        className="mt-12"
        title="بيانات الطاعن/الطاعنين"
        rows={[
          { label: "الاسم", value: displayValue(caseItem.appellant) },
          {
            label: "الصفة",
            value: displayValue(caseItem.appellant_adjective),
            white: false,
          },
          {
            label: "الجنسية",
            value: displayValue(caseItem.appellant_nationality),
          },
          {
            label: "المحامي/المحامون",
            value: displayValue(caseItem.appellant_lawyername),
            white: false,
          },
        ]}
      />

      <TableSection
        className="mt-12"
        title="بيانات المطعون ضده/ضدهم"
        rows={[
          { label: "الاسم", value: displayValue(caseItem.ripper) },
          {
            label: "الصفة",
            value: displayValue(caseItem.ripper_adjective),
            white: false,
          },
          {
            label: "الجنسية",
            value: displayValue(caseItem.ripper_nationality),
          },
          {
            label: "المحامي/المحامون",
            value: displayValue(caseItem.ripper_lawyername),
            white: false,
          },
        ]}
      />

      {(caseItem.appeals_urgent ?? [])
        .filter((appeal) =>
          hasAnyValue(caseItem.classname, appeal.session_date, appeal.ruling),
        )
        .map((appeal, index) => (
          <TableSection
            key={`urgent-${index}`}
            className="mt-12"
            title={index === 0 ? "الشق المستعجل" : ""}
            rows={[
              {
                label: "الدائرة المختصة",
                value: displayValue(caseItem.classname),
                white: false,
              },
              {
                label: "تاريخ الجلسة",
                value: displayValue(appeal.session_date),
              },
              {
                label: "منطوق الحكم",
                value: displayValue(appeal.ruling),
                white: false,
              },
            ]}
          />
        ))}

      {(caseItem.appeals_review ?? [])
        .filter((review) =>
          hasAnyValue(caseItem.classname, review.session_date, review.ruling),
        )
        .map((review, index) => (
          <TableSection
            key={`review-${index}`}
            className="mt-12"
            title={index === 0 ? "فحص الطعن" : ""}
            rows={[
              {
                label: "الدائرة المختصة",
                value: displayValue(caseItem.classname),
                white: false,
              },
              {
                label: "تاريخ الجلسة",
                value: displayValue(review.session_date),
              },
              {
                label: "منطوق القرار",
                value: displayValue(review.ruling),
                white: false,
              },
            ]}
          />
        ))}

      <TableSection
        className="mt-12"
        title="نيابة النقض"
        rows={[
          {
            label: "تاريخ الإحالة إلى نيابة النقض",
            value: displayValue(niaba?.date_of_move),
            white: false,
          },
          {
            label: "تاريخ إيداع مذكرة النيابة",
            value: displayValue(niaba?.date_of_filing),
          },
          {
            label: "ملخص الرأي",
            value: displayValue(niaba?.Summary_of_Opinion),
            white: false,
          },
          {
            label: "الرأي الختامي بالجلسة",
            value: displayValue(niaba?.Concluding_Opinion),
          },
        ]}
      />

      {(caseItem.appeals_sessions ?? [])
        .filter((session) =>
          hasAnyValue(
            caseItem.classname,
            session.session_date,
            session.number_of_session,
            session.why,
            session.ruling,
          ),
        )
        .map((session, index) => (
          <TableSection
            key={`session-${index}`}
            className="mt-12"
            title={index === 0 ? "نظر الطعن" : ""}
            rows={[
              {
                label: "الدائرة المختصة",
                value: displayValue(caseItem.classname),
                white: false,
              },
              {
                label: "تاريخ الجلسة",
                value: displayValue(session.session_date),
              },
              {
                label: "رقم الجلسة",
                value: displayValue(session.number_of_session),
                white: false,
              },
              { label: "السبب", value: displayValue(session.why) },
              {
                label: "منطوق القرار",
                value: displayValue(session.ruling),
                white: false,
              },
            ]}
          />
        ))}

      <TableSection
        className="mt-12"
        title="الحكم السابق على الفصل في الطعن"
        rows={[
          {
            label: "تاريخ الجلسة",
            value: displayValue(fj?.final_judgment),
            white: false,
          },
          {
            label: "منطوق الحكم",
            value: displayValue(fj?.judgment_ruling),
          },
        ]}
      />

      <TableSection
        className="mt-12"
        title="الفصل في الطعن"
        rows={[
          {
            label: "تاريخ الحكم",
            value: displayValue(fj?.final_judgment),
            white: false,
          },
          {
            label: "منطوق الحكم",
            value: displayValue(fj?.judgment_ruling),
          },
          {
            label: "إيداع مسودة الحكم",
            value: hasValue(fj?.draft_judgment)
              ? displayValue(fj?.draft_judgment)
              : "",
            white: false,
          },
          {
            label: "توقيع النسخة النهائية للحكم",
            value: displayValue(fj?.final_draft_judgment),
          },
        ]}
      />
    </section>
  );
}
