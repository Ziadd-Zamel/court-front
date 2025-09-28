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
  publish_date: string;
  brief_html: string;
  author: string;
  number: string;
  sign: string;
  video_link: string | null;
  concatenated_contents?: ConcatenatedContents;

  rule: {
    title: string;
    body_html: string;
    body_text: string;
  };

  contents: Content[];
  tags: string[];
  sub_category: string;
  counselors: any[];
};
