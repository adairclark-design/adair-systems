import type { Metadata } from "next";
import RevealProvider from "@/components/RevealProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adair Systems",
  description: "Agentic engineering and AI-directed full-stack software architecture for ambitious companies.",
  metadataBase: new URL("https://adair.systems"),
  openGraph: {
    title: "Adair Systems",
    description: "Agentic engineering and AI-directed full-stack software architecture for ambitious companies.",
    url: "https://adair.systems",
    siteName: "Adair Systems",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RevealProvider>{children}</RevealProvider>
      </body>
    </html>
  );
}
