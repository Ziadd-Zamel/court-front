"use client";

import { Button } from "@/components/ui/button";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { SiMessenger } from "react-icons/si";
import { useState } from "react";

const ThirdSectoin = () => {
  const [copied, setCopied] = useState(false);

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
      // Clipboard might be blocked in some browsers/contexts.
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
      {/* Email Input Form */}
      <div className="mb-6 flex">
        <div className="flex w-full max-w-[400px] items-center gap-0 overflow-hidden rounded-md border border-white/10 bg-white/10 focus-within:ring-1 focus-within:ring-main">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="flex-1 bg-transparent px-4 py-2 text-right text-white placeholder-white/50 focus:outline-none"
            style={{ direction: "rtl" }}
          />
          <Button type="submit" className="shrink-0 h-full rounded-none">
            اشترك
          </Button>
        </div>
      </div>
      <h3 className="mb-8 mt-16 text-xl font-semibold text-main">
        شارك هذه الصفحة عبر:
      </h3>
      <div className="flex w-full gap-8 flex-row-reverse justify-end">
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
  );
};

export default ThirdSectoin;
