declare type Counselor = {
  uuid: string;
  name: string;
  birth_date: string;
  experience_years: number;
  appointed_year: string;
  higher_qualification: string;
  qualification: string;
  fields: {
    field: string;
  }[];
  image: string | null;
  tasks: string;
  rulings: Article[];
};
