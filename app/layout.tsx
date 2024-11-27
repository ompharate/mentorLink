import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/react-query/provider";

export const metadata: Metadata = {
  title: "mentorLink - share skill",
  description: "skillsharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased h-screen bg-white`}>
        <ReactQueryProvider> {children}</ReactQueryProvider>
      </body>
    </html>
  );
}
