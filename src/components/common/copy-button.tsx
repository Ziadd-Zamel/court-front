"use client";

import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { Files } from "lucide-react";
interface CopyButtonProps {
  text: string;
  size?: number;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  variant?: "default" | "light";
}

export function CopyButton({
  text,
  size = 16,
  className = "p-1",
  successMessage = "تم نسخ النص",
  errorMessage = "فشل النسخ",
  variant = "default",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);

      // Reset icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error(errorMessage);
    }
  };

  const buttonStyles =
    variant === "light"
      ? "bg-white backdrop-blur-sm hover:bg-white/80  border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white backdrop-blur-sm hover:bg-white/80  border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  const iconStyles = variant === "light" ? "text-main" : "text-gray-700";

  const copiedStyles =
    "bg-main hover:bg-main border-main shadow-md hover:shadow-lg scale-105";

  return (
    <button
      onClick={handleCopy}
      className={`${className} flex cursor-pointer items-center justify-center rounded-full w-8 h-8 transition-all duration-200 border ${
        copied ? copiedStyles : buttonStyles
      }`}
      aria-label="Copy text"
      title={copied ? "تم النسخ" : "نسخ النص"}
    >
      {copied ? (
        <FaCheck size={size} className="text-white" />
      ) : (
        <Files size={size} className={`transition-colors ${iconStyles}`} />
      )}
    </button>
  );
}
