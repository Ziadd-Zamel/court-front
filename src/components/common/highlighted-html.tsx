"use client";

import { useSearchHighlight } from "@/components/providers/search-highlight.provider";
import { highlightHtml } from "@/lib/utils/highlight-search";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

type HighlightedHtmlProps = {
  /** Raw HTML string to render (will be cleaned, then highlighted if search params exist) */
  html: string;
  /** Optional: override className for the wrapper div */
  className?: string;
  /** Optional: override style for the wrapper div */
  style?: React.CSSProperties;
};

/**
 * Renders HTML content: cleans it with cleanHtmlStyles, then highlights words from URL search params (search, time, etc.).
 * Use this instead of dangerouslySetInnerHTML when you want global search highlighting.
 */
export function HighlightedHtml({
  html,
  className,
  style,
}: HighlightedHtmlProps) {
  const { highlightTerms } = useSearchHighlight();

  const cleanedHtml = cleanHtmlStyles(html ?? "");
  const processedHtml =
    highlightTerms.length > 0 ? highlightHtml(cleanedHtml, highlightTerms) : cleanedHtml;

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}
