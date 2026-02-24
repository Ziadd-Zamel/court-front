declare type NewsArticle = {
  uuid: string;
  title: string;
  type: string;
  category: string;
  category_uuid: string;
  content_html: string;
  content_text: string;
  image?: string;
  main_image: string;
  main_video: string | null;
  video?: string | null;
  created_at: string;
  updated_at: string;
  images: string[];
  publish_date: string;
  source: string;
};
declare type ArticleCategory = {
  uuid: string;
  name: string;
};
