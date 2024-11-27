import { MainNavbar } from "@/components/mentor/main-navbar";
import type { Metadata } from "next";

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
    <div>
      <MainNavbar />
      {children}
    </div>
  );
}
