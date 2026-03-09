"use client";

import { useSearchHighlight } from "@/components/providers/search-highlight.provider";
import { highlightText } from "@/lib/utils/highlight-search";

type HighlightedTextProps = {
  /** Plain text to render (will be highlighted if search params exist) */
  text: string;
  /** Optional: override className for the wrapper span */
  className?: string;
};

/**
 * Renders plain text and highlights words from URL search params (search, time, etc.).
 * Use this for non-HTML content when you want global search highlighting.
 */
export function HighlightedText({ text, className }: HighlightedTextProps) {
  const { highlightTerms } = useSearchHighlight();

  const processed =
    highlightTerms.length > 0 ? highlightText(text, highlightTerms) : text;

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
