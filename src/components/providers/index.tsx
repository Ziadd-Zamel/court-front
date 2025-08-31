import { NuqsAdapter } from "nuqs/adapters/react";
import ReactQueryProvider from "./components/react-query.provider";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      value={{
        light: "light",
        dark: "dark",
      }}
    >
      <NuqsAdapter>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
