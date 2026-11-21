import type { Metadata } from "next";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./theme.css";
import "./globals.css";
import { cvData } from "@/data/cvData";

export const metadata: Metadata = {
  metadataBase: new URL("https://nitramza.github.io/AboutMe/"),
  title: `${cvData.es.profile.name} | Full-Stack Software Engineer`,
  description: cvData.es.profile.summary,
  keywords: ["Martin Vazquez Islas", "Full-Stack Software Engineer", "Backend Architect", "Next.js", "React", "TypeScript", "Cae Sushi", "static website", "software engineering"],
  authors: [{ name: cvData.es.profile.name, url: cvData.es.profile.linkedin }],
  creator: cvData.es.profile.name,
  openGraph: {
    title: `${cvData.es.profile.name} | Full-Stack Software Engineer`,
    description: cvData.es.profile.summary,
    type: "website",
    url: "https://nitramza.github.io/AboutMe/",
    siteName: "Martin Vazquez Islas Portfolio",
    locale: "es_MX",
    images: [{ url: "/profile-photo.jpg", width: 1200, height: 630, alt: "Martin Vazquez Islas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${cvData.es.profile.name} | Full-Stack Software Engineer`,
    description: cvData.es.profile.summary,
    images: ["/profile-photo.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}