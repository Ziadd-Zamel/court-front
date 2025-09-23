/* eslint-disable @typescript-eslint/no-explicit-any */
export const cleanHtmlStyles = (htmlString: any) => {
  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  // Get all elements with style attributes
  const elementsWithStyle = tempDiv.querySelectorAll("[style]");

  elementsWithStyle.forEach((element) => {
    const currentStyle = element.getAttribute("style");
    if (currentStyle) {
      // Split the style string into individual declarations
      const styleDeclarations = currentStyle
        .split(";")
        .filter((decl) => decl.trim());

      // Filter out font-related styles
      const cleanedDeclarations = styleDeclarations.filter((declaration) => {
        const property = declaration.split(":")[0].trim().toLowerCase();

        // List of font-related properties to remove (exact matches)
        const fontProperties = [
          "font-size",
          "font-family",
          "font-weight",
          "color",
          "font",
          "font-style",
          "font-variant",
          "mso-fareast-font-family",
        ];

        // Check for exact property match or if property starts with font-related terms
        const isFontProperty = fontProperties.some((fontProp) => {
          return (
            property === fontProp ||
            property.startsWith(fontProp + "-") ||
            (fontProp === "font" && property.startsWith("font"))
          );
        });

        // Keep declaration if it's NOT a font property
        return !isFontProperty;
      });

      // Update the style attribute
      if (cleanedDeclarations.length > 0) {
        element.setAttribute("style", cleanedDeclarations.join("; ") + ";");
      } else {
        element.removeAttribute("style");
      }
    }
  });

  // Also remove font-related attributes from elements
  const elementsWithFontAttribs = tempDiv.querySelectorAll("*");
  elementsWithFontAttribs.forEach((element) => {
    // Remove common font attributes
    const fontAttributes = ["face", "size", "color"];
    fontAttributes.forEach((attr) => {
      if (element.hasAttribute(attr)) {
        element.removeAttribute(attr);
      }
    });
  });

  return tempDiv.innerHTML;
};
