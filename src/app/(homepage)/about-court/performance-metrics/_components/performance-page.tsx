"use client";

import SecondaryTabs, {
  type SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import type { PerformanceMetricsCategory } from "@/lib/api/performance-metrics.api";
import PerformanceMetricsCategoryContent from "./performance-metrics-category-content";

export default function PerformancePage({
  categories,
}: {
  categories: PerformanceMetricsCategory[];
}) {
  if (!categories.length) {
    return (
      <section className="bg-main/10">
        <div className="box-container pt-20 pb-32 text-center text-muted-foreground">
          لا توجد فئات متاحة.
        </div>
      </section>
    );
  }

  const newsTabs: SecondaryTabItem[] = categories.map((c) => ({
    label: c.name,
    value: String(c.id),
    component: <PerformanceMetricsCategoryContent classId={c.id} />,
  }));

  return (
    <section className="bg-main/10">
      <div className="box-container pb-40 pt-20">
        <SecondaryTabs
          tabs={newsTabs}
          defaultValue={String(categories[0].id)}
          maxwidth="max-w-none"
        />
      </div>
    </section>
  );
}
