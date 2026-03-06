declare type Assembly = {
  uuid: string;
  category: string;
  title: string;
  date: string;
  publish_date: string;
  brief: string;
  body_html: string;
  body_text: string;
  pdf: null | string;
  items: {
    body: string;
    title: string;
  }[];
};
