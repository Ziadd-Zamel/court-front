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
import Image from "next/image";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import {
  PublicationRequestData,
  publicationRequestSchema,
} from "@/lib/schemas/validations";
import { Button } from "@/components/ui/button";
import { usePublicationRequest } from "@/app/(homepage)/litigants-portal/court-releases/_hooks/use-publication-request";

const FLAG_CDN = "https://flagcdn.com";
const COUNTRY_CODES = [
  { code: "+218", country: "ليبيا", iso2: "ly" },
  { code: "+20", country: "مصر", iso2: "eg" },
  { code: "+216", country: "تونس", iso2: "tn" },
  { code: "+213", country: "الجزائر", iso2: "dz" },
  { code: "+212", country: "المغرب", iso2: "ma" },
  { code: "+966", country: "السعودية", iso2: "sa" },
  { code: "+971", country: "الإمارات", iso2: "ae" },
  { code: "+965", country: "الكويت", iso2: "kw" },
  { code: "+974", country: "قطر", iso2: "qa" },
  { code: "+973", country: "البحرين", iso2: "bh" },
  { code: "+968", country: "عمان", iso2: "om" },
  { code: "+962", country: "الأردن", iso2: "jo" },
  { code: "+961", country: "لبنان", iso2: "lb" },
  { code: "+963", country: "سوريا", iso2: "sy" },
  { code: "+964", country: "العراق", iso2: "iq" },
  { code: "+967", country: "اليمن", iso2: "ye" },
  { code: "+249", country: "السودان", iso2: "sd" },
];

