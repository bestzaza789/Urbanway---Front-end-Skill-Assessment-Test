import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import { WithdrawalProvider } from "@/context/WithdrawalContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบเบิกถอนเงิน | Withdrawal Management System",
  description: "ระบบจัดการคำขอเบิกถอนเงินและรายงานสถานะ - Front-end Developer Test",
  keywords: "withdrawal, management, banking, finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {/* Animated gradient background */}
        <div className="gradient-bg" />

        <ThemeProvider>
          <WithdrawalProvider>
            <div className="min-h-screen relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Navigation />
                <main className="page-enter page-enter-active">
                  {children}
                </main>
              </div>
            </div>
          </WithdrawalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
