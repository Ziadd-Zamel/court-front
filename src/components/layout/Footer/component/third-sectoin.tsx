"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitSubscriber } from "@/lib/actions/subscriber";
import {
  SubscriberFormData,
  subscriberSchema,
} from "@/lib/schemas/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { SiMessenger } from "react-icons/si";

const ThirdSectoin = () => {
  const [copied, setCopied] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SubscriberFormData>({
    resolver: zodResolver(subscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitSubscriber,
    onSuccess: (result) => {
      if (result.success) {
        setSuccessDialogOpen(true);
        form.reset();
      } else {
        const emailError = result.fieldErrors?.email?.[0];
        if (emailError) {
          form.setError("email", { message: emailError });
        } else {
          setErrorMessage(result.message);
          setErrorDialogOpen(true);
        }
      }
    },
    onError: () => {
      setErrorMessage("حدث خطأ غير متوقع");
      setErrorDialogOpen(true);
    },
  });

  const onSubmit = (data: SubscriberFormData) => {
    form.clearErrors();
    mutation.mutate(data);
  };

  const getWebsiteUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }

    return process.env.NEXT_PUBLIC_SITE_URL ?? "";
  };

  const openShareWindow = (url: string) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    const websiteUrl = getWebsiteUrl();
    if (!websiteUrl) return;

    try {
      await navigator.clipboard.writeText(websiteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleShareFacebook = () => {
    const websiteUrl = getWebsiteUrl();
    if (!websiteUrl) return;
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`,
    );
  };

  const handleShareWhatsapp = () => {
    const websiteUrl = getWebsiteUrl();
    if (!websiteUrl) return;
    openShareWindow(`https://wa.me/?text=${encodeURIComponent(websiteUrl)}`);
  };

  const handleShareMessenger = () => {
    const websiteUrl = getWebsiteUrl();
    if (!websiteUrl) return;
    openShareWindow(
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(websiteUrl)}&redirect_uri=${encodeURIComponent(websiteUrl)}`,
    );
  };

  const handleShareMail = () => {
    const websiteUrl = getWebsiteUrl();
    if (!websiteUrl) return;
    const subject = "Check out this website";
    const body = `I wanted to share this website with you: ${websiteUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-6 text-right">
          <h2 className="mb-8 text-2xl font-bold text-main">
            اشترك في نشرة أخبار الموقع
          </h2>
          <p className="text-md leading-relaxed text-gray-300">
            سجل بريدك الإلكتروني لاستقبال إشعارات فورية بتحديثات الموقع والموضوعات
            الجديدة.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full max-w-[400px] items-center gap-0 overflow-hidden rounded-md border border-white/10 bg-white/10 focus-within:ring-1 focus-within:ring-main">
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="البريد الإلكتروني"
                        className="h-auto flex-1 rounded-none border-none bg-transparent px-4 py-2 text-right text-white shadow-none placeholder-white/50 focus-visible:ring-0"
                        style={{ direction: "rtl" }}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      className="h-full shrink-0 rounded-none"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "اشترك"
                      )}
                    </Button>
                  </div>
                  <div className="min-h-6 pt-1">
                    <FormMessage className="text-right text-red-400" />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <h3 className="mb-8 mt-16 text-xl font-semibold text-main">
          شارك هذه الصفحة عبر:
        </h3>
        <div className="flex w-full flex-row-reverse justify-end gap-8">
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy website link"
            className="text-white transition hover:text-main"
            title={copied ? "Copied" : "Copy link"}
          >
            <IoMdCopy size={"35px"} />
          </button>
          <button
            type="button"
            onClick={handleShareMail}
            aria-label="Share by email"
            className="text-white transition hover:text-main"
            title="Share by email"
          >
            <MdOutlineMail size={"35px"} />
          </button>
          <button
            type="button"
            onClick={handleShareWhatsapp}
            aria-label="Share on WhatsApp"
            className="text-white transition hover:text-main"
            title="Share on WhatsApp"
          >
            <FaWhatsapp size={"35px"} />
          </button>
          <button
            type="button"
            onClick={handleShareMessenger}
            aria-label="Share on Messenger"
            className="text-white transition hover:text-main"
            title="Share on Messenger"
          >
            <SiMessenger size={"35px"} />
          </button>
          <button
            type="button"
            onClick={handleShareFacebook}
            aria-label="Share on Facebook"
            className="text-white transition hover:text-main"
            title="Share on Facebook"
          >
            <FaFacebookF size={"35px"} />
          </button>
        </div>
      </div>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md" style={{ direction: "rtl" }}>
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">
              تم الاشتراك بنجاح!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              شكراً لك. ستصلك إشعارات بتحديثات الموقع والموضوعات الجديدة على بريدك
              الإلكتروني.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={errorDialogOpen}
        onOpenChange={(open) => {
          setErrorDialogOpen(open);
          if (!open) setErrorMessage(null);
        }}
      >
        <DialogContent className="sm:max-w-md" style={{ direction: "rtl" }}>
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">
              فشل في الاشتراك
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              {errorMessage ??
                "عذراً، حدث خطأ أثناء تسجيل بريدك الإلكتروني. يرجى المحاولة مرة أخرى."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThirdSectoin;
