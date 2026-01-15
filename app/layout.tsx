import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artistry Havens",
  description: "An AI-enhanced marketplace connecting artisans with the world.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevent zooming for app-like feel
  themeColor: "#FFFFFF",
};

import { SplashScreen } from "@/components/splash-screen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center items-center min-h-screen bg-neutral-100`}
      >
        <div className="relative w-full max-w-[390px] h-screen max-h-[844px] flex flex-col bg-background shadow-2xl overflow-hidden md:rounded-[2rem] border-gray-200 md:border-[8px]">
          <div className="relative flex flex-col bg-background pb-16 md:pb-0 h-full overflow-y-auto w-full">
            <SplashScreen />
            {children}
            <MobileNav />
          </div>
        </div>
      </body>
    </html>
  );
}
