import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/site";

export default function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/assets/SnalFullLongLogo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "طرابلس",
      addressCountry: "LY",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+218-21-3403725",
      availableLanguage: ["ar"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
