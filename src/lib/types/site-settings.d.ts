/**
 * Site settings data - CMS-managed content for various pages and sections.
 * All fields can be string (HTML content or image URL) or null.
 */
declare type SiteSettingsData = {
  // Home page
  home_slider_1: string | null;
  home_slider_2: string | null;
  home_slider_3: string | null;
  home_slider_4: string | null;
  home_footer_background: string | null;
  home_latest_topics_background: string | null;

  // Litigants portal
  litigants_intro_text: string | null;
  litigants_background: string | null;

  // Appeal
  appeal_intro_text: string | null;
  appeal_background: string | null;

  // Notices
  notices_intro_text: string | null;
  notices_background: string | null;

  // Releases
  releases_intro_text: string | null;
  releases_background: string | null;

  // Legal principles
  principle_intro_text: string | null;
  principle_background: string | null;

  // Library
  library_intro_text: string | null;
  library_background: string | null;

  // Constitutional court
  constitutional_intro_text: string | null;
  constitutional_background: string | null;

  // Courts law
  legal_intro_text: string | null;
  legal_background: string | null;

  // Supreme court library
  supreme_library_intro_text: string | null;
  supreme_library_background: string | null;

  // Technical office
  technical_office_intro_text: string | null;
  technical_office_background: string | null;

  // Visitor services
  visitor_services_intro_text: string | null;
  visitor_services_background: string | null;

  // About
  about_intro_text: string | null;
  about_background: string | null;
  about_supreme_court_background: string | null;
  about_supreme_court_text: string | null;

  // General assembly
  general_assembly_text: string | null;
  general_assembly_background: string | null;

  // News
  news_text: string | null;
  news_background: string | null;

  // Performance metrics
  performance_metrics_text: string | null;
  performance_metrics_background: string | null;
};

/**
 * API response for site settings retrieval
 */
declare type SiteSettingsResponse = {
  success: boolean;
  message: string;
  data: SiteSettingsData;
};
