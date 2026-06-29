import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CheckoutReturnHandler from "@/components/CheckoutReturnHandler";
import FloatingActions from "@/components/ui/FloatingActions";
import { COMPANY_INFO } from "@/lib/design-tokens";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${COMPANY_INFO.name} - Industrial Tools & Building Materials | Nairobi, Kenya`,
  description: `${COMPANY_INFO.shortName} is your one-stop solution for design, supply, and fixing in construction and interior design needs. Power tools, building materials, EV bikes, and professional services across East Africa.`,
  keywords: [
    "tools",
    "building materials",
    "EV bikes",
    "aluminum fabrication",
    "Nairobi",
    "Kenya",
    "power tools",
    "construction",
    "industrial tools",
  ],
  authors: [{ name: COMPANY_INFO.name }],
  openGraph: {
    title: `${COMPANY_INFO.name} - Industrial Tools & Building Materials`,
    description: "Your one-stop solution for design, supply, and fixing in construction and interior design needs.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <div className="flex min-h-screen flex-col">
          <Suspense
            fallback={
              <header className="fixed top-0 left-0 right-0 z-[1100] h-[80px] sm:h-[88px] md:h-[92px] lg:h-[104px] bg-white shadow-sm" />
            }
          >
            <Header />
          </Suspense>
          <main className="flex-1 pt-[81px] sm:pt-[89px] md:pt-[93px] lg:pt-[104px]">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <FloatingActions />
          <CheckoutReturnHandler />
        </div>
        <Toaster 
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
