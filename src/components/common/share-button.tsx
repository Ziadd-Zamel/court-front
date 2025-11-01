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
}

export function ShareButton({
  item,
  type,
  size = 16,
  className = "p-1",
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
    platform: "facebook" | "messenger" | "twitter" | "whatsapp"
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
            "width=626,height=436,resizable=yes,scrollbars=yes"
          );

          if (!facebookWindow) {
            handleFallbackShare(url, title, cleanDescription);
          }
          break;

        case "messenger":
          const messengerText = `${title}\n\n${cleanDescription}\n\n${url}`;
          const messengerUrl = `https://m.me/?text=${encodeURIComponent(
            messengerText
          )}`;

          const messengerWindow = window.open(
            messengerUrl,
            "_blank",
            "width=500,height=600"
          );

          if (!messengerWindow) {
            if (navigator.userAgent.includes("Mobile")) {
              window.location.href = `fb-messenger://share?link=${encodeURIComponent(
                url
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
            whatsappText
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
    description: string
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

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowShareDropdown(true)}
      onMouseLeave={() => setShowShareDropdown(false)}
    >
      <button
        className={`${className} flex cursor-pointer items-center justify-center rounded-full w-6 h-6 transition-all duration-200 bg-gray-100 group hover:bg-main border border-gray-300 hover:border-main`}
        title="مشاركة"
      >
        <Share2
          size={size}
          className="text-gray-600 group-hover:text-white transition-colors "
        />
      </button>

      <AnimatePresence>
        {showShareDropdown && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 flex flex-col bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Facebook */}
            <div
              className="flex w-10 h-10 cursor-pointer items-center justify-center border-b border-gray-200 dark:border-gray-600 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("facebook")}
              title="مشاركة على فيسبوك"
            >
              <FaFacebookF
                size={16}
                className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors"
              />
            </div>

            {/* Messenger */}
            <div
              className="flex w-10 h-10 cursor-pointer items-center justify-center border-b border-gray-200 dark:border-gray-600 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("messenger")}
              title="مشاركة على ماسنجر"
            >
              <SiMessenger
                size={16}
                className="text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors"
              />
            </div>

            {/* Twitter */}
            <div
              className="flex w-10 h-10 cursor-pointer items-center justify-center border-b border-gray-200 dark:border-gray-600 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("twitter")}
              title="مشاركة على تويتر"
            >
              <BsTwitterX
                size={16}
                className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors"
              />
            </div>

            {/* WhatsApp */}
            <div
              className="flex w-10 h-10 cursor-pointer items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => handleShare("whatsapp")}
              title="مشاركة على واتساب"
            >
              <FaWhatsapp
                size={16}
                className="text-gray-600 dark:text-gray-300 group-hover:text-green-500 transition-colors"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
