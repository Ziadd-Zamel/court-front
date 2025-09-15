import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  suggestion_role_id: z.string().min(1, "يرجى اختيار الصفة"),
  message: z.string().min(1, "يرجى كتابة رسالتك").min(10, "الرسالة قصيرة جداً"),
  type: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const publicationRequestSchema = z.object({
  book_title: z.string().min(1, "عنوان الكتاب/المقال مطلوب"),
  subject: z.string().min(1, "الموضوع مطلوب"),
  page_count: z.number().min(1, "عدد الصفحات يجب أن يكون أكبر من 0"),
  book_size: z.string().min(1, "حجم الكتاب مطلوب"),
  author_name: z.string().min(1, "اسم المؤلف مطلوب"),
  academic_degree: z.string().min(1, "الدرجة العلمية مطلوبة"),
  supervisor_academic_degree: z.string().min(1, "الدرجة العلمية للمشرف مطلوبة"),
  job: z.string().min(1, "الوظيفة مطلوبة"),
  email: z
    .string()
    .email("البريد الإلكتروني غير صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),
  phone: z.string().min(1, "رقم الهاتف مطلوب"),
  summary: z
    .string()
    .min(10, "الملخص يجب أن يحتوي على الأقل 10 حرف")
    .max(1000, "الملخص يجب ألا يزيد عن 1000 حرف"),
});

export type PublicationRequestData = z.infer<typeof publicationRequestSchema>;
