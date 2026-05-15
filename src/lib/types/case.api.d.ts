declare type SessionType = {
  ripp_id: number;
  session_date: string;
  number_of_session: string;
  why: string;
  ruling: string;
};
declare type CaseDataType = {
  id: number;
  rippId: string;
  year: number;
  ripper: string;
  ripper_adjective: string | null;
  ripper_lawyername: string;
  ripper_nationality: string | null;
  appellant: string;
  appellant_adjective: string | null;
  appellant_lawyername: string;
  appellant_nationality: string | null;
  classname: string;
  conclusion: string;
  concluDate: string;
  itemname: string;
  issueId: string;
  incoming_date: string;
  receiptdate: string;
  partNumber: string;
  orgname: string;
  notes: string | null;
  appeals_review: {
    session_date: string;
    ruling: string;
    percentage?: number;
  }[];
  appeals_sessions: {
    session_date: string;
    number_of_session: string;
    why: string;
    ruling: string;
    percentage?: number;
  }[];
  appeals_urgent: {
    ruling: string;
    session_date: string;
    percentage?: number;
  }[];
  final_judgment: {
    final_judgment: string;
    judgment_ruling: string;
    draft_judgment: number;
    final_draft_judgment: number;
    draft_judgment_percentage?: number;
    final_judgment_percentage?: number;
  };
  niaba: {
    Concluding_Opinion: string;
    Summary_of_Opinion: string;
    date_of_filing: string;
    date_of_move: string;
    date_of_filing_percentage?: number;
    date_of_move_percentage?: number;
  };
};

declare type CaseResponseType = {
  data: CaseDataType[];
};
