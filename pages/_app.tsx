import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="dark bg-background text-foreground font-sans min-h-screen">
      <Component {...pageProps} />
    </main>
  );
}
