import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mobee",
  description: "Social Discovery Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-[100vh] flex flex-col">{children}</body>
    </html>
  );
}
