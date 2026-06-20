import { createParser } from "nuqs";
import { normalizeNumericParam } from "@/lib/utils/normalize-numeric-param";

export const parseAsNormalizedNumericString = createParser({
  parse(value) {
    return normalizeNumericParam(value) ?? null;
  },
  serialize(value) {
    return normalizeNumericParam(value) ?? "";
  },
});
