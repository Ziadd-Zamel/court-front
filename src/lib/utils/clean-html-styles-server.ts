/**
 * Server-safe version of cleanHtmlStyles.
 * Strips font-related inline styles and attributes from HTML using only string operations.
 * Use this in Server Components; use cleanHtmlStyles in Client Components.
 */

const FONT_PROPERTIES = [
  "font-size",
  "font-family",
  "font-weight",
  "color",
  "font",
  "font-style",
  "font-variant",
  "mso-fareast-font-family",
  "margin",
  "margin-top",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "padding",
  "padding-top",
  "padding-bottom",
  "padding-left",
  "padding-right",
];

function isFontProperty(property: string): boolean {
  const prop = property.trim().toLowerCase();
  return FONT_PROPERTIES.some((fontProp) => {
    return (
      prop === fontProp ||
      prop.startsWith(fontProp + "-") ||
      (fontProp === "font" && prop.startsWith("font")) ||
      (fontProp === "margin" && prop.startsWith("margin")) ||
      (fontProp === "padding" && prop.startsWith("padding"))
    );
  });
}

function cleanStyleAttribute(styleValue: string): string | null {
  const declarations = styleValue
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean);

  const cleaned = declarations.filter((decl) => {
    const colonIndex = decl.indexOf(":");
    const property = colonIndex === -1 ? decl : decl.slice(0, colonIndex);
    return !isFontProperty(property);
  });

  if (cleaned.length === 0) return null;
  return cleaned.join("; ") + ";";
}

export function cleanHtmlStylesServer(htmlString: string): string {
  if (typeof htmlString !== "string") return "";

  let result = htmlString;

  // 1. Process style="..." attributes
  result = result.replace(
    /style\s*=\s*["']([^"']*)["']/gi,
    (_match, styleValue) => {
      const cleaned = cleanStyleAttribute(styleValue);
      return cleaned ? `style="${cleaned}"` : "";
    },
  );

  // 2. Remove empty style="" or style='' left after cleaning
  result = result.replace(/\s*style\s*=\s*["']['"]/gi, "");

  // 3. Remove font-related attributes: face, size, color
  result = result.replace(/\s+(face|size|color)\s*=\s*["'][^"']*["']/gi, "");

  return result;
}
