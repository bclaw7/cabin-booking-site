import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADU Cabin Booking",
  description: "Book a cozy, ADA-friendly cabin stay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-emerald-50`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
