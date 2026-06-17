import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  title: "Adair Systems",
  description: "Intelligent Architecture. World-Class Design.",
  metadataBase: new URL("https://adair.systems"),
  openGraph: {
    title: "Adair Systems",
    description: "Intelligent Architecture. World-Class Design.",
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
      <body className={plusJakarta.variable}>{children}</body>
    </html>
  );
}
