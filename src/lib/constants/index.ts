import { Megaphone, PinIcon } from "lucide-react";
import { SlideData, YearlyData } from "../types";
type Area = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};
export const areas: Area[] = [
  {
    title: " النقض المدني",
    description:
      "٦٥٠/٧٥ق:الاختصاص الاستثنائي بالتعويض عن جريمة – حجية أمر النيابة أمام المدني",
    icon: Megaphone,
  },
  {
    title: " النقض الإداري",
    description:
      "٦٩/٧٩ق:الدعوى الأصلية بالجنسية – الاختصاص المانع بنظرها للقضاء الإداري",
    icon: PinIcon,
  },
  {
    title: "النقض المدني ",
    description:
      "٦٨/٥٦ق: تقدير الوقائع وإثبات الخطأ وعلاقة السبيبة وتحديد المسؤول من مسائل الواقع",
    icon: PinIcon,
  },
];
export const areasv2: Area[] = [
  {
    title: " النقض الجنائي",
    description:
      "٧٠/٣٦١ق:جريمة القتل العمل – مدلول سبق الإصرار والترصد – أساس الحكم بالإعدام",
    icon: PinIcon,
  },
  {
    title: " مقالات قانونية",
    description:
      " ٢٣م.م.ع:الشهادة السلبية شرط لقبول الدعاوى العينية العقارية: تأثير الظرف الاستثنائي",
    icon: PinIcon,
  },
  {
    title: "النقض المدني ",
    description:
      "٦٨/٥٦ق: تقدير الوقائع وإثبات الخطأ وعلاقة السبيبة وتحديد المسؤول من مسائل الواقع",
    icon: PinIcon,
  },
];
export const areasv3: Area[] = [
  {
    title: " النقض الجنائي",
    description:
      "٧٠/٣٦١ق:جريمة القتل العمل – مدلول سبق الإصرار والترصد – أساس الحكم بالإعدام",
    icon: PinIcon,
  },
  {
    title: " مقالات قانونية",
    description:
      " ٢٣م.م.ع:الشهادة السلبية شرط لقبول الدعاوى العينية العقارية: تأثير الظرف الاستثنائي",
    icon: PinIcon,
  },
  {
    title: "النقض المدني ",
    description:
      "٦٨/٥٦ق: تقدير الوقائع وإثبات الخطأ وعلاقة السبيبة وتحديد المسؤول من مسائل الواقع",
    icon: PinIcon,
  },
  {
    title: " النقض الجنائي",
    description:
      "٧٠/٣٦١ق:جريمة القتل العمل – مدلول سبق الإصرار والترصد – أساس الحكم بالإعدام",
    icon: PinIcon,
  },
  {
    title: " مقالات قانونية",
    description:
      " ٢٣م.م.ع:الشهادة السلبية شرط لقبول الدعاوى العينية العقارية: تأثير الظرف الاستثنائي",
    icon: PinIcon,
  },
  {
    title: "النقض المدني ",
    description:
      "٦٨/٥٦ق: تقدير الوقائع وإثبات الخطأ وعلاقة السبيبة وتحديد المسؤول من مسائل الواقع",
    icon: PinIcon,
  },
  {
    title: " النقض الجنائي",
    description:
      "٧٠/٣٦١ق:جريمة القتل العمل – مدلول سبق الإصرار والترصد – أساس الحكم بالإعدام",
    icon: PinIcon,
  },
  {
    title: " مقالات قانونية",
    description:
      " ٢٣م.م.ع:الشهادة السلبية شرط لقبول الدعاوى العينية العقارية: تأثير الظرف الاستثنائي",
    icon: PinIcon,
  },
  {
    title: "النقض المدني ",
    description:
      "٦٨/٥٦ق: تقدير الوقائع وإثبات الخطأ وعلاقة السبيبة وتحديد المسؤول من مسائل الواقع",
    icon: PinIcon,
  },
];
// data.ts
export const yearlyData: YearlyData = {
  2012: {
    amount: 1300,
    cases: {
      "دوائر نقض الأحوال الشخصية": 90,
      "دوائر النقض الإداري": 28,
      "دوائر النقض المدني": 65,
      "دوائر النقض الجنائي": 48,
    },
  },
  2013: {
    amount: 2000,
    cases: {
      "دوائر نقض الأحوال الشخصية": 44,
      "دوائر النقض الإداري": 22,
      "دوائر النقض المدني": 90,
      "دوائر النقض الجنائي": 60,
    },
  },
  2014: {
    amount: 1500,
    cases: {
      "دوائر نقض الأحوال الشخصية": 44,
      "دوائر النقض الإداري": 30,
      "دوائر النقض المدني": 10,
      "دوائر النقض الجنائي": 85,
    },
  },
  2015: {
    amount: 1000,
    cases: {
      "دوائر نقض الأحوال الشخصية": 60,
      "دوائر النقض الإداري": 99,
      "دوائر النقض المدني": 88,
      "دوائر النقض الجنائي": 33,
    },
  },
  2016: {
    amount: 2003,
    cases: {
      "دوائر نقض الأحوال الشخصية": 33,
      "دوائر النقض الإداري": 22,
      "دوائر النقض المدني": 44,
      "دوائر النقض الجنائي": 80,
    },
  },
};

export const slides: SlideData[] = [
  {
    content: "HeroSlides1",
    backgroundImage: "/assets/bg-1.jpg",
  },
  {
    content: "HeroSlides3",
    backgroundImage: "/assets/bg-3.jpg",
  },
  {
    content: "HeroSlides2",
    backgroundImage: "/assets/bg-2.jpg",
  },
  {
    content: "HeroSlides4",
    backgroundImage: "/assets/bg-3.jpg",
  },
];
