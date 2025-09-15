declare type BookData = {
  uuid: string;
  title: string;
  category: string;
  author: string;
  publisher: string;
  published_year: string;
  book_image: string;
  pdf_url: string;
  court_release: boolean;
  court_release_available: boolean;
  technical_office: boolean;
  technical_office_type: "supreme_court" | "rulings_set" | "other";
  index_content: string;
  index_images: {
    uuid: string;
    image_path: string;
  }[];
};
declare type PendingBook = {
  title: string;
  author: string;
  issue_number: string;
};
