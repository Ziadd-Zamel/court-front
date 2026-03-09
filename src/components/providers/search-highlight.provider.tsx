"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Suspense,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";

/** Search param keys to use for highlighting (e.g. ?search=foo&time=bar) */
const HIGHLIGHT_PARAM_KEYS = ["search", "time", "similar_phrase"] as const;

/** Params whose value is multiple words separated by space - each word is highlighted separately (principle page) */
const MULTI_WORD_PARAM_KEYS = ["include_terms", "any_terms"] as const;

type SearchHighlightContextValue = {
  /** Terms to highlight, from URL search params. Empty array when none. */
  highlightTerms: string[];
};

const SearchHighlightContext = createContext<SearchHighlightContextValue>({
  highlightTerms: [],
});

function extractTerms(searchParams: URLSearchParams): string[] {
  const terms: string[] = [];
  for (const key of HIGHLIGHT_PARAM_KEYS) {
    const value = searchParams.get(key);
    if (value?.trim()) terms.push(value.trim());
  }
  for (const key of MULTI_WORD_PARAM_KEYS) {
    const value = searchParams.get(key);
    if (value?.trim()) {
      terms.push(
        ...value.split(/\s+/).map((w) => w.trim()).filter(Boolean)
      );
    }
  }
  return terms;
}

/** Inner component that uses useSearchParams - must be inside Suspense */
function SearchHighlightParamsReader({
  onTerms,
}: {
  onTerms: (terms: string[]) => void;
}) {
  const searchParams = useSearchParams();
  const terms = useMemo(() => extractTerms(searchParams), [searchParams]);
  useEffect(() => {
    onTerms(terms);
  }, [terms, onTerms]);
  return null;
}

export function SearchHighlightProvider({ children }: { children: ReactNode }) {
  const [highlightTerms, setHighlightTerms] = useState<string[]>([]);

  return (
    <SearchHighlightContext.Provider value={{ highlightTerms }}>
      <Suspense fallback={null}>
        <SearchHighlightParamsReader onTerms={setHighlightTerms} />
      </Suspense>
      {children}
    </SearchHighlightContext.Provider>
  );
}

export function useSearchHighlight() {
  const context = useContext(SearchHighlightContext);
  if (!context) {
    throw new Error(
      "useSearchHighlight must be used within SearchHighlightProvider",
    );
  }
  return context;
}
