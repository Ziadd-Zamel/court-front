declare type ILawyer = {
  uuid: string;
  name: string;
  office_name: string;
  email: string;
  phone: string;
  image: string | null;
  office_circle: mainData[];
  fields: mainData[];
};
