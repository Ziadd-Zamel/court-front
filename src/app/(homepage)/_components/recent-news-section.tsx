import { getNewsArticles } from "@/lib/api/news";
import catchError from "@/lib/utils/catch-error";
import RecentNews from "./RecentNews";

export default async function RecentNewsSection() {
  const [data, error] = await catchError(() => getNewsArticles(1, 6));

  const articles = !error && data && "data" in data ? data.data : [];

  return <RecentNews articles={articles} />;
}
