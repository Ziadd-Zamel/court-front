import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  suggestion_role_id: z.string().min(1, "يرجى اختيار الصفة"),
  message: z.string().min(1, "يرجى كتابة رسالتك").min(10, "الرسالة قصيرة جداً"),
  type: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
