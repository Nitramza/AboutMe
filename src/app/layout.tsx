import type { Metadata } from "next";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./globals.css";
import { cvData } from "@/data/cvData";

export const metadata: Metadata = {
  title: `${cvData.es.profile.name} | Backend Software Engineer`,
  description: cvData.es.profile.summary,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}