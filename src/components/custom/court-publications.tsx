import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import SupremeCourtMagazine from "./supreme-court-magazine";
import RulingsSet from "./rulings-set";
import Other from "./other";
type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default function CourtPublications({ pagination }: Props) {
  const courtPublicationTabs: SecondaryTabItem[] = [
    {
      label: "مجلة المحكمة العليا",
      value: "supreme_court",
      component: <SupremeCourtMagazine pagination={pagination} />,
    },
    {
      label: "مجموعة الأحكام",
      value: "rulings_set",
      component: <RulingsSet pagination={pagination} />,
    },
    {
      label: "اخري",
      value: "other",
      component: <Other pagination={pagination} />,
    },
  ];

  return (
    <SecondaryTabs
      tabListClassName={"pt-20 lg:pt-0"}
      tabs={courtPublicationTabs}
      defaultValue="supreme_court"
    />
  );
}
