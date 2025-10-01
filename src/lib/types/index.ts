type CaseTypes = {
  "دوائر النقض المدني": number;
  "دوائر النقض الجنائي": number;
  "دوائر النقض الإداري": number;
  "دوائر نقض الأحوال الشخصية": number;
};

export type YearlyData = Record<number, { amount: number; cases: CaseTypes }>;
export interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
  iconClassName?: string;
  textClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
}
export interface SlideData {
  content: string;
  backgroundImage: string;
  showoverlay?: boolean;
}
