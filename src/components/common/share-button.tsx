"use client";

import { useRef, useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function principleShareTitle(principle: Principle): string {
  const norm = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const text = String(value).trim();
    if (!text || text.toLowerCase() === "null") return "";
    return text;
  };
  const serial = norm(principle.serial_number) || norm(principle.number);
  const year = norm(principle.gregorian_year);
  const principleType = norm(principle.principle_type);
  const numYear = [serial, year].filter(Boolean).join("-");
  const body = [numYear, principleType].filter(Boolean).join(" ");
  return body ? `المبدأ القانوني: ${body}` : "المبدأ القانوني";
}

type Assembly = {
  uuid: string;
  category: string;
  title: string;
  date: string;
  brief: string;
  body_html: string;
  body_text: string;
};

type ShareType =
  | "article"
  | "book"
  | "news"
  | "question"
  | "principle"
  | "assembly"
  | "law";

interface ShareButtonProps {
  item:
    | Article
    | BookData
    | NewsArticle
    | Iquestion
    | Principle
    | Assembly
    | { uuid: string; title: string | null };
  type: ShareType;
  size?: number;
  className?: string;
  variant?: "default" | "light";
}

const shareItemClass =
  "h-12 w-12 rounded-none border-b border-gray-200 p-0 last:border-b-0 dark:border-gray-600";

const shareIconClass =
  "text-gray-600 transition-transform group-hover:scale-110 dark:text-gray-300";

export function ShareButton({
  item,
  type,
  size = 21,
  className = "p-1",
  variant = "default",
}: ShareButtonProps) {
  const getItemDetails = () => {
    switch (type) {
      case "article": {
        const article = item as Article;
        return {
          title: article.title,
          description:
            article.brief?.replace(/<[^>]*>/g, "").substring(0, 200) + "..." ||
            "",
          url: window.location.href,
        };
      }
      case "book": {
        const book = item as BookData;
        return {
          title: book.title,
          description: `${book.author ? `المؤلف: ${book.author}` : ""}${
            book.category ? ` | ${book.category}` : ""
          }`,
          url: window.location.href,
        };
      }
      case "news": {
        const news = item as NewsArticle;
        return {
          title: news.title,
          description:
            news.content_text?.substring(0, 200) + "..." || news.category || "",
          url: window.location.href,
        };
      }
      case "question": {
        const question = item as Iquestion;
        return {
          title: question.title,
          description: question.answer?.substring(0, 200) + "..." || "",
          url: window.location.href,
        };
      }
      case "principle": {
        const principle = item as Principle;
        return {
          title: principleShareTitle(principle),
          description:
            principle.brief?.replace(/<[^>]*>/g, "").substring(0, 200) +
              "..." || "",
          url: window.location.href,
        };
      }
      case "assembly": {
        const assembly = item as Assembly;
        return {
          title: assembly.title,
          description:
            assembly.brief?.replace(/<[^>]*>/g, "").substring(0, 200) + "..." ||
            "",
          url: window.location.href,
        };
      }
      case "law": {
        const law = item as { uuid: string; title: string | null };
        return {
          title: law.title || "قانون",
          description: "",
          url: window.location.href,
        };
      }
    }
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

  const handleShare = (
    platform: "facebook" | "messenger" | "twitter" | "whatsapp",
  ) => {
    const { url, title, description } = getItemDetails();
    const cleanDescription = description.replace(/<[^>]*>/g, "").trim();

    try {
      switch (platform) {
        case "facebook": {
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
        }

        case "messenger": {
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
        }

        case "twitter": {
          const twitterText = `${title}\n\n${cleanDescription}`;
          const twitterUrl =
            `https://twitter.com/intent/tweet?` +
            `text=${encodeURIComponent(twitterText)}&` +
            `url=${encodeURIComponent(url)}`;

          window.open(twitterUrl, "_blank", "width=550,height=420");
          break;
        }

        case "whatsapp": {
          const whatsappText = `*${title}*\n\n${cleanDescription}\n\n${url}`;
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
            whatsappText,
          )}`;

          window.open(whatsappUrl, "_blank");
          break;
        }
      }
    } catch (error) {
      console.error("Share error:", error);
      handleFallbackShare(url, title, cleanDescription);
    }

    setOpen(false);
  };

  const buttonStyles =
    variant === "light"
      ? "bg-white dark:bg-white/15 dark:hover:bg-white/20 dark:border-main/50 dark:hover:border-main/60 backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white dark:bg-white/15 dark:hover:bg-white/20 dark:border-main/50 dark:hover:border-main/60 backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  const iconStyles =
    variant === "light" ? "text-main" : "text-gray-700 dark:!text-main";

  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <div
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              className,
              "group flex size-5 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 md:size-8",
              buttonStyles,
            )}
            title="مشاركة"
            aria-label="مشاركة"
          >
            <Share2
              size={size}
              className={cn(
                "max-md:scale-[1.2] transition-colors md:scale-100",
                iconStyles,
              )}
            />
          </button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="w-12 min-w-12 rounded-lg p-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuItem
          className={cn(shareItemClass, "group hover:bg-blue-50")}
          onClick={() => handleShare("facebook")}
          title="مشاركة على فيسبوك"
        >
          <FaFacebookF size={18} className={shareIconClass} />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(shareItemClass, "group hover:bg-blue-50")}
          onClick={() => handleShare("messenger")}
          title="مشاركة على ماسنجر"
        >
          <SiMessenger size={18} className={shareIconClass} />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(shareItemClass, "group hover:bg-gray-100")}
          onClick={() => handleShare("twitter")}
          title="مشاركة على تويتر"
        >
          <BsTwitterX size={18} className={shareIconClass} />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(shareItemClass, "group hover:bg-green-50")}
          onClick={() => handleShare("whatsapp")}
          title="مشاركة على واتساب"
        >
          <FaWhatsapp size={18} className={shareIconClass} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
