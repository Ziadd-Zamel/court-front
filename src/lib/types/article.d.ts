/* eslint-disable @typescript-eslint/no-explicit-any */
declare type Article = {
  uuid: string;
  title: string;
  brief: string;
  publish_date: string;
  author: string;
  number: string;
  sign: string;
  video_link: string | null;
  rule: {
    title: string;
    body_html: string;
    body_text: string;
  };
  contents: any[];
  tags: string[];
  sub_category: string;
};
