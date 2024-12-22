import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import AuthProvider from "./provider/AuthProvider";

export const metadata: Metadata = {
  title: "mentorLink - share skill",
  description: "skillsharing platform",
};

const interFont = localFont({
  src: "./fonts/inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
  style: "bold",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} antialiased h-screen bg-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}