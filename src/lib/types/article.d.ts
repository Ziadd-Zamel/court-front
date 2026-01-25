/* eslint-disable @typescript-eslint/no-explicit-any */
declare type Content = {
  title: string;
  body_html: string;
  body_text: string;
};
interface ConcatenatedContents {
  first?: Content;
  second?: Content;
  third?: Content;
  fourth?: Content;
  fifth?: Content;
  sixth?: Content;
  seventh?: Content;
  eighth?: Content;
}
declare type Article = {
  uuid: string;
  title: string;
  brief: string;
  brief_html: string;
  brief_text: string;
  publish_date: string;
  author: string;
  number: string;
  sign: string;
  audio_file: string | null;
  pdf_file: string;
  judicial_year: number;
  principle_number: string;
  principle_type: string;
  principle_type_uuid: string;
  principle_year: number;
  ruling_date: string;
  ruling_type: string;
  ruling_type_uuid: string;
  main_category: string;
  main_category_uuid: string;
  sub_category: string;
  sub_category_uuid: string;
  video_link: string | null;
  concatenated_contents?: ConcatenatedContents;
  rule: {
    title: string;
    body_html: string;
    body_text: string;
  };
  contents: Content[];
  tags: string[];
  tags_uuid: string[];
  counselors: any[];
};
