declare type PrincipleType = {
  uuid: string;
  name: string;
};

declare type PrincipleContent = {
  brief: string;
  content: string;
  id: number;
};

declare type Principle = {
  uuid: string;
  brief: string;
  content: string;
  contents: PrincipleContent[];
  gregorian_year: string | null;
  issue_number: string;
  judicial_year: string | null;
  number: string | null;
  overturn: boolean | null;
  overturn_decision: string | null;
  page_number: number;
  principle_type: string | null;
  principle_type_uuid: string | null;
  session_date: string;
  publish_on_website: boolean;
  ruling_type: string | null;
  ruling_type_uuid: string | null;
  serial_number: string | null;
  session_date: string | null;
  sign: string | null;
  status: boolean;
  supreme_court_magazine: boolean;
  tags: string[];
  website_url: string | null;
};
