declare type SearchParams = string | string[] | undefined;

declare type RouteProps = {
  params: promise<{ locale: Locale; productSlug: string }>;
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;

declare type mainData = {
  uuid: string;
  name: string;
};
