import type { Metadata } from "next";
import RevealProvider from "@/components/RevealProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adair Clark | Full-Stack & Systems Engineer",
  description: "Adair Clark designs and builds full-stack software: product interfaces, APIs, data systems, and production infrastructure.",
  metadataBase: new URL("https://adair.systems"),
  openGraph: {
    title: "Adair Clark | Full-Stack & Systems Engineer",
    description: "Adair Clark designs and builds full-stack software: product interfaces, APIs, data systems, and production infrastructure.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RevealProvider>{children}</RevealProvider>
      </body>
    </html>
  );
}
