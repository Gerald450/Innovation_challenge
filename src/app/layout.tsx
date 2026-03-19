import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/bridge/AppNavbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRIDGE",
  description:
    "AI-powered financial aid navigation and early intervention for underrepresented college students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppNavbar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