function PhoneInputWithCountryCode({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const parseValue = (v: string) => {
    const matchedCountry = [...COUNTRY_CODES]
      .sort((a, b) => b.code.length - a.code.length)
      .find((country) => v.startsWith(country.code));

    if (matchedCountry) {
      return {
        code: matchedCountry.code,
        number: v.slice(matchedCountry.code.length).replace(/^[- ]+/, ""),
      };
    }

    return { code: "+218", number: v };
  };

  const { code: countryCode, number: phoneNumber } = parseValue(value || "");
  const displayCode = COUNTRY_CODES.some((c) => c.code === countryCode)
    ? countryCode
    : "+218";
  const selectedCountry = COUNTRY_CODES.find((c) => c.code === displayCode);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    onChange(num ? `${displayCode}${num}` : displayCode);
  };

  const handleCountryChange = (code: string) => {
    onChange(phoneNumber ? `${code}${phoneNumber}` : code);
    setIsOpen(false);
  };

  return (
    <div className="flex sm:flex-row flex-col sm:items-center gap-5">
      <label className="w-fit sm:w-1/4 rounded-md bg-[#FBF3E0] dark:bg-white/10 dark:border dark:border-white/10 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-white sm:py-[14px] sm:text-xs lg:text-sm">
        {label}
      </label>
      <div className="relative sm:w-3/4 flex flex-row-reverse rounded-md bg-[#FBF3E0] dark:bg-white/10 dark:border dark:border-white/10 border border-[#FBF3E0]">
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="1234-123-91"
          className="flex-1 min-w-0 bg-transparent px-3 py-2 placeholder:text-xs placeholder:text-gray-400 dark:placeholder-white/50 sm:py-[10px] sm:text-xs lg:text-sm text-right outline-none text-gray-800 dark:text-white"
          style={{ direction: "rtl" }}
        />
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-full min-w-[5rem] cursor-pointer items-center gap-2 rounded-none border-0 border-r border-gray-300/50 dark:border-white/10 bg-transparent px-3 py-2 hover:bg-[#f5ecd0] dark:hover:bg-white/10 focus:outline-none focus:ring-0"
          >
            {selectedCountry && (
              <>
                <span className="flex h-4 w-6 shrink-0 overflow-hidden rounded-px">
                  <Image
                    src={`${FLAG_CDN}/w40/${selectedCountry.iso2}.png`}
                    alt={selectedCountry.country}
                    width={36}
                    height={28}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="font-medium text-gray-800 text-sm mt-0.5">
                  {selectedCountry.code}
                </span>
              </>
            )}
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              <div
                className="absolute left-0 top-full z-50 mt-1 max-h-[280px] min-w-[12rem] overflow-auto rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 py-1 shadow-lg"
                style={{ direction: "rtl" }}
              >
                {COUNTRY_CODES.map(({ code, country, iso2 }) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleCountryChange(code)}
                    className="flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-right hover:bg-amber-50 dark:hover:bg-white/10 focus:bg-amber-50 dark:focus:bg-white/10 focus:outline-none text-gray-800 dark:text-white"
                  >
                    <span className="flex h-4 w-6 shrink-0 overflow-hidden rounded">
                      <Image
                        src={`${FLAG_CDN}/w40/${iso2}.png`}
                        alt={country}
                        width={32}
                        height={24}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="text-sm">
                      {code} {country}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 text-right w-full sm:ml-[calc(25%+0.5rem)]">
          {error}
        </p>
      )}
    </div>
  );
}

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
    <div className="w-full -mt-5">
      <div className="mb-10 text-right">
        <h3 className="text-2xl font-bold text-main"> خدمة الطباعة والنشر:</h3>
        <div className="mt-2 h-[2px] w-70 bg-main" />
      </div>
      <p className="mt-3 text-sm text-gray-500 dark:text-white/70 text-justify">
        تقدّم المحكمة العليا، من خلال خدمة الطباعة والنشر، إنتاج المواد المطبوعة
        للقانونيين والمهتمين بالمسائل القانونية، بما في ذلك الكتب والبحوث
        القانونية والرسائل الجامعية. وتشمل الخدمة جميع المراحل قبل الطباعة، مثل
        التصميم والتحرير والتنسيق، بالإضافة إلى عملية الطباعة نفسها للأوراق
        والبحوث القانونية. كما تمتد الخدمة إلى ما بعد الطباعة، بما في ذلك
        التغليف الاحترافي، ووصولاً إلى التوزيع والنشر في نسخ ورقية، أو إلكترونية
        عبر موقع المحكمة العليا.
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-white/70 text-justify">
        تقوم اللجنة العلمية بالمكتب الفني بالمحكمة بتقييم المواد العلمية
        المقدمة، لتحديد قيمتها العلمية، وأصالتها، ومشروعيتها، قبل اعتمادها
        للطباعة والنشر.
      </p>

      <div className="mt-12">
        <div className="mb-10 text-right">
          <h3 className="text-2xl font-bold text-main">طلب الطباعة والنشر: </h3>
          <div className="mt-2 h-[2px] w-70 bg-main" />
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-white/70 text-justify">
          تبدأ إجراءات طلب الطباعة والنشر بإرسال النموذج التالي بعد ملء كل
          الحقول المطلوبة. ستتلقى رسالة تلقائية تؤكد استلام طلبك. وبعد مراجعته
          من المكتب الفني بالمحكمة، سيتم إشعارك -بإذن الله- بنتيجة الفحص
          والخطوات التالية، وذلك عبر رسالة نصية أو بريد إلكتروني.
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
              placeholder="أدخل عنوان الكتاب كاملاً"
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
              placeholder="أدخل مجال الموضوع. مثال: (الشريعة-المدني–التجاري–الجنائي–المالي–الدولي)"
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
              placeholder="أدرج عدد الصفحات بالأرقام"
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
              placeholder="إجازة/ماجستير/دكتوراه/كاتب"
            />
            {form.formState.errors.academic_degree && (
              <p className="mt-1 text-sm text-red-500 text-right">
                {form.formState.errors.academic_degree.message}
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

          <PhoneInputWithCountryCode
            label="الهاتف"
            value={form.watch("phone")}
            onChange={(value) => form.setValue("phone", value)}
            error={form.formState.errors.phone?.message}
          />

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
              <label className=" w-fit sm:w-1/4 rounded-md bg-[#FBF3E0] dark:bg-white/10 dark:border dark:border-white/10 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-white sm:py-[14px] sm:text-xs lg:text-sm">
                ملخص الموضوع
              </label>
              <textarea
                value={form.watch("summary")}
                onChange={(e) => form.setValue("summary", e.target.value)}
                placeholder="اكتب ملخصاً عن موضوع الكتاب/البحث في فقرة من 150–200 كلمة، توجز فيها موضوعه، وتبيّن مواطن قيمته العلمية"
                className="w-full sm:w-3/4 rounded-md bg-[#FBF3E0] dark:bg-white/10 dark:border dark:border-white/10 dark:text-white px-3 py-2 placeholder:text-xs placeholder:text-gray-400 dark:placeholder-white/50 sm:py-[12px] sm:placeholder:text-xs sm:text-xs lg:text-sm text-right placeholder:text-[10px]"
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
