"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

const rulingTypeParser = parseAsArrayOf(parseAsString);

type PrincipleCategoryContextValue = {
  pendingCategories: string[];
  toggleCategory: (id: string) => void;
  commitCategoriesToUrl: () => void;
};

const PrincipleCategoryContext =
  createContext<PrincipleCategoryContextValue | null>(null);

export function PrincipleCategoryProvider({ children }: { children: ReactNode }) {
  const [urlCategories, setUrlCategories] = useQueryStates(
    { ruling_type_uuid: rulingTypeParser.withDefault([]) },
    { shallow: false },
  );

  const [pendingCategories, setPendingCategories] = useState<string[]>([]);

  const urlKey = urlCategories.ruling_type_uuid.join(",");

  useEffect(() => {
    setPendingCategories(urlCategories.ruling_type_uuid);
  }, [urlKey, urlCategories.ruling_type_uuid]);

  const toggleCategory = useCallback((id: string) => {
    setPendingCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const commitCategoriesToUrl = useCallback(() => {
    setUrlCategories({
      ruling_type_uuid: pendingCategories.length ? pendingCategories : null,
    });
  }, [setUrlCategories, pendingCategories]);

  return (
    <PrincipleCategoryContext.Provider
      value={{ pendingCategories, toggleCategory, commitCategoriesToUrl }}
    >
      {children}
    </PrincipleCategoryContext.Provider>
  );
}

export function usePrincipleCategory() {
  const ctx = useContext(PrincipleCategoryContext);
  if (!ctx) {
    throw new Error(
      "usePrincipleCategory must be used inside PrincipleCategoryProvider",
    );
  }
  return ctx;
}
