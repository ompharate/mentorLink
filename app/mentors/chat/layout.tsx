import type { Metadata } from "next";
import { SocketProvider } from "@/app/context/SocketContext";

export const metadata: Metadata = {
  title: "mentorLink - share skill",
  description: "skillsharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SocketProvider>{children}</SocketProvider>  ;
}
