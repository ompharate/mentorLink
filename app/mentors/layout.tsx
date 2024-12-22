import UserNavbar from "@/components/mentor/navbar";
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
    <div className="">
      <UserNavbar  />
      {children}
    </div>
  );
}
