// components/ContactSection.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import AnimatedSectionHeader from "../common/AnimatedSectionHeader";
import { ContactFormData, contactFormSchema } from "@/lib/schemas/validations";
import { submitContactForm } from "@/lib/actions/contact";

export default function ContactSection({
  title = "اطرح استفهاماً أو اقتراحاً",
}: {
  title?: string;
}) {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      suggestion_role_id: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
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

  const onSubmit = (data: ContactFormData) => {
    const senddata: ContactFormData = {
      email: data.email,
      message: data.message,
      name: data.name,
      suggestion_role_id: "95cb3675-802e-420c-b104-a2b26d0b3e27",
      type: "accepted_lawyers",
    };
    console.log(senddata);
    mutation.mutate(senddata);
  };

  return (
    <>
      <section
        className="relative h-full bg-cover bg-center pb-32 pt-[55px]"
        style={{ backgroundImage: 'url("/assets/contact.png")' }}
      >
        <div className="pb-10  box-container">
          <AnimatedSectionHeader title="" />
        </div>
        <div className=" box-container flex flex-col items-stretch justify-between gap-10 text-gray-400 md:flex-row">
          {/* Info Text */}
          <div className="w-full md:w-1/2">
            <h2 className="pb-12 text-3xl font-bold text-white">{title} </h2>
            <p className="mb-5 font-zain leading-relaxed text-gray-400">
              إذا لم تجد ضالتك في قوائم أصناف الأسئلة، لك أن ترسل استفهامك. لك
              أيضاً أن تقترح إضافات مفيدة.
            </p>
            <p
              style={{ direction: "rtl" }}
              className="font-zain leading-relaxed text-gray-400"
            >
              سندرس اقتراحك، و سنعمل، بإذنه تعالى، على إضافة المعلومات التي تجيب
              مسألتك في أقرب وقت، وذلك متى كانت من العموم بما يخدم الحق في
              التقاضي.
            </p>
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="الاسم (اختياري)"
                          className="w-full rounded bg-white/20 px-4 py-2 text-right text-gray-400 placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#F3E5CA]/50"
                          style={{ direction: "rtl" }}
                        />
                      </FormControl>
                      <FormMessage className="text-right text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="البريد الإلكتروني"
                          className="w-full rounded bg-white/20 px-4 py-2 text-right text-gray-400 placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#F3E5CA]/50"
                          style={{ direction: "rtl" }}
                        />
                      </FormControl>
                      <FormMessage className="text-right text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="suggestion_role_id"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="w-full rounded border-none bg-white/20 px-4 py-2 text-right text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F3E5CA]/50"
                            style={{ direction: "rtl" }}
                          >
                            <SelectValue placeholder="الصفة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className="border border-gray-200 bg-white"
                          style={{ direction: "rtl" }}
                        >
                          <SelectItem value="فرد" className="text-right">
                            فرد
                          </SelectItem>
                          <SelectItem value="محام" className="text-right">
                            محام
                          </SelectItem>
                          <SelectItem value="قانوني" className="text-right">
                            قانوني
                          </SelectItem>
                          <SelectItem value="آخر" className="text-right">
                            آخر
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-right text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="اكتب رسالتك هنا"
                          className="h-24 w-full rounded bg-white/20 px-4 py-2 text-right text-gray-400 placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#F3E5CA]/50 resize-none"
                          style={{ direction: "rtl" }}
                        />
                      </FormControl>
                      <FormMessage className="text-right text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="w-24 text-2xl py-1"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "إرسال"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Error Alert for form errors */}
            {mutation.isError && (
              <Alert className="mt-4 border-red-500 bg-red-50">
                <XCircle className="h-4 w-4" />
                <AlertDescription className="text-right text-red-700">
                  حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md" style={{ direction: "rtl" }}>
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              تم إرسال رسالتك بنجاح!
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center">
              شكراً لك على التواصل معنا. سنقوم بمراجعة رسالتك والرد عليك في أقرب
              وقت ممكن.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={() => setSuccessDialogOpen(false)}
              className="px-6"
            >
              موافق
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent className="sm:max-w-md" style={{ direction: "rtl" }}>
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-center text-gray-900">
              فشل في إرسال الرسالة
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center">
              عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى أو
              التواصل معنا مباشرة.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
