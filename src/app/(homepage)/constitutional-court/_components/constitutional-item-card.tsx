"use client";

import QuestionCard from "@/components/common/question-card";

type ConstitutionalItem = {
  uuid: string;
  title: string;
  answer: string;
};

type Props = {
  item: ConstitutionalItem;
};

export default function ConstitutionalItemCard({ item }: Props) {
  return <QuestionCard item={item as unknown as Iquestion} />;
}
