"use client";

import { useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

type ShareType = "article" | "book" | "news" | "question";

interface ShareButtonProps {
  item: Article | BookData | NewsArticle | Iquestion;
  type: ShareType;
  size?: number;
  className?: string;
  variant?: "default" | "light";
}

export function ShareButton({
  item,
  type,
  size = 16,
  className = "p-1",
  variant = "default",
}: ShareButtonProps) {
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const getItemDetails = () => {
    switch (type) {
      case "article":
        const article = item as Article;
        return {
          title: article.title,
          description:
            article.brief?.replace(/<[^>]*>/g, "").substring(0, 200) + "..." ||
            "",
          url: window.location.href,
        };
      case "book":
        const book = item as BookData;
        return {
          title: book.title,
          description: `${book.author ? `المؤلف: ${book.author}` : ""}${
            book.category ? ` | ${book.category}` : ""
          }`,
          url: window.location.href,
        };
      case "news":
        const news = item as NewsArticle;
        return {
          title: news.title,
          description:
            news["content-text"]?.substring(0, 200) + "..." ||
            news.category ||
            "",
          url: window.location.href,
        };
      case "question":
        const question = item as Iquestion;
        return {
          title: question.title,
          description: question.answer?.substring(0, 200) + "..." || "",
          url: window.location.href,
        };
    }
  };

  const handleShare = (
    platform: "facebook" | "messenger" | "twitter" | "whatsapp",
  ) => {
    const { url, title, description } = getItemDetails();
    const cleanDescription = description.replace(/<[^>]*>/g, "").trim();

    try {
      switch (platform) {
        case "facebook":
          const facebookShareUrl =
            `https://www.facebook.com/sharer/sharer.php?` +
            `u=${encodeURIComponent(url)}&` +
            `quote=${encodeURIComponent(`${title}\n\n${cleanDescription}`)}`;

          const facebookWindow = window.open(
            facebookShareUrl,
            "facebook-share-dialog",
            "width=626,height=436,resizable=yes,scrollbars=yes",
          );

          if (!facebookWindow) {
            handleFallbackShare(url, title, cleanDescription);
          }
          break;

        case "messenger":
          const messengerText = `${title}\n\n${cleanDescription}\n\n${url}`;
          const messengerUrl = `https://m.me/?text=${encodeURIComponent(
            messengerText,
          )}`;

          const messengerWindow = window.open(
            messengerUrl,
            "_blank",
            "width=500,height=600",
          );

          if (!messengerWindow) {
            if (navigator.userAgent.includes("Mobile")) {
              window.location.href = `fb-messenger://share?link=${encodeURIComponent(
                url,
              )}`;
            } else {
              handleFallbackShare(url, title, cleanDescription);
            }
          }
          break;

        case "twitter":
          const twitterText = `${title}\n\n${cleanDescription}`;
          const twitterUrl =
            `https://twitter.com/intent/tweet?` +
            `text=${encodeURIComponent(twitterText)}&` +
            `url=${encodeURIComponent(url)}`;

          window.open(twitterUrl, "_blank", "width=550,height=420");
          break;

        case "whatsapp":
          const whatsappText = `*${title}*\n\n${cleanDescription}\n\n${url}`;
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
            whatsappText,
          )}`;

          window.open(whatsappUrl, "_blank");
          break;
      }
    } catch (error) {
      console.error("Share error:", error);
      handleFallbackShare(url, title, cleanDescription);
    }

    setShowShareDropdown(false);
  };

  const handleFallbackShare = (
    url: string,
    title: string,
    description: string,
  ) => {
    const fallbackText = `${title}\n\n${description}\n\n${url}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fallbackText).then(() => {
        toast.error("حدث خطأ في المشاركة. تم نسخ المحتوى إلى الحافظة");
      });
    } else {
      toast.error("حدث خطأ في المشاركة");
    }
  };

  const buttonStyles =
    variant === "light"
      ? "bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  const iconStyles = variant === "light" ? "text-main" : "text-gray-700";

  return (
    <div
      className="inline-block relative"
      style={{ zIndex: 9999 }}
      onMouseEnter={() => setShowShareDropdown(true)}
      onMouseLeave={() => setShowShareDropdown(false)}
    >
      <button
        className={`${className} flex cursor-pointer items-center justify-center rounded-full w-8 h-8 transition-all duration-200 border ${buttonStyles}`}
        title="مشاركة"
      >
        <Share2 size={size} className={`transition-colors ${iconStyles}`} />
      </button>

      <AnimatePresence>
        {showShareDropdown && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden backdrop-blur-sm"
            style={{ zIndex: 99999 }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Facebook */}
            <div
              className="flex w-12 h-12 cursor-pointer items-center justify-center border-b border-gray-200 dark:border-gray-600 transition-all hover:bg-blue-50 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("facebook")}
              title="مشاركة على فيسبوك"
            >
              <FaFacebookF
                size={18}
                className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 group-hover:scale-110 transition-all"
              />
            </div>

            {/* Messenger */}
            <div
              className="flex w-12 h-12 cursor-pointer items-center justify-center border-b border-gray-200 dark:border-gray-600 transition-all hover:bg-blue-50 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("messenger")}
              title="مشاركة على ماسنجر"
            >
              <SiMessenger
                size={18}
                className="text-gray-600 dark:text-gray-300 group-hover:text-blue-500 group-hover:scale-110 transition-all"
              />
            </div>

            {/* Twitter */}
            <div
              className="flex w-12 h-12 cursor-pointer items-center justify-center border-b border-gray-200 dark:border-gray-600 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("twitter")}
              title="مشاركة على تويتر"
            >
              <BsTwitterX
                size={18}
                className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-all"
              />
            </div>

            {/* WhatsApp */}
            <div
              className="flex w-12 h-12 cursor-pointer items-center justify-center transition-all hover:bg-green-50 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("whatsapp")}
              title="مشاركة على واتساب"
            >
              <FaWhatsapp
                size={18}
                className="text-gray-600 dark:text-gray-300 group-hover:text-green-500 group-hover:scale-110 transition-all"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
