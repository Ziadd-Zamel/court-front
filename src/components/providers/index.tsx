import { NuqsAdapter } from "nuqs/adapters/react";
import ReactQueryProvider from "./components/react-query.provider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SearchHighlightProvider } from "./search-highlight.provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      value={{
        light: "light",
        dark: "dark",
      }}
    >
      <NuqsAdapter>
        <SearchHighlightProvider>
          <Toaster />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SearchHighlightProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
