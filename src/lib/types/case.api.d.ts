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
  appellant: string;
  classname: string;
  reason_name: string;
  itemname: string;
  issueId: number;
  partNumber: number;
  orgname: string;
  notes: string;
  sessions: SessionType[];
};

declare type CaseResponseType = {
  data: CaseDataType[];
};
