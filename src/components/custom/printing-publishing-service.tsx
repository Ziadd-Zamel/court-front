"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RtlInputField from "@/components/common/RtlInputField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import {
  PublicationRequestData,
  publicationRequestSchema,
} from "@/lib/schemas/validations";
import { Button } from "@/components/ui/button";
import { usePublicationRequest } from "@/app/(homepage)/litigants-portal/court-releases/_hooks/use-publication-request";

export default function PrintingPublishingService() {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const form = useForm<PublicationRequestData>({
    resolver: zodResolver(publicationRequestSchema),
    defaultValues: {
      book_title: "",
      subject: "",
      page_count: 0,
      book_size: "",
      author_name: "",
      academic_degree: "",
      supervisor_academic_degree: "",
      job: "",
      phone: "",
      email: "",
      summary: "",
    },
  });

  const mutation = usePublicationRequest();

  const onSubmit = (data: PublicationRequestData) => {
    mutation.mutate(data, {
      onSuccess: (result) => {
        if (result.success) {
          setSuccessDialogOpen(true);
          form.reset();
        } else {
          setErrorDialogOpen(true);
        }
      },
      onError: (error) => {
        setErrorDialogOpen(true);
        console.log(error);
      },
    });
  };

  return (
    <div className="w-full -mt-3">
      <div className=" w-full sm:max-w-fit">
        <h3 className="text-2xl font-bold text-main sm:mb-8 sm:text-4xl border-b border-gray-300 pb-5">
          خدمة الطباعة والنشر
        </h3>
      </div>
      <p className="mt-3 text-md text-gray-500">
        تتضمن خدمة الطباعة والنشر التي تقدمها المحكمة للقانونيين والمهتمين
        بالمسائل القانونية إنتاج المواد المطبوعة مثل الكتب والبحوث القانونية
        والرسائل الجامعية. تشمل الخدمات قبل الطباعة مثل التصميم والتحرير
        والتنسيق، والطباعة نفسها للأوراق والبحوث القانونية. كما تشمل خدمات ما
        بعد الطباعة مثل التغليف (للكتب)، والتوزيع، والنشر، سواء بشكل ورقي أو
        إلكتروني عبر موقع المحكمة العليا.
      </p>
      <p className="mt-1 text-md text-gray-500">
        يتم تقييم المواد العلمية المقدمة من قبل لجنة علمية في المكتب الفني
        بالمحكمة لتحديد جاهزيتها وقيمتها العلمية ومشروعيتها، وصالحيتها للطباعة
        والنشر.
      </p>

      <div className="mt-32">
        <div className=" w-full sm:max-w-fit">
          <h3 className="text-2xl font-bold text-main sm:mb-8 sm:text-4xl border-b border-gray-300 pb-5">
            طلب الطباعة والنشر
          </h3>
        </div>
        <p className="mt-12 text-md text-gray-500">
          تبدأ إجراءات طلب الطباعة والنشر بإرسال النموذج التالي بعد تعبئة جميع
          الحقول المطلوبة. ستتلقى رسالة تلقائية تؤكد استلام طلبك. بعد مراجعته من
          قبل المكتب المختص في المحكمة العليا، سيتم إشعارك — بإذن الله — بنتيجة
          الفحص والخطوات التالية، وذلك عبر رسالة نصية أو بريد إلكتروني.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex flex-col gap-12 sm:gap-6"
        >
          <div>
            <RtlInputField
              label="عنوان الكتاب/المقال"
              value={form.watch("book_title")}
              onChange={(e) => form.setValue("book_title", e.target.value)}
              placeholder="أدخل عنوان الكتاب كامل"
            />
            {form.formState.errors.book_title && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.book_title.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="الموضوع"
              value={form.watch("subject")}
              onChange={(e) => form.setValue("subject", e.target.value)}
              placeholder="أدخل نوع المجال الذي ينتمي إليه الكتاب"
            />
            {form.formState.errors.subject && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="عدد الصفحات"
              value={form.watch("page_count").toString()}
              onChange={(e) =>
                form.setValue("page_count", parseInt(e.target.value) || 0)
              }
              placeholder="أدخل العدد بالأرقام"
            />
            {form.formState.errors.page_count && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.page_count.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="حجم الكتاب"
              value={form.watch("book_size")}
              onChange={(e) => form.setValue("book_size", e.target.value)}
              placeholder="(خاص بالكتب) كبر/متوسط/صغر"
            />
            {form.formState.errors.book_size && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.book_size.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="اسم المؤلف"
              value={form.watch("author_name")}
              onChange={(e) => form.setValue("author_name", e.target.value)}
              placeholder="أدخل اسم المؤلف رباعياً"
            />
            {form.formState.errors.author_name && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.author_name.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="الدرجة العلمية"
              value={form.watch("academic_degree")}
              onChange={(e) => form.setValue("academic_degree", e.target.value)}
              placeholder="(إجازة - ماجستير - دكتوراه)"
            />
            {form.formState.errors.academic_degree && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.academic_degree.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="الدرجة العلمية للمشرف"
              value={form.watch("supervisor_academic_degree")}
              onChange={(e) =>
                form.setValue("supervisor_academic_degree", e.target.value)
              }
              placeholder="(إجازة - ماجستير - دكتوراه)"
            />
            {form.formState.errors.supervisor_academic_degree && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.supervisor_academic_degree.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="الوظيفة"
              value={form.watch("job")}
              onChange={(e) => form.setValue("job", e.target.value)}
              placeholder="حدد مجال عملك الوظيفي"
            />
            {form.formState.errors.job && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.job.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="الهاتف"
              value={form.watch("phone")}
              onChange={(e) => form.setValue("phone", e.target.value)}
              placeholder="أدخل رقم الهاتف وفق النمط الآتي +218-91-123-1234"
            />
            {form.formState.errors.phone && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <RtlInputField
              label="البريد الإلكتروني"
              value={form.watch("email")}
              onChange={(e) => form.setValue("email", e.target.value)}
              placeholder="أدخل البريد الإلكتروني لغرض المراسلة"
              type="email"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex sm:flex-row flex-col sm:items-start gap-5">
              <label className="w-fit sm:w-1/4 rounded-md bg-[#FBF3E0] px-3 py-2 text-right font-zain text-[10px] font-semibold text-gray-700 sm:py-[14px] sm:text-xl lg:text-lg min-[1200px]:text-xl">
                ملخص الموضوع
              </label>
              <textarea
                value={form.watch("summary")}
                onChange={(e) => form.setValue("summary", e.target.value)}
                placeholder="أدخل ملخص الكتاب/المقال في فقرة من 130 – 170 كلمة توجز فيها موضوعه، وتبيّ ن مواطن قيمته العلمية."
                className="w-full sm:w-3/4 rounded-md bg-[#FBF3E0] px-3 py-2 text-right placeholder:text-[10px] placeholder:text-gray-500 sm:py-4 sm:placeholder:text-sm"
                rows={5}
              />
            </div>
            {form.formState.errors.summary && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.summary.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="self-end mt-10 px-16"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                جارٍ الإرسال...
              </>
            ) : (
              "إرسال"
            )}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md" style={{ direction: "rtl" }}>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <DialogTitle className="text-center font-zain text-lg font-bold">
              تم إرسال الطلب بنجاح
            </DialogTitle>
            <DialogDescription className="text-center font-zain text-sm text-gray-600">
              شكراً لك، تم استلام طلب الطباعة والنشر بنجاح. سيتم مراجعته من قبل
              المكتب المختص وإشعارك بالنتيجة قريباً.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent className="sm:max-w-md" style={{ direction: "rtl" }}>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <DialogTitle className="text-center font-zain text-lg font-bold">
              خطأ في إرسال الطلب
            </DialogTitle>
            <DialogDescription className="text-center font-zain text-sm text-gray-600">
              عذراً، حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى أو التواصل
              مع الدعم الفني.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
