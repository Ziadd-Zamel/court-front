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
import { parseAsString, useQueryStates } from "nuqs";

import { principleSearchParsers } from "@/hooks/use-principle-search";

/** Params used on library / other pages (not principle search form). */
const legacyHighlightParsers = {
  search: parseAsString,
  time: parseAsString,
};

type SearchHighlightContextValue = {
  /** Terms to highlight, derived from current URL via nuqs (same source as search). */
  highlightTerms: string[];
};

const SearchHighlightContext = createContext<SearchHighlightContextValue>({
  highlightTerms: [],
});

function splitMultiWordParam(value: string | null | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
}

function buildHighlightTerms(
  p: {
    exact_phrase: string | null;
    similar_phrase: string | null;
    include_terms: string | null;
    any_terms: string | null;
  },
  legacy: { search: string | null; time: string | null },
): string[] {
  const terms: string[] = [];
  if (legacy.search?.trim()) terms.push(legacy.search.trim());
  if (legacy.time?.trim()) terms.push(legacy.time.trim());
  if (p.exact_phrase?.trim()) terms.push(p.exact_phrase.trim());
  if (p.similar_phrase?.trim()) terms.push(p.similar_phrase.trim());
  terms.push(...splitMultiWordParam(p.include_terms));
  terms.push(...splitMultiWordParam(p.any_terms));
  return terms;
}

/** Reads highlight terms from URL using nuqs so updates stay in sync (e.g. principle ?include_terms=). */
function SearchHighlightParamsReader({
  onTerms,
}: {
  onTerms: (terms: string[]) => void;
}) {
  const [principleUrl] = useQueryStates(principleSearchParsers);
  const [legacyUrl] = useQueryStates(legacyHighlightParsers);

  const terms = useMemo(
    () => buildHighlightTerms(principleUrl, legacyUrl),
    [
      principleUrl.exact_phrase,
      principleUrl.similar_phrase,
      principleUrl.include_terms,
      principleUrl.any_terms,
      legacyUrl.search,
      legacyUrl.time,
    ],
  );

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
