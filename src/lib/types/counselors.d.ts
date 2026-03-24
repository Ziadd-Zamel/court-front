declare type Counselor = {
  uuid: string;
  name: string;
  birth_date: string | null;
  experience_years: number | null;
  appointed_year: string | null;
  appointment_date: string | null;
  higher_qualification: string | null;
  higher_qualification_date: string | null;
  qualification: string | null;
  qualification_date: string | null;
  fields: {
    field: string;
  }[];
  image: string | null;
  status: string | null;
  tasks: string | null;
  rulings: Article[];
};
